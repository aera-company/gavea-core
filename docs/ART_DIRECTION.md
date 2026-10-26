# Direção de arte e implementação

## Composição

A decisão central é tratar a cena como um pavilhão de apresentação, com um campo editorial silencioso à esquerda e arquitetura na maior área da tela. A referência dita dois pavimentos, estrutura metálica horizontal, fachadas transparentes, interiores quentes, vegetação e continuidade espacial. A composição foi validada em capturas antes da gravação final.

A busca da skill de UI/UX retornou minimalismo editorial para arquitetura, mas também fontes decorativas e acento dourado. Esses dois pontos foram descartados por não atenderem ao briefing: usa-se Instrument Sans local e azul apenas como navegação. Não se adotou grade de portfólio ou padrão de dashboard.

```text
GAVEA GROUP | BUILD 2030                  DEMO CONCEITUAL | APRESENTAR
────────────────────────────────────────────────────────────────────
BUILD                  PAVILHÃO TRIDIMENSIONAL
2030.                  vidro / metal / madeira / luz quente

ideia + iniciar         cinco pontos espaciais
────────────────────────────────────────────────────────────────────
01 BRAND | 02 COMMUNICATION | 03 GROWTH | 04 AI | 05 DIRECTION
AERA / WE MAKE THINGS MOVE.                       COMANDOS
```

## Tokens

- Grafite: `#0C141B`, fundo e enquadramento.
- Superfície: `#101C25`, painéis e comandos.
- Branco: `#F2F3EF`, títulos e ações.
- Cinza: `#A2ADB6`, apoio e orientação.
- Azul: `#397FD9`, acento de interface proposto.
- Azul claro: `#A0C9FF`, seleção e foco.
- Madeira quente: `#D5B78E`, aplicações conceituais e pequenos detalhes.
- Fonte: Instrument Sans, variável, local, pesos 400–600.

## Movimento

Frequência ocasional, com propósito de explicação e continuidade espacial. A câmera usa interpolação vetorial interrompível em 1.800 ms; é o movimento narrativo principal. Redução de movimento ou atalho numérico elimina o voo. Painéis usam opacidade em 240 ms, `cubic-bezier(.23,1,.32,1)`. Botões têm feedback de cor em 160 ms. Sem flutuação ociosa, glitch, HUD ou movimento decorativo contínuo.

A simulação mostra uma linha por passagem do desafio entre áreas. Com agentes pausados ou movimento reduzido, o renderer desenha sob demanda; com presença ativa, atualiza até 24 quadros por segundo fora dos movimentos de câmera. Limita DPR a 1,25 e oferece modo leve com DPR 1 e sem reflexão/sombras. O tour pausa se a pessoa orbitar ou se a aba ficar em segundo plano.

## Limites de qualidade

O modelo procedural foi mantido para preservar estabilidade e o investimento existente. O resultado é uma visualização arquitetônica estilizada, com móveis, elementos de fachada e iluminação real, mas abaixo do fotorrealismo da referência. GLBs de mobiliário, paisagismo e arquitetura constituem uma evolução, não uma condição para navegar nesta V0.1.

## Polimento de 26/10

Quatro emissores de área aquecem os ambientes; a seleção reforça a luz e revela um contorno fino de piso em 550 ms. Redução de movimento e atalhos numéricos aplicam o estado diretamente. As folhas agora são superfícies curvas e a madeira usa filtragem anisotrópica. As câmeras foram abertas para preservar contexto espacial e reduzir cortes em salas. O encerramento usa duas linhas em desktop. A vista real enviada pelo usuário não integra esta versão.

## Presença humana — V0.1.2

Movimento solicitado para uma apresentação ocasional, com propósito de presença e explicação do fluxo. Cinco silhuetas adultas articuladas usam materiais discretos. Cabeça e respiração têm amplitudes pequenas e fases desencontradas. Gestos de trabalho respondem ao núcleo ativo. O deslocamento de cada fase usa `cubic-bezier(.77,0,.175,1)` e leva aproximadamente 1,6–3,4 segundos, dentro do próprio ambiente. Apoio dos pés é corrigido no piso. Pausa, aba oculta e preferência de movimento reduzido são tratados desde a implementação.
