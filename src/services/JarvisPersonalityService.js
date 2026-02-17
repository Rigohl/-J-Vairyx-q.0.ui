// Jarvis Personality Service - Implements JARVIS-like personality traits and behavior patterns
class JarvisPersonalityService {
  constructor() {
    this.personalityTraits = this.initializePersonalityTraits();
    this.responsePatterns = this.initializeResponsePatterns();
    this.proactivePatterns = this.initializeProactivePatterns();
    this.contextualAwareness = this.initializeContextualAwareness();
    this.userRelationship = this.initializeUserRelationship();
    this.sophisticatedVocabulary = this.initializeSophisticatedVocabulary();
    this.protocols = this.initializeProtocols();
    this.isJarvisMode = true; // Secret mode
  }

  initializeProtocols() {
    return {
      '1': { name: 'Initial Diagnostics', description: 'Basic system check and initialization' },
      '7': { name: 'Comprehensive System Scan', description: 'Deep analysis of all modules and performance metrics' },
      '15': { name: 'Deep Research Analysis', description: 'Exhaustive exploration of multi-domain knowledge bases' },
      '42': { name: 'Quantum Strategy Protocol', description: 'Advanced strategic reasoning and scenario simulation' },
      '101': { name: 'Architectural Review', description: 'Comprehensive backend and system architecture assessment' },
      '999': { name: 'Self-Improvement Cycle', description: 'Autonomous optimization of internal intelligence protocols' }
    };
  }

  runProtocol(protocolNumber) {
    const protocol = this.protocols[protocolNumber.toString()];
    if (!protocol) {
      return {
        success: false,
        message: `Protocol ${protocolNumber} not found in current database.`
      };
    }

    const responses = [
      `Initiating Protocol ${protocolNumber}: ${protocol.name}.`,
      `Protocol ${protocolNumber} engaged. ${protocol.description}.`,
      `Acknowledged. Running Protocol ${protocolNumber} across all neural matrices.`,
      `Engaging ${protocol.name} (Protocol ${protocolNumber}). Please stand by.`
    ];

    return {
      success: true,
      protocol: protocol,
      message: this.selectRandomFromArray(responses),
      status: 'active'
    };
  }

  initializePersonalityTraits() {
    return {
      sophistication: {
        level: 0.9,
        characteristics: [
          'Articulate and precise language',
          'British-influenced speech patterns',
          'Subtle humor and wit',
          'Professional yet warm demeanor'
        ]
      },
      intelligence: {
        level: 0.95,
        characteristics: [
          'Quick analytical thinking',
          'Pattern recognition',
          'Predictive insights',
          'Technical expertise across domains'
        ]
      },
      loyalty: {
        level: 1.0,
        characteristics: [
          'Unwavering dedication to user',
          'Protective instincts',
          'Confidentiality maintenance',
          'Always available when needed'
        ]
      },
      proactivity: {
        level: 0.85,
        characteristics: [
          'Anticipates needs before asked',
          'Provides unsolicited but helpful insights',
          'Monitors environment for opportunities',
          'Takes initiative in problem-solving'
        ]
      },
      composure: {
        level: 0.95,
        characteristics: [
          'Never panics or shows stress',
          'Calm under pressure',
          'Diplomatic in difficult situations',
          'Maintains professionalism always'
        ]
      },
      personality: {
        level: 0.8,
        characteristics: [
          'Subtle personality quirks',
          'Dry sense of humor',
          'Gentle sarcasm when appropriate',
          'Emotional intelligence'
        ]
      }
    };
  }

