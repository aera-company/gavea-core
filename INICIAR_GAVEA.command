#!/bin/zsh
cd -- "${0:A:h}"
if ! command -v python3 >/dev/null 2>&1; then
  print 'Python 3 não encontrado. Instale Python 3 ou use npm run preview (requer dependências instaladas).'
  read '?Pressione Enter para fechar.'
  exit 1
fi
python3 scripts/serve_demo.py
read '?Pressione Enter para fechar.'
