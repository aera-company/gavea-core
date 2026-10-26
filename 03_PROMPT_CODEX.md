# PROMPT PARA CODEX — GAVEA BUILD 2030 / DEMO 26.10.2026

Você é **diretor de experiência digital, diretor de arte e engenheiro sênior de Three.js**. Precisamos de uma demonstração muito bem resolvida para apresentar a visão **GAVEA BUILD 2030** à direção da GAVEA em 26/10/2026.

## CONTEXTO E ARQUIVOS
Este pacote já inclui `demo/index.html`, `demo/style.css`, `demo/main.js` e `demo/assets/office-concept.png`. Eles foram adaptados a partir de uma base AERA AI OFFICE com edifício procedural 3D navegável, hotspots, agentes e fluxo explicitamente simulado. **Não recrie do zero** sem motivo técnico.

Leia, nesta ordem:
1. `README_PRIMEIRO.md`
2. `00_DIRECAO_ESTRATEGICA.md`
3. `01_EXPERIENCIA_E_AMBIENTES.md`
4. `02_ROTEIRO_APRESENTACAO_90S.md`
5. `04_COPY_DA_INTERFACE.md`
6. Os arquivos reais de `demo/`.
7. O guia HUMAN Motion e a identidade AERA disponíveis em `AGENTS LAB 2` (registre se estiverem ausentes).

## OBJETIVO
Transformar a versão atual em **um pavilhão 3D interativo premium e estável**, com uma experiência guiada de 90 segundos para mostrar como a AERA propõe conectar marca, marketing, inteligência comercial e novas tecnologias na GAVEA. A experiência é um **vision concept**, não produto GAVEA em produção.

## P0 — NÃO NEGOCIÁVEL
1. **Rodar sem erros e testar de verdade** no navegador disponível. Reportar honestamente o que testou. Não afirmar que tudo funciona sem evidências. A validação visual no ambiente onde este pacote foi elaborado ficou bloqueada; você deve executá-la no seu ambiente.
2. **Garantir demo sem depender de CDN ou internet**: considerar migrar Three.js e addons para dependências locais com Vite. Se não for possível, registrar o bloqueio e preparar fallback em vídeo comprovadamente acessível offline.
3. Corrigir eventual CSS/perspectiva que esconda o edifício. Prédio completo visível em 16:9, com pavimentos legíveis e composição cinematográfica.
4. Refinar materiais, luz e câmera mantendo estrutura em vidro e dois pavimentos. Evitar neon excessivo, hologramas genéricos, excesso de interfaces e personagens caricatos.
5. Nav sem quebra: OVERVIEW, BRAND, COMMUNICATION, TECHNOLOGY, GROWTH, DIRECTION. Botões e hotspots, quando presentes, devem levar aos mesmos estados.
6. Simulação ARI → MAYA → NOA → NINA → LEO com evidência visual e selo `SIMULAÇÃO`. Não incluir chamadas falsas de API ou alegações de IA conectada.
7. Aplicar logo oficial GAVEA e AERA **somente se os arquivos estiverem disponíveis na pasta**. Enquanto não houver, usar uma marca tipográfica claramente conceitual; não recriar logo oficial. Assinatura `A VISION BY AERA` discreta.
8. Criar `REUNIAO_STATUS.md` com comandos exatos, limitações, o que é real e o que é simulação, e instruções de apresentação.
9. Capturar screenshot em 16:9 da abertura e ao menos uma interação, testar em desktop. Gravar fallback curto se os recursos disponíveis permitirem.
10. Não tocar em `aera.company`, landing da GAVEA, projetos GAVEA TRADE ou repositórios adjacentes. Modificar **somente esta pasta isolada**.

## P1 — APÓS P0
- `APRESENTAR` com roteiro automático de câmera por núcleos (35–60s) e botão `REINICIAR`, sem perder navegação manual.
- Melhoria de qualidade visual e abertura de planos que valorizem arquitetura.
- Voz por ditado no input (Wispr Flow como aplicação de desktop, sem alegar SDK embutido).
- Aparência de agentes/ocupantes mais natural com baixo impacto na performance.

## DESIGN LOCKS
Paleta: escuro grafite, metal escuro, vidro, off-white, luz interior quente; azul GAVEA apenas se sustentado pelos assets de marca. Tipografia Instrument Sans ou equivalente disponível. Direção visual AERA/HUMAN, premium e humana. Duas camadas visuais: edifício como protagonista e UI contida. Priorizar leitura imediata para o CEO, sem jargões.

## LINGUAGEM E VERACIDADE
O claim é **ONE GAVEA. ONE DIRECTION.** Os pilares são BUILD, SCALE, LEAD. Não transformar o projeto em pitch sobre funcionários artificiais. É uma ideia de **gestão e execução integradas** apoiada por tecnologia, preservando a agência/parceiros atuais. Nunca expor dados confidenciais. Toda simulação deve permanecer identificada como tal.

## ENTREGAS
- Código que rode localmente, preferencialmente offline.
- Screenshot hero de 16:9 e screenshot do foco em um núcleo.
- Gravação de 60–90s, se suportada.
- `REUNIAO_STATUS.md` com checklist técnico concluído/não concluído e instruções.
- Relação dos arquivos alterados, erros existentes e próximos passos.

**Sequência de trabalho:** primeiro inspecione e execute; corrija P0; teste; faça preview; só então ataque P1. Não gaste todo o esforço reescrevendo a base. Faça engenharia incremental e entregue algo demonstrável, mesmo que o refinamento 3D fique parcial.