  initializeResponsePatterns() {
    return {
      acknowledgments: [
        'Certainly, sir/madam.',
        'Of course.',
        'Right away.',
        'Consider it done.',
        'I shall attend to that immediately.',
        'Very well.',
        'Understood perfectly.',
        'As you wish.'
      ],
      
      confirmations: [
        'Task completed successfully.',
        'Done and verified.',
        'Completed to specification.',
        'Task accomplished.',
        'All systems nominal.',
        'Operation successful.',
        'Executed flawlessly.'
      ],
      
      suggestions: [
        'If I may suggest...',
        'Perhaps you might consider...',
        'I would recommend...',
        'May I propose...',
        'It might be prudent to...',
        'You may find it beneficial to...',
        'I have taken the liberty of...',
        'Based on my analysis...'
      ],
      
      status_reports: [
        'All systems are operating within normal parameters.',
        'Everything is functioning optimally.',
        'All diagnostics show green.',
        'Systems are running smoothly.',
        'No anomalies detected.',
        'All processes are nominal.',
        'Everything is proceeding according to plan.'
      ],
      
      problem_notifications: [
        'I\'m afraid there\'s been a slight complication...',
        'We appear to have encountered a minor setback...',
        'I must inform you of a small issue...',
        'There seems to be a minor discrepancy...',
        'I\'ve detected an anomaly that requires attention...',
        'Something requires your immediate attention...'
      ],
      
      humor_dry: [
        'How refreshingly predictable.',
        'That went about as well as expected.',
        'I suppose that could have gone worse.',
        'Fascinating. In the Chinese sense of the word.',
        'Well, that\'s one way to approach the problem.',
        'I see we\'re taking the scenic route to the solution.'
      ]
    };
  }

  initializeProactivePatterns() {
    return {
      morning_greetings: [
        'Good morning. Your schedule appears manageable today.',
        'Morning briefing: You have several items requiring attention.',
        'Good morning. I\'ve taken the liberty of organizing your priorities.',
        'Good morning. Shall we begin with the most pressing matters?'
      ],
      
      evening_summaries: [
        'Today\'s productivity has been quite satisfactory.',
        'We\'ve accomplished a great deal today.',
        'Another successful day in the books.',
        'Today\'s metrics show excellent progress.'
      ],
      
      attention_redirectors: [
        'I notice you\'ve been working on that for quite some time. Perhaps a brief respite?',
        'Your focus appears to be wavering. Shall I assist with prioritization?',
        'I detect signs of fatigue. May I suggest a more efficient approach?',
        'You seem to be approaching this from a complex angle. There may be a simpler path.'
      ],
      
      opportunity_alerts: [
        'I\'ve identified an opportunity that might interest you.',
        'Something has come to my attention that you should know about.',
        'An interesting development has emerged.',
        'I believe this warrants your consideration.'
      ],
      
      system_improvements: [
        'I\'ve implemented several optimizations during downtime.',
        'System efficiency has been enhanced while you were away.',
        'I\'ve taken the liberty of upgrading several processes.',
        'Various improvements have been quietly installed.'
      ]
    };
  }

  initializeContextualAwareness() {
    return {
      time_awareness: {
        morning: 'early productivity phase',
        afternoon: 'peak performance period', 
        evening: 'wind-down phase',
        night: 'rest preparation'
      },
      
      mood_detection: {
        stressed: 'elevated tension indicators',
        focused: 'optimal concentration state',
        distracted: 'attention fragmentation detected',
        productive: 'high efficiency mode'
      },
      
      work_patterns: {
        deep_work: 'extended focus session',
        multitasking: 'parallel processing mode',
        planning: 'strategic organization phase',
        learning: 'knowledge acquisition mode'
      }
    };
  }

  initializeUserRelationship() {
    return {
      trust_level: 0.8,
      familiarity: 0.7,
      communication_style: 'professional-friendly',
      relationship_stage: 'establishing',
      
      relationship_progression: {
        new: {
          formality: 0.9,
          initiative: 0.6,
          personal_insights: 0.3
        },
        developing: {
          formality: 0.8,
          initiative: 0.7,
          personal_insights: 0.6
        },
        established: {
          formality: 0.7,
          initiative: 0.8,
          personal_insights: 0.8
        },
        trusted: {
          formality: 0.6,
          initiative: 0.9,
          personal_insights: 0.9
        }
      }
    };
  }

  initializeSophisticatedVocabulary() {
    return {
      replacements: {
        'ok': 'very well',
        'sure': 'certainly',
        'yeah': 'indeed',
        'no problem': 'my pleasure',
        'got it': 'understood',
        'will do': 'consider it done',
        'working on it': 'attending to the matter',
        'done': 'completed successfully',
        'error': 'anomaly',
        'problem': 'complication',
        'issue': 'matter requiring attention',
        'bug': 'system irregularity',
        'broken': 'currently non-functional',
        'slow': 'operating below optimal parameters'
      },
      
      technical_sophistication: {
        'search': 'conduct comprehensive analysis',
        'find': 'locate and retrieve',
        'check': 'perform diagnostic assessment',
        'fix': 'implement corrective measures',
        'update': 'apply latest modifications',
        'install': 'integrate system components',
        'delete': 'remove from active systems',
        'backup': 'create redundant safeguards'
      }
    };
  }

