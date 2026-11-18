@echo off
setlocal
cd /d "%~dp0"
set "PATH=%~dp0.tools\node-v26.13.1-win-x64;%PATH%"
if exist "%~dp0.tools\node-v26.13.1-win-x64\node.exe" (
  "%~dp0.tools\node-v26.13.1-win-x64\node.exe" "%~dp0.tools\node-v26.13.1-win-x64\node_modules\npm\bin\npm-cli.js" run dev -- --host 127.0.0.1 %*
  exit /b
)
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nao encontrado. Instale o Node.js LTS para executar a agenda.
  exit /b 1
)
call npm.cmd run dev -- --host 127.0.0.1 %*
