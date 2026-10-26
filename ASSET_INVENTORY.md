# Inventário de assets e auditoria

Auditoria realizada em 25/10/2026, exclusivamente por leitura dos materiais de origem. A implementação foi criada em `STUDIO AERA/GAVEA OFFICE/`.

## Materiais localizados

| Origem real | Uso |
| --- | --- |
| `../AERA_AI_OFFICE_CODEX_STARTER/main.js` | Base de arquitetura procedural Three.js, OrbitControls, PMREM, materiais, móveis, escada, paisagismo, merge de geometria e desenho sob demanda. Copiado para `office.js` e adaptado somente no novo projeto. |
| `../AERA_AI_OFFICE_CODEX_STARTER/package.json` e lock | Three.js 0.180.0, Vite 7.1.12 e Instrument Sans 5.2.6, fixados. Dependências copiadas localmente. |
| `../AERA_AI_OFFICE_CODEX_STARTER/assets/office-concept.png` | Mesma referência visual do pavilhão; copiada para `assets/office-concept.png`, 2,73 MB. Usada somente em contingência. |
| `Pavilhão Corporativo Futurista ao Entardecer.png` | Referência original também presente no novo projeto; nome no disco usa normalização Unicode combinada. Preservada. |
| `gavea-group-white.png` | Arquivo de marca GAVEA fornecido no projeto. Copiado sem alteração para `assets/`, usado no cabeçalho e na recepção 3D. |
| `aera.svg` | Marca AERA fornecida, preservada e copiada para `assets/`. Usada na assinatura e favicon. |
| `../aera logo branco.png` | Marca AERA disponível na raiz. Preservada. Cópia já existente na base também retida como `assets/aera-logo.png`. |
| `../AERA_AI_OFFICE_GATE_00_01.md` | Auditoria e direção anterior consultadas; não alteradas. |
| `03_PROMPT_CODEX.md` | Briefing local consultado; preservado. |
| `02_ROTEIRO_APRESENTACAO_90S.md` | Roteiro GAVEA existente consultado e preservado. Novo roteiro independente em `DEMO_SCRIPT.md`. |
| `../AGENT LAB 2.zip` | 385 MB. Índice inspecionado com ZIP; somente os textos HUMAN Motion relevantes foram lidos em memória. Não foi descompactado no projeto. |

## HUMAN Motion

Foram consultados `AGENT LAB 2/Human Motion/CLAUDE.md` e `prompts/05-motion-camera.md`. Aproveitados como referência criativa: continuidade espacial, câmera com aceleração e chegada suaves, materiais estáveis e encerramento com marca. O fluxo operacional desse pacote é voltado à geração de vídeo; suas exigências de fornecedores, aprovações de imagens e restrição de ferramentas não se aplicam a esta aplicação WebGL, conforme o briefing do usuário.

## Ausências confirmadas

O briefing local `03_PROMPT_CODEX.md` cita arquivos que **não estavam presentes**: `README_PRIMEIRO.md`, `00_DIRECAO_ESTRATEGICA.md`, `01_EXPERIENCIA_E_AMBIENTES.md`, `04_COPY_DA_INTERFACE.md` e toda a pasta `demo/`. A implementação foi recuperada da base AERA disponível. Não foram encontrados GLBs arquitetônicos, personagens realistas ou manual de identidade GAVEA nos arquivos do projeto auditados. Não houve busca em contas externas, pois os materiais locais eram suficientes para a V0.1.

## Elementos novos e provisórios

- Azul de interface `#397FD9`, proposto para navegação. Não apresentado como valor oficial da marca GAVEA.
- Modelagem procedural reaproveitada e refinada, com vidro físico, madeira, metal, reflexo geométrico do espelho d’água e iluminação interior quente. Não é modelo BIM, arquitetura executiva ou reprodução fotorrealista.
- Núcleos, aplicações, conexões, MAYA/NOA/NINA/LEO/ARI: capacidades propostas e conteúdo ilustrativo predefinido.
- Instrument Sans variável servida localmente; licença SIL OFL em `public/licenses/Instrument-Sans-OFL.txt` e em `dist/licenses/`.
- Three.js sob MIT, licença em `public/licenses/THREE-MIT.txt` e `dist/licenses/`.
- Não foram geradas marcas, fotografias, vídeos sintéticos ou resultados comerciais.

## Preservação

`docs/ORIGINAL_SHA256.json` registra os hashes dos arquivos originais da base antes do trabalho, exceto `node_modules/` e `dist/`. A conferência final é registrada em `BUILD_STATUS.md`. Nenhum outro cliente, landing page ou projeto foi alterado.

## Atualização de 26/10/2026

A vista real enviada em `IMG_7355.MOV` não foi incorporada, por decisão do usuário. Não há imagem, vídeo, áudio ou dependência desse arquivo no build. Vegetação, sombras de contato, tapetes e iluminação são gerados localmente em Three.js; `RectAreaLightUniformsLib` é addon da dependência já instalada. Nenhuma nova biblioteca de runtime foi adicionada.

## Presenças — V0.1.2

Cinco figuras articuladas geradas localmente com geometrias Capsule/Sphere do Three.js e cores neutras. Sem modelos, personagens ou texturas externas. Os nomes e funções correspondem aos agentes propostos já documentados. Os movimentos são coreografados em `agents.js`, com três malhas instanciadas para todos os personagens e suas sombras de contato.

## Integração Claude — V0.1.3

UI e ponte HTTP próprias, sem nova biblioteca. Nenhum catálogo MERUS incluído. Credenciais não fazem parte dos assets ou do pacote. A API Anthropic é um serviço opcional online e pago após conexão pelo usuário.
