@echo off
cd /d "%~dp0\..\.."
:menu
cls
echo ==========================================
echo OrbitLink - Opcoes Cloudflare
echo ==========================================
echo [1] Instalar dependencias
echo [2] Instalar Wrangler
echo [3] Login Cloudflare
echo [4] Gerar build
echo [5] Deploy Pages via Wrangler
echo [0] Voltar
echo.
set /p opcao=Escolha: 
if "%opcao%"=="1" npm install && pause
if "%opcao%"=="2" npm install -D wrangler && pause
if "%opcao%"=="3" npx wrangler login && pause
if "%opcao%"=="4" npm run build && pause
if "%opcao%"=="5" npx wrangler pages deploy dist --project-name orbitlink && pause
if "%opcao%"=="0" exit /b
goto menu
