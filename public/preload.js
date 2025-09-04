const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  getVersion: () => ipcRenderer.invoke('app-version'),
  showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
  
  // Enhanced file system operations
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  createFile: (path, content, options) => ipcRenderer.invoke('create-file', path, content, options),
  createFolder: (path, options) => ipcRenderer.invoke('create-folder', path, options),
  organizeFiles: (sourcePath, organizationType) => ipcRenderer.invoke('organize-files', sourcePath, organizationType),
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  openUrl: (url) => ipcRenderer.invoke('open-url', url),
  
  // Module-specific APIs
  organizer: {
    getTasks: () => ipcRenderer.invoke('organizer-get-tasks'),
    addTask: (task) => ipcRenderer.invoke('organizer-add-task', task),
    updateTask: (id, task) => ipcRenderer.invoke('organizer-update-task', id, task),
    deleteTask: (id) => ipcRenderer.invoke('organizer-delete-task', id)
  },
  
  assistant: {
    sendMessage: (message) => ipcRenderer.invoke('assistant-send-message', message),
    getHistory: () => ipcRenderer.invoke('assistant-get-history'),
    getUserProfile: () => ipcRenderer.invoke('assistant-get-user-profile'),
    updateUserProfile: (profile) => ipcRenderer.invoke('assistant-update-user-profile', profile)
  },
  
  drive: {
    getFiles: () => ipcRenderer.invoke('drive-get-files'),
    uploadFile: (filePath) => ipcRenderer.invoke('drive-upload-file', filePath),
    downloadFile: (file) => ipcRenderer.invoke('drive-download-file', file),
    executeFile: (file) => ipcRenderer.invoke('execute-file', file),
    createFile: (name, content, type) => ipcRenderer.invoke('drive-create-file', name, content, type),
    createFolder: (name) => ipcRenderer.invoke('drive-create-folder', name),
    deleteFile: (fileId) => ipcRenderer.invoke('drive-delete-file', fileId)
  },

  // Learning and behavior tracking
  learning: {
    logInteraction: (type, data) => ipcRenderer.invoke('learning-log-interaction', type, data),
    getUserInsights: () => ipcRenderer.invoke('learning-get-user-insights'),
    updatePreferences: (preferences) => ipcRenderer.invoke('learning-update-preferences', preferences)
  },

  // System integration
  system: {
    getInfo: () => ipcRenderer.invoke('system-get-info'),
    getUsage: () => ipcRenderer.invoke('system-get-usage'),
    executeCommand: (command) => ipcRenderer.invoke('system-execute-command', command)
  }
});