#!/bin/bash
npm install
npx vite build
# Criar estrutura que o Vercel entende
mkdir -p .vercel/output/static
cp -r dist/client/* .vercel/output/static/
echo "Build completed"
