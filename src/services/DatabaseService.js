// Database Service - Intelligent data storage, retrieval, and knowledge management
class DatabaseService {
  constructor() {
    this.databases = new Map();
    this.knowledgeBase = {
      researched_topics: new Map(),
      learned_patterns: new Map(),
      user_preferences: new Map(),
      improvement_suggestions: new Map(),
      document_analysis: new Map()
    };
    this.searchIndex = new Map();
    this.metaData = {
      created: new Date(),
      lastAccess: new Date(),
      totalQueries: 0,
      totalInserts: 0,
      totalUpdates: 0
    };
    
    this.loadExistingDatabases();
    this.initializeIntelligentIndexing();
  }

  // Load existing databases from localStorage
  loadExistingDatabases() {
    try {
      const savedDatabases = localStorage.getItem('jvairyx-databases');
      if (savedDatabases) {
        const data = JSON.parse(savedDatabases);
        
        // Reconstruct Maps from saved data
        Object.keys(data.knowledgeBase).forEach(key => {
          if (data.knowledgeBase[key]) {
            this.knowledgeBase[key] = new Map(Object.entries(data.knowledgeBase[key]));
          }
        });
        
        if (data.searchIndex) {
          this.searchIndex = new Map(Object.entries(data.searchIndex));
        }
        
        if (data.metaData) {
          this.metaData = { ...this.metaData, ...data.metaData };
        }
      }
    } catch (error) {
      console.log('Initializing new database system');
      this.createDefaultDatabases();
    }
  }

