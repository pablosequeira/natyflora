# Deploy para Netlify

## Arquivos incluídos:
- index.html
- styles.css
- script.js
- images/ (pasta completa)
- netlify.toml (configuração)

## Como fazer o deploy:

1. Acesse [netlify.com](https://netlify.com)
2. Faça login ou crie uma conta
3. Clique em "Add new site" > "Deploy manually"
4. Arraste a pasta `netlify-deploy` para a área de deploy
5. Ou faça upload do arquivo ZIP da pasta

## Alternativa - Deploy via ZIP:
1. Comprima a pasta `netlify-deploy` em um arquivo ZIP
2. Faça upload do ZIP no Netlify

## URL do site:
Após o deploy, o Netlify fornecerá uma URL como:
https://nomedo-site.netlify.app

## Configurações:
- Redirecionamento configurado para SPA
- Node.js 18 configurado
- Build automático desabilitado (site estático)
