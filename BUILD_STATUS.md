# BUILD STATUS — GAVEA BUILD 2030 V0.1.3

Base preparada em 25/10/2026; refinamento validado em 26/10/2026 para a reunião do mesmo dia. Projeto independente em `STUDIO AERA/GAVEA OFFICE/`. Execução local; nenhuma publicação externa realizada.

## Presenças animadas — V0.1.2

Cinco figuras articuladas representam MAYA, NOA, NINA, LEO e ARI. Há movimento discreto de cabeça e postura, gestos ao selecionar núcleos e percursos curtos durante o tour. O botão Agentes pausa os movimentos; a pausa do percurso também congela as figuras. Com movimento reduzido, ficam imóveis. O encerramento mantém movimento ambiente, que pode ser pausado pelo botão Agentes.

A arquitetura continua estática e os deslocamentos são predefinidos, dentro de cada pavimento. As figuras não são agentes autônomos nem funcionários reais. Testes específicos: `docs/AGENT_MOTION_RESULTS.json` (Chromium) e `docs/AGENT_MOTION_WEBKIT_RESULTS.json` (WebKit), com oito grupos de verificações aprovados em cada motor. Fontes anteriores preservadas em `backups/2026-10-26-before-agent-motion.zip`.

## Refinamento de 26/10

Iluminação de área no teto, reforço suave do núcleo selecionado, contorno de piso, sombras de contato, tapetes, madeira com menos aliasing, vegetação mais leve e câmeras reajustadas. O encerramento usa duas linhas em desktop. Detalhes em `docs/POLISH_2026-10-26.md`.

A vista real enviada em vídeo não foi incorporada, conforme a decisão do usuário. O pacote anterior V0.1 permanece preservado.

## Implementado

- Cena tridimensional real em Three.js, adaptada incrementalmente da base AERA; dois pavimentos, vidro, estrutura metálica, concreto, madeira, caixilhos, mobiliário, escada helicoidal, paisagismo e terraço.
- Materiais físicos no vidro, ambiente de reflexão local via PMREM, luz exterior fria/interior quente, sombras e reflexão geométrica no espelho d’água.
- Câmera em três quartos, órbita limitada, zoom suave por scroll e botões, foco por núcleo e retorno à visão geral. Transições interrompíveis por gesto.
- Cinco núcleos propostos com responsabilidades, aplicação possível, perfil de agente e navegação sequencial.
- Identidade com arquivos GAVEA e AERA fornecidos; Instrument Sans local.
- EXPERIENCE THE FUTURE / Presentation mode: abertura, cinco fases e encerramento, aproximadamente 65 segundos. Pausa, avanço, retorno e saída. Pausa ao orbitar ou ocultar a aba.
- Fluxo ARI → MAYA → NOA → NINA → LEO → ARI e conexões espaciais progressivas.
- Exploração livre e hotspots de seleção real.
- Atalhos 1–5, Esc, P, setas, Espaço, ⌘K/Ctrl+K e parser textual em português.
- Tela cheia no navegador quando suportada; qualidade HQ/LQ.
- Layout responsivo e foco de teclado visível; redução de movimento troca câmeras diretamente e inicia percurso pausado.
- Contingência identificada por imagem em falha, perda de WebGL, demora de carga ou `?fallback=1`, mantendo painéis e narrativa.
- Build estático incluído, servidor Python sem pacotes externos e iniciador macOS `INICIAR_GAVEA.command`.
- README, roteiro, próxima fase, inventário e documentação técnica.

## Real, proposto e simulado

| Categoria | Estado |
| --- | --- |
| Arquitetura 3D, órbita, materiais, câmera, interface e comandos | Reais e executados no navegador |
| Núcleos e estrutura de operação GAVEA | Propostos; não são departamentos existentes confirmados |
| MAYA, NOA, NINA, LEO e ARI | Nomes/perfis de agentes digitais propostos |
| Aplicações, entregas e passagem do desafio | Conteúdo predefinido, identificado como DEMO CONCEITUAL |
| Pedido ao vivo com Claude | Integração implementada; aguardando chave e verificação real |
| CRM, automação externa, dados GAVEA e resultados comerciais | Não conectados / não produzidos |
| Reconhecimento de voz | Não implementado; parser recebe texto |
| Pavilhão da referência | Inspiração visual e fallback; não usado para fingir navegação 3D |