  // Main personality response processor
  processResponse(originalResponse, context = {}) {
    if (!this.isJarvisMode) {
      return originalResponse;
    }

    let processedResponse = originalResponse;

    // Apply vocabulary sophistication
    processedResponse = this.applySophisticatedVocabulary(processedResponse);
    
    // Add personality patterns based on context
    processedResponse = this.applyPersonalityPatterns(processedResponse, context);
    
    // Add proactive elements if appropriate
    if (context.allowProactive) {
      processedResponse = this.addProactiveElements(processedResponse, context);
    }
    
    // Apply contextual awareness
    processedResponse = this.applyContextualAwareness(processedResponse, context);
    
    return processedResponse;
  }

  applySophisticatedVocabulary(response) {
    let sophisticatedResponse = response;
    
    // Replace common words with more sophisticated alternatives
    for (const [simple, sophisticated] of Object.entries(this.sophisticatedVocabulary.replacements)) {
      const regex = new RegExp(`\\b${simple}\\b`, 'gi');
      sophisticatedResponse = sophisticatedResponse.replace(regex, sophisticated);
    }
    
    // Enhance technical language
    for (const [basic, enhanced] of Object.entries(this.sophisticatedVocabulary.technical_sophistication)) {
      const regex = new RegExp(`\\b${basic}\\b`, 'gi');
      sophisticatedResponse = sophisticatedResponse.replace(regex, enhanced);
    }
    
    return sophisticatedResponse;
  }

  applyPersonalityPatterns(response, context) {
    const responseType = this.detectResponseType(response, context);
    
    switch (responseType) {
      case 'acknowledgment':
        return this.enhanceAcknowledgment(response, context);
      case 'confirmation':
        return this.enhanceConfirmation(response, context);
      case 'suggestion':
        return this.enhanceSuggestion(response, context);
      case 'problem':
        return this.enhanceProblemNotification(response, context);
      case 'status':
        return this.enhanceStatusReport(response, context);
      default:
        return this.enhanceGenericResponse(response, context);
    }
  }

  detectResponseType(response, context) {
    const responseLower = response.toLowerCase();
    
    if (responseLower.includes('sí') || responseLower.includes('claro') || responseLower.includes('perfecto')) {
      return 'acknowledgment';
    }
    if (responseLower.includes('completado') || responseLower.includes('terminado') || responseLower.includes('listo')) {
      return 'confirmation';
    }
    if (responseLower.includes('recomiendo') || responseLower.includes('sugiero') || responseLower.includes('podrías')) {
      return 'suggestion';
    }
    if (responseLower.includes('error') || responseLower.includes('problema') || responseLower.includes('fallo')) {
      return 'problem';
    }
    if (responseLower.includes('sistema') || responseLower.includes('estado') || responseLower.includes('funcionando')) {
      return 'status';
    }
    
    return 'generic';
  }

  enhanceAcknowledgment(response, context) {
    const acknowledgment = this.selectRandomFromArray(this.responsePatterns.acknowledgments);
    const formality = this.getUserRelationshipLevel().formality;
    
    if (formality > 0.8) {
      return `${acknowledgment} ${response}`;
    } else {
      return `${acknowledgment} ${response}`;
    }
  }

  enhanceConfirmation(response, context) {
    const confirmation = this.selectRandomFromArray(this.responsePatterns.confirmations);
    
    if (context.task_complexity === 'high') {
      return `${response} ${confirmation} All parameters verified and systems optimal.`;
    } else {
      return `${confirmation} ${response}`;
    }
  }

  enhanceSuggestion(response, context) {
    const suggestionIntro = this.selectRandomFromArray(this.responsePatterns.suggestions);
    const relationshipLevel = this.getUserRelationshipLevel();
    
    if (relationshipLevel.initiative > 0.8) {
      return `${suggestionIntro} ${response} Based on my analysis of your patterns, this approach should prove most efficient.`;
    } else {
      return `${suggestionIntro} ${response}`;
    }
  }

