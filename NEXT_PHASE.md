# Próxima fase

A V0.1 materializa uma visão de operação. A próxima entrega deve partir de um piloto aprovado com problema, responsável, indicador e prazo definidos.

## 1. Arquitetura e identidade

Substituir gradualmente a geometria procedural por GLBs arquitetônicos licenciados, com LODs, texturas comprimidas e mobiliário de maior qualidade. Usar o grupo `GAVEA_GLTF_EXTENSION` sem mudar o contrato de navegação. Validar o azul e demais aplicações com o manual oficial GAVEA; o acento atual é uma decisão de interface, não uma especificação corporativa confirmada.

## 2. Uma operação real por vez

Começar por um fluxo delimitado: recebimento e organização de briefings, aprovação e acompanhamento de entregas, ou qualificação comercial. Definir integrações autorizadas, origem dos dados, responsáveis humanos, retenção e permissões antes de conectar sistemas. Não transformar o conceito em implantação de departamentos existentes.

## 3. Agentes e sistemas

MAYA, NOA, NINA, LEO e ARI são nomes e perfis conceituais. Para transformá-los em agentes, adicionar uma camada de serviço separada do navegador, com autenticação, gestão segura de credenciais, ferramentas autorizadas, revisão humana de ações externas, logs e avaliação de qualidade. Chaves nunca entram no código cliente. A UI deve diferenciar estados reais: não conectado, aguardando, em execução, concluído e falhou.

Separar respostas reais do conteúdo ilustrativo em `data.js`. Só marcar uma entrega como concluída quando o serviço comprovar sua execução. A simulação deve continuar disponível e permanecer identificada.

## 4. Voz

O parser `parseCommand()` já traduz texto em ações sem depender de Three.js. Uma futura camada de transcrição pode enviar texto ao mesmo parser, com indicação de escuta, consentimento de microfone, tratamento de erros e controle por clique/teclado sempre disponível. Não há reconhecimento de voz embutido na V0.1; ditado externo não equivale a essa integração.

## 5. Evolução da apresentação

Validar o roteiro com a direção, revisar linguagem com os responsáveis GAVEA e testar no computador e monitor efetivamente usados na reunião. Considerar implantação privada apenas após autorização específica de publicação. A apresentação continua local. O painel opcional de IA usa a API paga do Claude, após configuração explícita de chave; não há login da aplicação ou rastreamento.

## Contratos preservados

- Conteúdo e parser: `data.js`.
- Estado, percurso e UI: `app.js`.
- Renderização e câmeras: `office.js` (`focus`, `highlight`, `setFlow`, `zoom`, `toggleQuality`, `diagnostics`).
- Comandos futuros devem acionar as mesmas funções de navegação existentes.
- Figuras animadas são controladas por `agents.js`. Manter a geometria compartilhada, os percursos curtos e a opção de pausa. O renderer desenha sob demanda com os agentes pausados/redução de movimento; a presença ambiente tem atualização limitada a até 24 quadros por segundo.

## Implementado na V0.1.3

Primeira ponte de IA para pedidos textuais com Claude e contexto colado. Ainda falta ativar com uma chave real, avaliar o material aprovado MERUS e conduzir um teste completo com o cliente. Os cinco personagens não foram transformados em agentes autônomos.

## Implementado na V0.1.4

Orquestração de três papéis do Claude com repasses reais e apresentação espacial. Um teste neutro real foi concluído. Ainda é necessário inserir o material técnico aprovado do MERUS, avaliar as entregas e validar o roteiro com o cliente. Não há ferramentas externas nem execução autônoma de CRM ou publicação.
