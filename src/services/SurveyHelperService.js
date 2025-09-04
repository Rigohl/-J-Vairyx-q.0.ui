// Survey Helper Service - Quick and intelligent survey response capabilities
class SurveyHelperService {
  constructor() {
    this.surveyPatterns = this.initializeSurveyPatterns();
    this.responseStrategies = this.initializeResponseStrategies();
    this.userProfile = null; // Will be linked to LearningService
    this.surveyHistory = [];
    this.responseTemplates = this.initializeResponseTemplates();
  }

  initializeSurveyPatterns() {
    return {
      satisfaction: {
        keywords: ['satisfecho', 'satisfied', 'contento', 'feliz', 'experiencia', 'calidad', 'servicio'],
        scales: ['muy_malo', 'malo', 'regular', 'bueno', 'excelente'],
        numeric: [1, 2, 3, 4, 5]
      },
      demographic: {
        keywords: ['edad', 'age', 'género', 'gender', 'educación', 'education', 'ingresos', 'income'],
        categories: ['personal', 'profesional', 'académico']
      },
      preference: {
        keywords: ['prefiere', 'prefer', 'gusta', 'like', 'mejor', 'favorite', 'elección', 'choice'],
        types: ['producto', 'servicio', 'marca', 'característica']
      },
      behavioral: {
        keywords: ['frecuencia', 'frequency', 'usa', 'use', 'compra', 'buy', 'visita', 'visit'],
        frequencies: ['nunca', 'raramente', 'ocasionalmente', 'frecuentemente', 'siempre']
      },
      opinion: {
        keywords: ['opina', 'think', 'cree', 'believe', 'considera', 'consider'],
        scales: ['totalmente_desacuerdo', 'desacuerdo', 'neutral', 'acuerdo', 'totalmente_acuerdo']
      }
    };
  }

  initializeResponseStrategies() {
    return {
      speed: {
        pattern_recognition: 'Identifica patrones comunes y sugiere respuestas automáticas',
        smart_defaults: 'Usa respuestas inteligentes basadas en el perfil del usuario',
        bulk_response: 'Procesa múltiples preguntas similares de una vez',
        template_matching: 'Aplica plantillas de respuesta a preguntas similares'
      },
      quality: {
        contextual_analysis: 'Analiza el contexto para respuestas más precisas',
        consistency_check: 'Verifica consistencia entre respuestas relacionadas',
        completeness_validation: 'Asegura que todas las preguntas requeridas estén respondidas',
        logic_validation: 'Valida la lógica de las respuestas concatenadas'
      },
      personalization: {
        profile_based: 'Usa el perfil del usuario para personalizar respuestas',
        history_aware: 'Considera encuestas anteriores para mantener consistencia',
        preference_learning: 'Aprende de patrones de respuesta para mejorar sugerencias',
        context_adaptation: 'Adapta el tono y estilo según el tipo de encuesta'
      }
    };
  }

