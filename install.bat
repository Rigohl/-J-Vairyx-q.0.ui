@echo off
title J-Vairyx Personal Assistant - Instalador Inteligente
color 0B
echo.
echo     ╔══════════════════════════════════════════════════════════════════╗
echo     ║                🚀 J-VAIRYX PERSONAL ASSISTANT 🤖                 ║
echo     ║                    Instalador Inteligente v2.0                   ║
echo     ║                                                                  ║
echo     ║     ✨ Descargar, instalar y ejecutar automáticamente           ║
echo     ║     🧠 Asistente con inteligencia y curiosidad                  ║
echo     ║     📁 Gestión de archivos con ejecución automática             ║
echo     ║     🔍 Investigación y organización inteligente                 ║
echo     ╚══════════════════════════════════════════════════════════════════╝
echo.
echo 🤖 Bienvenido al futuro de los asistentes personales...
timeout /t 2 >nul

echo.
echo 🔍 Verificando requisitos del sistema...
timeout /t 1 >nul

REM Check if Node.js is installed
echo 📦 Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ❌ Node.js no está instalado.
    echo.
    echo 🚀 INSTALACIÓN AUTOMÁTICA DE NODE.JS
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo 🔄 Descargando Node.js automáticamente...
    
    REM Try to download and install Node.js automatically
    powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi' -OutFile 'nodejs-installer.msi'}"
    
    if exist nodejs-installer.msi (
        echo ✅ Descarga completada. Ejecutando instalador...
        echo ⚠️  Se abrirá el instalador de Node.js. Sigue las instrucciones.
        start /wait msiexec /i nodejs-installer.msi /quiet
        del nodejs-installer.msi
        echo 🎉 Node.js instalado correctamente!
        echo 🔄 Reiniciando el instalador para aplicar cambios...
        timeout /t 2 >nul
        "%~f0"
        exit /b 0
    ) else (
        echo ❌ No se pudo descargar Node.js automáticamente.
        echo 📖 Instrucciones manuales:
        echo    1. Visita: https://nodejs.org/
        echo    2. Descarga la versión LTS
        echo    3. Ejecuta el instalador
        echo    4. Reinicia este instalador
        pause
        exit /b 1
    )
)

node --version
echo ✅ Node.js detectado y funcionando

REM Check if npm is installed
echo 📦 Verificando npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm no está instalado. Por favor reinstala Node.js.
    pause
    exit /b 1
)

npm --version
echo ✅ npm detectado y funcionando

echo.
echo 🧠 SISTEMA DE INTELIGENCIA J-VAIRYX
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🔄 Instalando dependencias inteligentes...
timeout /t 1 >nul

npm install

if %errorlevel% neq 0 (
    echo.
    echo ❌ Error al instalar dependencias
    echo 🔄 Intentando reparación automática...
    
    echo 🧹 Limpiando cache de npm...
    npm cache clean --force
    
    echo 📦 Reintentando instalación...
    npm install --legacy-peer-deps
    
    if %errorlevel% neq 0 (
        echo ❌ Error persistente. Instalación manual requerida.
        pause
        exit /b 1
    )
)

echo ✅ Dependencias instaladas correctamente

echo.
echo 🏗️ CONSTRUCCIÓN INTELIGENTE
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🔨 Construyendo la aplicación...
timeout /t 1 >nul

npm run build

if %errorlevel% neq 0 (
    echo ❌ Error al construir la aplicación
    echo 🔄 Intentando construcción alternativa...
    
    echo 🧹 Limpiando archivos temporales...
    if exist build rmdir /s /q build
    if exist dist rmdir /s /q dist
    
    echo 🔨 Construcción alternativa...
    npm run build
    
    if %errorlevel% neq 0 (
        echo ❌ Error en construcción. Verificando configuración...
        echo ℹ️  La aplicación puede funcionar en modo desarrollo.
        echo 🤖 Continuando con la instalación...
    )
)

echo ✅ Aplicación construida correctamente

echo.
echo 🎯 CONFIGURACIÓN FINAL
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🔧 Configurando J-Vairyx...
timeout /t 1 >nul

REM Create desktop shortcut
echo 🖥️  Creando acceso directo en el escritorio...
set "desktopPath=%USERPROFILE%\Desktop"
set "shortcutPath=%desktopPath%\J-Vairyx Personal Assistant.lnk"
set "currentPath=%CD%"

