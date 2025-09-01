#!/bin/bash

echo "🚀 Instalador de J-Vairyx Personal Assistant"
echo "============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js primero."
    echo "   Visita: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instala npm primero."
    exit 1
fi

echo "✅ Node.js y npm detectados"

# Install dependencies
echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo "✅ Dependencias instaladas correctamente"

# Build the application
echo "🔨 Construyendo la aplicación..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error al construir la aplicación"
    exit 1
fi

echo "✅ Aplicación construida correctamente"

echo ""
echo "🎉 ¡Instalación completada!"
echo ""
echo "Para iniciar J-Vairyx:"
echo "  npm start              (modo desarrollo)"
echo "  npm run electron-pack  (crear distributable)"
echo ""
echo "¡Disfruta de tu asistente personal J-Vairyx! 🤖"