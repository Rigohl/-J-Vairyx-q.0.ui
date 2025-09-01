# Development Guide

## Estructura del Proyecto

```
j-vairyx-q.0.ui/
├── src/
│   ├── components/          # Componentes reutilizables de React
│   │   ├── Header.js       # Barra superior de la aplicación
│   │   └── Sidebar.js      # Navegación lateral
│   ├── modules/            # Módulos principales de funcionalidad
│   │   ├── AssistantModule.js    # Módulo del asistente IA
│   │   ├── OrganizerModule.js    # Módulo organizador de tareas
│   │   └── DriveModule.js        # Módulo de gestión de archivos
│   ├── styles/
│   │   └── global.css      # Estilos globales con diseño glassmorphism
│   ├── App.js              # Componente principal de React
│   └── index.js            # Punto de entrada de React
├── public/
│   ├── electron.js         # Proceso principal de Electron
│   ├── preload.js          # Script de preload para seguridad
│   ├── index.html          # Plantilla HTML
│   └── assets/             # Recursos estáticos
├── webpack.config.js       # Configuración de Webpack
├── package.json            # Configuración del proyecto
├── install.sh              # Instalador para Linux/macOS
└── install.bat             # Instalador para Windows
```

## Comandos de Desarrollo

### Instalación
```bash
# Linux/macOS
./install.sh

# Windows
install.bat

# Manual
npm install
```

### Desarrollo
```bash
# Iniciar en modo desarrollo (hot reload)
npm start

# Solo servidor React
npm run react-start

# Solo Electron
npm run electron
```

### Construcción
```bash
# Construir para web
npm run build

# Crear distributable de escritorio
npm run electron-pack

# Construir y crear distributable
npm run dist
```

## Arquitectura

### Frontend (React)
- **App.js**: Componente principal que maneja el estado y la navegación
- **Header.js**: Barra superior con título y versión
- **Sidebar.js**: Navegación entre módulos
- **Módulos**: Cada módulo es un componente independiente con su propia lógica

### Backend (Electron)
- **electron.js**: Proceso principal que maneja ventanas y IPC
- **preload.js**: Script de seguridad que expone APIs limitadas al frontend
- **Persistencia**: Datos guardados en userData de Electron

### Estilos
- **CSS moderno** con efectos glassmorphism
- **Diseño responsive** que se adapta al tamaño de ventana
- **Tema consistente** con gradientes y transparencias

## Características de Seguridad

- **Context Isolation**: Habilitado para prevenir acceso directo a Node.js
- **Node Integration**: Deshabilitado en el renderer
- **Preload Script**: API controlada entre main y renderer
- **CSP**: Content Security Policy configurado

## Personalización

### Modificar Módulos
Cada módulo es independiente y puede ser modificado en `src/modules/`:

- **AssistantModule.js**: Chat con IA
- **OrganizerModule.js**: Gestión de tareas
- **DriveModule.js**: Gestión de archivos

### Agregar Nuevos Módulos
1. Crear archivo en `src/modules/`
2. Agregar entrada en `Sidebar.js`
3. Importar y usar en `App.js`

### Modificar Estilos
- Estilos globales: `src/styles/global.css`
- Variables CSS para colores y espaciado
- Diseño responsivo con flexbox

## Tecnologías Utilizadas

- **Electron 37+**: Framework de aplicaciones de escritorio
- **React 19+**: Biblioteca de interfaz de usuario
- **Webpack 5+**: Bundler de módulos moderno
- **CSS3**: Estilos modernos con efectos avanzados
- **Node.js**: Runtime para el backend