  initializeResponseTemplates() {
    return {
      satisfaction_survey: {
        excellent: {
          numeric: 5,
          text: "Excelente servicio, superó mis expectativas completamente.",
          detailed: "La experiencia fue excepcional en todos los aspectos. El personal fue profesional, el servicio eficiente y la calidad superior a lo esperado."
        },
        good: {
          numeric: 4,
          text: "Muy buen servicio, casi perfecto con pequeños detalles mejorables.",
          detailed: "En general muy satisfecho con el servicio. Cumplió con mis expectativas y solo algunos detalles menores podrían mejorarse."
        },
        average: {
          numeric: 3,
          text: "Servicio adecuado, cumple con lo básico esperado.",
          detailed: "El servicio fue estándar, cumpliendo con los requisitos básicos. Hay espacio para mejoras en varios aspectos."
        },
        poor: {
          numeric: 2,
          text: "Servicio por debajo de expectativas, necesita mejoras importantes.",
          detailed: "La experiencia no fue satisfactoria. Varios aspectos necesitan mejorar significativamente para alcanzar un nivel aceptable."
        },
        terrible: {
          numeric: 1,
          text: "Servicio muy deficiente, requiere mejoras urgentes en múltiples áreas.",
          detailed: "Muy insatisfecho con el servicio recibido. Múltiples problemas y deficiencias que requieren atención inmediata."
        }
      },

      demographic_responses: {
        age_ranges: {
          '18-25': 'Joven adulto en etapa de formación y desarrollo profesional',
          '26-35': 'Adulto joven estableciendo carrera y estabilidad',
          '36-45': 'Adulto en pleno desarrollo profesional y familiar',
          '46-55': 'Adulto maduro con experiencia consolidada',
          '56-65': 'Adulto mayor con amplia experiencia profesional',
          '65+': 'Adulto mayor con perspectiva de vida completa'
        },
        education_levels: {
          'secundaria': 'Educación secundaria completada',
          'tecnica': 'Formación técnica especializada',
          'universitaria': 'Educación universitaria de pregrado',
          'posgrado': 'Estudios de posgrado avanzados',
          'doctorado': 'Nivel doctoral de especialización'
        }
      },

      preference_responses: {
        product_features: {
          'calidad': 'Priorizo la calidad sobre otros factores',
          'precio': 'El precio es un factor determinante en mi decisión',
          'innovacion': 'Busco características innovadoras y tecnología avanzada',
          'simplicidad': 'Prefiero productos simples y fáciles de usar',
          'durabilidad': 'La durabilidad a largo plazo es fundamental'
        },
        service_aspects: {
          'rapidez': 'Valoro la velocidad y eficiencia del servicio',
          'atencion': 'La atención personalizada es muy importante',
          'disponibilidad': 'Necesito disponibilidad 24/7 o amplia cobertura',
          'transparencia': 'Aprecio la transparencia y comunicación clara',
          'flexibilidad': 'Requiero opciones flexibles y adaptables'
        }
      },

      behavioral_responses: {
        frequency_patterns: {
          'diario': 'Uso diario como parte de mi rutina regular',
          'semanal': 'Uso semanal según necesidades específicas',
          'mensual': 'Uso mensual para necesidades periódicas',
          'ocasional': 'Uso ocasional según circunstancias especiales',
          'nunca': 'No uso actualmente este producto/servicio'
        },
        usage_contexts: {
          'trabajo': 'Principalmente para uso profesional y laboral',
          'personal': 'Para uso personal y actividades privadas',
          'familia': 'Para actividades familiares y domésticas',
          'social': 'En contextos sociales y de entretenimiento',
          'educacion': 'Para propósitos educativos y aprendizaje'
        }
      }
    };
  }

  // Analyze survey content and provide quick response suggestions
  analyzeSurvey(surveyText, surveyType = 'general') {
    const analysis = {
      type: this.detectSurveyType(surveyText),
      questions: this.extractQuestions(surveyText),
      complexity: this.assessSurveyComplexity(surveyText),
      estimated_time: this.estimateCompletionTime(surveyText),
      suggestions: []
    };

    // Generate response suggestions for each question
    analysis.questions.forEach((question, index) => {
      const suggestion = this.generateQuestionSuggestion(question, analysis.type);
      analysis.suggestions.push({
        question_number: index + 1,
        question: question,
        suggested_response: suggestion,
        confidence: this.calculateConfidence(question, analysis.type)
      });
    });

    return analysis;
  }

  detectSurveyType(text) {
    const textLower = text.toLowerCase();
    const patterns = this.surveyPatterns;

    let scores = {};
    for (const [type, pattern] of Object.entries(patterns)) {
      scores[type] = 0;
      pattern.keywords.forEach(keyword => {
        if (textLower.includes(keyword)) {
          scores[type]++;
        }
      });
    }

    const maxScore = Math.max(...Object.values(scores));
    const detectedType = Object.keys(scores).find(key => scores[key] === maxScore);
    
    return detectedType || 'general';
  }

  extractQuestions(text) {
    // Simple question extraction based on common patterns
    const questionMarkers = ['?', '¿', 'pregunta', 'question', '1.', '2.', '3.', '•', '-'];
    const lines = text.split('\n').filter(line => line.trim());
    
    const questions = [];
    lines.forEach(line => {
      const trimmed = line.trim();
      if (questionMarkers.some(marker => trimmed.includes(marker)) && trimmed.length > 10) {
        questions.push(trimmed);
      }
    });

    return questions.length > 0 ? questions : [text]; // Fallback to entire text as one question
  }

  assessSurveyComplexity(text) {
    const wordCount = text.split(' ').length;
    const questionCount = this.extractQuestions(text).length;
    
    if (wordCount < 100 && questionCount <= 3) return 'simple';
    if (wordCount < 300 && questionCount <= 8) return 'moderate';
    return 'complex';
  }

