const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('🚀 Criando criativo estilo Neumax para Facebook Ads...');
  
  try {
    // Inicializar o navegador
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Configurar viewport para Facebook Ads (1200x628)
    await page.setViewport({ 
      width: 1200, 
      height: 628,
      deviceScaleFactor: 2 // Para melhor qualidade
    });
    
    // Ler o arquivo HTML
    const htmlPath = path.join(__dirname, 'facebook-ad-kit-manchas-v2.html');
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    // Carregar o HTML na página
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Aguardar para garantir que todos os elementos estejam carregados
    await page.waitForTimeout(3000);
    
    // Capturar screenshot como JPEG
    const screenshot = await page.screenshot({
      type: 'jpeg',
      quality: 95,
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 1200,
        height: 628
      }
    });
    
    // Salvar a imagem
    const outputPath = path.join(__dirname, 'facebook-ad-kit-manchas-v2.jpg');
    fs.writeFileSync(outputPath, screenshot);
    
    console.log('✅ Criativo estilo Neumax criado com sucesso!');
    console.log(`📁 Imagem salva em: ${outputPath}`);
    console.log(`📏 Dimensões: 1200x628 pixels (Facebook Ads)`);
    console.log(`🎨 Qualidade: 95%`);
    
    // Verificar se o arquivo foi criado
    const stats = fs.statSync(outputPath);
    console.log(`📊 Tamanho do arquivo: ${(stats.size / 1024).toFixed(2)} KB`);
    
    console.log('\n🎯 O criativo está pronto para:');
    console.log('   ✅ Facebook Ads (estilo Neumax)');
    console.log('   ✅ Instagram Ads');
    console.log('   ✅ Stories');
    console.log('   ✅ Feed posts');
    
    console.log('\n💡 Características do criativo:');
    console.log('   🔥 Fundo escuro profissional');
    console.log('   📦 Produtos em destaque');
    console.log('   💬 Depoimento real');
    console.log('   🛡️ Selos de confiança');
    console.log('   ⚡ CTA forte e claro');
    
    await browser.close();
    
  } catch (error) {
    console.error('❌ Erro durante a criação do criativo:', error.message);
    process.exit(1);
  }
})();