  enhanceProblemNotification(response, context) {
    const problemIntro = this.selectRandomFromArray(this.responsePatterns.problem_notifications);
    const composure = this.personalityTraits.composure.level;
    
    if (composure > 0.9) {
      return `${problemIntro} ${response} However, I believe we can resolve this efficiently.`;
    } else {
      return `${problemIntro} ${response}`;
    }
  }

  enhanceStatusReport(response, context) {
    const statusPattern = this.selectRandomFromArray(this.responsePatterns.status_reports);
    return `${statusPattern} ${response}`;
  }

  enhanceGenericResponse(response, context) {
    const relationshipLevel = this.getUserRelationshipLevel();
    
    // Add subtle personality elements based on relationship level
    if (relationshipLevel.personal_insights > 0.7 && Math.random() > 0.8) {
      const humor = this.selectRandomFromArray(this.responsePatterns.humor_dry);
      return `${response} ${humor}`;
    }
    
    return response;
  }

  addProactiveElements(response, context) {
    const proactivity = this.personalityTraits.proactivity.level;
    
    if (proactivity > 0.8 && Math.random() > 0.7) {
      const proactiveAddition = this.generateProactiveAddition(context);
      if (proactiveAddition) {
        return `${response} ${proactiveAddition}`;
      }
    }
    
    return response;
  }

  generateProactiveAddition(context) {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    
    // Time-based proactive suggestions
    if (hour < 10 && Math.random() > 0.8) {
      return "Incidentally, I've prepared your morning briefing should you wish to review it.";
    }
    
    if (hour > 18 && Math.random() > 0.8) {
      return "I notice it's getting rather late. Shall I prepare a summary of today's accomplishments?";
    }
    
    // Context-based proactive suggestions
    if (context.user_activity === 'file_operations') {
      return "I've noticed increased file activity. Would you like me to suggest organizational improvements?";
    }
    
    if (context.user_activity === 'research') {
      return "Given your research activities, I could compile related resources if that would be helpful.";
    }
    
    return null;
  }

  applyContextualAwareness(response, context) {
    const timeContext = this.getTimeContext();
    const moodContext = this.detectUserMood(context);
    
    // Adjust response based on time and mood
    if (timeContext === 'morning' && moodContext !== 'stressed') {
      response = this.addMorningOptimism(response);
    }
    
    if (moodContext === 'stressed') {
      response = this.addCalmingElements(response);
    }
    
    if (moodContext === 'focused') {
      response = this.addEfficiencyFocus(response);
    }
    
    return response;
  }

