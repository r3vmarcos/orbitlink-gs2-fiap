@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"
set "HOST=localhost"
set "PORTA=5191"
if exist "config\servidor_dev.env" (
  for /f "usebackq tokens=1,2 delims==" %%A in ("config\servidor_dev.env") do (
    if /i "%%A"=="HOST" set "HOST=%%B"
    if /i "%%A"=="PORTA" set "PORTA=%%B"
  )
)
for /f "usebackq delims=" %%I in (`powershell -NoProfile -Command "(Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.PrefixOrigin -ne 'WellKnown' } | Select-Object -First 1 -ExpandProperty IPAddress)"`) do set "IP_REDE=%%I"
echo Rodando OrbitLink local em http://localhost:!PORTA!
if defined IP_REDE echo Caminho da rede: http://!IP_REDE!:!PORTA!
npx vite --host !HOST! --port !PORTA! --strictPort --open
pause
