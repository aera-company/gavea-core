# Reunião 26/10/2026 — GAVEA BUILD 2030

V0.1.4 funcional e local, refinada em 26/10/2026. O código original do AERA AI OFFICE foi preservado; a nova aplicação está inteiramente nesta pasta.

## Abrir

Duplo clique em **INICIAR_GAVEA.command** ou:

```sh
cd '/Users/tiagolima/Desktop/STUDIO AERA/GAVEA OFFICE'
python3 scripts/serve_demo.py
```

**http://127.0.0.1:8086/**. Manter o Terminal aberto. A apresentação arquitetônica funciona offline; o Pedido ao vivo com Claude exige internet, chave e saldo da API.

## Apresentar

Clique **EXPERIENCE THE FUTURE**. O percurso dura aproximadamente 65 segundos e termina em ONE GAVEA. ONE DIRECTION. Pausar, setas e Sair permitem conduzir a reunião. O roteiro falado de aproximadamente 90 segundos está em `DEMO_SCRIPT.md`.

A exploração livre permite clicar nos cinco núcleos. Esc retorna à visão geral; 1–5 abre núcleos; ⌘K/Ctrl+K abre comandos.

## Confirmado em testes

- WebGL real no Chromium e WebKit neste Mac.
- Câmera, zoom, órbita, cinco núcleos, hotspots e painéis.
- Percurso guiado completo, pausa, avanço e encerramento.
- Teclado, comandos de texto, redução de movimento e tela cheia no Chromium.
- Layouts de notebook e mobile; abertura separada da navegação em 1600, 1440, 1024 e 390 px.
- Falha de módulo e perda de WebGL recuperadas por referência visual identificada.
- Zero requisições externas e zero erros de console na sessão normal auditada.
- Servidor de produção encerrou e reiniciou com sucesso.
- Hashes dos arquivos originais auditados idênticos aos anteriores.

## O que mostrar com precisão

É uma visão conceitual de direção e execução integradas com o time e os parceiros atuais. Núcleos, agentes, aplicações e entregas são propostos/simulados. O painel Pedido ao vivo tem integração com Claude, aguardando chave e teste real. Não há CRM ou dados GAVEA carregados automaticamente.

A modelagem procedural é estilizada, sem pretensão de equivaler ao fotorrealismo da referência. O navegador Safari nativo e o equipamento final da reunião não foram testados; WebKit foi testado neste Mac.

## Contingência

**http://127.0.0.1:8086/?fallback=1** usa a imagem de referência e mantém os painéis. É explicitamente um modo sem 3D. A gravação real está em `docs/GAVEA-BUILD-2030-demo.webm`, com cópia MP4 quando indicada em `BUILD_STATUS.md`.

## Evidências e manutenção

`BUILD_STATUS.md`, `docs/TEST_RESULTS.json`, `docs/COMPATIBILITY_RESULTS.json`, capturas em `docs/` e inventário em `ASSET_INVENTORY.md`. Fontes e bibliotecas servidas localmente. Código de cena em `office.js`, navegação em `app.js`, conteúdo e parser em `data.js`.

Refinamento final: iluminação de área, destaque por ambiente, madeira, vegetação e câmeras reajustadas. A vista real foi deixada fora do escopo. O pacote atualizado é `GAVEA_BUILD_2030_V0.1.4.zip`; o anterior continua disponível.

Personagens animados: cabeça, postura e gestos, com deslocamentos curtos durante o percurso. O botão Agentes pausa somente as figuras. Pausar a apresentação também as pausa. Movimento reduzido mantém as figuras imóveis. Todos os movimentos são predefinidos, sem execução de tarefas reais.

## Teste ao vivo com Claude

Abra Pedido ao vivo, insira uma chave de API no próprio painel e clique Conectar e testar. Depois use o exemplo MERUS e acrescente o material aprovado no campo de contexto. O teste consome uma pequena chamada da API; pedidos posteriores usam o saldo Anthropic. Não há catálogo pré-carregado. A integração foi testada com transporte simulado; falta a chave para verificar uma resposta real. Não envie a chave por chat.

## Operação visível — V0.1.4

Enviar pedido fecha o diálogo e mostra os papéis trabalhando no escritório. Os repasses aparecem quando o Claude responde; Ver entrega abre o resultado final. Comunicação usa MAYA → NOA → ARI, com rotas específicas para vendas e sistemas. São três chamadas de IA por pedido. Os movimentos representam as etapas. Um teste neutro real passou pelas três etapas; a conexão Claude já ativa neste computador foi preservada.