  estimateCompletionTime(text) {
    const questions = this.extractQuestions(text).length;
    const baseTimePerQuestion = 30; // seconds
    const complexity = this.assessSurveyComplexity(text);
    
    let multiplier = 1;
    if (complexity === 'moderate') multiplier = 1.5;
    if (complexity === 'complex') multiplier = 2;
    
    const totalSeconds = questions * baseTimePerQuestion * multiplier;
    return Math.ceil(totalSeconds / 60); // Convert to minutes
  }

  generateQuestionSuggestion(question, surveyType) {
    const questionLower = question.toLowerCase();
    const patterns = this.surveyPatterns[surveyType] || this.surveyPatterns.satisfaction;
    
    // Check for rating/scale questions
    if (this.isRatingQuestion(questionLower)) {
      return this.generateRatingResponse(questionLower, surveyType);
    }
    
    // Check for multiple choice patterns
    if (this.isMultipleChoiceQuestion(questionLower)) {
      return this.generateMultipleChoiceResponse(questionLower, surveyType);
    }
    
    // Check for open text questions
    if (this.isOpenTextQuestion(questionLower)) {
      return this.generateOpenTextResponse(questionLower, surveyType);
    }
    
    // Default response strategy
    return this.generateDefaultResponse(questionLower, surveyType);
  }

  isRatingQuestion(question) {
    const ratingKeywords = ['califica', 'rate', 'escala', 'scale', '1 al 5', '1-5', '1 a 10', '1-10'];
    return ratingKeywords.some(keyword => question.includes(keyword));
  }

  isMultipleChoiceQuestion(question) {
    const choiceKeywords = ['selecciona', 'select', 'elige', 'choose', 'marca', 'check'];
    return choiceKeywords.some(keyword => question.includes(keyword));
  }

  isOpenTextQuestion(question) {
    const openKeywords = ['explica', 'explain', 'describe', 'comenta', 'comment', '¿por qué', 'why'];
    return openKeywords.some(keyword => question.includes(keyword));
  }

  generateRatingResponse(question, surveyType) {
    const templates = this.responseTemplates[surveyType + '_survey'] || this.responseTemplates.satisfaction_survey;
    
    if (question.includes('satisf') || question.includes('service')) {
      return {
        numeric: 4,
        text: templates.good?.text || "Muy satisfecho con la experiencia general",
        reasoning: "Respuesta balanceada que refleja satisfacción sin ser excesivamente positiva"
      };
    }
    
    return {
      numeric: 3,
      text: "Respuesta neutra - cumple expectativas básicas",
      reasoning: "Respuesta segura para preguntas no específicas"
    };
  }

  generateMultipleChoiceResponse(question, surveyType) {
    if (question.includes('frecuencia') || question.includes('frequency')) {
      return {
        choice: 'frecuentemente',
        reasoning: 'Indica uso regular pero no excesivo'
      };
    }
    
    if (question.includes('prefer') || question.includes('prefiere')) {
      return {
        choice: 'calidad',
        reasoning: 'La calidad es generalmente una preferencia segura y valorada'
      };
    }
    
    return {
      choice: 'primera_opcion',
      reasoning: 'Selección por defecto - requiere revisión específica'
    };
  }

  generateOpenTextResponse(question, surveyType) {
    const responses = this.responseTemplates[surveyType + '_responses'] || {};
    
    if (question.includes('mejora') || question.includes('improve')) {
      return {
        text: "Considerar mayor agilidad en los procesos y comunicación más proactiva con los usuarios.",
        length: 'medium',
        reasoning: 'Respuesta constructiva que ofrece sugerencias específicas'
      };
    }
    
    if (question.includes('experiencia') || question.includes('experience')) {
      return {
        text: "En general positiva, con algunos aspectos que podrían optimizarse para una experiencia aún mejor.",
        length: 'short',
        reasoning: 'Respuesta balanceada que reconoce aspectos positivos y áreas de mejora'
      };
    }
    
    return {
      text: "Respuesta estándar que requiere personalización según el contexto específico de la pregunta.",
      length: 'short',
      reasoning: 'Placeholder que necesita adaptación manual'
    };
  }

  generateDefaultResponse(question, surveyType) {
    return {
      text: "Respuesta que requiere análisis específico del contexto",
      type: 'requires_review',
      reasoning: 'Pregunta no categorizada automáticamente'
    };
  }

