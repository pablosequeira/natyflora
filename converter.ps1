Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   CONVERSOR KIT TIRA MANCHAS NATYFLORA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/3] Verificando se o Node.js está instalado..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ ERRO: Node.js não encontrado!" -ForegroundColor Red
    Write-Host "Por favor, instale o Node.js de: https://nodejs.org/" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "[2/3] Instalando dependências..." -ForegroundColor Yellow
try {
    npm install puppeteer --silent
    Write-Host "✅ Dependências instaladas com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao instalar dependências!" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "[3/3] Convertendo para JPEG..." -ForegroundColor Yellow
try {
    node convert-kit-to-jpeg.js
    Write-Host "✅ Conversão concluída com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro durante a conversão!" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   CONVERSÃO CONCLUÍDA!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📁 A imagem foi salva como: kit-tira-manchas-product.jpg" -ForegroundColor Green
Write-Host "📏 Dimensões: 800x600 pixels" -ForegroundColor Green
Write-Host "🎨 Qualidade: 95%" -ForegroundColor Green
Write-Host ""

Read-Host "Pressione Enter para sair"




