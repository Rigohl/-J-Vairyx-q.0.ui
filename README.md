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

### 🤖 Asistente IA
- Conversación natural en español
- Respuestas inteligentes y contextuales
- Interfaz de chat moderna y fluida

### 📋 Organizador
- Gestión de tareas con prioridades
- Estadísticas de productividad
- Filtros y búsqueda avanzada

### 💾 Drive Personal
- Gestión de archivos personal
- Subida y descarga de documentos
- Organización inteligente de contenido

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
