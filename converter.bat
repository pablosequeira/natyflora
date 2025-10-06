@echo off
echo ========================================
echo   CONVERSOR KIT TIRA MANCHAS NATYFLORA
echo ========================================
echo.

echo [1/3] Verificando se o Node.js esta instalado...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    echo Por favor, instale o Node.js de: https://nodejs.org/
    pause
    exit /b 1
)

echo [2/3] Instalando dependencias...
call npm install puppeteer --silent

echo [3/3] Convertendo para JPEG...
call node convert-kit-to-jpeg.js

echo.
echo ========================================
echo   CONVERSAO CONCLUIDA!
echo ========================================
echo.
echo A imagem foi salva como: kit-tira-manchas-product.jpg
echo Dimensoes: 800x600 pixels
echo Qualidade: 95%%
echo.
pause




