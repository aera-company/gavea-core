# GAVEA BUILD 2030

Repositório: [aera-company/gavea-core](https://github.com/aera-company/gavea-core).

Para abrir a versão pronta a partir do GitHub:

```sh
git clone https://github.com/aera-company/gavea-core.git
cd gavea-core
python3 scripts/serve_demo.py
```

O build está incluído em `dist/`. A apresentação funciona localmente sem instalar pacotes. O painel Claude requer uma chave da API Anthropic e internet. ZIPs, backups, vídeos e credenciais locais não são versionados neste repositório.

**ONE GAVEA. ONE DIRECTION.**  
Uma visão AERA para integrar marketing, tecnologia e crescimento. V0.1.3, com presenças animadas e painel de pedidos ao vivo preparado para Claude, a partir da base de 25/10, para a reunião de 26/10/2026.

## Abrir a demonstração pronta, sem internet

O build de produção está incluído em `dist/`. Requer apenas Python 3, disponível neste computador. Não exige npm, instalação de bibliotecas, conta, chave ou conexão com serviços externos.

No Finder, abra **INICIAR_GAVEA.command**. Alternativa pelo Terminal:

```sh
cd '/Users/tiagolima/Desktop/STUDIO AERA/GAVEA OFFICE'
python3 scripts/serve_demo.py
```

O navegador abre em **http://127.0.0.1:8086/**. Mantenha o Terminal aberto. Ctrl+C encerra o servidor. Se a porta estiver ocupada, encerre a instância anterior ou use:

```sh
python3 scripts/serve_demo.py --port 8087
```

A execução usa HTTP local. Não abra `dist/index.html` diretamente por `file://`, pois os módulos JavaScript precisam de um servidor. Se o macOS bloquear o arquivo `.command`, use o comando Python acima.

## Instalar e desenvolver

Node.js 20.19+ ou 22.12+ e npm. As dependências e o lockfile são locais ao projeto; não há referência ao projeto original.

```sh
cd '/Users/tiagolima/Desktop/STUDIO AERA/GAVEA OFFICE'
npm ci
npm run dev
```

Desenvolvimento: **http://127.0.0.1:5174/**. A instalação inicial via npm exige acesso ao registro; a cópia de `node_modules/` presente neste computador já permite executar sem reinstalar.

Para gerar uma nova entrega:

```sh
npm run build
python3 scripts/serve_demo.py
```

Alternativa de servidor com Node, após instalação:

```sh
npm run preview
```

Preview Vite: **http://127.0.0.1:4174/**. O preview Vite serve apenas a apresentação. Para a IA, use o servidor Python; em desenvolvimento, o Vite encaminha `/api` para ele na porta 8086. A configuração da chave está descrita abaixo.

## Apresentar

1. Abra a visão geral e explique a oportunidade de direção integrada.
2. **EXPERIENCE THE FUTURE** ou **Presentation mode** inicia o percurso de aproximadamente 65 segundos: abertura, cinco fases e encerramento.
3. Use Pausar, setas e Sair para ajustar a apresentação à conversa. A aba em segundo plano e um gesto orbital pausam o percurso.
4. **EXPLORE THE OFFICE** libera a exploração. Clique nos núcleos no edifício ou na barra inferior para aproximar a câmera e abrir o painel.
5. **RETURN TO OVERVIEW**, o botão de reinicialização ou Esc retornam à visão geral.

O percurso total da reunião, com introdução e comentários, está em `DEMO_SCRIPT.md`. A arquitetura permanece tridimensional e interativa. O vídeo é apenas um registro opcional da demonstração.

## Controles

| Controle | Ação |
| --- | --- |
| Arrastar no edifício | Orbitar com limites de distância e inclinação |
| Rolar / gesto de pinça | Aproximar ou afastar |
| + / − | Zoom por clique |
| 1 a 5 | Abrir um núcleo pelo teclado, sem voo de câmera |
| Esc | Visão geral; fecha primeiro a caixa de comandos se estiver aberta |
| P | Iniciar apresentação |
| Setas esquerda / direita | Etapa anterior / seguinte durante o percurso |
| Espaço | Pausar ou continuar o percurso |
| ⌘K / Ctrl+K | Abrir campo de comandos |
| Agentes | Pausar ou retomar o movimento das cinco figuras; a navegação continua disponível |
| HQ / LQ | Alternar qualidade; LQ reduz DPR e desativa sombras/reflexão |

Comandos de texto: “Mostrar estratégia”, “Abrir marketing”, “Ir para tecnologia”, “Mostrar comercial”, “Abrir direção”, “Iniciar apresentação” e “Voltar para o escritório”. O campo recebe texto; não contém reconhecimento de voz nativo. Ditado externo pode preencher o campo como qualquer outro input.

## Contingência

Abra **http://127.0.0.1:8086/?fallback=1** para usar a imagem de referência, identificada explicitamente como **Modo de referência visual**. Os cinco núcleos, os comandos e a narrativa continuam disponíveis; o 3D fica indisponível nesse modo. Falha de inicialização, demora de carregamento e perda de contexto WebGL também acionam a contingência. Recarregue a página para tentar novamente.

`prefers-reduced-motion` é respeitado: a câmera troca de enquadramento diretamente e o tour inicia pausado, para avanço manual.

## Estrutura

- `office.js`: cena arquitetônica adaptada do AERA AI OFFICE, materiais, iluminação, controles, hotspots e conexões.
- `app.js`: navegação, painéis, apresentação, atalhos, comandos e contingência.
- `ai.js`: painel de pedidos ao vivo, contexto opcional, histórico e conexão Claude.
- `scripts/serve_demo.py`: servidor local e ponte para a API Anthropic; credencial fora do build.
- `agents.js`: cinco figuras articuladas, gestos e percursos curtos predefinidos, renderizados com geometria compartilhada.
- `data.js`: conteúdo dos núcleos e parser de navegação, independente do renderizador.
- `style.css` / `index.html`: composição e interface responsiva.
- `assets/`: marcas, fonte referenciada localmente e imagem de contingência.
- `public/licenses/`: licenças Three.js e Instrument Sans.
- `dist/`: aplicação compilada para execução sem internet.
- `docs/`: evidências, capturas, gravação e registros técnicos.
- `tests/`: testes de interação para Playwright. Não fazem parte da execução da apresentação.

## Veracidade

Os núcleos e agentes representam capacidades **propostas**, não departamentos ou funcionários reais da GAVEA. O percurso é uma **simulação conceitual com conteúdo predefinido**. O painel Pedido ao vivo possui integração com a API Claude, ativada por chave e teste de conexão. Os personagens continuam conceituais. Não há integração com CRM, acesso automático a dados GAVEA ou resultados comerciais reais. A AERA é apresentada como uma camada de direção e execução integrada, somando ao time e aos parceiros atuais.

A modelagem é procedural e simplificada; preserva a linguagem do pavilhão, mas não reproduz o fotorrealismo da referência. O ponto `GAVEA_GLTF_EXTENSION` em `office.js` permite futura importação de modelos arquitetônicos licenciados.

## Reproduzir os testes

O computador de desenvolvimento possui Playwright e navegadores em cache. Aqui:

```sh
# Com o servidor de produção rodando na porta 8086:
npm run test:demo
```

Em outro computador, instale Playwright e seus navegadores para testes, sem mudar a execução da demo:

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium webkit
npm run test:demo
```

`GAVEA_URL` altera a URL testada; `GAVEA_RECORD=0` desativa a gravação. Os resultados efetivamente realizados estão em `BUILD_STATUS.md` e `docs/TEST_RESULTS.json`. A checagem WebKit está em `tests/compatibility.cjs`.

## Pacote para levar à reunião

`GAVEA_BUILD_2030_V0.1.3.zip` reúne código, build, assets, iniciador, documentos, capturas e gravações; exclui `node_modules/`. Descompacte e execute `INICIAR_GAVEA.command` ou `python3 scripts/serve_demo.py` dentro da pasta extraída. O build pronto não precisa instalar dependências. Para uma cópia de vídeo, use `docs/GAVEA-BUILD-2030-demo.mp4`.

O refinamento de 26/10 melhora luz, materiais, vegetação, destaque dos núcleos e câmeras. A vista real do escritório não foi incorporada. O pacote anterior V0.1 e um backup das fontes permanecem preservados.

## Movimento dos agentes — V0.1.2

As figuras têm pequenos movimentos de cabeça e postura. Selecionar um núcleo ativa gestos de trabalho. Durante a apresentação, cada figura faz um percurso curto dentro do próprio ambiente, com retorno ao ponto de origem ao sair. Pausar a apresentação também pausa os personagens. O encerramento mantém os movimentos ambientais; o botão **Agentes** permite pará-los.

A opção de movimento reduzido do sistema mantém todas as figuras imóveis e preserva a navegação. A aba oculta interrompe a animação. As figuras são representações conceituais; os gestos e deslocamentos são coreografados e não indicam execução real de tarefas por IA.

As presenças usam três malhas instanciadas com geometria compartilhada e atualização limitada a até 24 quadros por segundo quando a câmera está parada. Com os agentes pausados ou movimento reduzido, o renderer volta a desenhar sob demanda.

## Pedido ao vivo — V0.1.3

Abra **Pedido ao vivo**, cole uma chave de API do Claude Console e clique **Conectar e testar**. A conexão fica verificada somente após uma resposta da API. A chave informada na UI fica apenas na memória do servidor; não é salva no navegador nem em disco. O teste e os pedidos usam o saldo da API Anthropic e precisam de internet. A apresentação 3D continua disponível offline.

O contexto MERUS pode ser colado no campo opcional. Nenhum catálogo está pré-carregado. Converse, peça ajustes, copie a última resposta ou inicie Nova conversa (que também limpa o contexto). O histórico fica na memória desta aba e as últimas cinco trocas são reenviadas com o novo pedido. Não há execução de ferramentas, pesquisa web ou envio a CRM.

Configuração opcional persistente: copie `.env.example` para `.env.local` e preencha `ANTHROPIC_API_KEY`; esse arquivo é privado, não entra no build nem no pacote. O padrão é `claude-sonnet-5-5`, com `thinking: between_tools`, sem ferramentas. A chave deve estar vinculada a um workspace. **Desconectar** remove a chave da memória; se estiver em arquivo/ambiente, um reinício a carregará novamente.

Detalhes: `docs/LIVE_AI_SETUP.md`. Testes do serviço: `PYTHONDONTWRITEBYTECODE=1 python3 tests/test_live_ai.py` (transporte Anthropic simulado; nenhum gasto). As gravações MP4/WebM documentam o percurso arquitetônico V0.1.2, anterior ao painel ao vivo.
