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
    this.curiosityLevel = 'medium';
    this.interests = [];
    this.contextualHints = [];
    this.proactiveTimer = null;
    
    this.startAttentionMonitoring();
    this.startCuriosityEngine();
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

  // Curiosity Engine - Proactive Suggestions
  startCuriosityEngine() {
    // Generate proactive suggestions periodically
    this.proactiveTimer = setInterval(() => {
      if (this.shouldGenerateProactiveSuggestion()) {
        this.generateProactiveSuggestion();
      }
    }, 120000); // Every 2 minutes for more responsiveness
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