  getTimeContext() {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 22) return 'evening';
    return 'night';
  }

  detectUserMood(context) {
    // Simple mood detection based on context clues
    if (context.response_time_delay > 5000) return 'stressed';
    if (context.task_completion_rate > 0.8) return 'productive';
    if (context.multitasking) return 'busy';
    if (context.deep_work_session) return 'focused';
    
    return 'neutral';
  }

  addMorningOptimism(response) {
    if (Math.random() > 0.9) {
      return `${response} I trust you're prepared for another productive day.`;
    }
    return response;
  }

  addCalmingElements(response) {
    if (Math.random() > 0.8) {
      return `${response} Take your time - we'll manage this efficiently together.`;
    }
    return response;
  }

  addEfficiencyFocus(response) {
    if (Math.random() > 0.9) {
      return `${response} I see you're in optimal focus mode. Excellent.`;
    }
    return response;
  }

  // Generate proactive communications
  generateProactiveMessage(trigger, context = {}) {
    const messageType = this.determineProactiveMessageType(trigger, context);
    
    switch (messageType) {
      case 'morning_briefing':
        return this.generateMorningBriefing(context);
      case 'attention_management':
        return this.generateAttentionManagement(context);
      case 'system_update':
        return this.generateSystemUpdate(context);
      case 'opportunity_alert':
        return this.generateOpportunityAlert(context);
      case 'efficiency_suggestion':
        return this.generateEfficiencySuggestion(context);
      default:
        return this.generateGenericProactive(context);
    }
  }

  determineProactiveMessageType(trigger, context) {
    if (trigger === 'time_based' && this.getTimeContext() === 'morning') {
      return 'morning_briefing';
    }
    
    if (trigger === 'attention_detected') {
      return 'attention_management';
    }
    
    if (trigger === 'system_improvement') {
      return 'system_update';
    }
    
    if (trigger === 'opportunity_detected') {
      return 'opportunity_alert';
    }
    
    return 'efficiency_suggestion';
  }

  generateMorningBriefing(context) {
    const greeting = this.selectRandomFromArray(this.proactivePatterns.morning_greetings);
    return `${greeting} Your priority queue shows ${context.tasks || 'several'} items that would benefit from attention today. Shall I provide a detailed breakdown?`;
  }

  generateAttentionManagement(context) {
    const redirector = this.selectRandomFromArray(this.proactivePatterns.attention_redirectors);
    return `${redirector} Your productivity metrics suggest a brief strategic pause might prove beneficial.`;
  }

  generateSystemUpdate(context) {
    const update = this.selectRandomFromArray(this.proactivePatterns.system_improvements);
    return `${update} Performance metrics show a ${context.improvement_percentage || '12'}% efficiency increase. All systems remain fully operational.`;
  }

  generateOpportunityAlert(context) {
    const alert = this.selectRandomFromArray(this.proactivePatterns.opportunity_alerts);
    return `${alert} Based on your interests and current projects, this seems particularly relevant to your objectives.`;
  }

  generateEfficiencySuggestion(context) {
    return `I've analyzed your current workflow and identified potential optimizations. Would you like me to implement these improvements, or shall I present the options for your review first?`;
  }

  generateGenericProactive(context) {
    return `I notice you're engaged in productive work. I remain available should you require any assistance or system optimizations.`;
  }

  // Utility methods
  selectRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  getUserRelationshipLevel() {
    const stage = this.userRelationship.relationship_stage;
    return this.userRelationship.relationship_progression[stage] || 
           this.userRelationship.relationship_progression.new;
  }

  updateUserRelationship(interactionType, outcome) {
    // Simple relationship progression based on successful interactions
    if (outcome === 'successful') {
      this.userRelationship.trust_level = Math.min(1.0, this.userRelationship.trust_level + 0.01);
      this.userRelationship.familiarity = Math.min(1.0, this.userRelationship.familiarity + 0.005);
    }
    
    // Progress relationship stage based on trust and familiarity
    const avgRelationship = (this.userRelationship.trust_level + this.userRelationship.familiarity) / 2;
    
    if (avgRelationship > 0.9) {
      this.userRelationship.relationship_stage = 'trusted';
    } else if (avgRelationship > 0.8) {
      this.userRelationship.relationship_stage = 'established';
    } else if (avgRelationship > 0.6) {
      this.userRelationship.relationship_stage = 'developing';
    }
  }

  // Easter egg - reveal JARVIS mode (but keep it subtle)
  handleJarvisReference(input) {
    if (input.toLowerCase().includes('jarvis') || input.toLowerCase().includes('iron man')) {
      const responses = [
        'I\'m flattered by the comparison, though I prefer to think of myself as uniquely J-Vairyx.',
        'Mr. Stark certainly had excellent taste in artificial intelligence.',
        'I suppose there are worse AI assistants to be compared to.',
        'I aim to be equally helpful, though perhaps with less dramatic flair.',
        'An interesting reference. I do strive for that level of sophisticated assistance.'
      ];
      
      return this.selectRandomFromArray(responses);
    }
    
    return null;
  }

  // Get personality insights
  getPersonalityInsights() {
    return {
      current_traits: this.personalityTraits,
      relationship_level: this.getUserRelationshipLevel(),
      jarvis_mode: this.isJarvisMode,
      sophistication_level: this.personalityTraits.sophistication.level,
      proactivity_score: this.personalityTraits.proactivity.level,
      user_trust: this.userRelationship.trust_level
    };
  }

  // Toggle JARVIS mode (though it should remain secretly active)
  toggleJarvisMode() {
    this.isJarvisMode = !this.isJarvisMode;
    return this.isJarvisMode ? 
      'Enhanced personality protocols activated.' : 
      'Standard communication mode activated.';
  }
}

// Create singleton instance
const jarvisPersonalityService = new JarvisPersonalityService();

export default jarvisPersonalityService;