# Operação visível dos pedidos

O pedido é elaborado em três chamadas sequenciais ao Claude. Os personagens representam papéis de trabalho, com animações coreografadas acompanhando o estado real das chamadas. Não há reconhecimento de voz, ferramentas externas ou departamentos autônomos. Cada pedido usa três chamadas cobradas da API; o teste de conexão continua sendo uma chamada pequena separada.

## Percurso

- Comunicação e pedidos gerais: MAYA estrutura → NOA desenvolve → ARI revisa e entrega.
- Prospecção, leads, qualificação, funil, CRM e vendas: NINA organiza → NOA desenvolve → ARI revisa.
- Automação, integração, software, sistemas, código, aplicativos ou API: LEO propõe → NINA organiza a abordagem comercial → ARI revisa.

A classificação inicial é uma regra local de palavras do pedido. Os papéis e instruções vêm de `workflow-roles.json`. O contexto opcional não é usado para essa classificação. Nenhum catálogo MERUS foi acrescentado.

## Interface

Enviar fecha o diálogo e mostra o escritório. O painel registra o papel em execução e cada repasse recebido, mantendo o último aberto durante a próxima etapa. A etapa seguinte só começa depois de uma resposta válida. Não existe avanço por relógio, percentual estimado ou mensagem de conclusão antes da resposta final.

Os personagens envolvidos caminham até seus pontos de trabalho, ficam no próprio pavimento e se orientam para o parceiro. Marcadores sobre os corpos e uma conexão com um ponto em movimento tornam o fluxo visível. O botão Agentes pausa os movimentos e o ponto; o processamento textual continua. Movimento reduzido mantém as figuras em repouso e o conector estático. Na conclusão ou falha, os personagens voltam à origem e os marcadores saem.

No celular, o enquadramento sobe e o painel começa recolhido. Expandir permite ler os repasses. Ver entrega abre a resposta e o campo para ajustes. Falha conserva o pedido e os repasses já recebidos, interrompe próximas chamadas e oferece Revisar pedido. Não há repetição automática.

## Serviço e compatibilidade

`scripts/live_workflow.py` chama o modelo em sequência, enviando os repasses anteriores à etapa seguinte. `/api/workflow` transmite eventos NDJSON: accepted, stage, handoff, result ou error. Saídas limitadas a 650/1.200/1.800 tokens conforme o papel, timeout de 60 segundos por chamada. O cliente espera até 205 segundos. A trava do servidor impede dois fluxos simultâneos.

Se o servidor V0.1.3 já estiver rodando e conectado, `compatibleWorkflow()` coordena três chamadas ao endpoint existente `/api/chat`. Isso permite atualizar a UI sem encerrar o processo que guarda a chave em memória. São mantidas até quatro trocas anteriores, com um par de mensagens reservado para a instrução do papel. O servidor anterior mantém seu limite de 1.800 tokens por chamada. A chave nunca é lida ou devolvida ao navegador. Novas inicializações usam o endpoint NDJSON nativo.

## Verificação

Um pedido neutro real sobre organização de briefing concluiu MAYA → NOA → ARI com o Claude conectado. Foram observados dois repasses intermediários, resultado final e zero erros/warnings de console. A conta ativa e a chave em memória foram preservadas. A verificação consumiu três chamadas reais, sem dados técnicos ou materiais privados do MERUS.

Também passaram: 10 testes HTTP/contrato, 5 testes de workflow (ordem, repasses, interrupção, recusa e roteamento), parser de NDJSON com UTF-8 quebrado entre chunks, compatibilidade com servidor anterior e controle de figuras sem WebGL. A fixture visual em 8097 é identificada como sem IA real e não integra o servidor normal. Testes visuais conferiram marcadores, repasses, painel compacto e pausa do ponto em celular. Resultados em `WORKFLOW_RESULTS.json`.

Os benchmarks e vídeos anteriores continuam registros da V0.1.2. As capturas 15 e 16 registram o pedido neutro real; a 17 registra a fixture em celular. Nenhum ganho de desempenho novo é alegado.
