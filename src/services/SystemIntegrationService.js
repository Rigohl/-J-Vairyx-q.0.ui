// System Integration Service - Handles file operations, internet browsing, and app integration
class SystemIntegrationService {
  constructor() {
    this.isElectron = window.electronAPI !== undefined;
    this.browserHistory = [];
    this.fileOperations = [];
    this.appConnections = new Map();
    
    // Enhanced automatic navigation properties
    this.autoNavigationMode = true;
    this.crawlingSession = null;
    this.webKnowledgeBase = new Map();
    this.navigationQueue = [];
    this.intelligentCrawling = true;
    this.maxCrawlDepth = 3;
    this.crawledUrls = new Set();
    this.linkAnalysisData = new Map();
    this.automaticSearches = [];
    this.webResearchMode = 'intelligent'; // 'intelligent', 'broad', 'deep'
    
    this.initializeAutomaticNavigation();
  }

  // Initialize automatic internet navigation capabilities
  initializeAutomaticNavigation() {
    // Start periodic intelligent web exploration
    setInterval(() => {
      this.performIntelligentWebExploration();
    }, 600000); // Every 10 minutes

    // Process navigation queue
    setInterval(() => {
      this.processNavigationQueue();
    }, 30000); // Every 30 seconds

    // Analyze web trends
    setInterval(() => {
      this.analyzeWebTrends();
    }, 900000); // Every 15 minutes

    console.log('🌐 Automatic internet navigation system initialized');
  }

  // Enhanced web search with automatic follow-up
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
      
      // Automatic follow-up searches if intelligent mode is enabled
      if (this.autoNavigationMode) {
        this.scheduleIntelligentFollowUp(query);
      }
      
