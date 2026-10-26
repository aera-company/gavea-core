# Pedido ao vivo com Claude — V0.1.4

## Ativar neste computador

1. Manter `python3 scripts/serve_demo.py` ou `INICIAR_GAVEA.command` em execução.
2. Abrir `http://127.0.0.1:8086/?v=0.1.4&live=1#overview`.
3. Obter uma chave vinculada a um workspace em https://platform.claude.com/settings/keys.
4. Inserir a chave no campo protegido do próprio painel e clicar **Conectar e testar**.
5. Aguardar **Conexão verificada**. O teste é uma chamada pequena, cobrada pela Anthropic.
6. Enviar um pedido e usar a próxima mensagem para ajustar a entrega.

Não enviar a chave por chat. A chave da UI fica na memória do servidor Python, compartilhada pelas abas que usam o mesmo servidor local, e é removida ao desconectar ou encerrar o processo. Não é salva em localStorage, sessionStorage ou cookies, e não é devolvida pelos endpoints. A apresentação e os arquivos estáticos são servidos apenas de `dist` em 127.0.0.1.

Alternativa persistente: copiar `.env.example` para `.env.local`, preencher `ANTHROPIC_API_KEY` e reiniciar. O arquivo privado deve ficar fora do build, Git e ZIP. Se for usado, **Desconectar** limpa a memória, mas um reinício volta a ler a configuração do arquivo. `ANTHROPIC_MODEL` pode substituir o modelo; o contrato atual usa `between_tools` e deve permanecer compatível com esse parâmetro.

## O que está implementado

Integração direta com Anthropic Messages API: `POST https://api.anthropic.com/v1/messages`, API version `2026-10-21`, modelo padrão `claude-sonnet-5-5`. Sem ferramentas, sem pesquisa web, sem CRM e sem múltiplos agentes autônomos. O provedor recebe apenas o pedido, as últimas cinco trocas e o contexto opcional. O catálogo MERUS ainda não está carregado.

O histórico fica em memória na aba e desaparece ao recarregar. **Nova conversa** limpa o histórico e o contexto. Fechar o painel conserva a conversa enquanto a aba permanecer aberta; uma solicitação em andamento continua e pode ser vista ao reabrir. O botão **Copiar resposta** copia a última resposta da IA.

Limites: pedido atual até 4.000 caracteres, contexto até 12.000, no máximo 1.800 tokens de saída e uma solicitação por vez. Sem repetição automática para evitar cobranças duplicadas. A chamada ao provedor tem timeout de 60 segundos. Falha preserva o pedido para revisão e nova tentativa manual. Resposta interrompida pelo limite não é marcada como concluída. Recusa é identificada na interface. Respostas são exibidas como texto, sem execução de HTML.

O tour arquitetônico é pausado ao abrir o painel e retomado ao fechar se estava rodando. Os personagens e conteúdos dos núcleos continuam conceituais e coreografados. Nenhum gesto afirma execução de uma ferramenta externa.

## Validação e pendência

Dez testes automatizados HTTP/contrato passaram, com transporte Anthropic simulado: conexão, histórico/contexto, erros de autenticação/uso/timeout, resposta incompleta, tamanhos e papéis inválidos, origem/Host, concorrência, desconexão e isolamento dos arquivos privados. Executar: `PYTHONDONTWRITEBYTECODE=1 python3 tests/test_live_ai.py`.

Interface verificada com uma fixture local em 8097, claramente identificada como sem IA real. A fixture existe somente em `tests/serve_ai_fixture.py`; o servidor normal nunca gera respostas de teste. A verificação inclui envio, espera, ajuste mantendo histórico, falha recuperável, limpeza e proteção contra HTML na resposta. O layout real sem credencial foi verificado em desktop e 390×844.

A V0.1.3 foi inicialmente verificada sem chave. Na V0.1.4, a conexão ativada pelo usuário foi preservada e um pedido neutro real concluiu MAYA → NOA → ARI. A verificação consumiu três chamadas na conta já conectada. Em outro computador ou após encerrar o processo, conectar a chave novamente.

Referências oficiais consultadas em 26/10/2026:

- https://platform.claude.com/docs/en/api/overview
- https://platform.claude.com/docs/en/build-with-claude/working-with-messages
- https://platform.claude.com/docs/en/models/sonnet-5-5/overview
- https://platform.claude.com/docs/en/models/sonnet-5-5/whats-new-sonnet-5-5
- https://platform.claude.com/docs/en/api/migration-2026-10-21

## Atualização V0.1.4

Pedidos agora usam três chamadas sequenciais com papéis distintos e repasses reais. A operação fica visível no escritório. O servidor oferece `/api/workflow` como NDJSON; um caminho compatível usa três chamadas a `/api/chat` quando o servidor V0.1.3 já está conectado. Nesse caminho, até quatro trocas anteriores são mantidas, reservando um par de mensagens para o papel atual. A chave existente continua apenas no servidor e não é transferida para o navegador. Consulte `WORKFLOW_V0.1.4.md`.