  calculateConfidence(question, surveyType) {
    const questionLower = question.toLowerCase();
    const patterns = this.surveyPatterns[surveyType];
    
    if (!patterns) return 0.5;
    
    let matchCount = 0;
    patterns.keywords.forEach(keyword => {
      if (questionLower.includes(keyword)) matchCount++;
    });
    
    const confidence = Math.min(0.9, 0.3 + (matchCount * 0.2));
    return Math.round(confidence * 100) / 100;
  }

  // Quick response generation for entire survey
  generateQuickSurveyResponse(surveyText, preferences = {}) {
    const analysis = this.analyzeSurvey(surveyText);
    
    const quickResponse = {
      survey_type: analysis.type,
      estimated_time: analysis.estimated_time,
      confidence_score: this.calculateOverallConfidence(analysis.suggestions),
      responses: [],
      summary: ""
    };

    analysis.suggestions.forEach((suggestion, index) => {
      quickResponse.responses.push({
        question: suggestion.question,
        response: suggestion.suggested_response,
        confidence: suggestion.confidence,
        requires_review: suggestion.confidence < 0.7
      });
    });

    quickResponse.summary = this.generateResponseSummary(quickResponse);
    
    return quickResponse;
  }

  calculateOverallConfidence(suggestions) {
    if (!suggestions.length) return 0;
    const totalConfidence = suggestions.reduce((sum, s) => sum + s.confidence, 0);
    return Math.round((totalConfidence / suggestions.length) * 100) / 100;
  }

  generateResponseSummary(quickResponse) {
    const highConfidence = quickResponse.responses.filter(r => r.confidence >= 0.7).length;
    const total = quickResponse.responses.length;
    
    return `Respuesta rápida generada para ${total} pregunta(s). ${highConfidence} respuesta(s) de alta confianza, ${total - highConfidence} requieren revisión. Tiempo estimado: ${quickResponse.estimated_time} minutos.`;
  }

  // Learn from user corrections and feedback
  learnFromFeedback(originalResponse, userCorrection, context) {
    const learningEntry = {
      timestamp: new Date(),
      original_response: originalResponse,
      user_correction: userCorrection,
      context: context,
      pattern_learned: this.extractPattern(originalResponse, userCorrection)
    };

    this.surveyHistory.push(learningEntry);
    
    // Keep learning history manageable
    if (this.surveyHistory.length > 100) {
      this.surveyHistory = this.surveyHistory.slice(-50);
    }
    
    return learningEntry;
  }

  extractPattern(original, correction) {
    // Simple pattern extraction for learning
    return {
      context_keywords: this.extractKeywords(original.context || ''),
      response_adjustment: {
        length_preference: correction.text?.length > original.text?.length ? 'longer' : 'shorter',
        tone_preference: this.detectTone(correction.text || ''),
        specificity_preference: this.detectSpecificity(correction.text || '')
      }
    };
  }

  extractKeywords(text) {
    const words = text.toLowerCase().split(/\W+/).filter(w => w.length > 3);
    return words.slice(0, 5); // Top 5 keywords
  }

  detectTone(text) {
    if (/excelente|genial|fantástico|perfecto/.test(text.toLowerCase())) return 'enthusiastic';
    if (/problema|error|malo|terrible/.test(text.toLowerCase())) return 'negative';
    return 'neutral';
  }

  detectSpecificity(text) {
    const specificIndicators = text.match(/\d+|específicamente|particularmente|detalle/gi);
    return specificIndicators ? 'specific' : 'general';
  }

  // Integration with user profile for personalized responses
  setUserProfile(profile) {
    this.userProfile = profile;
  }

  getPersonalizedSuggestion(question, context = {}) {
    if (!this.userProfile) {
      return this.generateQuestionSuggestion(question, 'general');
    }

    // Use user profile to personalize responses
    const personalizedResponse = this.generateQuestionSuggestion(question, 'general');
    
    // Adjust based on user preferences
    if (this.userProfile.preferences?.responseLength === 'detailed') {
      personalizedResponse.text = this.expandResponse(personalizedResponse.text);
    }
    
    if (this.userProfile.preferences?.formality === 'formal') {
      personalizedResponse.text = this.formalizeTone(personalizedResponse.text);
    }

    return personalizedResponse;
  }

  expandResponse(text) {
    return text + " Proporcionando contexto adicional y detalles específicos que justifican esta respuesta.";
  }

  formalizeTone(text) {
    return text.replace(/muy/g, 'considerablemente')
               .replace(/bueno/g, 'satisfactorio')
               .replace(/malo/g, 'inadecuado');
  }
}

// Create singleton instance
const surveyHelperService = new SurveyHelperService();

export default surveyHelperService;