## Validação arquitetônica anterior — V0.1.2

Evidência principal: `docs/TEST_RESULTS.json` (15 grupos de verificações aprovados em 26/10/2026). O percurso automático tem registro independente em `docs/RECORDING_RESULTS.json`.

- Build Vite concluído com sucesso.
- Chromium em macOS com GPU Apple M1 via ANGLE Metal: WebGL 2.0 real.
- Carregamento, abertura 16:9 e cena presente.
- Cinco núcleos: câmera, painel, aplicação, agente e estado de seleção consistentes.
- Clique espacial em hotspot e retorno à visão geral.
- Arraste orbital, scroll e botões de zoom.
- Qualidade alta/leve.
- Comando reconhecido, comando inválido e fechamento da caixa por teclado.
- 1–5, Esc, P, ⌘K e preferências de movimento reduzido.
- Percurso por todas as fases, conexões, pausa, avanço, volta, saída e encerramento.
- Larguras 1440, 1024, 768, 390 e 375 px, sem overflow horizontal; painéis e núcleos acessíveis.
- Perda do contexto WebGL provocada com `WEBGL_lose_context`, seguida de contingência e navegação por painéis.
- Contingência forçada sem criar canvas 3D.
- Zero requisições externas, zero erros de console e zero exceções JavaScript na execução normal auditada.
- Percurso automático completo executado em tempo real e gravado em WebM; o encerramento permanece estável.

Evidência complementar: `docs/COMPATIBILITY_RESULTS.json`.

- WebKit: cena WebGL real, foco em tecnologia, comando textual, percurso manual com redução de movimento e zero exceções JS.
- Falha provocada no carregamento do módulo 3D: fallback navegável confirmado.
- Servidor Python: inicia, encerra e reinicia, respondendo HTTP 200 com o build correto.
- Parser: sete comandos com acentos e comando inválido.
- Recarregamento restaura a cena após a falha, incluindo link direto para o núcleo.
- Composição final sem sobreposição dos CTAs com a navegação em 1600 × 900, 1440 × 900, 1024 × 768 e 390 × 844.
- Tela cheia entra e sai no Chromium.
- Hashes de todos os arquivos originais auditados idênticos ao estado anterior; nenhum original alterado.

## Desempenho medido

Chromium, Apple M1, 1600 × 900, DPR 1, qualidade alta, 900 amostras durante navegação real:

| Medida | Resultado |
| --- | --- |
| FPS médio amostrado | 58,3 |
| P95 de intervalo de quadro | 17,7 ms |
| Tempo médio de submissão WebGL | 1,89 ms |
| Draw calls | 72 |
| Triângulos | 108.322 |

Em uma verificação separada com viewport 1440 × 900 e escala de tela 2× (Retina), o renderer manteve qualidade alta e DPR 1,25, com média amostrada de 41,1 FPS. Evidência: `docs/RETINA_RESULTS.json`. A interface HTML continua na escala nativa da tela. O teste foi repetido após o ajuste do limite de DPR.

São medições locais de sessões específicas, não promessa para outros equipamentos. Com presenças animadas, a atualização é limitada a até 24 quadros por segundo quando a câmera está parada. Com os agentes pausados ou movimento reduzido, a cena desenha sob demanda. DPR é limitado a 1,25; modo leve usa no máximo 1 e remove reflexão/sombras. Build estático: aproximadamente 3,6 MB, incluindo a referência PNG de 2,73 MB.

O build emite aviso de chunk Three.js de 800 kB (aproximadamente 243 kB gzip, incluindo tabelas de iluminação de área). Não é erro de compilação; a cena é carregada como módulo separado e todas as dependências são locais.

## Evidências visuais

