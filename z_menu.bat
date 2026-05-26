@echo off
cd /d "%~dp0"
:menu
cls
echo ==========================================
echo OrbitLink - Menu rapido
echo ==========================================
echo [1] Instalar dependencias
echo [2] Rodar projeto
echo [3] Gerar build
echo [4] Opcoes Cloudflare
echo [5] Abrir VS Code
echo [0] Sair
echo.
set /p opcao=Escolha: 
if "%opcao%"=="1" call z_npm_install.bat
if "%opcao%"=="2" call z_run_dev.bat
if "%opcao%"=="3" npm run build && pause
if "%opcao%"=="4" call bats\Cloudflare\Opcoes_Cloudflare.bat
if "%opcao%"=="5" call z_bat_vscode.bat
if "%opcao%"=="0" exit /b
goto menu
