@echo off
echo 🚀 Instalador de J-Vairyx Personal Assistant
echo =============================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado. Por favor instala Node.js primero.
    echo    Visita: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm no está instalado. Por favor instala npm primero.
    pause
    exit /b 1
)

echo ✅ Node.js y npm detectados

REM Install dependencies
echo 📦 Instalando dependencias...
npm install

if %errorlevel% neq 0 (
    echo ❌ Error al instalar dependencias
    pause
    exit /b 1
)

echo ✅ Dependencias instaladas correctamente

REM Build the application
echo 🔨 Construyendo la aplicación...
npm run build

if %errorlevel% neq 0 (
    echo ❌ Error al construir la aplicación
    pause
    exit /b 1
)

echo ✅ Aplicación construida correctamente
echo.
echo 🎉 ¡Instalación completada!
echo.
echo Para iniciar J-Vairyx:
echo   npm start              (modo desarrollo)
echo   npm run electron-pack  (crear distributable)
echo.
echo ¡Disfruta de tu asistente personal J-Vairyx! 🤖
pause