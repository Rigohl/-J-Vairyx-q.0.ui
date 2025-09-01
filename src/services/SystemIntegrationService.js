// System Integration Service - Handles file operations, internet browsing, and app integration
class SystemIntegrationService {
  constructor() {
    this.isElectron = window.electronAPI !== undefined;
    this.browserHistory = [];
    this.fileOperations = [];
    this.appConnections = new Map();
  }

  // File and Folder Operations
  async createFile(path, content = '', options = {}) {
    try {
      if (this.isElectron) {
        // Use Electron APIs for real file creation
        const result = await window.electronAPI.createFile(path, content, options);
        this.logFileOperation('create_file', { path, success: result.success });
        return result;
      } else {
        // Simulate file creation in web environment
        const result = {
          success: true,
          path: path,
          message: `Archivo '${path}' creado exitosamente (simulación web)`
        };
        this.logFileOperation('create_file', { path, success: true });
        return result;
      }
    } catch (error) {
      console.error('Error creating file:', error);
      this.logFileOperation('create_file', { path, success: false, error: error.message });
      return { success: false, error: error.message };
    }
  }

  async createFolder(path, options = {}) {
    try {
      if (this.isElectron) {
        const result = await window.electronAPI.createFolder(path, options);
        this.logFileOperation('create_folder', { path, success: result.success });
        return result;
      } else {
        const result = {
          success: true,
          path: path,
          message: `Carpeta '${path}' creada exitosamente (simulación web)`
        };
        this.logFileOperation('create_folder', { path, success: true });
        return result;
      }
    } catch (error) {
      console.error('Error creating folder:', error);
      this.logFileOperation('create_folder', { path, success: false, error: error.message });
      return { success: false, error: error.message };
    }
  }

  async organizeFiles(sourcePath, organizationType = 'by_type') {
    try {
      if (this.isElectron) {
        const result = await window.electronAPI.organizeFiles(sourcePath, organizationType);
        this.logFileOperation('organize_files', { sourcePath, organizationType, success: result.success });
        return result;
      } else {
        const result = {
          success: true,
          message: `Archivos organizados por ${organizationType} (simulación web)`,
          organized: Math.floor(Math.random() * 20) + 5
        };
        this.logFileOperation('organize_files', { sourcePath, organizationType, success: true });
        return result;
      }
    } catch (error) {
      console.error('Error organizing files:', error);
      return { success: false, error: error.message };
    }
  }

  // Internet Browsing Capabilities
  async searchWeb(query, options = {}) {
    try {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      
      if (this.isElectron) {
        // Open in external browser or embedded webview
        await window.electronAPI.openUrl(searchUrl);
      } else {
        // Open in new tab
        window.open(searchUrl, '_blank');
      }

      this.logBrowsingActivity('web_search', { query, url: searchUrl });
      
      return {
        success: true,
        query,
        url: searchUrl,
        message: `Búsqueda realizada: "${query}"`
      };
    } catch (error) {
      console.error('Error performing web search:', error);
      return { success: false, error: error.message };
    }
  }

  async navigateToUrl(url) {
    try {
      // Validate URL
      const validUrl = this.validateAndFormatUrl(url);
      
      if (this.isElectron) {
        await window.electronAPI.openUrl(validUrl);
      } else {
        window.open(validUrl, '_blank');
      }

      this.logBrowsingActivity('navigate_url', { url: validUrl });
      
      return {
        success: true,
        url: validUrl,
        message: `Navegando a: ${validUrl}`
      };
    } catch (error) {
      console.error('Error navigating to URL:', error);
      return { success: false, error: error.message };
    }
  }

  async researchTopic(topic, depth = 'basic') {
    const searches = [];
    
    // Generate multiple search queries based on depth
    if (depth === 'basic') {
      searches.push(`${topic}`);
      searches.push(`${topic} definición`);
    } else if (depth === 'detailed') {
      searches.push(`${topic}`);
      searches.push(`${topic} tutorial`);
      searches.push(`${topic} ejemplos`);
      searches.push(`${topic} mejores prácticas`);
    }

    const results = [];
    for (const query of searches) {
      const result = await this.searchWeb(query);
      results.push(result);
    }

    return {
      success: true,
      topic,
      depth,
      searches: results.length,
      message: `Investigación completada sobre "${topic}" con profundidad ${depth}`
    };
  }