  // Save databases to localStorage
  saveDatabases() {
    try {
      const dataToSave = {
        knowledgeBase: {},
        searchIndex: Object.fromEntries(this.searchIndex),
        metaData: this.metaData
      };
      
      // Convert Maps to objects for storage
      Object.keys(this.knowledgeBase).forEach(key => {
        dataToSave.knowledgeBase[key] = Object.fromEntries(this.knowledgeBase[key]);
      });
      
      localStorage.setItem('jvairyx-databases', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving databases:', error);
    }
  }

  // Create default databases for system startup
  createDefaultDatabases() {
    this.createDatabase('research_topics', {
      description: 'Storage for researched topics and findings',
      autoIndex: true,
      maxSize: 1000
    });
    
    this.createDatabase('user_patterns', {
      description: 'Learned user behavior patterns',
      autoIndex: true,
      maxSize: 500
    });
    
    this.createDatabase('improvement_logs', {
      description: 'System improvement tracking',
      autoIndex: true,
      maxSize: 200
    });
    
    this.createDatabase('document_cache', {
      description: 'Analyzed document summaries',
      autoIndex: true,
      maxSize: 300
    });
  }

  // Initialize intelligent indexing for fast searches
  initializeIntelligentIndexing() {
    setInterval(() => {
      this.rebuildSearchIndex();
    }, 300000); // Rebuild index every 5 minutes
  }

  // Create a new database
  createDatabase(name, options = {}) {
    const database = {
      name: name,
      created: new Date(),
      lastModified: new Date(),
      options: {
        description: options.description || `Database: ${name}`,
        autoIndex: options.autoIndex !== false,
        maxSize: options.maxSize || 1000,
        compression: options.compression || false
      },
      data: new Map(),
      indices: new Map(),
      stats: {
        totalRecords: 0,
        totalQueries: 0,
        averageQueryTime: 0
      }
    };
    
    this.databases.set(name, database);
    this.knowledgeBase[name] = database.data;
    
    console.log(`✅ Database '${name}' created successfully`);
    this.saveDatabases();
    
    return database;
  }

  // Insert data into a database
  insert(databaseName, key, data, metadata = {}) {
    const startTime = Date.now();
    
    if (!this.databases.has(databaseName)) {
      this.createDatabase(databaseName);
    }
    
    const database = this.databases.get(databaseName);
    const record = {
      id: key,
      data: data,
      metadata: {
        ...metadata,
        created: new Date(),
        lastModified: new Date(),
        accessCount: 0
      },
      searchableText: this.extractSearchableText(data)
    };
    
    database.data.set(key, record);
    database.stats.totalRecords = database.data.size;
    database.lastModified = new Date();
    
    // Update search index if auto-indexing is enabled
    if (database.options.autoIndex) {
      this.updateSearchIndex(databaseName, key, record.searchableText);
    }
    
    // Enforce max size limit
    if (database.data.size > database.options.maxSize) {
      this.enforceMaxSize(database);
    }
    
    this.metaData.totalInserts++;
    this.metaData.lastAccess = new Date();
    
    const queryTime = Date.now() - startTime;
    this.updateQueryStats(database, queryTime);
    
    this.saveDatabases();
    
    return { success: true, id: key, queryTime };
  }

  // Search across databases
  search(query, options = {}) {
    const startTime = Date.now();
    const results = [];
    const searchDatabases = options.databases || Array.from(this.databases.keys());
    const maxResults = options.maxResults || 50;
    const fuzzySearch = options.fuzzy !== false;
    
    const normalizedQuery = query.toLowerCase();
    
    for (const dbName of searchDatabases) {
      if (!this.databases.has(dbName)) continue;
      
      const database = this.databases.get(dbName);
      
      for (const [key, record] of database.data) {
        let relevanceScore = 0;
        
        // Exact match
        if (record.searchableText.toLowerCase().includes(normalizedQuery)) {
          relevanceScore += 10;
        }
        
        // Fuzzy search for individual words
        if (fuzzySearch) {
          const queryWords = normalizedQuery.split(' ');
          const textWords = record.searchableText.toLowerCase().split(' ');
          
          queryWords.forEach(qWord => {
            textWords.forEach(tWord => {
              if (tWord.includes(qWord) || qWord.includes(tWord)) {
                relevanceScore += 1;
              }
            });
          });
        }
        
        if (relevanceScore > 0) {
          results.push({
            database: dbName,
            id: key,
            record: record,
            relevanceScore: relevanceScore,
            matchReason: relevanceScore >= 10 ? 'exact' : 'fuzzy'
          });
        }
      }
    }
    
    // Sort by relevance score
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    const queryTime = Date.now() - startTime;
    this.metaData.totalQueries++;
    
    return {
      query: query,
      results: results.slice(0, maxResults),
      totalFound: results.length,
      queryTime: queryTime,
      searchedDatabases: searchDatabases
    };
  }

  // Get intelligent suggestions based on current context
  getIntelligentSuggestions(context = {}) {
    const suggestions = [];
    
    // Analyze current user activity patterns
    const recentResearches = this.getRecentRecords('research_topics', 10);
    const userPatterns = this.getRecentRecords('user_patterns', 5);
    
    // Suggest research topics based on patterns
    if (recentResearches.length > 0) {
      const recentTopics = recentResearches.map(r => r.data.topic || r.data.title || '');
      suggestions.push({
        type: 'research_expansion',
        suggestion: `Basándome en tus investigaciones recientes sobre ${recentTopics.slice(0, 2).join(' y ')}, podrías estar interesado en explorar temas relacionados.`,
        action: 'suggest_related_research',
        confidence: 0.8
      });
    }
    
    // Suggest database optimizations
    const dbStats = this.getDatabaseStatistics();
    if (dbStats.totalRecords > 500) {
      suggestions.push({
        type: 'database_optimization',
        suggestion: 'Tu base de conocimientos ha crecido significativamente. ¿Te gustaría que optimice y organice la información para búsquedas más rápidas?',
        action: 'optimize_databases',
        confidence: 0.9
      });
    }
    
    // Suggest knowledge gaps to fill
    const knowledgeGaps = this.identifyKnowledgeGaps();
    if (knowledgeGaps.length > 0) {
      suggestions.push({
        type: 'knowledge_expansion',
        suggestion: `He identificado algunas áreas donde podríamos expandir el conocimiento: ${knowledgeGaps.slice(0, 2).join(', ')}. ¿Quieres que investigue estos temas?`,
        action: 'research_knowledge_gaps',
        confidence: 0.7
      });
    }
    
    return suggestions;
  }

  // Analyze stored data to identify knowledge gaps
  identifyKnowledgeGaps() {
    const gaps = [];
    const researchTopics = this.knowledgeBase.research_topics || new Map();
    
    // Analyze research topics to find incomplete areas
    const topicCategories = new Map();
    
    researchTopics.forEach((record, key) => {
      const topic = record.data;
      const category = topic.domain || 'general';
      
      if (!topicCategories.has(category)) {
        topicCategories.set(category, []);
      }
      topicCategories.get(category).push(topic);
    });
    
    // Identify categories with insufficient depth
    topicCategories.forEach((topics, category) => {
      if (topics.length < 3) {
        gaps.push(`${category} (pocas investigaciones en esta área)`);
      }
    });
    
    return gaps;
  }

  // Get recent records from a specific database
  getRecentRecords(databaseName, limit = 10) {
    if (!this.databases.has(databaseName)) return [];
    
    const database = this.databases.get(databaseName);
    const records = Array.from(database.data.values())
      .sort((a, b) => new Date(b.metadata.created) - new Date(a.metadata.created))
      .slice(0, limit);
      
    return records;
  }

  // Get comprehensive database statistics
  getDatabaseStatistics() {
    const stats = {
      totalDatabases: this.databases.size,
      totalRecords: 0,
      totalQueries: this.metaData.totalQueries,
      totalInserts: this.metaData.totalInserts,
      averageQueryTime: 0,
      databaseDetails: []
    };
    
    let totalQueryTime = 0;
    
    this.databases.forEach((db, name) => {
      stats.totalRecords += db.stats.totalRecords;
      totalQueryTime += db.stats.averageQueryTime * db.stats.totalQueries;
      
      stats.databaseDetails.push({
        name: name,
        records: db.stats.totalRecords,
        queries: db.stats.totalQueries,
        avgQueryTime: db.stats.averageQueryTime,
        description: db.options.description
      });
    });
    
    stats.averageQueryTime = this.metaData.totalQueries > 0 ? 
      totalQueryTime / this.metaData.totalQueries : 0;
    
    return stats;
  }

  // Extract searchable text from data objects
  extractSearchableText(data) {
    if (typeof data === 'string') return data;
    if (typeof data === 'object' && data !== null) {
      return Object.values(data).join(' ');
    }
    return String(data);
  }

  // Update search index for faster queries
  updateSearchIndex(databaseName, key, searchableText) {
    const words = searchableText.toLowerCase().split(/\s+/);
    
    words.forEach(word => {
      if (word.length > 2) { // Only index words longer than 2 characters
        if (!this.searchIndex.has(word)) {
          this.searchIndex.set(word, new Set());
        }
        this.searchIndex.get(word).add(`${databaseName}:${key}`);
      }
    });
  }

  // Rebuild search index for optimization
  rebuildSearchIndex() {
    this.searchIndex.clear();
    
    this.databases.forEach((database, dbName) => {
      database.data.forEach((record, key) => {
        this.updateSearchIndex(dbName, key, record.searchableText);
      });
    });
    
    console.log('🔍 Search index rebuilt for optimized queries');
  }

  // Enforce maximum size limits on databases
  enforceMaxSize(database) {
    const records = Array.from(database.data.entries());
    
    // Sort by last access time and remove oldest
    records.sort((a, b) => 
      new Date(a[1].metadata.lastModified) - new Date(b[1].metadata.lastModified)
    );
    
    const toRemove = records.length - database.options.maxSize;
    for (let i = 0; i < toRemove; i++) {
      database.data.delete(records[i][0]);
    }
  }

  // Update query statistics
  updateQueryStats(database, queryTime) {
    database.stats.totalQueries++;
    database.stats.averageQueryTime = 
      (database.stats.averageQueryTime * (database.stats.totalQueries - 1) + queryTime) / 
      database.stats.totalQueries;
  }

  // Store research findings intelligently
  storeResearchFindings(topic, findings, metadata = {}) {
    const researchRecord = {
      topic: topic,
      findings: findings,
      timestamp: new Date(),
      confidence: metadata.confidence || 0.8,
      sources: metadata.sources || [],
      category: metadata.category || 'general',
      relevanceScore: metadata.relevanceScore || 1.0
    };
    
    return this.insert('research_topics', `research_${Date.now()}`, researchRecord, {
      type: 'research',
      domain: metadata.category,
      priority: metadata.priority || 'medium'
    });
  }

  // Store user pattern data
  storeUserPattern(patternType, patternData, metadata = {}) {
    const patternRecord = {
      type: patternType,
      pattern: patternData,
      timestamp: new Date(),
      frequency: metadata.frequency || 1,
      reliability: metadata.reliability || 0.8
    };
    
    return this.insert('user_patterns', `pattern_${patternType}_${Date.now()}`, patternRecord, {
      type: 'user_behavior',
      category: patternType
    });
  }

  // Get personalized recommendations based on stored data
  getPersonalizedRecommendations(context = {}) {
    const recommendations = [];
    
    // Analyze user patterns for recommendations
    const searchResult = this.search('user preferences productivity');
    
    if (searchResult.results.length > 0) {
      recommendations.push({
        type: 'productivity_tip',
        title: 'Basado en tus patrones de uso',
        description: 'He notado patrones en tu comportamiento que podrían optimizarse.',
        action: 'show_productivity_analysis',
        confidence: 0.8
      });
    }
    
    // Research-based recommendations
    const recentResearch = this.getRecentRecords('research_topics', 5);
    if (recentResearch.length > 0) {
      recommendations.push({
        type: 'research_continuation',
        title: 'Continuar investigación',
        description: `Podrías profundizar en: ${recentResearch[0].data.topic}`,
        action: 'continue_research',
        confidence: 0.9
      });
    }
    
    return recommendations;
  }
}

// Create singleton instance
const databaseService = new DatabaseService();

export default databaseService;