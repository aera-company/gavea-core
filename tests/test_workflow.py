"""End-to-end local NDJSON orchestration, with a controlled provider transport."""
import json
import unittest
import urllib.error
import urllib.request
from unittest.mock import patch
from test_live_ai import LiveAI, app, KEY
from live_workflow import plan_for


class Workflow(LiveAI):
    # Reuse only HTTP setup/helpers, without repeating inherited test cases.
    def test_streamed_roles_and_real_handoffs(self):
        self.server.bridge.key = KEY
        original = urllib.request.urlopen
        captured = []
        def route(req, **kwargs):
            if req.full_url.startswith('https://api.anthropic.com/'):
                captured.append(json.loads(req.data))
                return self.upstream('Repasse '+str(len(captured)))
            return original(req, **kwargs)
        with patch.object(app.urllib.request, 'urlopen', side_effect=route):
            code, raw = self.call('/api/workflow', {'messages':[{'role':'user','content':'Apresentação do MERUS'}], 'context':'Referência técnica aprovada.'})
        events = [json.loads(line) for line in raw.splitlines()]
        self.assertEqual(code, 200)
        self.assertEqual([e['type'] for e in events], ['accepted','stage','handoff','stage','handoff','stage','handoff','result'])
        self.assertEqual([e['agent'] for e in events if e['type']=='stage'], ['MAYA','NOA','ARI'])
        self.assertEqual(len(captured),3)
        self.assertIn('Referência técnica aprovada',captured[0]['messages'][0]['content'])
        self.assertIn('Repasse 1',captured[1]['messages'][-1]['content'])
        self.assertIn('Repasse 2',captured[2]['messages'][-1]['content'])
        self.assertEqual(events[-1]['text'],'Repasse 3')
        self.assertNotIn(KEY,raw)

    def test_failure_stops_paid_stages_and_never_delivers(self):
        self.server.bridge.key = KEY
        original = urllib.request.urlopen
        count = []
        def route(req, **kwargs):
            if req.full_url.startswith('https://api.anthropic.com/'):
                count.append(1)
                if len(count)==2:raise urllib.error.HTTPError('',429,'',None,None)
                return self.upstream('Primeiro repasse')
            return original(req, **kwargs)
        with patch.object(app.urllib.request, 'urlopen', side_effect=route):
            _,raw=self.call('/api/workflow',{'messages':[{'role':'user','content':'Faça um roteiro'}]})
        events=[json.loads(line) for line in raw.splitlines()]
        self.assertEqual(len(count),2)
        self.assertEqual(events[-1]['type'],'error')
        self.assertFalse(any(e['type']=='result' for e in events))
        self.assertEqual(sum(e['type']=='handoff' for e in events),1)

    def test_refusal_stops_before_next_role(self):
        self.server.bridge.key=KEY
        original=urllib.request.urlopen
        def route(req,**kwargs):
            return self.upstream('Recusa','refusal') if req.full_url.startswith('https://api.anthropic.com/') else original(req,**kwargs)
        with patch.object(app.urllib.request,'urlopen',side_effect=route):
            _,raw=self.call('/api/workflow',{'messages':[{'role':'user','content':'Teste'}]})
        events=[json.loads(line) for line in raw.splitlines()]
        self.assertEqual([e['type'] for e in events],['accepted','stage','error'])
        self.assertEqual(events[-1]['code'],'refusal')

    def test_missing_key_never_starts_workflow(self):
        code,raw=self.call('/api/workflow',{'messages':[{'role':'user','content':'Teste'}]})
        self.assertEqual(code,503)
        self.assertEqual(json.loads(raw)['code'],'not_configured')

    def test_routing_uses_request_not_embedded_context(self):
        self.assertEqual([r['name'] for r in plan_for('Apresentação para a capital')],['MAYA','NOA','ARI'])
        self.assertEqual([r['name'] for r in plan_for('Qualificação de leads')],['NINA','NOA','ARI'])
        self.assertEqual([r['name'] for r in plan_for('Automação de sistema e API')],['LEO','NINA','ARI'])


if __name__=='__main__':
    suite=unittest.TestSuite(Workflow(name) for name in Workflow.__dict__ if name.startswith('test_'))
    result=unittest.TextTestRunner(verbosity=2).run(suite)
    raise SystemExit(not result.wasSuccessful())
