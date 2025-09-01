// Learning Service - Tracks user behavior and learns patterns
class LearningService {
  constructor() {
    this.userProfile = this.loadUserProfile();
    this.behaviorLog = [];
    this.patterns = {
      activeHours: [],
      commonQuestions: [],
      interactionStyle: 'formal',
      preferences: {}
    };
    this.startBehaviorTracking();
  }

  // Load existing user profile from localStorage
  loadUserProfile() {
    try {
      const saved = localStorage.getItem('jvairyx-user-profile');
      return saved ? JSON.parse(saved) : this.getDefaultProfile();
    } catch (error) {
      console.log('Creating new user profile');
      return this.getDefaultProfile();
    }
  }

  // Default user profile structure
  getDefaultProfile() {
    return {
      name: '',
      preferences: {
        language: 'es',
        formality: 'informal',
        responseLength: 'medium',
        interests: []
      },
      patterns: {
        activeHours: [],
        commonTopics: [],
        typingSpeed: 0,
        avgSessionTime: 0
      },
      stats: {
        totalInteractions: 0,
        totalTime: 0,
        lastActivity: new Date().toISOString()
      }
    };
  }

  // Save user profile to localStorage
  saveUserProfile() {
    try {
      localStorage.setItem('jvairyx-user-profile', JSON.stringify(this.userProfile));
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  }

  // Track user interaction
  logInteraction(type, data) {
    const interaction = {
      type,
      data,
      timestamp: new Date(),
      hour: new Date().getHours()
    };

    this.behaviorLog.push(interaction);
    this.updatePatterns(interaction);
    this.userProfile.stats.totalInteractions++;
    this.userProfile.stats.lastActivity = new Date().toISOString();
    this.saveUserProfile();

    // Keep log manageable
    if (this.behaviorLog.length > 1000) {
      this.behaviorLog = this.behaviorLog.slice(-500);
    }
  }

  // Update patterns based on interactions
  updatePatterns(interaction) {
    // Track active hours
    const hour = interaction.hour;
    if (!this.userProfile.patterns.activeHours.includes(hour)) {
      this.userProfile.patterns.activeHours.push(hour);
    }

    // Track common topics/questions
    if (interaction.type === 'message' && interaction.data.content) {
      const content = interaction.data.content.toLowerCase();
      const topics = this.extractTopics(content);
      topics.forEach(topic => {
        if (!this.userProfile.patterns.commonTopics.includes(topic)) {
          this.userProfile.patterns.commonTopics.push(topic);
        }
      });
    }
  }

  // Simple topic extraction
  extractTopics(text) {
    const keywords = [
      'archivo', 'carpeta', 'documento', 'tarea', 'proyecto', 'trabajo',
      'internet', 'web', 'buscar', 'ayuda', 'configuracion', 'sistema',
      'tiempo', 'recordatorio', 'nota', 'organizacion', 'productividad'
    ];

    return keywords.filter(keyword => text.includes(keyword));
  }

  // Start tracking user behavior
  startBehaviorTracking() {
    this.trackFocus();
    this.trackTypingPatterns();
  }

  // Track user focus/attention
  trackFocus() {
    let focusStart = Date.now();
    let isUserActive = true;
    let idleTimer;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      if (!isUserActive) {
        isUserActive = true;
        this.logInteraction('focus_return', { duration: Date.now() - focusStart });
      }
      
      idleTimer = setTimeout(() => {
        if (isUserActive) {
          isUserActive = false;
          this.logInteraction('idle_detected', { duration: Date.now() - focusStart });
        }
      }, 30000); // 30 seconds of inactivity
    };

    // Track various user activities
    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('keypress', resetIdleTimer);
    document.addEventListener('click', resetIdleTimer);
    document.addEventListener('scroll', resetIdleTimer);

    // Track window focus
    window.addEventListener('focus', () => {
      this.logInteraction('window_focus', {});
      resetIdleTimer();
    });

    window.addEventListener('blur', () => {
      this.logInteraction('window_blur', {});
    });

    resetIdleTimer();
  }

