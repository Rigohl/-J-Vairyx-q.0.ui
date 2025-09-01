const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  getVersion: () => ipcRenderer.invoke('app-version'),
  showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
  
  // File system operations (if needed)
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  
  // Module-specific APIs
  organizer: {
    getTasks: () => ipcRenderer.invoke('organizer-get-tasks'),
    addTask: (task) => ipcRenderer.invoke('organizer-add-task', task),
    updateTask: (id, task) => ipcRenderer.invoke('organizer-update-task', id, task),
    deleteTask: (id) => ipcRenderer.invoke('organizer-delete-task', id)
  },
  
  assistant: {
    sendMessage: (message) => ipcRenderer.invoke('assistant-send-message', message),
    getHistory: () => ipcRenderer.invoke('assistant-get-history')
  },
  
  drive: {
    getFiles: () => ipcRenderer.invoke('drive-get-files'),
    uploadFile: (filePath) => ipcRenderer.invoke('drive-upload-file', filePath),
    downloadFile: (fileId) => ipcRenderer.invoke('drive-download-file', fileId)
  }
});