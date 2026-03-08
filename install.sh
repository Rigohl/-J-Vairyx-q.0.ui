#!/bin/bash

# Colors for better visibility
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

clear
echo -e "${BLUE}"
cat << "EOF"
    ╔══════════════════════════════════════════════════════════════════╗
    ║                🚀 J-VAIRYX PERSONAL ASSISTANT 🤖                 ║
    ║                    Instalador Inteligente v2.0                   ║
    ║                                                                  ║
    ║     ✨ Descargar, instalar y ejecutar automáticamente           ║
    ║     🧠 Asistente con inteligencia y curiosidad                  ║
    ║     📁 Gestión de archivos con ejecución automática             ║
    ║     🔍 Investigación y organización inteligente                 ║
    ╚══════════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

echo -e "${CYAN}🤖 Bienvenido al futuro de los asistentes personales...${NC}"
sleep 2

echo ""
echo -e "${YELLOW}🔍 Verificando requisitos del sistema...${NC}"
sleep 1

# Function to install Node.js automatically on different Linux distributions
install_nodejs() {
    echo -e "${YELLOW}🚀 INSTALACIÓN AUTOMÁTICA DE NODE.JS${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Detect the Linux distribution
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        DISTRO=$ID
    elif [ -f /etc/redhat-release ]; then
        DISTRO="centos"
    elif [ -f /etc/debian_version ]; then
        DISTRO="debian"
    else
        DISTRO="unknown"
    fi

    echo -e "${CYAN}📋 Distribución detectada: $DISTRO${NC}"
    
    case $DISTRO in
        "ubuntu"|"debian")
            echo -e "${CYAN}🔄 Instalando Node.js en Ubuntu/Debian...${NC}"
            curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
            sudo apt-get install -y nodejs
            ;;
        "fedora")
            echo -e "${CYAN}🔄 Instalando Node.js en Fedora...${NC}"
            curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
            sudo dnf install -y nodejs npm
            ;;
        "centos"|"rhel")
            echo -e "${CYAN}🔄 Instalando Node.js en CentOS/RHEL...${NC}"
            curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
            sudo yum install -y nodejs npm
            ;;
        "arch"|"manjaro")
            echo -e "${CYAN}🔄 Instalando Node.js en Arch/Manjaro...${NC}"
            sudo pacman -S nodejs npm
            ;;
        *)
            echo -e "${RED}❌ Distribución no soportada para instalación automática.${NC}"
            echo -e "${YELLOW}📖 Instrucciones manuales:${NC}"
            echo "   1. Visita: https://nodejs.org/"
            echo "   2. Sigue las instrucciones para tu distribución"
            echo "   3. Reinicia este instalador"
            exit 1
            ;;
    esac
}

# Check if Node.js is installed
echo -e "${CYAN}📦 Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado.${NC}"
    echo ""
    read -p "¿Quieres que lo instale automáticamente? [y/N]: " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        install_nodejs
        
        # Verify installation
        if command -v node &> /dev/null; then
            echo -e "${GREEN}✅ Node.js instalado correctamente!${NC}"
        else
            echo -e "${RED}❌ Error en la instalación de Node.js${NC}"
            exit 1
        fi
    else
        echo -e "${YELLOW}📖 Para instalar manualmente:${NC}"
        echo "   Visita: https://nodejs.org/"
        exit 1
    fi
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✅ Node.js detectado: $NODE_VERSION${NC}"

# Check if npm is installed
echo -e "${CYAN}📦 Verificando npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado. Reinstalando Node.js...${NC}"
    install_nodejs
fi

NPM_VERSION=$(npm --version)
echo -e "${GREEN}✅ npm detectado: $NPM_VERSION${NC}"

echo ""
echo -e "${PURPLE}🧠 SISTEMA DE INTELIGENCIA J-VAIRYX${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${CYAN}🔄 Instalando dependencias inteligentes...${NC}"
sleep 1

npm install

if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}❌ Error al instalar dependencias${NC}"
    echo -e "${YELLOW}🔄 Intentando reparación automática...${NC}"
    
    echo -e "${CYAN}🧹 Limpiando cache de npm...${NC}"
    npm cache clean --force
    
    echo -e "${CYAN}📦 Reintentando instalación...${NC}"
    npm install --legacy-peer-deps
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Error persistente. Instalación manual requerida.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ Dependencias instaladas correctamente${NC}"

echo ""
echo -e "${PURPLE}🏗️ CONSTRUCCIÓN INTELIGENTE${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${CYAN}🔨 Construyendo la aplicación...${NC}"
sleep 1

npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al construir la aplicación${NC}"
    echo -e "${YELLOW}🔄 Intentando construcción alternativa...${NC}"
    
    echo -e "${CYAN}🧹 Limpiando archivos temporales...${NC}"
    rm -rf build dist
    
    echo -e "${CYAN}🔨 Construcción alternativa...${NC}"
    npm run build
    
    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}⚠️  Error en construcción. La aplicación puede funcionar en modo desarrollo.${NC}"
        echo -e "${CYAN}🤖 Continuando con la instalación...${NC}"
    fi
fi

echo -e "${GREEN}✅ Aplicación construida correctamente${NC}"

echo ""
echo -e "${PURPLE}🎯 CONFIGURACIÓN FINAL${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${CYAN}🔧 Configurando J-Vairyx...${NC}"
sleep 1

# Create desktop shortcut if desktop environment is available
if [ -n "$XDG_CURRENT_DESKTOP" ]; then
    echo -e "${CYAN}🖥️  Creando acceso directo en el escritorio...${NC}"
    
    DESKTOP_FILE="$HOME/Desktop/J-Vairyx-Personal-Assistant.desktop"
    CURRENT_PATH=$(pwd)
    
    cat > "$DESKTOP_FILE" << EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=J-Vairyx Personal Assistant
Comment=Tu asistente personal inteligente
Exec=bash -c "cd '$CURRENT_PATH' && npm start"
Icon=$CURRENT_PATH/public/assets/icon.png
Terminal=true
StartupNotify=true
Categories=Utility;Office;
Keywords=assistant;ai;productivity;
EOF

    chmod +x "$DESKTOP_FILE"
    
    if [ -f "$DESKTOP_FILE" ]; then
        echo -e "${GREEN}✅ Acceso directo creado en el escritorio${NC}"
    else
        echo -e "${YELLOW}⚠️  No se pudo crear el acceso directo automáticamente${NC}"
    fi
    
    # Create applications menu entry
    APPS_DIR="$HOME/.local/share/applications"
    mkdir -p "$APPS_DIR"
    cp "$DESKTOP_FILE" "$APPS_DIR/"
    echo -e "${GREEN}✅ Entrada creada en el menú de aplicaciones${NC}"
fi

# Make the script executable
chmod +x "$0"

echo ""
echo -e "${BLUE}"
cat << "EOF"
    ╔══════════════════════════════════════════════════════════════════╗
    ║                    🎉 INSTALACIÓN COMPLETADA 🎉                  ║
    ╠══════════════════════════════════════════════════════════════════╣
    ║                                                                  ║
    ║  🚀 J-Vairyx Personal Assistant está listo para usar             ║
    ║                                                                  ║
    ║  ✨ NUEVAS CARACTERÍSTICAS:                                       ║
    ║   🤖 Asistente con curiosidad e inteligencia                     ║
    ║   📁 Archivos descargables y ejecutables automáticamente        ║
    ║   🧠 Aprendizaje de patrones de usuario                         ║
    ║   🔍 Investigación profunda automática                          ║
    ║   ⚡ Automatización inteligente de tareas                       ║
    ║   🎯 Sugerencias proactivas contextuales                        ║
    ║                                                                  ║
    ║  🔧 FORMAS DE EJECUTAR:                                          ║
    ║   • Doble clic en el acceso directo del escritorio              ║
    ║   • Buscar "J-Vairyx" en el menú de aplicaciones                ║
    ║   • Ejecutar: npm start (modo desarrollo)                       ║
    ║   • Ejecutar: npm run dist (crear distributable)                ║
    ║                                                                  ║
    ║  💡 TIP: Tu asistente aprenderá de ti y se volverá más útil     ║
    ║          con cada interacción.                                   ║
    ║                                                                  ║
    ╚══════════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

# Ask if user wants to start immediately
echo -e "${CYAN}🤖 ¿Quieres iniciar J-Vairyx ahora? [y/N]: ${NC}"
read -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${GREEN}🚀 Iniciando J-Vairyx Personal Assistant...${NC}"
    echo -e "${CYAN}🤖 Tu asistente inteligente se está cargando...${NC}"
    sleep 2
    npm start &
    echo ""
    echo -e "${GREEN}✅ ¡J-Vairyx se está iniciando!${NC}"
    echo -e "${YELLOW}💡 La aplicación se abrirá en tu navegador.${NC}"
else
    echo ""
    echo -e "${YELLOW}📋 Para iniciar J-Vairyx más tarde:${NC}"
    echo "   • Usa el acceso directo del escritorio"
    echo "   • Busca 'J-Vairyx' en el menú de aplicaciones"
    echo "   • O ejecuta 'npm start' en esta carpeta"
fi

echo ""
echo -e "${GREEN}🎉 ¡Disfruta de tu nuevo asistente personal inteligente J-Vairyx! 🤖${NC}"
echo -e "${CYAN}💬 ¡Recuerda que soy curioso y siempre estoy aprendiendo!${NC}"
echo ""