      return {
        success: true,
        query,
        url: searchUrl,
        message: `Búsqueda realizada: "${query}"`,
        followUpScheduled: this.autoNavigationMode
      };
    } catch (error) {
      console.error('Error performing web search:', error);
      return { success: false, error: error.message };
    }
  }

  // Schedule intelligent follow-up searches
  scheduleIntelligentFollowUp(originalQuery) {
    const relatedQueries = this.generateRelatedSearchQueries(originalQuery);
    
    relatedQueries.forEach((relatedQuery, index) => {
      setTimeout(() => {
        this.performAutomaticSearch(relatedQuery, {
          originalQuery: originalQuery,
          searchType: 'follow_up',
          delay: index * 15000 // 15 seconds between searches
        });
      }, (index + 1) * 15000);
    });

    console.log(`🔍 Scheduled ${relatedQueries.length} follow-up searches for: ${originalQuery}`);
  }

  // Generate related search queries
  generateRelatedSearchQueries(originalQuery) {
    const queries = [];
    const queryLower = originalQuery.toLowerCase();
    
    // Add depth-expanding queries
    queries.push(`${originalQuery} tutorial`);
    queries.push(`${originalQuery} examples`);
    queries.push(`${originalQuery} best practices`);
    
    // Add context-expanding queries
    if (queryLower.includes('programming') || queryLower.includes('código')) {
      queries.push(`${originalQuery} documentation`);
      queries.push(`${originalQuery} github`);
    }
    
    if (queryLower.includes('ai') || queryLower.includes('inteligencia artificial')) {
      queries.push(`${originalQuery} trends 2024`);
      queries.push(`${originalQuery} applications`);
    }
    
    // Add comparative queries
    queries.push(`${originalQuery} vs alternatives`);
    queries.push(`${originalQuery} comparison`);
    
    return queries.slice(0, 3); // Limit to 3 follow-up searches
  }

  // Perform automatic search with intelligence
  async performAutomaticSearch(query, metadata = {}) {
    const searchData = {
      query: query,
      timestamp: new Date(),
      metadata: metadata,
      results: null
    };

    try {
      // Simulate intelligent search analysis
      const analysisResults = await this.analyzeSearchQuery(query);
      
      searchData.results = analysisResults;
      this.automaticSearches.push(searchData);
      
      // Add to knowledge base
      this.webKnowledgeBase.set(`search_${Date.now()}`, {
        type: 'automatic_search',
        query: query,
        analysis: analysisResults,
        timestamp: new Date()
      });

      console.log(`🤖 Automatic search completed: ${query}`);
      
      return {
        success: true,
        query: query,
        analysis: analysisResults,
        type: 'automatic'
      };
      
    } catch (error) {
      console.error('Error in automatic search:', error);
      searchData.error = error.message;
      return { success: false, error: error.message };
    }
  }

  // Analyze search query for intelligent results
  async analyzeSearchQuery(query) {
    // Simulate intelligent analysis of search query
    const analysis = {
      intent: this.detectSearchIntent(query),
      domain: this.extractDomain(query),
      complexity: this.assessQueryComplexity(query),
      suggestedResources: this.suggestResources(query),
      relatedTopics: this.findRelatedTopics(query),
      confidence: Math.random() * 0.4 + 0.6
    };

    return analysis;
  }

  // Detect the intent behind a search query
  detectSearchIntent(query) {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('how to') || queryLower.includes('cómo')) {
      return 'tutorial';
    }
    if (queryLower.includes('what is') || queryLower.includes('qué es')) {
      return 'definition';
    }
    if (queryLower.includes('best') || queryLower.includes('mejor')) {
      return 'recommendation';
    }
    if (queryLower.includes('compare') || queryLower.includes('vs')) {
      return 'comparison';
    }
    if (queryLower.includes('example') || queryLower.includes('ejemplo')) {
      return 'examples';
    }
    
    return 'general_information';
  }

  // Extract domain from query
  extractDomain(query) {
    const queryLower = query.toLowerCase();
    
    const domains = {
      'programming': ['code', 'programming', 'desarrollo', 'javascript', 'python', 'css'],
      'ai': ['ai', 'artificial intelligence', 'machine learning', 'inteligencia artificial'],
      'business': ['business', 'empresa', 'marketing', 'ventas'],
      'science': ['science', 'research', 'study', 'ciencia', 'investigación'],
      'technology': ['technology', 'tech', 'tecnología', 'software', 'hardware']
    };

    for (const [domain, keywords] of Object.entries(domains)) {
      if (keywords.some(keyword => queryLower.includes(keyword))) {
        return domain;
      }
    }
    
    return 'general';
  }

  // Assess query complexity
  assessQueryComplexity(query) {
    const factors = {
      wordCount: query.split(' ').length,
      technicalTerms: this.countTechnicalTerms(query),
      questionWords: this.countQuestionWords(query)
    };
    
    const complexity = (factors.wordCount * 0.1 + factors.technicalTerms * 0.3 + factors.questionWords * 0.2);
    
    if (complexity > 1.5) return 'high';
    if (complexity > 0.8) return 'medium';
    return 'low';
  }

  // Count technical terms in query
  countTechnicalTerms(query) {
    const technicalTerms = [
      'api', 'algorithm', 'database', 'framework', 'library', 'function',
      'class', 'method', 'array', 'object', 'json', 'xml', 'http', 'ssl'
    ];
    
    const queryLower = query.toLowerCase();
    return technicalTerms.filter(term => queryLower.includes(term)).length;
  }

  // Count question words
  countQuestionWords(query) {
    const questionWords = ['what', 'how', 'why', 'when', 'where', 'who', 'which', 'qué', 'cómo', 'por qué'];
    const queryLower = query.toLowerCase();
    return questionWords.filter(word => queryLower.includes(word)).length;
  }

  // Suggest resources based on query
  suggestResources(query) {
    const domain = this.extractDomain(query);
    const intent = this.detectSearchIntent(query);
    
    const resourceMap = {
      'programming': {
        'tutorial': ['MDN Documentation', 'W3Schools', 'freeCodeCamp'],
        'examples': ['GitHub', 'CodePen', 'Stack Overflow'],
        'general_information': ['Stack Overflow', 'Reddit Programming', 'Dev.to']
      },
      'ai': {
        'tutorial': ['Machine Learning Mastery', 'Coursera', 'edX'],
        'examples': ['Kaggle', 'Papers with Code', 'GitHub'],
        'general_information': ['arXiv', 'Google AI Blog', 'OpenAI Blog']
      }
    };
    
    return resourceMap[domain]?.[intent] || ['Google', 'Wikipedia', 'YouTube'];
  }

  // Find related topics
  findRelatedTopics(query) {
    const domain = this.extractDomain(query);
    
    const relatedTopicsMap = {
      'programming': ['web development', 'software engineering', 'algorithms', 'data structures'],
      'ai': ['machine learning', 'neural networks', 'natural language processing', 'computer vision'],
      'business': ['marketing', 'strategy', 'finance', 'operations'],
      'science': ['research methods', 'data analysis', 'statistics', 'experimentation']
    };
    
    return relatedTopicsMap[domain] || ['general knowledge', 'best practices', 'current trends'];
  }

  // Perform intelligent web exploration
  async performIntelligentWebExploration() {
    if (!this.autoNavigationMode) return;

    const explorationTargets = this.identifyExplorationTargets();
    
    for (const target of explorationTargets) {
      await this.exploreWebTarget(target);
      
      // Delay between explorations
      await this.delay(10000); // 10 seconds
    }

    console.log(`🌐 Completed intelligent web exploration of ${explorationTargets.length} targets`);
  }

  // Identify targets for web exploration
  identifyExplorationTargets() {
    const targets = [];
    
    // Recent search topics
    const recentSearches = this.automaticSearches.slice(-5);
    recentSearches.forEach(search => {
      if (search.results && search.results.domain !== 'general') {
        targets.push({
          type: 'search_expansion',
          query: `${search.query} latest developments`,
          priority: 0.8,
          source: 'recent_search'
        });
      }
    });

    // Trending technology topics
    const trendingTopics = [
      'artificial intelligence 2024',
      'web development trends',
      'automation tools',
      'productivity apps',
      'emerging technologies'
    ];

    trendingTopics.forEach(topic => {
      targets.push({
        type: 'trend_exploration',
        query: topic,
        priority: 0.7,
        source: 'trending'
      });
    });

    // Knowledge gap filling
    const knowledgeGaps = this.identifyKnowledgeGaps();
    knowledgeGaps.forEach(gap => {
      targets.push({
        type: 'knowledge_gap',
        query: gap.topic,
        priority: gap.priority,
        source: 'knowledge_gap'
      });
    });

    // Sort by priority and return top targets
    return targets.sort((a, b) => b.priority - a.priority).slice(0, 3);
  }

  // Explore a specific web target
  async exploreWebTarget(target) {
    try {
      console.log(`🎯 Exploring: ${target.query}`);
      
      const explorationResult = await this.performAutomaticSearch(target.query, {
        explorationType: target.type,
        priority: target.priority,
        source: target.source
      });

      // Analyze and store results
      if (explorationResult.success) {
        this.storeExplorationFindings(target, explorationResult);
      }

      return explorationResult;
      
    } catch (error) {
      console.error(`Error exploring ${target.query}:`, error);
      return { success: false, error: error.message };
    }
  }

  // Store exploration findings
  storeExplorationFindings(target, result) {
    const finding = {
      target: target,
      result: result,
      timestamp: new Date(),
      relevanceScore: this.calculateRelevanceScore(result),
      actionable: this.isActionableInformation(result)
    };

    this.webKnowledgeBase.set(`exploration_${Date.now()}`, finding);

    // If highly relevant, add to navigation queue for detailed exploration
    if (finding.relevanceScore > 0.8) {
      this.addToNavigationQueue({
        type: 'detailed_exploration',
        query: target.query,
        priority: finding.relevanceScore,
        reason: 'High relevance detected'
      });
    }
  }

  // Calculate relevance score for exploration results
  calculateRelevanceScore(result) {
    let score = 0.5; // Base score
    
    if (result.analysis) {
      // Higher score for complex, technical content
      if (result.analysis.complexity === 'high') score += 0.2;
      if (result.analysis.domain !== 'general') score += 0.2;
      
      // Boost for practical content
      if (result.analysis.intent === 'tutorial') score += 0.3;
      if (result.analysis.intent === 'examples') score += 0.2;
      
      // Confidence factor
      score *= result.analysis.confidence;
    }
    
    return Math.min(1.0, score);
  }

  // Check if information is actionable
  isActionableInformation(result) {
    if (!result.analysis) return false;
    
    const actionableIntents = ['tutorial', 'examples', 'recommendation'];
    return actionableIntents.includes(result.analysis.intent);
  }

  // Add item to navigation queue
  addToNavigationQueue(item) {
    // Check if already in queue
    const exists = this.navigationQueue.find(queued => queued.query === item.query);
    if (!exists) {
      this.navigationQueue.push({
        ...item,
        addedAt: new Date(),
        status: 'pending'
      });
    }
  }

  // Process navigation queue
  async processNavigationQueue() {
    if (this.navigationQueue.length === 0) return;

    // Sort by priority
    this.navigationQueue.sort((a, b) => b.priority - a.priority);
    
    // Process top priority item
    const item = this.navigationQueue.shift();
    if (item) {
      await this.processNavigationItem(item);
    }
  }

  // Process individual navigation item
  async processNavigationItem(item) {
    try {
      console.log(`📋 Processing navigation item: ${item.query}`);
      
      const result = await this.performDetailedNavigation(item);
      
      // Store results
      this.webKnowledgeBase.set(`navigation_${Date.now()}`, {
        item: item,
        result: result,
        processedAt: new Date()
      });
      
    } catch (error) {
      console.error(`Error processing navigation item:`, error);
    }
  }

  // Perform detailed navigation
  async performDetailedNavigation(item) {
    // Simulate detailed navigation and analysis
    const detailedResult = {
      query: item.query,
      type: item.type,
      deepAnalysis: {
        keyInsights: this.generateKeyInsights(item.query),
        practicalApplications: this.identifyPracticalApplications(item.query),
        futureImplications: this.assessFutureImplications(item.query),
        recommendedActions: this.generateRecommendedActions(item.query)
      },
      navigationTime: new Date(),
      confidence: Math.random() * 0.3 + 0.7
    };

    return detailedResult;
  }

  // Generate key insights from query
  generateKeyInsights(query) {
    return [
      `Insight principal sobre ${query}`,
      `Tendencia emergente en ${query}`,
      `Aplicación práctica de ${query}`
    ];
  }

  // Identify practical applications
  identifyPracticalApplications(query) {
    return [
      `Aplicación inmediata: ${query} en productividad`,
      `Uso en automatización: ${query}`,
      `Integración con herramientas existentes`
    ];
  }

  // Assess future implications
  assessFutureImplications(query) {
    return [
      `Evolución esperada de ${query}`,
      `Impacto en la industria`,
      `Oportunidades emergentes`
    ];
  }

  // Generate recommended actions
  generateRecommendedActions(query) {
    return [
      `Investigar más sobre ${query}`,
      `Experimentar con herramientas relacionadas`,
      `Mantenerse actualizado con desarrollos`
    ];
  }

  // Analyze web trends
  analyzeWebTrends() {
    const trends = {
      searchPatterns: this.analyzeSearchPatterns(),
      popularDomains: this.identifyPopularDomains(),
      emergingTopics: this.detectEmergingTopics(),
      userInterests: this.mapUserInterests()
    };

    console.log('📊 Web trends analysis completed:', trends);
    return trends;
  }

  // Analyze search patterns
  analyzeSearchPatterns() {
    const patterns = {};
    
    this.automaticSearches.forEach(search => {
      const domain = search.results?.domain || 'unknown';
      patterns[domain] = (patterns[domain] || 0) + 1;
    });

    return patterns;
  }

  // Identify popular domains
  identifyPopularDomains() {
    const patterns = this.analyzeSearchPatterns();
    return Object.entries(patterns)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([domain, count]) => ({ domain, count }));
  }

  // Detect emerging topics
  detectEmergingTopics() {
    const recentSearches = this.automaticSearches
      .filter(search => Date.now() - search.timestamp < 86400000) // Last 24 hours
      .map(search => search.query);

    // Simple frequency analysis
    const topicFreq = {};
    recentSearches.forEach(query => {
      const words = query.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.length > 3) {
          topicFreq[word] = (topicFreq[word] || 0) + 1;
        }
      });
    });

    return Object.entries(topicFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([topic, freq]) => ({ topic, frequency: freq }));
  }

  // Map user interests
  mapUserInterests() {
    const interests = new Map();
    
    this.webKnowledgeBase.forEach((data, key) => {
      if (data.result && data.result.analysis) {
        const domain = data.result.analysis.domain;
        const count = interests.get(domain) || 0;
        interests.set(domain, count + 1);
      }
    });

    return Object.fromEntries(interests);
  }

  // Identify knowledge gaps from web exploration
  identifyKnowledgeGaps() {
    const gaps = [];
    
    // Analyze covered vs uncovered domains
    const coveredDomains = new Set();
    this.webKnowledgeBase.forEach(data => {
      if (data.result?.analysis?.domain) {
        coveredDomains.add(data.result.analysis.domain);
      }
    });

    const allDomains = ['programming', 'ai', 'business', 'science', 'technology', 'design'];
    const uncoveredDomains = allDomains.filter(domain => !coveredDomains.has(domain));

    uncoveredDomains.forEach(domain => {
      gaps.push({
        topic: `${domain} fundamentals`,
        priority: 0.7,
        type: 'domain_gap'
      });
    });

    return gaps;
  }

  // Get automatic navigation status
  getAutomaticNavigationStatus() {
    return {
      enabled: this.autoNavigationMode,
      queuedItems: this.navigationQueue.length,
      completedSearches: this.automaticSearches.length,
      knowledgeEntries: this.webKnowledgeBase.size,
      currentSession: this.crawlingSession,
      webResearchMode: this.webResearchMode,
      recentTrends: this.analyzeWebTrends()
    };
  }

  // Enhanced research topic method
  async researchTopic(topic, depth = 'intelligent') {
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
    } else if (depth === 'intelligent') {
      // AI-enhanced research with automatic expansion
      searches.push(`${topic}`);
      searches.push(`${topic} latest developments 2024`);
      searches.push(`${topic} practical applications`);
      searches.push(`${topic} future trends`);
      searches.push(`${topic} expert insights`);
      
      // Schedule automatic follow-up research
      this.scheduleIntelligentFollowUp(topic);
    }

    const results = [];
    for (const query of searches) {
      const result = await this.searchWeb(query);
      results.push(result);
      
      // Delay between searches to avoid overwhelming
      await this.delay(2000);
    }

    // Store research session
    this.webKnowledgeBase.set(`research_${Date.now()}`, {
      type: 'topic_research',
      topic: topic,
      depth: depth,
      searches: results,
      timestamp: new Date()
    });

    return {
      success: true,
      topic,
      depth,
      searches: results.length,
      message: `Investigación inteligente completada sobre "${topic}" con profundidad ${depth}`,
      automaticFollowUp: depth === 'intelligent'
    };
  }

  // Utility method for delays
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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