  // App Integration
  async connectToApp(appName, connectionType = 'api') {
    try {
      // Simulate app connections
      const connection = {
        appName,
        connectionType,
        status: 'connected',
        connectedAt: new Date(),
        capabilities: this.getAppCapabilities(appName)
      };

      this.appConnections.set(appName, connection);

      return {
        success: true,
        appName,
        message: `Conexión establecida con ${appName}`,
        capabilities: connection.capabilities
      };
    } catch (error) {
      console.error(`Error connecting to ${appName}:`, error);
      return { success: false, error: error.message };
    }
  }

  async executeAppCommand(appName, command, params = {}) {
    try {
      const connection = this.appConnections.get(appName);
      if (!connection) {
        throw new Error(`No hay conexión activa con ${appName}`);
      }

      // Simulate command execution
      const result = {
        success: true,
        appName,
        command,
        params,
        result: `Comando '${command}' ejecutado exitosamente en ${appName}`,
        executedAt: new Date()
      };

      return result;
    } catch (error) {
      console.error(`Error executing command in ${appName}:`, error);
      return { success: false, error: error.message };
    }
  }

  // System Monitoring
  async getSystemInfo() {
    try {
      if (this.isElectron) {
        const info = await window.electronAPI.getSystemInfo();
        return info;
      } else {
        // Simulate system info for web
        return {
          platform: 'web',
          memory: '4GB (simulado)',
          cpu: 'Web Browser',
          uptime: Date.now() - performance.timing.navigationStart,
          diskSpace: 'N/A (navegador web)'
        };
      }
    } catch (error) {
      console.error('Error getting system info:', error);
      return { error: error.message };
    }
  }

  async monitorSystemUsage() {
    const info = await this.getSystemInfo();
    return {
      timestamp: new Date(),
      ...info,
      activeConnections: this.appConnections.size,
      fileOperations: this.fileOperations.length,
      browsingHistory: this.browserHistory.length
    };
  }

  // Utility Methods
  validateAndFormatUrl(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  }

  getAppCapabilities(appName) {
    const capabilities = {
      'browser': ['navigate', 'search', 'bookmark', 'screenshot'],
      'editor': ['open', 'edit', 'save', 'format'],
      'terminal': ['execute', 'script', 'monitor', 'log'],
      'calculator': ['calculate', 'convert', 'graph'],
      'calendar': ['schedule', 'remind', 'sync', 'export']
    };

    return capabilities[appName.toLowerCase()] || ['basic'];
  }

  logFileOperation(operation, data) {
    this.fileOperations.push({
      operation,
      data,
      timestamp: new Date()
    });

    // Keep log manageable
    if (this.fileOperations.length > 100) {
      this.fileOperations = this.fileOperations.slice(-50);
    }
  }

  logBrowsingActivity(activity, data) {
    this.browserHistory.push({
      activity,
      data,
      timestamp: new Date()
    });

    // Keep history manageable
    if (this.browserHistory.length > 100) {
      this.browserHistory = this.browserHistory.slice(-50);
    }
  }

  // Get recent activities for reporting
  getRecentActivities(limit = 10) {
    const activities = [
      ...this.fileOperations.map(op => ({ ...op, type: 'file' })),
      ...this.browserHistory.map(browse => ({ ...browse, type: 'browser' }))
    ];

    return activities
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  // Proactive suggestions based on activities
  getProactiveSuggestions() {
    const suggestions = [];
    const recentFiles = this.fileOperations.filter(op => 
      Date.now() - op.timestamp < 3600000 // last hour
    );

    if (recentFiles.length > 5) {
      suggestions.push({
        type: 'file_organization',
        message: 'He notado mucha actividad con archivos. ¿Te gustaría que ayude a organizarlos?'
      });
    }

    const recentSearches = this.browserHistory.filter(browse => 
      browse.activity === 'web_search' && Date.now() - browse.timestamp < 1800000 // last 30 min
    );

    if (recentSearches.length > 3) {
      suggestions.push({
        type: 'research_help',
        message: 'Veo que estás investigando varios temas. ¿Quieres que te ayude a organizar la información?'
      });
    }

    return suggestions;
  }
}

// Create singleton instance
const systemIntegrationService = new SystemIntegrationService();

export default systemIntegrationService;