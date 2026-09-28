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
    this.curiosityLevel = 'high';
    this.interests = [];
    this.contextualHints = [];
    this.proactiveTimer = null;
    this.researchMotivation = 'high';
    this.researchTopics = new Map();
    this.pendingInvestigations = [];
    this.knowledgeHunger = 0.9;
    this.autonomousResearchMode = true;
    this.researchHistory = [];
    this.currentResearchSession = null;
    this.startAttentionMonitoring();
    this.startCuriosityEngine();
  }

  startAttentionMonitoring() {
    if (typeof document === 'undefined') return;
    let lastMouseMove = Date.now();
    let lastKeyPress = Date.now();
    document.addEventListener('mousemove', () => {
      lastMouseMove = Date.now();
      this.updateAttentionState('mouse_move');
    });
    document.addEventListener('keypress', () => {
      lastKeyPress = Date.now();
      this.updateAttentionState('key_press');
    });
    setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = Math.min(now - lastMouseMove, now - lastKeyPress);
      if (timeSinceLastActivity > 30000) {
        this.attentionState.isActive = false;
        this.attentionState.idleTime = timeSinceLastActivity;
      } else {
        this.attentionState.isActive = true;
        this.attentionState.lastActivity = now;
      }
    }, 5000);
  }

  updateAttentionState(activityType) {
    this.attentionState.lastActivity = Date.now();
    this.attentionState.isActive = true;
    this.attentionState.idleTime = 0;
    if (this.attentionState.focusScore < 100) {
      this.attentionState.focusScore = Math.min(100, this.attentionState.focusScore + 2);
    }
  }

  startCuriosityEngine() {
    if (this.proactiveTimer) {
      clearInterval(this.proactiveTimer);
    }
    this.proactiveTimer = setInterval(() => {
      if (this.shouldGenerateProactiveSuggestion()) {
        this.generateProactiveSuggestion();
      }
      this.evaluateResearchOpportunities();
      this.suggestKnowledgeExpansion();
      this.analyzeCurrentContext();
    }, 120000);
  }

  shouldGenerateProactiveSuggestion() {
    return this.attentionState.focusScore < 70 && Math.random() > 0.5;
  }

  generateProactiveSuggestion() {
    const messages = [
      '¿Necesitas ayuda con algo específico?',
      'Puedo investigar un tema por ti.',
      '¿Quieres organizar tus tareas?'
    ];
    this.addSuggestion({
      type: 'proactive',
      message: messages[Math.floor(Math.random() * messages.length)],
      urgency: 'low'
    });
  }

  evaluateResearchOpportunities() {
    return [];
  }

  suggestKnowledgeExpansion() {
    return [];
  }

  analyzeCurrentContext() {
    return {
      currentTime: new Date(),
      userActivityLevel: this.attentionState.focusScore,
      suggestions: []
    };
  }

  analyzeContext(message, module) {
    const suggestions = [];
    if (message && message.length > 20) {
      suggestions.push({
        type: 'context',
        message: 'Puedo profundizar en este tema si lo deseas.',
        actions: []
      });
    }
    return { suggestions, module, message };
  }

  addSuggestion(suggestion) {
    this.suggestions.push({
      ...suggestion,
      id: Date.now() + Math.random(),
      createdAt: new Date(),
      shown: false
    });
  }

  getPendingSuggestions() {
    return this.suggestions.filter(s => !s.shown);
  }

  markSuggestionShown(id) {
    const s = this.suggestions.find(x => x.id === id);
    if (s) s.shown = true;
  }

  dismissSuggestion(id) {
    this.suggestions = this.suggestions.filter(s => s.id !== id);
  }

  getCurrentState() {
    return {
      attention: this.attentionState,
      curiosityLevel: this.curiosityLevel,
      pendingSuggestions: this.getPendingSuggestions().length
    };
  }
}

const curiosityService = new CuriosityService();
export default curiosityService;
