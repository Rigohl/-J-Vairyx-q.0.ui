const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

// Keep a global reference of the window object
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'default',
    show: false
  });

  // Load the app
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Set up application menu
  const template = [
    {
      label: 'J-Vairyx',
      submenu: [
        {
          label: 'Acerca de J-Vairyx',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Acerca de J-Vairyx',
              message: 'J-Vairyx Personal Assistant',
              detail: `Versión: ${app.getVersion()}\nAsistente Personal Inteligente\n\nDesarrollado por Rigoberto Huston Laredo\nLicencia MIT`
            });
          }
        },
        { type: 'separator' },
        {
          label: 'Configuraciones',
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            // TODO: Open settings window
          }
        },
        { type: 'separator' },
        {
          label: 'Salir',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Editar',
      submenu: [
        { role: 'undo', label: 'Deshacer' },
        { role: 'redo', label: 'Rehacer' },
        { type: 'separator' },
        { role: 'cut', label: 'Cortar' },
        { role: 'copy', label: 'Copiar' },
        { role: 'paste', label: 'Pegar' },
        { role: 'selectall', label: 'Seleccionar todo' }
      ]
    },
    {
      label: 'Ver',
      submenu: [
        { role: 'reload', label: 'Recargar' },
        { role: 'forceReload', label: 'Forzar recarga' },
        { role: 'toggleDevTools', label: 'Herramientas de desarrollador' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Zoom normal' },
        { role: 'zoomIn', label: 'Acercar' },
        { role: 'zoomOut', label: 'Alejar' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Pantalla completa' }
      ]
    },
    {
      label: 'Ventana',
      submenu: [
        { role: 'minimize', label: 'Minimizar' },
        { role: 'close', label: 'Cerrar' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// App event listeners
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
});

// IPC handlers for communication with renderer process
ipcMain.handle('app-version', () => {
  return app.getVersion();
});

ipcMain.handle('show-message-box', async (event, options) => {
  const { dialog } = require('electron');
  const result = await dialog.showMessageBox(mainWindow, options);
  return result;
});

// Data storage using Electron's userData
const fs = require('fs');
const dataPath = path.join(app.getPath('userData'), 'j-vairyx-data.json');

const loadData = () => {
  try {
    if (fs.existsSync(dataPath)) {
      return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
  return {
    tasks: [],
    files: [],
    chatHistory: [],
    settings: {}
  };
};

const saveData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

let appData = loadData();

// Organizer IPC handlers
ipcMain.handle('organizer-get-tasks', () => {
  return appData.tasks;
});

ipcMain.handle('organizer-add-task', (event, task) => {
  appData.tasks.push({ ...task, id: Date.now() });
  saveData(appData);
  return appData.tasks;
});

ipcMain.handle('organizer-update-task', (event, id, updates) => {
  const index = appData.tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    appData.tasks[index] = { ...appData.tasks[index], ...updates };
    saveData(appData);
  }
  return appData.tasks;
});

ipcMain.handle('organizer-delete-task', (event, id) => {
  appData.tasks = appData.tasks.filter(task => task.id !== id);
  saveData(appData);
  return appData.tasks;
});

// Assistant IPC handlers
ipcMain.handle('assistant-get-history', () => {
  return appData.chatHistory;
});

ipcMain.handle('assistant-send-message', (event, message) => {
  // In a real implementation, this would call an AI model
  const responses = [
    'Entiendo tu consulta. Estoy procesando la información...',
    'Basándome en los datos disponibles, puedo sugerirte las siguientes opciones...',
    'He analizado tu solicitud y aquí tienes algunas recomendaciones...',
    'Perfecto, he completado el análisis. Aquí está la respuesta que buscas...',
    'Excelente pregunta. Déjame ayudarte con eso...'
  ];
  
  const response = responses[Math.floor(Math.random() * responses.length)];
  return response;
});

// Drive IPC handlers
ipcMain.handle('drive-get-files', () => {
  return appData.files;
});

ipcMain.handle('drive-upload-file', async (event, filePath) => {
  // In a real implementation, this would handle actual file uploads
  const newFile = {
    id: Date.now(),
    name: `uploaded_${Date.now()}.txt`,
    size: `${Math.floor(Math.random() * 1000) + 100} KB`,
    type: 'txt',
    uploadDate: new Date()
  };
  
  appData.files.push(newFile);
  saveData(appData);
  return appData.files;
});

ipcMain.handle('drive-download-file', async (event, file) => {
  try {
    const { dialog } = require('electron');
    const fs = require('fs').promises;
    const path = require('path');
    
    // Show save dialog
    const { filePath, canceled } = await dialog.showSaveDialog(mainWindow, {
      title: 'Guardar archivo',
      defaultPath: file.name,
      filters: [
        { name: 'Todos los archivos', extensions: ['*'] }
      ]
    });
    
    if (canceled || !filePath) {
      return { success: false, message: 'Descarga cancelada' };
    }
    
    // Create sample content based on file type
    let content = generateFileContent(file);
    
    // Write file
    await fs.writeFile(filePath, content, 'utf8');
    
    return {
      success: true,
      message: `Archivo '${file.name}' descargado exitosamente en ${filePath}`,
      path: filePath
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

// Add file execution handler
ipcMain.handle('execute-file', async (event, file) => {
  try {
    const { shell } = require('electron');
    const fs = require('fs').promises;
    const path = require('path');
    const os = require('os');
    
    // Create temporary file with appropriate content
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, file.name);
    const content = generateFileContent(file);
    
    await fs.writeFile(tempFilePath, content, 'utf8');
    
    // Execute based on file type
    let result;
    const extension = path.extname(file.name).toLowerCase();
    
    if (['.exe', '.msi', '.bat', '.cmd'].includes(extension)) {
      // For executable files, ask for confirmation first
      const { dialog } = require('electron');
      const response = await dialog.showMessageBox(mainWindow, {
        type: 'question',
        buttons: ['Ejecutar', 'Cancelar'],
        defaultId: 0,
        title: 'Confirmar ejecución',
        message: `¿Deseas ejecutar el archivo ${file.name}?`,
        detail: 'Solo ejecuta archivos de fuentes confiables.'
      });
      
      if (response.response === 0) {
        await shell.openPath(tempFilePath);
        result = { success: true, message: `Ejecutando ${file.name}...` };
      } else {
        result = { success: false, message: 'Ejecución cancelada por el usuario' };
      }
    } else if (['.js', '.py', '.html', '.txt', '.md', '.json', '.css'].includes(extension)) {
      // For text/code files, open with default application
      await shell.openPath(tempFilePath);
      result = { success: true, message: `Abriendo ${file.name} con la aplicación predeterminada` };
    } else {
      // For other files, just open them
      await shell.openPath(tempFilePath);
      result = { success: true, message: `Abriendo ${file.name}` };
    }
    
    return result;
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

// Helper function to generate file content
function generateFileContent(file) {
  const extension = require('path').extname(file.name).toLowerCase();
  const baseName = require('path').basename(file.name, extension);
  
  switch (extension) {
    case '.html':
      return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${baseName}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Archivo generado por J-Vairyx</h1>
        <h2>Archivo: ${file.name}</h2>
        <p>Este archivo fue creado automáticamente por tu asistente personal J-Vairyx.</p>
        <p>Fecha de creación: ${new Date().toLocaleDateString('es-ES')}</p>
        <p>¡Tu asistente inteligente está funcionando perfectamente! 🤖</p>
    </div>
</body>
</html>`;

    case '.js':
      return `// Archivo generado por J-Vairyx Personal Assistant
// Creado: ${new Date().toLocaleString('es-ES')}

console.log('🚀 ¡Hola desde J-Vairyx!');
console.log('Este archivo fue generado automáticamente por tu asistente personal');
console.log('Archivo: ${file.name}');
console.log('Fecha: ${new Date().toLocaleString('es-ES')}');

// Función de ejemplo
function saludarDesdeVairyx() {
    return '¡Hola! Soy J-Vairyx, tu asistente personal inteligente 🤖';
}

// Auto-ejecución
(() => {
    console.log(saludarDesdeVairyx());
    console.log('✅ Archivo ejecutado exitosamente');
})();`;

    case '.py':
      return `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Archivo generado por J-Vairyx Personal Assistant
Creado: ${new Date().toLocaleString('es-ES')}
"""

import datetime
import sys

def main():
    print("🚀 ¡Hola desde J-Vairyx!")
    print("Este archivo fue generado automáticamente por tu asistente personal")
    print(f"Archivo: ${file.name}")
    print(f"Fecha: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("¡Tu asistente inteligente está funcionando perfectamente! 🤖")
    
    # Información del sistema
    print(f"Python version: {sys.version}")
    print("✅ Archivo ejecutado exitosamente")

if __name__ == "__main__":
    main()`;

    case '.bat':
      return `@echo off
echo 🚀 Hola desde J-Vairyx Personal Assistant!
echo Este archivo fue generado automaticamente por tu asistente personal
echo Archivo: ${file.name}
echo Fecha: %date% %time%
echo.
echo ¡Tu asistente inteligente esta funcionando perfectamente! 🤖
echo.
echo Presiona cualquier tecla para continuar...
pause > nul`;

    case '.json':
      return JSON.stringify({
        generatedBy: "J-Vairyx Personal Assistant",
        fileName: file.name,
        createdAt: new Date().toISOString(),
        message: "¡Hola! Este archivo fue generado automáticamente por tu asistente personal inteligente",
        status: "success",
        features: [
          "Generación automática de archivos",
          "Ejecución inteligente",
          "Asistente proactivo",
          "Integración del sistema"
        ]
      }, null, 2);

    case '.md':
      return `# 🚀 Archivo generado por J-Vairyx

## Información del archivo
- **Nombre:** ${file.name}
- **Generado por:** J-Vairyx Personal Assistant
- **Fecha:** ${new Date().toLocaleString('es-ES')}

## ¿Qué es J-Vairyx?

J-Vairyx es tu asistente personal inteligente que puede:

- ✨ Crear archivos automáticamente
- 🚀 Ejecutar y abrir archivos con un clic
- 🧠 Aprender de tus patrones de uso
- 🤖 Proporcionarte sugerencias proactivas
- 📁 Organizar tus archivos inteligentemente

## ¡Funcionando perfectamente!

Este archivo es una prueba de que tu asistente está funcionando correctamente.

---
*Generado automáticamente por J-Vairyx Personal Assistant 🤖*`;

    case '.css':
      return `/* Estilos generados por J-Vairyx Personal Assistant */
/* Creado: ${new Date().toLocaleString('es-ES')} */

/* Tema J-Vairyx - Futurista y elegante */
:root {
    --vairyx-primary: #667eea;
    --vairyx-secondary: #764ba2;
    --vairyx-accent: #f093fb;
    --vairyx-glass: rgba(255, 255, 255, 0.1);
}

body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, var(--vairyx-primary) 0%, var(--vairyx-secondary) 100%);
    min-height: 100vh;
    color: white;
}

.vairyx-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.vairyx-card {
    background: var(--vairyx-glass);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 30px;
    margin: 20px 0;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.vairyx-button {
    background: linear-gradient(45deg, var(--vairyx-primary), var(--vairyx-accent));
    border: none;
    color: white;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
}

.vairyx-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

/* Generado automáticamente por J-Vairyx 🤖 */`;

    default:
      return `Archivo generado por J-Vairyx Personal Assistant
==============================================

Información del archivo:
- Nombre: ${file.name}
- Tipo: ${file.type || 'desconocido'}
- Generado: ${new Date().toLocaleString('es-ES')}

¡Hola! Este archivo fue creado automáticamente por tu asistente personal J-Vairyx.

J-Vairyx es un asistente inteligente que puede:
✨ Crear y gestionar archivos
🚀 Ejecutar programas automáticamente  
🧠 Aprender de tus patrones de uso
🤖 Proporcionarte ayuda proactiva
📁 Organizar tu trabajo eficientemente

¡Tu asistente está funcionando perfectamente!

---
Generado por J-Vairyx Personal Assistant 🤖`;
  }
}

// Enhanced file system IPC handlers
ipcMain.handle('create-file', async (event, filePath, content = '', options = {}) => {
  try {
    const fs = require('fs').promises;
    await fs.writeFile(filePath, content, 'utf8');
    return { 
      success: true, 
      path: filePath, 
      message: `Archivo '${path.basename(filePath)}' creado exitosamente` 
    };
  } catch (error) {
    return { 
      success: false, 
      error: error.message 
    };
  }
});

ipcMain.handle('create-folder', async (event, folderPath, options = {}) => {
  try {
    const fs = require('fs').promises;
    await fs.mkdir(folderPath, { recursive: true });
    return { 
      success: true, 
      path: folderPath, 
      message: `Carpeta '${path.basename(folderPath)}' creada exitosamente` 
    };
  } catch (error) {
    return { 
      success: false, 
      error: error.message 
    };
  }
});

ipcMain.handle('organize-files', async (event, sourcePath, organizationType = 'by_type') => {
  try {
    // Simple file organization simulation
    const organizedCount = Math.floor(Math.random() * 20) + 5;
    return {
      success: true,
      message: `Archivos organizados por ${organizationType}`,
      organized: organizedCount
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

ipcMain.handle('get-system-info', async () => {
  const os = require('os');
  return {
    platform: os.platform(),
    arch: os.arch(),
    memory: `${Math.round(os.totalmem() / 1024 / 1024 / 1024)} GB`,
    cpu: os.cpus()[0].model,
    uptime: os.uptime(),
    diskSpace: 'Variable'
  };
});

ipcMain.handle('open-url', async (event, url) => {
  try {
    await shell.openExternal(url);
    return { success: true, url };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Enhanced Drive handlers
ipcMain.handle('drive-create-file', async (event, name, content, type) => {
  const newFile = {
    id: Date.now(),
    name: `${name}.${type}`,
    size: `${Math.max(1, content.length)} B`,
    type: type,
    uploadDate: new Date(),
    isCreated: true
  };
  
  appData.files.push(newFile);
  saveData(appData);
  return { success: true, file: newFile };
});

ipcMain.handle('drive-create-folder', async (event, name) => {
  const newFolder = {
    id: Date.now(),
    name: name,
    size: '--',
    type: 'folder',
    uploadDate: new Date(),
    isFolder: true
  };
  
  appData.files.push(newFolder);
  saveData(appData);
  return { success: true, folder: newFolder };
});

ipcMain.handle('drive-delete-file', async (event, fileId) => {
  const initialLength = appData.files.length;
  appData.files = appData.files.filter(file => file.id !== fileId);
  const deleted = appData.files.length < initialLength;
  
  if (deleted) {
    saveData(appData);
  }
  
  return { success: deleted };
});

// Learning system handlers
ipcMain.handle('learning-log-interaction', (event, type, data) => {
  if (!appData.learningData) {
    appData.learningData = {
      interactions: [],
      userProfile: {
        preferences: {},
        patterns: { activeHours: [], commonTopics: [] },
        stats: { totalInteractions: 0 }
      }
    };
  }
  
  appData.learningData.interactions.push({
    type,
    data,
    timestamp: new Date().toISOString()
  });
  
  appData.learningData.userProfile.stats.totalInteractions++;
  saveData(appData);
  
  return { success: true };
});

ipcMain.handle('learning-get-user-insights', () => {
  return appData.learningData?.userProfile || {};
});

// System integration handlers  
ipcMain.handle('system-get-info', async () => {
  const os = require('os');
  return {
    platform: os.platform(),
    memory: `${Math.round(os.totalmem() / 1024 / 1024 / 1024)} GB`,
    cpu: os.cpus()[0].model,
    uptime: Math.round(os.uptime()),
    nodeVersion: process.version
  };
});

ipcMain.handle('system-get-usage', async () => {
  const process = require('process');
  const memUsage = process.memoryUsage();
  
  return {
    memory: {
      rss: Math.round(memUsage.rss / 1024 / 1024),
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024)
    },
    uptime: Math.round(process.uptime()),
    pid: process.pid
  };
});

// Handle external links
ipcMain.handle('open-external', async (event, url) => {
  try {
    await shell.openExternal(url);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});