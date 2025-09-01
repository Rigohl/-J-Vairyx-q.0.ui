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
    }, 300000); // Every 5 minutes
  }

  shouldGenerateProactiveSuggestion() {
    // Don't suggest if user is idle or recently got a suggestion
    if (!this.attentionState.isActive) return false;
    
    const lastSuggestion = this.suggestions[this.suggestions.length - 1];
    if (lastSuggestion && Date.now() - lastSuggestion.timestamp < 600000) { // 10 minutes
      return false;
    }

    // Generate suggestions based on curiosity level
    const chance = this.curiosityLevel === 'high' ? 0.7 : 
                   this.curiosityLevel === 'medium' ? 0.4 : 0.2;
    
    return Math.random() < chance;
  }

  generateProactiveSuggestion() {
    const currentHour = new Date().getHours();
    const suggestions = [];

    // Time-based suggestions
    if (currentHour >= 9 && currentHour <= 11) {
      suggestions.push({
        type: 'morning_productivity',
        message: '¡Buenos días! Las mañanas son ideales para tareas que requieren más concentración. ¿Te ayudo a planificar tu día?'
      });
    } else if (currentHour >= 14 && currentHour <= 16) {
      suggestions.push({
        type: 'afternoon_energy',
        message: 'Es media tarde, un buen momento para revisar el progreso del día. ¿Quieres que revisemos tus tareas pendientes?'
      });
    } else if (currentHour >= 18 && currentHour <= 20) {
      suggestions.push({
        type: 'evening_wrap',
        message: 'Se acerca el final del día. ¿Te ayudo a organizar lo que lograste hoy y planificar para mañana?'
      });
    }

    // Learning-based suggestions
    suggestions.push({
      type: 'skill_development',
      message: '¿Sabías que puedo ayudarte a aprender nuevas habilidades? ¿Hay algo específico que te gustaría dominar?'
    });

    suggestions.push({
      type: 'efficiency_tip',
      message: 'He aprendido algunas formas de mejorar tu productividad. ¿Te interesa conocer algunos consejos personalizados?'
    });

    suggestions.push({
      type: 'exploration',
      message: '¿Te gusta explorar temas nuevos? Puedo sugerirte contenido interesante basado en tus intereses.'
    });

    // Random curiosity
    suggestions.push({
      type: 'random_fact',
      message: '¿Sabías que...? ¡Tengo datos curiosos que podrían interesarte! ¿Quieres escuchar uno?'
    });

    const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    this.addSuggestion({
      ...suggestion,
      urgency: 'low',
      category: 'proactive'
    });

    return suggestion;
  }

  // Contextual Intelligence
  analyzeContext(userMessage, currentModule) {
    const context = {
      message: userMessage.toLowerCase(),
      module: currentModule,
      timestamp: new Date(),
      suggestions: []
    };

    // Analyze message for context clues
    if (context.message.includes('ayuda') || context.message.includes('help')) {
      context.suggestions.push({
        type: 'help_context',
        message: 'Veo que necesitas ayuda. ¿Quieres que te explique todas mis capacidades o hay algo específico?'
      });
    }

    if (context.message.includes('aburrido') || context.message.includes('boring')) {
      context.suggestions.push({
        type: 'entertainment',
        message: '¡Parece que necesitas algo más emocionante! ¿Te muestro algo interesante o te ayudo con un proyecto creativo?'
      });
    }

    if (context.message.includes('trabajo') || context.message.includes('tarea')) {
      context.suggestions.push({
        type: 'work_assistance',
        message: 'Perfecto, me encanta ayudar con el trabajo. ¿Necesitas organización, investigación o algo más específico?'
      });
    }

    return context;
  }

  generateSmartSuggestions(userProfile, recentActivities) {
    const suggestions = [];

    // Based on user patterns
    if (userProfile.patterns.commonTopics.includes('productividad')) {
      suggestions.push({
        type: 'productivity_boost',
        message: 'Noto que te interesa la productividad. ¿Te gustaría que analice tus patrones y sugiera optimizaciones?'
      });
    }

    // Based on recent activities
    if (recentActivities.filter(a => a.type === 'file').length > 3) {
      suggestions.push({
        type: 'file_management',
        message: 'Has estado trabajando mucho con archivos. ¿Quieres que te ayude a crear un sistema de organización más eficiente?'
      });
    }

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