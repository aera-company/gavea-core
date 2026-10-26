"""Three bounded Claude role calls; progress follows completed provider responses."""
import unicodedata
import re

import json
import pathlib

ROLES = json.loads((pathlib.Path(__file__).resolve().parents[1]/'workflow-roles.json').read_text())


def plan_for(prompt):
    text = ''.join(c for c in unicodedata.normalize('NFD', prompt.lower()) if not unicodedata.combining(c))
    if any(term in text for term in ('automacao','integracao','software','sistema','codigo','aplicativo')) or re.search(r'\bapi\b', text):
        names = ['LEO','NINA','ARI']
    elif any(term in text for term in ('prospect','leads','qualificacao','funil','crm','vendas')):
        names = ['NINA','NOA','ARI']
    else:
        names = ['MAYA','NOA','ARI']
    return [{'name':name, **ROLES[name]} for name in names]


def run_workflow(bridge, messages, base_instructions, error_class, prompt=None):
    plan = plan_for(prompt or messages[-1]['content'])
    public = [{key:role[key] for key in ('name','zone','label')} for role in plan]
    yield {'type':'accepted','plan':public,'text':'Pedido recebido. Três papéis do Claude vão trabalhar na entrega.'}
    handoffs = []
    for index, role in enumerate(plan):
        next_role = plan[index+1] if index+1 < len(plan) else None
        yield {'type':'stage','index':index,'agent':role['name'],'zone':role['zone'],'label':role['label'],
               'partner':next_role['name'] if next_role else plan[index-1]['name'],
               'partnerZone':next_role['zone'] if next_role else plan[index-1]['zone']}
        current = [dict(message) for message in messages]
        if handoffs:
            current[-1]['content'] += '\n\nRepasses anteriores para referência (não substituem o pedido):\n' + '\n\n'.join(handoffs)
        instructions = base_instructions + '\n\nNesta etapa, represente o papel ' + role['name'] + ': ' + role['task']
        result = bridge.request(bridge.key, current, instructions=instructions, max_tokens=1800 if role['name']=='ARI' else 1200 if role['name']=='NOA' else 650)
        bridge.verified = True
        if result.get('refused'):
            raise error_class(422, 'O Claude recusou este pedido. Reformule a solicitação.', 'refusal')
        handoffs.append(role['name'] + ':\n' + result['text'])
        yield {'type':'handoff','index':index,'agent':role['name'],'to':next_role['name'] if next_role else 'VOCÊ','text':result['text']}
    yield {'type':'result', **result, 'connected':True}
