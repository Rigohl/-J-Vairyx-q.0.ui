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

ipcMain.handle('drive-download-file', (event, fileId) => {
  // In a real implementation, this would handle actual file downloads
  const file = appData.files.find(f => f.id === fileId);
  return file ? `Descargando: ${file.name}` : 'Archivo no encontrado';
});

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