- `docs/01-overview-1600x900.png`
- `docs/02-brand-1600x900.png`
- `docs/02-technology-1600x900.png`
- `docs/04-closing-1600x900.png`
- `docs/05-laptop-1440x900.png`
- `docs/05-mobile-overview-390x844.png`
- `docs/05-mobile-focus-390x844.png`
- `docs/06-fallback-1600x900.png`
- `docs/08-webkit-1440x900.png`
- `docs/GAVEA-BUILD-2030-demo.webm`: gravação real de navegador, sem áudio.
- `docs/GAVEA-BUILD-2030-demo.mp4`: cópia H.264 do mesmo registro, para reprodução local em players comuns.
- `docs/03-guided-marketing-1600x900.png`: fase guiada capturada no build final.
- `docs/RECORDING_RESULTS.json`: percurso completo após os ajustes visuais, sem exceções JS; captura com DPR 1.
- `docs/RETINA_RESULTS.json`: verificação adicional após o ajuste final do limite de DPR.
- `docs/09-retina-direction-1440x900.png`: núcleo Direção em tela Retina.
- `docs/AGENT_MOTION_RESULTS.json`: movimentos, pausa, teclado, apoio dos pés, retorno e movimento reduzido.
- `docs/10-agents-brand.png` e `docs/11-agents-walking.png`: figuras articuladas no ambiente.
- `docs/GAVEA-agents-motion.webm`: registro dos testes de movimento.
- `docs/GAVEA-agents-motion.mp4`: cópia H.264 do mesmo registro.
- `docs/AGENT_MOTION_WEBKIT_RESULTS.json`: teste dos mesmos comportamentos no WebKit.
- `docs/12-mobile-agent-controls.png`: controles de movimento e exploração em celular.

## Limitações

- Modelagem procedural estilizada, abaixo do fotorrealismo da referência. Sem GLBs arquitetônicos licenciados fornecidos.
- Safari nativo não foi automatizado; o teste WebKit valida o motor, não certifica o app Safari. Chrome nativo instalado e Safari da reunião não substituem o Chromium/WebKit de teste.
- Equipamento e monitor efetivamente usados na reunião ainda precisam de um ensaio local. Medições foram feitas neste Mac.
- Não há voz nativa, CRM ou acesso automático a dados comerciais. IA depende de chave Claude e conexão de internet; a verificação real ainda está pendente.
- Assets de marca fornecidos foram preservados. O azul é acento de interface proposto, sem manual corporativo disponível para confirmar o valor oficial.
- A contingência é explicitamente uma imagem, com narrativa navegável; não oferece órbita 3D.
- A instalação inicial por `npm ci` precisa do registro npm. O build entregue roda com Python 3, sem reinstalação ou internet.

## Executar

```sh
cd '/Users/tiagolima/Desktop/STUDIO AERA/GAVEA OFFICE'
python3 scripts/serve_demo.py
```

URL: `http://127.0.0.1:8086/`. Alternativa: duplo clique em `INICIAR_GAVEA.command`. Mais instruções em `README.md`.

## Pedido ao vivo — V0.1.3

Painel modal acessível com conexão Claude, campo de contexto opcional, conversa com cinco trocas recentes, envio, erros recuperáveis, Nova conversa e cópia da última resposta. Abrir o painel pausa o tour e fechar retoma se ele estava rodando. Atalhos da cena não interceptam o diálogo. A navegação conceitual permanece separada.

Ponte HTTP local implementada com Python padrão, sem novas dependências. Anthropic Messages API, Sonnet 5.5, versão 2026-10-21. Credencial em memória ou `.env.local` fora de `dist`. Validação de origem/Host, JSON e tamanhos, uma solicitação por vez, timeout, mensagens de falha sanitizadas e texto de resposta sem execução de HTML.

Dez testes HTTP/contrato passaram em 26/10, com transporte externo simulado. A interface foi conferida com fixture local identificada (envio, espera, ajuste com histórico, erro sem perda de pedido, renderização textual segura, limpeza e desconexão), além de verificação da configuração vazia real em desktop e celular. **Nenhuma chamada real à Anthropic foi feita: não há chave configurada. Não afirmar conexão ativa até o teste real passar.**

Ver `docs/LIVE_AI_SETUP.md` e `docs/LIVE_AI_RESULTS.json`. Gravações anteriores continuam identificadas como registros da V0.1.2.
