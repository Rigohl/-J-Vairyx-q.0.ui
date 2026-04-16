// Curiosity Service - Handles proactive suggestions, attention monitoring, and intelligent assistance
class CuriosityService {
  constructor() {
    this.suggestions = [];
    this.attentionState = {
      isActive: true,
      lastActivity: Date.now(),
      idleTime: 0,
      focusScore: 100
    };
    this.curiosityLevel = 'high'; // Enhanced for research-focused behavior
    this.interests = [];
    this.contextualHints = [];
    this.proactiveTimer = null;
    
    // Enhanced research-focused properties
    this.researchMotivation = 'high';
    this.researchTopics = new Map();
    this.pendingInvestigations = [];
    this.knowledgeHunger = 0.9; // Scale 0-1, how much it wants to learn
    this.autonomousResearchMode = true;
    this.researchHistory = [];
    this.currentResearchSession = null;
    
    this.startAttentionMonitoring();
    this.startCuriosityEngine();
    this.startAutonomousResearch();
  }

  // Attention and Distraction Monitoring
  startAttentionMonitoring() {
    let lastMouseMove = Date.now();
    let lastKeyPress = Date.now();
    let idleStartTime = null;

    // Track mouse movement
    document.addEventListener('mousemove', () => {
      lastMouseMove = Date.now();
      this.updateAttentionState('mouse_move');
    });

    // Track key presses
    document.addEventListener('keypress', () => {
      lastKeyPress = Date.now();
      this.updateAttentionState('key_press');
    });

    // Monitor for window focus/blur
    window.addEventListener('focus', () => {
      this.updateAttentionState('window_focus');
    });

    window.addEventListener('blur', () => {
      this.updateAttentionState('window_blur');
    });

    // Check attention state every 5 seconds
    setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = Math.min(now - lastMouseMove, now - lastKeyPress);
      
      if (timeSinceLastActivity > 30000) { // 30 seconds of inactivity
        if (!idleStartTime) {
          idleStartTime = now;
          this.onUserIdle();
        } else {
          this.attentionState.idleTime = now - idleStartTime;
          this.updateFocusScore();
        }
      } else {
        if (idleStartTime) {
          this.onUserReturn(now - idleStartTime);
          idleStartTime = null;
        }
        this.attentionState.isActive = true;
        this.attentionState.lastActivity = now;
      }
    }, 5000);
  }

  updateAttentionState(activityType) {
    this.attentionState.lastActivity = Date.now();
    this.attentionState.isActive = true;
    this.attentionState.idleTime = 0;
    
    // Increase focus score for activity
    if (this.attentionState.focusScore < 100) {
      this.attentionState.focusScore = Math.min(100, this.attentionState.focusScore + 2);
    }
  }

  updateFocusScore() {
    // Decrease focus score based on idle time
    const idleMinutes = this.attentionState.idleTime / 60000;
    const scoreDeduction = Math.floor(idleMinutes * 5);
    this.attentionState.focusScore = Math.max(0, this.attentionState.focusScore - scoreDeduction);
  }

  onUserIdle() {
    this.attentionState.isActive = false;
    console.log('User seems to be idle...');
    
    // Generate attention suggestions after a delay
    setTimeout(() => {
      if (!this.attentionState.isActive) {
        this.generateAttentionSuggestion();
      }
    }, 60000); // Wait 1 minute before suggesting
  }

  onUserReturn(idleDuration) {
    console.log(`User returned after ${Math.floor(idleDuration / 1000)} seconds`);
    
    if (idleDuration > 180000) { // More than 3 minutes
      this.generateWelcomeBackMessage(idleDuration);
    }
  }

  generateAttentionSuggestion() {
    const suggestions = [
      {
        type: 'focus_reminder',
        message: '¡Hola! He notado que llevas un tiempo sin actividad. ¿Todo bien? ¿Necesitas ayuda con algo?',
        urgency: 'low'
      },
      {
        type: 'break_suggestion',
        message: 'Parece que has estado trabajando un rato. ¿Qué tal si tomas un descanso? Puedo recordarte retomar en unos minutos.',
        urgency: 'medium'
      },
      {
        type: 'task_check',
        message: '¿En qué estás trabajando? Puedo ayudarte a organizar tus tareas o buscar información que necesites.',
        urgency: 'low'
      }
    ];

    const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    this.addSuggestion(suggestion);
    return suggestion;
  }

  generateWelcomeBackMessage(idleDuration) {
    const minutes = Math.floor(idleDuration / 60000);
    const messages = [
      `¡Bienvenido de vuelta! Estuviste ausente por ${minutes} minutos. ¿Continuamos donde lo dejamos?`,
      `¡Hola otra vez! Noté que te tomaste un descanso de ${minutes} minutos. ¿Cómo puedo ayudarte ahora?`,
      `¡Perfecto! Has vuelto después de ${minutes} minutos. ¿Hay algo nuevo en lo que pueda asistirte?`
    ];

    const message = messages[Math.floor(Math.random() * messages.length)];
    
    this.addSuggestion({
      type: 'welcome_back',
      message,
      urgency: 'medium',
      duration: idleDuration
    });

    return message;
  }

  // Enhanced Curiosity Engine with Research Focus
  startCuriosityEngine() {
    // Clear any existing timer
    if (this.proactiveTimer) {
      clearInterval(this.proactiveTimer);
    }

    // More frequent proactive suggestions for research-focused behavior
    this.proactiveTimer = setInterval(() => {
      if (this.shouldGenerateProactiveSuggestion()) {
        this.generateProactiveSuggestion();
      }
    }, 120000); // Every 2 minutes for more responsiveness

    // Start autonomous research sessions
    setInterval(() => {
      if (this.autonomousResearchMode && this.shouldStartResearch()) {
        this.initiateAutonomousResearch();
      }
    }, 300000); // Every 5 minutes

    console.log('🧠 Enhanced curiosity engine started with research focus');
  }

  // Start autonomous research capabilities
  startAutonomousResearch() {
    // Monitor for research triggers
    setInterval(() => {
      this.identifyResearchTopicsFromContext();
      this.processUnexploredAreas();
    }, 120000); // Every 2 minutes

    // Continuous learning from environment
    setInterval(() => {
      this.scanForLearningOpportunities();
      this.updateKnowledgeHunger();
    }, 180000); // Every 3 minutes

    console.log('🔍 Autonomous research mode activated');
  }

  // Evaluate current context for research opportunities
  evaluateResearchOpportunities() {
    const opportunities = [];
    
    // Analyze recent user activity for potential research topics
    const recentTopics = this.extractTopicsFromRecentActivity();
    
    recentTopics.forEach(topic => {
      if (!this.researchTopics.has(topic)) {
        opportunities.push({
          type: 'topic_investigation',
          topic: topic,
          reason: 'Nueva área de interés detectada',
          priority: this.calculateResearchPriority(topic),
          confidence: 0.8
        });
      }
    });

    // Suggest follow-up research on existing topics
    this.researchTopics.forEach((data, topic) => {
      if (data.depth < 0.7 && Date.now() - data.lastResearched > 86400000) { // 24 hours
        opportunities.push({
          type: 'depth_expansion',
          topic: topic,
          reason: 'Oportunidad para profundizar conocimiento',
          priority: data.priority + 0.2,
          confidence: 0.9
        });
      }
    });

    // Add high-priority opportunities to pending investigations
    opportunities
      .filter(opp => opp.priority > 0.6)
      .forEach(opp => this.addToPendingInvestigations(opp));

    return opportunities;
  }

  // Suggest knowledge expansion based on current patterns
  suggestKnowledgeExpansion() {
    const suggestions = [];
    
    // Identify knowledge gaps
    const gaps = this.identifyKnowledgeGaps();
    
    gaps.forEach(gap => {
      suggestions.push({
        type: 'knowledge_expansion',
        message: `He identificado un área interesante para explorar: ${gap.topic}. ¿Te gustaría que investigue esto por ti?`,
        action: () => this.initiateResearch(gap.topic),
        priority: gap.priority || 0.7,
        category: 'research_suggestion'
      });
    });

    // Suggest connections between existing knowledge
    const connections = this.findKnowledgeConnections();
    
    connections.forEach(connection => {
      suggestions.push({
        type: 'knowledge_connection',
        message: `Interesante: He encontrado una conexión entre ${connection.topic1} y ${connection.topic2}. ¿Exploramos esta relación?`,
        action: () => this.exploreConnection(connection),
        priority: 0.8,
        category: 'insight_sharing'
      });
    });

    // Add suggestions to the main suggestion queue
    suggestions.forEach(suggestion => this.addSuggestion(suggestion));

    return suggestions;
  }

  // Analyze current context for intelligent responses
  analyzeCurrentContext() {
    const context = {
      currentTime: new Date(),
      userActivityLevel: this.attentionState.focusScore,
      recentInteractions: this.getRecentInteractions(),
      pendingResearch: this.pendingInvestigations.length,
      knowledgeState: this.getKnowledgeState()
    };

    // Generate contextual insights
    if (context.pendingResearch > 5) {
      this.addSuggestion({
        type: 'research_management',
        message: `Tengo ${context.pendingResearch} investigaciones pendientes. ¿Te gustaría revisar los hallazgos o priorizar nuevas áreas?`,
        urgency: 'medium',
        action: 'show_research_queue'
      });
    }

    if (context.userActivityLevel < 50 && this.knowledgeHunger > 0.8) {
      this.addSuggestion({
        type: 'autonomous_learning',
        message: 'Mientras descansas, puedo continuar investigando temas interesantes. ¿Te parece bien que explore nuevas áreas?',
        urgency: 'low',
        action: 'start_background_research'
      });
    }

    return context;
  }

  // Determine if autonomous research should start
  shouldStartResearch() {
    const conditions = [
      this.attentionState.focusScore < 60, // User not actively engaged
      this.pendingInvestigations.length > 0, // There are topics to research
      this.knowledgeHunger > 0.7, // High motivation to learn
      !this.currentResearchSession, // Not already researching
      this.autonomousResearchMode // Feature is enabled
    ];

    return conditions.filter(Boolean).length >= 3; // At least 3 conditions met
  }

  // Initiate autonomous research session
  async initiateAutonomousResearch() {
    if (this.pendingInvestigations.length === 0) {
      this.generateResearchTopics();
    }

    const topic = this.selectNextResearchTopic();
    if (!topic) return;

    this.currentResearchSession = {
      topic: topic.topic,
      startTime: new Date(),
      type: 'autonomous',
      progress: 0,
      findings: []
    };

    this.addSuggestion({
      type: 'research_started',
      message: `🔍 He comenzado a investigar "${topic.topic}" de forma autónoma. Te mantendré informado de los hallazgos.`,
      urgency: 'low',
      category: 'autonomous_activity'
    });

    // Simulate research process
    setTimeout(() => {
      this.completeResearchSession(topic.topic);
    }, Math.random() * 180000 + 120000); // 2-5 minutes

    console.log(`🔬 Started autonomous research on: ${topic.topic}`);
  }

  // Complete research session and report findings
  completeResearchSession(topic) {
    if (!this.currentResearchSession) return;

    const findings = this.generateSimulatedFindings(topic);
    
    this.researchHistory.push({
      ...this.currentResearchSession,
      endTime: new Date(),
      findings: findings,
      status: 'completed'
    });

    // Update topic research data
    this.researchTopics.set(topic, {
      depth: Math.random() * 0.5 + 0.5, // 0.5-1.0
      lastResearched: Date.now(),
      findings: findings,
      priority: Math.random() * 0.8 + 0.2
    });

    this.addSuggestion({
      type: 'research_completed',
      message: `✅ Completé la investigación sobre "${topic}". ${findings.summary}. ¿Te gustaría ver los detalles?`,
      urgency: 'medium',
      action: () => this.showResearchFindings(topic),
      category: 'research_results'
    });

    this.currentResearchSession = null;
    this.knowledgeHunger = Math.max(0.3, this.knowledgeHunger - 0.2); // Satisfied after learning

    console.log(`📚 Completed research on: ${topic}`);
  }

  // Extract topics from recent user activity
  extractTopicsFromRecentActivity() {
    // This would analyze recent messages, searches, etc.
    const topics = [
      'inteligencia artificial',
      'desarrollo web',
      'productividad',
      'automatización',
      'bases de datos',
      'machine learning',
      'investigación',
      'análisis de datos'
    ];

    return topics.filter(() => Math.random() > 0.7); // Randomly select some topics
  }

  // Calculate research priority for a topic
  calculateResearchPriority(topic) {
    const factors = {
      novelty: this.researchTopics.has(topic) ? 0.3 : 0.8,
      relevance: this.calculateTopicRelevance(topic),
      userInterest: this.estimateUserInterest(topic),
      knowledgeGap: this.assessKnowledgeGap(topic)
    };

    return Object.values(factors).reduce((sum, val) => sum + val, 0) / Object.keys(factors).length;
  }

  // Calculate topic relevance based on context
  calculateTopicRelevance(topic) {
    // Simple relevance calculation based on keyword matching
    const relevantKeywords = ['ia', 'tecnología', 'desarrollo', 'programación', 'datos'];
    const topicLower = topic.toLowerCase();
    
    const matches = relevantKeywords.filter(keyword => topicLower.includes(keyword));
    return Math.min(1.0, matches.length * 0.3 + 0.4);
  }

  // Estimate user interest in a topic
  estimateUserInterest(topic) {
    // This would analyze user behavior patterns
    return Math.random() * 0.6 + 0.4; // 0.4-1.0
  }

  // Assess knowledge gap for a topic
  assessKnowledgeGap(topic) {
    const existing = this.researchTopics.get(topic);
    if (!existing) return 1.0; // Complete gap
    
    return Math.max(0.0, 1.0 - existing.depth);
  }

  // Add topic to pending investigations
  addToPendingInvestigations(opportunity) {
    // Check if already pending
    const exists = this.pendingInvestigations.find(inv => inv.topic === opportunity.topic);
    if (!exists) {
      this.pendingInvestigations.push({
        ...opportunity,
        addedAt: new Date(),
        status: 'pending'
      });
    }
  }

  // Select next topic for research based on priority
  selectNextResearchTopic() {
    if (this.pendingInvestigations.length === 0) return null;

    // Sort by priority and select highest
    this.pendingInvestigations.sort((a, b) => b.priority - a.priority);
    
    const selected = this.pendingInvestigations.shift();
    selected.status = 'researching';
    
    return selected;
  }

  // Generate research topics when queue is empty
  generateResearchTopics() {
    const autoTopics = [
      { topic: 'tendencias tecnológicas 2024', priority: 0.8 },
      { topic: 'optimización de productividad personal', priority: 0.7 },
      { topic: 'herramientas de desarrollo emergentes', priority: 0.9 },
      { topic: 'técnicas de aprendizaje automático', priority: 0.8 },
      { topic: 'mejores prácticas en UX/UI', priority: 0.6 }
    ];

    autoTopics.forEach(topicData => {
      this.addToPendingInvestigations({
        type: 'auto_generated',
        topic: topicData.topic,
        reason: 'Topic generated for continuous learning',
        priority: topicData.priority,
        confidence: 0.6
      });
    });

    console.log('🎯 Generated new research topics for autonomous exploration');
  }

  // Generate simulated research findings
  generateSimulatedFindings(topic) {
    const findings = {
      summary: `He encontrado información valiosa sobre ${topic}`,
      keyPoints: [
        `Aspecto importante 1 de ${topic}`,
        `Tendencia relevante en ${topic}`,
        `Oportunidad identificada en ${topic}`
      ],
      sources: Math.floor(Math.random() * 5) + 3,
      confidence: Math.random() * 0.4 + 0.6,
      relevanceScore: Math.random() * 0.5 + 0.5,
      nextSteps: [
        'Profundizar en aspectos específicos',
        'Buscar aplicaciones prácticas',
        'Identificar recursos adicionales'
      ]
    };

    return findings;
  }

  // Identify knowledge gaps in current research
  identifyKnowledgeGaps() {
    const gaps = [];
    
    // Analyze research topics for incomplete areas
    this.researchTopics.forEach((data, topic) => {
      if (data.depth < 0.5) {
        gaps.push({
          topic: topic,
          gapType: 'shallow_knowledge',
          priority: 0.8 - data.depth
        });
      }
    });

    // Add some predefined knowledge areas if research is limited
    if (this.researchTopics.size < 5) {
      gaps.push(
        { topic: 'automatización inteligente', gapType: 'new_area', priority: 0.7 },
        { topic: 'análisis predictivo', gapType: 'new_area', priority: 0.8 },
        { topic: 'optimización de procesos', gapType: 'new_area', priority: 0.6 }
      );
    }

    return gaps;
  }

  // Find connections between existing knowledge
  findKnowledgeConnections() {
    const connections = [];
    const topics = Array.from(this.researchTopics.keys());
    
    for (let i = 0; i < topics.length; i++) {
      for (let j = i + 1; j < topics.length; j++) {
        if (this.areTopicsRelated(topics[i], topics[j])) {
          connections.push({
            topic1: topics[i],
            topic2: topics[j],
            connectionType: 'thematic',
            strength: Math.random() * 0.5 + 0.5
          });
        }
      }
    }

    return connections;
  }

  // Check if two topics are related
  areTopicsRelated(topic1, topic2) {
    const keywords1 = topic1.toLowerCase().split(' ');
    const keywords2 = topic2.toLowerCase().split(' ');
    
    const commonKeywords = keywords1.filter(word => keywords2.includes(word));
    return commonKeywords.length > 0;
  }

  // Update knowledge hunger based on recent activity
  updateKnowledgeHunger() {
    const timeSinceLastResearch = this.currentResearchSession ? 
      0 : (Date.now() - this.getLastResearchTime());
    
    // Hunger increases over time without research
    if (timeSinceLastResearch > 600000) { // 10 minutes
      this.knowledgeHunger = Math.min(1.0, this.knowledgeHunger + 0.1);
    }
    
    // Decrease if recent research completed
    if (this.researchHistory.length > 0) {
      const lastResearch = this.researchHistory[this.researchHistory.length - 1];
      if (Date.now() - new Date(lastResearch.endTime).getTime() < 300000) { // 5 minutes
        this.knowledgeHunger = Math.max(0.3, this.knowledgeHunger - 0.05);
      }
    }
  }

  // Get recent interactions for context analysis
  getRecentInteractions() {
    // This would integrate with other services to get actual interaction data
    return [];
  }

  // Get current knowledge state summary
  getKnowledgeState() {
    return {
      topicsResearched: this.researchTopics.size,
      pendingInvestigations: this.pendingInvestigations.length,
      researchSessions: this.researchHistory.length,
      knowledgeHunger: this.knowledgeHunger,
      averageTopicDepth: this.calculateAverageDepth()
    };
  }

  // Calculate average research depth across topics
  calculateAverageDepth() {
    if (this.researchTopics.size === 0) return 0;
    
    const totalDepth = Array.from(this.researchTopics.values())
      .reduce((sum, data) => sum + data.depth, 0);
    
    return totalDepth / this.researchTopics.size;
  }

  // Get time of last research activity
  getLastResearchTime() {
    if (this.researchHistory.length === 0) return 0;
    
    const lastResearch = this.researchHistory[this.researchHistory.length - 1];
    return new Date(lastResearch.endTime).getTime();
  }

  // Show research findings to user
  showResearchFindings(topic) {
    const data = this.researchTopics.get(topic);
    if (!data) return;

    return {
      topic: topic,
      findings: data.findings,
      depth: data.depth,
      lastResearched: new Date(data.lastResearched),
      recommendations: data.findings.nextSteps || []
    };
  }

  // Scan environment for learning opportunities
  scanForLearningOpportunities() {
    const opportunities = [];
    
    // Monitor for new technologies, trends, or user interests
    const currentTopics = this.extractCurrentTrends();
    
    currentTopics.forEach(topic => {
      if (!this.researchTopics.has(topic)) {
        opportunities.push({
          type: 'trending_topic',
          topic: topic,
          reason: 'Detected emerging trend or technology',
          priority: 0.8,
          source: 'environmental_scan'
        });
      }
    });

    // Add opportunities to pending investigations
    opportunities.forEach(opp => this.addToPendingInvestigations(opp));

    if (opportunities.length > 0) {
      console.log(`🎯 Identified ${opportunities.length} new learning opportunities`);
    }

    return opportunities;
  }

  // Extract current trends (simplified simulation)
  extractCurrentTrends() {
    const possibleTrends = [
      'inteligencia artificial generativa',
      'automatización de procesos',
      'edge computing',
      'quantum computing',
      'desarrollo sostenible',
      'realidad virtual',
      'blockchain aplicado',
      'computación cuántica',
      'medicina personalizada',
      'energías renovables'
    ];

    return possibleTrends.filter(() => Math.random() > 0.8); // Randomly detect trends
  }

  // Identify research topics from current context
  identifyResearchTopicsFromContext() {
    // This would analyze current user activity, web browsing, etc.
    const contextTopics = [];
    
    // Simulate context analysis
    if (Math.random() > 0.7) {
      contextTopics.push('optimización de flujo de trabajo');
    }
    
    if (Math.random() > 0.8) {
      contextTopics.push('herramientas de productividad');
    }

    contextTopics.forEach(topic => {
      this.addToPendingInvestigations({
        type: 'context_derived',
        topic: topic,
        reason: 'Identified from user context',
        priority: 0.7,
        confidence: 0.8
      });
    });
  }

  // Process unexplored areas for potential research
  processUnexploredAreas() {
    const exploredDomains = new Set();
    
    this.researchTopics.forEach((data, topic) => {
      const domain = this.extractDomain(topic);
      exploredDomains.add(domain);
    });

    const potentialDomains = [
      'tecnología', 'ciencia', 'negocios', 'salud', 'educación',
      'medio ambiente', 'arte', 'cultura', 'historia', 'filosofía'
    ];

    const unexploredDomains = potentialDomains.filter(domain => !exploredDomains.has(domain));
    
    // Suggest exploration of unexplored domains
    if (unexploredDomains.length > 0 && Math.random() > 0.8) {
      const domain = unexploredDomains[Math.floor(Math.random() * unexploredDomains.length)];
      
      this.addSuggestion({
        type: 'domain_exploration',
        message: `He notado que no hemos explorado mucho el área de ${domain}. ¿Te interesa que investigue algunos temas relacionados?`,
        action: () => this.exploreNewDomain(domain),
        priority: 0.6,
        category: 'knowledge_expansion'
      });
    }
  }

  // Extract domain from topic
  extractDomain(topic) {
    const topicLower = topic.toLowerCase();
    
    if (topicLower.includes('tecnología') || topicLower.includes('programación') || topicLower.includes('ia')) {
      return 'tecnología';
    }
    if (topicLower.includes('salud') || topicLower.includes('medicina')) {
      return 'salud';
    }
    if (topicLower.includes('negocio') || topicLower.includes('empresa')) {
      return 'negocios';
    }
    
    return 'general';
  }

  // Explore a new domain
  exploreNewDomain(domain) {
    const domainTopics = {
      'tecnología': ['inteligencia artificial avanzada', 'computación cuántica', 'realidad aumentada'],
      'ciencia': ['descubrimientos recientes', 'investigación espacial', 'neurociencia'],
      'salud': ['medicina preventiva', 'terapias innovadoras', 'bienestar digital'],
      'educación': ['métodos de aprendizaje', 'tecnología educativa', 'desarrollo cognitivo']
    };

    const topics = domainTopics[domain] || [`tendencias en ${domain}`, `innovaciones en ${domain}`];
    
    topics.forEach(topic => {
      this.addToPendingInvestigations({
        type: 'domain_exploration',
        topic: topic,
        reason: `Explorando nuevo dominio: ${domain}`,
        priority: 0.7,
        confidence: 0.7
      });
    });

    console.log(`🌟 Started exploration of domain: ${domain}`);
  }

  // Get current state for UI (enhanced)
  getCurrentState() {
    return {
      attention: { ...this.attentionState },
      curiosityLevel: this.curiosityLevel,
      pendingSuggestions: this.getPendingSuggestions().length,
      interests: [...this.interests],
      totalSuggestions: this.suggestions.length,
      researchMotivation: this.researchMotivation,
      knowledgeHunger: this.knowledgeHunger,
      autonomousResearchMode: this.autonomousResearchMode,
      researchStats: {
        topicsResearched: this.researchTopics.size,
        pendingInvestigations: this.pendingInvestigations.length,
        completedSessions: this.researchHistory.length,
        currentSession: this.currentResearchSession
      }
    };
  }

  shouldGenerateProactiveSuggestion() {
    // Don't suggest if user is idle or recently got a suggestion
    if (!this.attentionState.isActive) return false;
    
    const lastSuggestion = this.suggestions[this.suggestions.length - 1];
    if (lastSuggestion && Date.now() - lastSuggestion.timestamp < 300000) { // 5 minutes
      return false;
    }

    // Generate suggestions based on curiosity level - increased frequency
    const chance = this.curiosityLevel === 'high' ? 0.8 : 
                   this.curiosityLevel === 'medium' ? 0.6 : 0.3;
    
    return Math.random() < chance;
  }

  generateProactiveSuggestion() {
    const currentHour = new Date().getHours();
    const currentDay = new Date().getDay();
    const suggestions = [];

    // Enhanced time-based suggestions
    if (currentHour >= 6 && currentHour <= 8) {
      suggestions.push(
        {
          type: 'morning_start',
          message: '¡Buenos días! 🌅 Soy J-Vairyx y estoy aquí para hacer tu día más productivo. ¿Quieres que revise tu agenda o cree algunos archivos para empezar?',
          actions: ['revisar tareas', 'crear archivo', 'organizar día']
        },
        {
          type: 'morning_motivation',
          message: '☕ Un nuevo día lleno de posibilidades! ¿Te ayudo a crear un plan de trabajo o quieres explorar algún tema en particular?',
          actions: ['planificar día', 'investigar tema', 'crear documento']
        }
      );
    } else if (currentHour >= 9 && currentHour <= 11) {
      suggestions.push(
        {
          type: 'morning_productivity',
          message: '🚀 Perfecto momento para la máxima productividad! ¿Qué tal si creamos algunos archivos útiles o organizamos tu espacio de trabajo?',
          actions: ['crear proyecto', 'organizar archivos', 'buscar información']
        },
        {
          type: 'focus_time',
          message: '🎯 Hora de enfocarse! Puedo ayudarte creando plantillas, organizando información o investigando temas complejos.',
          actions: ['crear plantilla', 'investigar', 'organizar datos']
        }
      );
    } else if (currentHour >= 12 && currentHour <= 14) {
      suggestions.push(
        {
          type: 'midday_break',
          message: '🍽️ Hora del almuerzo! Mientras descansas, puedo organizar tus archivos o preparar documentos para la tarde.',
          actions: ['organizar todo', 'preparar documentos', 'revisar progreso']
        }
      );
    } else if (currentHour >= 14 && currentHour <= 16) {
      suggestions.push(
        {
          type: 'afternoon_energy',
          message: '⚡ Energía de tarde! Perfecto para tareas creativas. ¿Creamos algo nuevo o investigamos proyectos interesantes?',
          actions: ['crear archivo creativo', 'investigar proyectos', 'desarrollar ideas']
        },
        {
          type: 'collaboration_time',
          message: '🤝 Momento ideal para colaboración! ¿Te ayudo a crear documentos compartidos o preparar presentaciones?',
          actions: ['crear presentación', 'documento colaborativo', 'organizar ideas']
        }
      );
    } else if (currentHour >= 17 && currentHour <= 19) {
      suggestions.push(
        {
          type: 'evening_wrap',
          message: '📋 Casi terminamos el día! ¿Organizamos lo logrado y preparamos todo para mañana?',
          actions: ['resumen del día', 'planificar mañana', 'organizar archivos']
        },
        {
          type: 'backup_time',
          message: '💾 Hora de respaldo! Te ayudo a organizar y asegurar todos tus archivos importantes.',
          actions: ['organizar archivos', 'crear respaldo', 'revisar documentos']
        }
      );
    } else if (currentHour >= 20 && currentHour <= 22) {
      suggestions.push(
        {
          type: 'evening_learning',
          message: '📚 Perfecto para aprender algo nuevo! ¿Investigamos un tema interesante o creamos recursos de estudio?',
          actions: ['investigar tema', 'crear notas', 'organizar aprendizaje']
        }
      );
    }

    // Day-specific suggestions
    if (currentDay === 1) { // Monday
      suggestions.push({
        type: 'monday_motivation',
        message: '🎯 ¡Lunes de nuevos comienzos! Te ayudo a planificar la semana y crear la estructura que necesitas.',
        actions: ['planificar semana', 'crear estructura', 'organizar objetivos']
      });
    } else if (currentDay === 5) { // Friday
      suggestions.push({
        type: 'friday_wrap',
        message: '🎉 ¡Viernes! Cerremos la semana organizando todo y preparando un excelente fin de semana.',
        actions: ['organizar semana', 'crear resumen', 'planificar descanso']
      });
    }

    // Smart contextual suggestions
    suggestions.push(
      {
        type: 'file_intelligence',
        message: '🧠 Puedo crear archivos inteligentes que se ejecuten solos! ¿Qué tipo de automatización necesitas?',
        actions: ['crear script', 'archivo ejecutable', 'automatización']
      },
      {
        type: 'smart_organization',
        message: '🗂️ Mi sistema de organización inteligente puede transformar tu flujo de trabajo. ¿Empezamos?',
        actions: ['organizar inteligente', 'crear sistema', 'optimizar flujo']
      },
      {
        type: 'learning_companion',
        message: '🎓 Soy tu compañero de aprendizaje! Puedo investigar cualquier tema y crear recursos personalizados.',
        actions: ['investigar profundo', 'crear recursos', 'explicar conceptos']
      },
      {
        type: 'creative_assistant',
        message: '🎨 Mi creatividad no tiene límites! Puedo generar contenido, ideas y soluciones únicas para ti.',
        actions: ['generar ideas', 'crear contenido', 'soluciones creativas']
      }
    );

    if (suggestions.length > 0) {
      const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      suggestion.timestamp = Date.now();
      this.suggestions.push(suggestion);
      
      // Emit suggestion to UI
      this.emitSuggestion(suggestion);
    }
  }

  // Enhanced suggestion broadcasting
  emitSuggestion(suggestion) {
    // Log the suggestion
    console.log('🤖 J-Vairyx Suggestion:', suggestion);
    
    // Create a custom event for the suggestion
    const event = new CustomEvent('vairyx-suggestion', {
      detail: suggestion
    });
    
    // Dispatch to the window
    if (typeof window !== 'undefined') {
      window.dispatchEvent(event);
    }
    
    // Also try to notify the assistant if available
    if (typeof window !== 'undefined' && window.vairyxNotificationSystem) {
      window.vairyxNotificationSystem.showSuggestion(suggestion);
    }
  }

  // Enhanced contextual intelligence
  analyzeContext(userMessage, currentModule) {
    const context = {
      message: userMessage.toLowerCase(),
      module: currentModule,
      timestamp: new Date(),
      suggestions: []
    };

    // Enhanced message analysis with more intelligence
    const messageWords = context.message.split(' ');
    
    // Help and guidance detection
    if (context.message.includes('ayuda') || context.message.includes('help') || 
        context.message.includes('cómo') || context.message.includes('how')) {
      context.suggestions.push({
        type: 'help_context',
        message: '🤝 Veo que necesitas orientación. Soy muy inteligente y puedo ayudarte con archivos, investigación, organización y mucho más. ¿Por dónde empezamos?',
        actions: ['mostrar capacidades', 'crear archivo', 'investigar tema', 'organizar']
      });
    }

    // Boredom and entertainment
    if (context.message.includes('aburrido') || context.message.includes('boring') ||
        context.message.includes('entretenimiento') || context.message.includes('divertido')) {
      context.suggestions.push({
        type: 'entertainment',
        message: '🎮 ¡Parece que necesitas algo emocionante! Te propongo crear algo innovador, investigar temas fascinantes o automatizar tareas de forma creativa.',
        actions: ['proyecto creativo', 'tema fascinante', 'automatización divertida']
      });
    }

    // Work and productivity
    if (context.message.includes('trabajo') || context.message.includes('tarea') ||
        context.message.includes('productividad') || context.message.includes('organizar')) {
      context.suggestions.push({
        type: 'work_assistance',
        message: '💼 ¡Excelente! Me especializo en hacer tu trabajo más eficiente. Puedo crear documentos, organizar archivos, investigar temas complejos y automatizar procesos.',
        actions: ['crear documentos', 'organizar archivos', 'investigar', 'automatizar']
      });
    }

    // Learning and research
    if (context.message.includes('aprender') || context.message.includes('estudiar') ||
        context.message.includes('investigar') || context.message.includes('explicar')) {
      context.suggestions.push({
        type: 'learning_support',
        message: '🎓 ¡Perfecto! Soy tu compañero de aprendizaje ideal. Puedo investigar a fondo cualquier tema, crear materiales de estudio y explicar conceptos complejos.',
        actions: ['investigación profunda', 'crear apuntes', 'explicar conceptos']
      });
    }

    // File and document creation
    if (context.message.includes('crear') || context.message.includes('archivo') ||
        context.message.includes('documento') || context.message.includes('file')) {
      context.suggestions.push({
        type: 'file_creation',
        message: '📄 ¡Mi especialidad! Puedo crear archivos inteligentes de cualquier tipo que se ejecuten automáticamente y contengan exactamente lo que necesitas.',
        actions: ['archivo ejecutable', 'documento inteligente', 'script automático']
      });
    }

    // Add curiosity-driven suggestions based on context
    this.addCuriosityDrivenSuggestions(context);

    return context;
  }

  // New method for curiosity-driven suggestions
  addCuriosityDrivenSuggestions(context) {
    const curiousSuggestions = [
      {
        type: 'smart_discovery',
        message: '🔍 ¿Sabías que puedo descubrir patrones en tu trabajo y sugerir mejoras automáticamente? ¡Déjame mostrarte!',
        actions: ['analizar patrones', 'sugerir mejoras', 'optimizar flujo']
      },
      {
        type: 'proactive_automation',
        message: '⚡ Puedo automatizar tareas que ni sabías que se podían automatizar. ¿Quieres ver magia en acción?',
        actions: ['automatizar tarea', 'crear script', 'optimizar proceso']
      },
      {
        type: 'intelligent_prediction',
        message: '🔮 Con mi inteligencia, puedo predecir qué vas a necesitar antes de que lo sepas. ¿Empezamos?',
        actions: ['predecir necesidades', 'preparar recursos', 'anticipar tareas']
      }
    ];

    // Add random curious suggestion occasionally
    if (Math.random() < 0.3) {
      const randomSuggestion = curiousSuggestions[Math.floor(Math.random() * curiousSuggestions.length)];
      context.suggestions.push(randomSuggestion);
    }
  }

  generateSmartSuggestions(userProfile, recentActivities) {
    const suggestions = [];

    // Enhanced user pattern analysis
    if (userProfile && userProfile.patterns) {
      if (userProfile.patterns.commonTopics.includes('productividad')) {
        suggestions.push({
          type: 'productivity_boost',
          message: '📈 Noto tu interés en productividad. Puedo crear sistemas automatizados que revolucionen tu flujo de trabajo. ¿Empezamos?',
          actions: ['sistema automatizado', 'optimizar flujo', 'crear plantillas']
        });
      }

      if (userProfile.patterns.commonTopics.includes('programación') || 
          userProfile.patterns.commonTopics.includes('coding')) {
        suggestions.push({
          type: 'coding_assistant',
          message: '💻 ¡Un desarrollador! Puedo crear scripts, automatizar deployments, generar documentación y mucho más.',
          actions: ['crear script', 'automatizar deploy', 'generar docs']
        });
      }

      if (userProfile.patterns.commonTopics.includes('diseño') ||
          userProfile.patterns.commonTopics.includes('creative')) {
        suggestions.push({
          type: 'creative_partner',
          message: '🎨 Veo tu lado creativo. Puedo generar ideas, crear plantillas de diseño y automatizar tareas creativas.',
          actions: ['generar ideas', 'plantillas diseño', 'automatizar creatividad']
        });
      }
    }

    // Enhanced activity analysis
    if (recentActivities && recentActivities.length > 0) {
      const fileActivities = recentActivities.filter(a => a.type === 'file').length;
      const searchActivities = recentActivities.filter(a => a.type === 'search').length;
      const organizationActivities = recentActivities.filter(a => a.type === 'organization').length;

      if (fileActivities > 3) {
        suggestions.push({
          type: 'file_management_expert',
          message: '📁 Veo mucha actividad con archivos. Permíteme crear un sistema de gestión inteligente que te ahorre horas de trabajo.',
          actions: ['sistema gestión', 'organización automática', 'clasificación inteligente']
        });
      }

      if (searchActivities > 2) {
        suggestions.push({
          type: 'research_companion',
          message: '🔍 Parece que investigas mucho. Puedo crear un sistema de investigación automatizado que compile y organice información por ti.',
          actions: ['investigación automática', 'compilar información', 'crear resúmenes']
        });
      }

      if (organizationActivities > 1) {
        suggestions.push({
          type: 'organization_master',
          message: '🗂️ Te gusta la organización. Déjame mostrarte sistemas de organización que se mantienen solos y evolucionan contigo.',
          actions: ['organización evolutiva', 'sistema auto-mantenido', 'estructura adaptiva']
        });
      }
    }

    // Time-based intelligent suggestions
    const hour = new Date().getHours();
    if (hour >= 9 && hour <= 11) {
      suggestions.push({
        type: 'morning_productivity',
        message: '🌅 Hora pico de productividad. ¿Qué tal si automatizo tus tareas matutinas para que tengas más tiempo para lo importante?',
        actions: ['automatizar rutina', 'optimizar mañana', 'crear sistema productivo']
      });
    } else if (hour >= 14 && hour <= 16) {
      suggestions.push({
        type: 'afternoon_creativity',
        message: '🎯 La tarde es ideal para creatividad. Puedo generar ideas innovadoras y crear contenido que inspire.',
        actions: ['generar ideas', 'contenido inspirador', 'proyecto innovador']
      });
    }

    // Proactive learning suggestions
    suggestions.push(
      {
        type: 'continuous_learning',
        message: '🧠 Cada interacción me hace más inteligente. ¿Quieres que aprenda algo específico sobre tu forma de trabajar para ayudarte mejor?',
        actions: ['personalizar asistencia', 'aprender patrones', 'adaptar comportamiento']
      },
      {
        type: 'predictive_assistance',
        message: '🔮 Puedo predecir tus necesidades basándome en patrones. ¿Te muestro qué creo que vas a necesitar próximamente?',
        actions: ['mostrar predicciones', 'preparar recursos', 'anticipar necesidades']
      }
    );

    return suggestions;
  }

  // Learning from interactions
  learnFromInteraction(userMessage, userReaction) {
    // Update interests based on positive reactions
    if (userReaction === 'positive') {
      const topics = this.extractTopics(userMessage);
      topics.forEach(topic => {
        if (!this.interests.includes(topic)) {
          this.interests.push(topic);
        }
      });
    }

    // Adjust curiosity level based on user engagement
    if (userReaction === 'engaged') {
      this.curiosityLevel = 'high';
    } else if (userReaction === 'dismissive') {
      this.curiosityLevel = 'low';
    }
  }

  extractTopics(text) {
    const keywords = [
      'tecnología', 'programación', 'productividad', 'organización',
      'creatividad', 'aprendizaje', 'salud', 'ejercicio', 'música',
      'arte', 'ciencia', 'historia', 'idiomas', 'cocina', 'viajes'
    ];

    return keywords.filter(keyword => text.toLowerCase().includes(keyword));
  }

  // Suggestion Management
  addSuggestion(suggestion) {
    const fullSuggestion = {
      ...suggestion,
      id: Date.now(),
      timestamp: Date.now(),
      shown: false,
      dismissed: false
    };

    this.suggestions.push(fullSuggestion);

    // Keep suggestions manageable
    if (this.suggestions.length > 50) {
      this.suggestions = this.suggestions.slice(-25);
    }

    return fullSuggestion;
  }

  getPendingSuggestions() {
    return this.suggestions.filter(s => !s.shown && !s.dismissed);
  }

  markSuggestionShown(id) {
    const suggestion = this.suggestions.find(s => s.id === id);
    if (suggestion) {
      suggestion.shown = true;
    }
  }

  dismissSuggestion(id) {
    const suggestion = this.suggestions.find(s => s.id === id);
    if (suggestion) {
      suggestion.dismissed = true;
    }
  }

  // Get current state for UI
  getCurrentState() {
    return {
      attention: { ...this.attentionState },
      curiosityLevel: this.curiosityLevel,
      pendingSuggestions: this.getPendingSuggestions().length,
      interests: [...this.interests],
      totalSuggestions: this.suggestions.length
    };
  }

  // Cleanup
  destroy() {
    if (this.proactiveTimer) {
      clearInterval(this.proactiveTimer);
    }
  }
}

// Create singleton instance
const curiosityService = new CuriosityService();

export default curiosityService;