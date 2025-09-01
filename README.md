# J-Vairyx-q.0.ui

**Asistente Personal Inteligente para Escritorio**

![Version](https://img.shields.io/badge/version-0.0.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-desktop-lightgrey)

## 🤖 Descripción

J-Vairyx es un asistente personal inteligente desarrollado como aplicación de escritorio multiplataforma. Combina capacidades de IA con una interfaz moderna e intuitiva para ayudarte en tus tareas diarias.

### 🔹 Significado del nombre:
- **J** → de Jarvis, asistente inteligente
- **Vairyx** → nombre real del sistema
- **q** → prefijo obligatorio antes de la versión
- **0.0** → versión actual del bot
- **.ui** → indica que incluye interfaz gráfica y módulos visuales

## ✨ Características

### 🤖 Asistente IA Avanzado
- **Conversación natural personalizada** en español
- **Aprendizaje de comportamiento** del usuario
- **Monitoreo de atención** y detección de distracción
- **Sugerencias proactivas** inteligentes
- **Comandos inteligentes** para operaciones del sistema
- **Respuestas contextuales** adaptadas al perfil del usuario

### 🧠 Inteligencia y Aprendizaje
- **Sistema de aprendizaje** que se adapta a tus patrones de uso
- **Monitoreo de actividad** en tiempo real
- **Análisis de patrones** de comportamiento
- **Sugerencias proactivas** basadas en contexto
- **Detección de distracción** con recordatorios amigables

### 📁 Gestión Avanzada de Archivos
- **Creación inteligente** de archivos y carpetas
- **Múltiples tipos de archivo** (TXT, Markdown, JavaScript, CSS, HTML, JSON, Python)
- **Editor con contenido** integrado
- **Organización automática** por tipos
- **Interfaz simple y avanzada** para diferentes niveles de usuario

### 🌐 Integración Web
- **Navegación web inteligente** integrada
- **Búsquedas automáticas** en Google
- **Investigación profunda** de temas
- **Apertura de URLs** con validación automática

### 📋 Organizador Mejorado
- **Gestión de tareas** con prioridades
- **Estadísticas de productividad** en tiempo real
- **Filtros y búsqueda avanzada**
- **Seguimiento de progreso** visual

### 💾 Drive Personal Inteligente
- **Gestión de archivos** personal
- **Subida y descarga** de documentos
- **Organización inteligente** de contenido
- **Búsqueda avanzada** de archivos
- **Creación directa** desde el asistente

### 🔗 Integración del Sistema
- **Monitoreo del sistema** en tiempo real
- **Información de hardware** y rendimiento
- **Integración con aplicaciones** externas
- **Comandos del sistema** a través del chat

## 🎯 Comandos del Asistente

El asistente J-Vairyx ahora entiende comandos naturales en español:

### 📁 Gestión de Archivos
```
crear archivo mi-documento.txt
crear carpeta mis-proyectos
organizar archivos
```

### 🌐 Navegación Web
```
buscar en internet JavaScript tutorials
navegar a github.com
investigar inteligencia artificial
```

### 📊 Sistema y Perfil
```
mi perfil
info sistema
que sabes de mi
```

### 🤔 Interacción Inteligente
- El asistente **aprende** de tus patrones de uso
- **Detecta** cuando estás distraído y te ayuda a enfocar
- **Sugiere** acciones basadas en tu actividad
- **Adapta** su personalidad a tu estilo de comunicación

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Desarrollo
```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start

# Construir aplicación
npm run build

# Generar distributable
npm run dist
```

### Producción
```bash
# Construir para distribución
npm run electron-pack
```

## 🛠 Tecnologías

- **Electron**: Framework para aplicaciones de escritorio
- **React**: Biblioteca de interfaz de usuario
- **Webpack**: Bundler de módulos
- **CSS3**: Estilos modernos con efectos glass

## 📦 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── modules/            # Módulos principales (Asistente, Organizador, Drive)
├── styles/             # Estilos globales
└── App.js             # Componente principal

public/
├── electron.js        # Proceso principal de Electron
├── preload.js         # Script de preload para seguridad
└── index.html         # Plantilla HTML
```

## 🔧 Configuración

El sistema utiliza el archivo `manifesto_vairyx.json` para la configuración:

```json
{
  "modelo_IA": "mistral-7b-instruct-v0.1.Q4_K_M.gguf",
  "estructura_base": "~/DemianRoot/",
  "modulos_activos": ["organizador", "asistente", "drive"],
  "repositorio_oficial": "Rigohl/-J-Vairyx-q.0.ui"
}
```

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Rigoberto Huston Laredo**

---

*J-Vairyx - Tu asistente personal inteligente* 🚀 
