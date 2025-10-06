const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('🚀 Iniciando conversão do Kit Tira Manchas para JPEG...');
  
  try {
    // Inicializar o navegador
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Configurar viewport para 800x600
    await page.setViewport({ 
      width: 800, 
      height: 600,
      deviceScaleFactor: 2 // Para melhor qualidade
    });
    
    // Ler o arquivo HTML
    const htmlPath = path.join(__dirname, 'kit-tira-manchas-product.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    // Carregar o HTML na página
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Aguardar um pouco para garantir que todos os elementos estejam carregados
    await page.waitForTimeout(2000);
    
    // Capturar screenshot como JPEG
    const screenshot = await page.screenshot({
      type: 'jpeg',
      quality: 95,
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 800,
        height: 600
      }
    });
    
    // Salvar a imagem
    const outputPath = path.join(__dirname, 'kit-tira-manchas-product.jpg');
    fs.writeFileSync(outputPath, screenshot);
    
    console.log('✅ Conversão concluída com sucesso!');
    console.log(`📁 Imagem salva em: ${outputPath}`);
    console.log(`📏 Dimensões: 800x600 pixels`);
    console.log(`🎨 Qualidade: 95%`);
    
    // Verificar se o arquivo foi criado
    const stats = fs.statSync(outputPath);
    console.log(`📊 Tamanho do arquivo: ${(stats.size / 1024).toFixed(2)} KB`);
    
    await browser.close();
    
  } catch (error) {
    console.error('❌ Erro durante a conversão:', error.message);
    process.exit(1);
  }
})();

