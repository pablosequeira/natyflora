# Como Converter a Imagem do Produto para JPEG

## Método 1: Screenshot Manual (Mais Fácil)

1. **Abra o arquivo `kit-tira-manchas-product.html` no navegador**
2. **Ajuste o zoom para 100%** (Ctrl + 0)
3. **Faça um screenshot da área da imagem:**
   - **Windows**: Use a ferramenta "Captura de Tela" ou pressione `Windows + Shift + S`
   - **Mac**: Use `Cmd + Shift + 4` e selecione a área
4. **Salve como JPEG** com alta qualidade

## Método 2: Usando Ferramentas Online

### Opção A: HTML to Image Converter
1. Acesse: https://htmlcsstoimage.com/
2. Cole o código HTML do arquivo `kit-tira-manchas-product.html`
3. Configure as dimensões: 800x600px
4. Baixe como JPEG

### Opção B: Screenshot API
1. Acesse: https://htmlcsstoimage.com/demo
2. Cole o código HTML
3. Configure: Width: 800, Height: 600
4. Baixe o resultado

## Método 3: Conversão Automática (RECOMENDADO)

### Opção A: Script Automático (Windows)
1. **Execute o arquivo `converter.bat`** (duplo clique)
2. O script irá:
   - Verificar se o Node.js está instalado
   - Instalar as dependências automaticamente
   - Converter o HTML para JPEG
   - Salvar como `kit-tira-manchas-product.jpg`

### Opção B: PowerShell (Windows)
1. **Execute o arquivo `converter.ps1`** no PowerShell
2. Siga as instruções na tela

### Opção C: Manual (Qualquer Sistema)
```bash
# 1. Instalar dependências
npm install puppeteer

# 2. Executar conversão
node convert-kit-to-jpeg.js
```

### Opção D: Código Personalizado
```javascript
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const html = fs.readFileSync('kit-tira-manchas-product.html', 'utf8');
  await page.setContent(html);
  
  await page.setViewport({ width: 800, height: 600 });
  
  const screenshot = await page.screenshot({
    type: 'jpeg',
    quality: 95,
    fullPage: false
  });
  
  fs.writeFileSync('kit-tira-manchas-product.jpg', screenshot);
  
  await browser.close();
})();
```

## Especificações da Imagem Final

- **Dimensões**: 800x600 pixels
- **Formato**: JPEG
- **Qualidade**: Alta (95%+)
- **Fundo**: Branco com gradiente sutil
- **Conteúdo**: 
  - Título do produto
  - Visualização dos 3 produtos do kit
  - Informações detalhadas
  - Benefícios destacados

## Dicas para Melhor Qualidade

1. **Use zoom 100%** para captura nítida
2. **Capture em tela cheia** para evitar bordas
3. **Salve com qualidade máxima** (95-100%)
4. **Verifique a resolução** antes de usar em anúncios

## Uso da Imagem

Esta imagem JPEG pode ser usada para:
- ✅ Anúncios no Facebook/Instagram
- ✅ Catálogo de produtos
- ✅ Site de e-commerce
- ✅ Material promocional
- ✅ Redes sociais


