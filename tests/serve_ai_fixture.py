"""Local UI fixture only: explicitly labeled canned output; never calls Claude."""
import importlib.util
import pathlib
import time

spec = importlib.util.spec_from_file_location('gavea_fixture', pathlib.Path(__file__).resolve().parents[1] / 'scripts/serve_demo.py')
app = importlib.util.module_from_spec(spec)
spec.loader.exec_module(app)


class Fixture(app.Bridge):
    def request(self, key, messages, probe=False):
        if key != 'sk-test-placeholder-not-a-real-api-key':
            raise app.APIError(401, 'Chave de teste inválida.', 'auth_failed')
        time.sleep(.5 if probe else 2)
        if messages[-1]['content'] == 'Teste de falha':
            raise app.APIError(429, 'Falha controlada: limite de uso. Tente novamente.', 'rate_limit')
        text = ('RESPOSTA DE TESTE CONTROLADO — SEM IA REAL\n\n'
                'Recebi o ajuste com histórico.' if len(messages) > 1 else
                'RESPOSTA DE TESTE CONTROLADO — SEM IA REAL\n\n'
                'Antes de criar o material MERUS, preciso do contexto aprovado.\n'
                '<script>Este conteúdo deve aparecer como texto.</script>')
        return {'text': text, 'model': self.model}


if __name__ == '__main__':
    server = app.make_server(8097, Fixture(model='fixture local · sem IA real'))
    print('Fixture local http://127.0.0.1:8097 — SEM CHAMADAS REAIS', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