  // Track typing patterns
  trackTypingPatterns() {
    let keyStrokes = [];
    let typingStart = null;

    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        if (!typingStart) typingStart = Date.now();
        keyStrokes.push(Date.now());
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' && keyStrokes.length > 0) {
        const duration = Date.now() - typingStart;
        const speed = keyStrokes.length / (duration / 1000); // chars per second
        
        this.logInteraction('typing_pattern', {
          speed,
          duration,
          keyCount: keyStrokes.length
        });

        keyStrokes = [];
        typingStart = null;
      }
    });
  }

  // Get personalized response based on user profile
  getPersonalizedResponse(userMessage) {
    const hour = new Date().getHours();
    const isActiveHour = this.userProfile.patterns.activeHours.includes(hour);
    const formality = this.userProfile.preferences.formality;
    
    // Check if user seems distracted based on recent patterns
    const recentIdle = this.behaviorLog
      .filter(log => log.type === 'idle_detected' && Date.now() - log.timestamp < 300000) // last 5 minutes
      .length;

    let response = this.generateContextualResponse(userMessage, formality);

    // Add personalized touches
    if (recentIdle > 2) {
      response += " Por cierto, he notado que podrías estar un poco distraído. ¿Te gustaría que te ayude a enfocarte?";
    }

    if (!isActiveHour && this.userProfile.patterns.activeHours.length > 3) {
      response += " Veo que normalmente no estás tan activo a esta hora. ¿Todo bien?";
    }

    return response;
  }

  // Generate contextual response
  generateContextualResponse(userMessage, formality = 'informal') {
    const message = userMessage.toLowerCase();
    const formal = formality === 'formal';

    // Basic context-aware responses
    if (message.includes('distraid') || message.includes('concentr') || message.includes('focus')) {
      return formal ? 
        "Entiendo su preocupación por la concentración. Permítame sugerir algunas técnicas de productividad." :
        "¡Te entiendo! La concentración puede ser difícil. ¿Te ayudo con algunas técnicas para mantenerte enfocado?";
    }

    if (message.includes('archivo') || message.includes('carpeta') || message.includes('documento')) {
      return formal ?
        "Puedo asistirle con la gestión de archivos y documentos. ¿Qué operación específica necesita realizar?" :
        "¡Perfecto! Puedo ayudarte con archivos y carpetas. ¿Qué necesitas hacer exactamente?";
    }

    if (message.includes('internet') || message.includes('web') || message.includes('buscar')) {
      return formal ?
        "Tengo capacidades de navegación web. Permítame ayudarle con su búsqueda." :
        "¡Genial! Puedo ayudarte a navegar por internet. ¿Qué quieres buscar?";
    }

    // Default responses based on formality
    const responses = formal ? [
      'Comprendo su solicitud. Procesando la información en mis sistemas.',
      'Perfecto. Permítame analizar su consulta con mis algoritmos avanzados.',
      'Excelente pregunta. Estoy evaluando las mejores opciones para usted.',
      'He recibido su mensaje. Procesando respuesta optimizada.'
    ] : [
      '¡Entendido! Déjame pensar en la mejor forma de ayudarte.',
      'Perfecto, estoy analizando tu consulta con toda mi capacidad neural.',
      '¡Excelente! Mis circuitos están trabajando en tu respuesta.',
      'Recibido. Procesando tu mensaje en tiempo real.'
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Get user insights for proactive suggestions
  getUserInsights() {
    const now = new Date();
    const hour = now.getHours();
    const insights = [];

    // Check activity patterns
    if (this.userProfile.patterns.activeHours.length > 0) {
      const avgActiveHour = this.userProfile.patterns.activeHours.reduce((a, b) => a + b, 0) / this.userProfile.patterns.activeHours.length;
      
      if (Math.abs(hour - avgActiveHour) > 3) {
        insights.push({
          type: 'unusual_time',
          message: 'Noto que normalmente no estás activo a esta hora. ¿Hay algo específico en lo que pueda ayudarte?'
        });
      }
    }

    // Check for repeated topics
    const commonTopics = this.userProfile.patterns.commonTopics;
    if (commonTopics.length > 0 && Math.random() > 0.7) {
      const topic = commonTopics[Math.floor(Math.random() * commonTopics.length)];
      insights.push({
        type: 'topic_suggestion',
        message: `He notado que sueles preguntar sobre ${topic}. ¿Te gustaría que profundice en algún aspecto específico?`
      });
    }

    return insights;
  }
}

// Create singleton instance
const learningService = new LearningService();

export default learningService;