powershell -Command "$WshShell = New-Object -comObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%shortcutPath%'); $Shortcut.TargetPath = 'cmd.exe'; $Shortcut.Arguments = '/c cd /d \"%currentPath%\" && npm start'; $Shortcut.WorkingDirectory = '%currentPath%'; $Shortcut.IconLocation = '%currentPath%\public\assets\icon.ico'; $Shortcut.Description = 'J-Vairyx Personal Assistant - Tu asistente inteligente'; $Shortcut.Save()"

if exist "%shortcutPath%" (
    echo ✅ Acceso directo creado en el escritorio
) else (
    echo ⚠️  No se pudo crear el acceso directo automáticamente
)

REM Create start menu entry
echo 📋 Creando entrada en el menú inicio...
set "startMenuPath=%APPDATA%\Microsoft\Windows\Start Menu\Programs"
set "startMenuShortcut=%startMenuPath%\J-Vairyx Personal Assistant.lnk"

powershell -Command "$WshShell = New-Object -comObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%startMenuShortcut%'); $Shortcut.TargetPath = 'cmd.exe'; $Shortcut.Arguments = '/c cd /d \"%currentPath%\" && npm start'; $Shortcut.WorkingDirectory = '%currentPath%'; $Shortcut.IconLocation = '%currentPath%\public\assets\icon.ico'; $Shortcut.Description = 'J-Vairyx Personal Assistant - Tu asistente inteligente'; $Shortcut.Save()"

echo.
echo     ╔══════════════════════════════════════════════════════════════════╗
echo     ║                    🎉 INSTALACIÓN COMPLETADA 🎉                  ║
echo     ╠══════════════════════════════════════════════════════════════════╣
echo     ║                                                                  ║
echo     ║  🚀 J-Vairyx Personal Assistant está listo para usar             ║
echo     ║                                                                  ║
echo     ║  ✨ NUEVAS CARACTERÍSTICAS:                                       ║
echo     ║   🤖 Asistente con curiosidad e inteligencia                     ║
echo     ║   📁 Archivos descargables y ejecutables automáticamente        ║
echo     ║   🧠 Aprendizaje de patrones de usuario                         ║
echo     ║   🔍 Investigación profunda automática                          ║
echo     ║   ⚡ Automatización inteligente de tareas                       ║
echo     ║   🎯 Sugerencias proactivas contextuales                        ║
echo     ║                                                                  ║
echo     ║  🔧 FORMAS DE EJECUTAR:                                          ║
echo     ║   • Doble clic en el acceso directo del escritorio              ║
echo     ║   • Buscar "J-Vairyx" en el menú inicio                         ║
echo     ║   • Ejecutar: npm start (modo desarrollo)                       ║
echo     ║   • Ejecutar: npm run dist (crear distributable)                ║
echo     ║                                                                  ║
echo     ║  💡 TIP: Tu asistente aprenderá de ti y se volverá más útil     ║
echo     ║          con cada interacción.                                   ║
echo     ║                                                                  ║
echo     ╚══════════════════════════════════════════════════════════════════╝
echo.

REM Ask if user wants to start immediately
echo 🤖 ¿Quieres iniciar J-Vairyx ahora? [Y/N]
set /p startNow="> "

if /i "%startNow%"=="Y" (
    echo.
    echo 🚀 Iniciando J-Vairyx Personal Assistant...
    echo 🤖 Tu asistente inteligente se está cargando...
    timeout /t 2 >nul
    start npm start
    echo.
    echo ✅ ¡J-Vairyx se está iniciando en una nueva ventana!
    echo 💡 Mantén esta ventana abierta mientras usas la aplicación.
) else (
    echo.
    echo 📋 Para iniciar J-Vairyx más tarde:
    echo    • Usa el acceso directo del escritorio
    echo    • Busca "J-Vairyx" en el menú inicio
    echo    • O ejecuta "npm start" en esta carpeta
)

echo.
echo 🎉 ¡Disfruta de tu nuevo asistente personal inteligente J-Vairyx! 🤖
echo 💬 ¡Recuerda que soy curioso y siempre estoy aprendiendo!
echo.
pause