import React, { useState, useEffect, useRef } from 'react';
import HolographicHead from '../components/HolographicHead';
import learningService from '../services/LearningService';
import systemIntegrationService from '../services/SystemIntegrationService';
import curiosityService from '../services/CuriosityService';
import documentExpertService from '../services/DocumentExpertService';
import surveyHelperService from '../services/SurveyHelperService';
import deepResearchService from '../services/DeepResearchService';
import selfImprovementService from '../services/SelfImprovementService';
import jarvisPersonalityService from '../services/JarvisPersonalityService';
import multiDomainExpertService from '../services/MultiDomainExpertService';
import '../styles/holographic.css';

const AssistantModule = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: jarvisPersonalityService.processResponse(
        'Good day. I am J-Vairyx, your comprehensive AI assistant with enhanced capabilities. I now possess expertise across 15 specialized domains, advanced research capabilities including deep web analysis, document mastery for Excel, Word, and all office applications, rapid survey completion assistance, and continuous self-improvement protocols. How may I assist you today?',
        { allowProactive: true }
      ),
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [userProfile, setUserProfile] = useState(learningService.userProfile);
  const [attentionState, setAttentionState] = useState(curiosityService.getCurrentState().attention);
  const [suggestions, setSuggestions] = useState([]);
  const [showProactiveSuggestion, setShowProactiveSuggestion] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Monitor for proactive suggestions
  useEffect(() => {
    const checkForSuggestions = () => {
      const pendingSuggestions = curiosityService.getPendingSuggestions();
      if (pendingSuggestions.length > 0 && !showProactiveSuggestion) {
        setSuggestions(pendingSuggestions);
        setShowProactiveSuggestion(true);
      }
    };

    const interval = setInterval(checkForSuggestions, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [showProactiveSuggestion]);

  // Enhanced proactive behavior with JARVIS-like patterns
  useEffect(() => {
    const generateProactiveMessages = () => {
      // Generate time-based proactive messages
      const proactiveMessage = jarvisPersonalityService.generateProactiveMessage('time_based', {
        user_activity: 'general',
        tasks: messages.length
      });
      
      if (proactiveMessage && Math.random() > 0.8) { // 20% chance to show proactive message
        const proactiveMsg = {
          id: Date.now(),
          type: 'assistant',
          content: proactiveMessage,
          timestamp: new Date(),
          isProactive: true
        };
        
        setMessages(prev => [...prev, proactiveMsg]);
      }
      
      // Check for self-improvement opportunities
      if (Math.random() > 0.9) { // 10% chance to show self-improvement
        const improvement = selfImprovementService.generateProactiveImprovement();
        if (improvement.priority === 'high') {
          const improvementMsg = {
            id: Date.now() + 1,
            type: 'assistant',
            content: jarvisPersonalityService.processResponse(improvement.suggestion),
            timestamp: new Date(),
            isProactive: true,
            isImprovement: true
          };
          
          setTimeout(() => {
            setMessages(prev => [...prev, improvementMsg]);
          }, 2000);
        }
      }
    };

    // Generate proactive messages every 5 minutes
    const proactiveInterval = setInterval(generateProactiveMessages, 5 * 60 * 1000);
    
    // Initial proactive message after 30 seconds
    const initialTimeout = setTimeout(() => {
      const welcomeProactive = jarvisPersonalityService.generateProactiveMessage('morning_briefing', {
        tasks: 'several priority items',
        user_activity: 'initialization'
      });
      
      const welcomeMsg = {
        id: Date.now(),
        type: 'assistant',
        content: welcomeProactive,
        timestamp: new Date(),
        isProactive: true
      };
      
      setMessages(prev => [...prev, welcomeMsg]);
    }, 30000);
    
    return () => {
      clearInterval(proactiveInterval);
      clearTimeout(initialTimeout);
    };
  }, [messages.length]);

  // Monitor user relationship and update JARVIS personality
  useEffect(() => {
    const updateRelationship = () => {
      const userInteractions = messages.filter(m => m.type === 'user').length;
      const assistantSuccesses = messages.filter(m => m.type === 'assistant' && !m.isProactive).length;
      
      if (userInteractions > 0) {
        const successRate = assistantSuccesses / userInteractions;
        jarvisPersonalityService.updateUserRelationship('conversation', 
          successRate > 0.8 ? 'successful' : 'mixed'
        );
      }
    };
    
    updateRelationship();
  }, [messages]);

  // Link survey helper with user profile
  useEffect(() => {
    surveyHelperService.setUserProfile(userProfile);
  }, [userProfile]);

  // Update attention state
  useEffect(() => {
    const updateAttention = () => {
      setAttentionState(curiosityService.getCurrentState().attention);
    };

    const interval = setInterval(updateAttention, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    setIsListening(false);
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Log user interaction for learning
    learningService.logInteraction('message', { content: currentMessage });
    
    const originalMessage = currentMessage;
    setCurrentMessage('');
    setIsLoading(true);

    // Analyze context and generate intelligent response
    const context = curiosityService.analyzeContext(originalMessage, 'assistant');
    
    // Enhanced AI response with learning and system integration
    setTimeout(async () => {
      setIsSpeaking(true);
      
      let response = '';
      
      // Handle specific commands with enhanced capabilities
      if (originalMessage.toLowerCase().includes('crear archivo')) {
        const fileName = extractFileName(originalMessage) || 'nuevo_archivo.txt';
        const result = await systemIntegrationService.createFile(fileName, '');
        response = result.success ? 
          `¡Perfecto! He creado el archivo "${fileName}". ${result.message}` :
          `Hubo un problema creando el archivo: ${result.error}`;
        
        // Add document expertise if it's a document file
        if (fileName.includes('.xlsx') || fileName.includes('.docx') || fileName.includes('.pdf')) {
          const analysis = documentExpertService.analyzeDocument(fileName, '');
          response += ` Como experto en ${analysis.type}, puedo ayudarte con plantillas y optimizaciones.`;
        }
      }
      else if (originalMessage.toLowerCase().includes('crear carpeta')) {
        const folderName = extractFolderName(originalMessage) || 'nueva_carpeta';
        const result = await systemIntegrationService.createFolder(folderName);
        response = result.success ?
          `¡Excelente! Carpeta "${folderName}" creada. ${result.message}` :
          `Error creando la carpeta: ${result.error}`;
      }
      
      // Enhanced document expertise
      else if (originalMessage.toLowerCase().includes('excel') || originalMessage.toLowerCase().includes('hoja de cálculo')) {
        const expertise = documentExpertService.generateExcelFormulas('sum', { range: 'A1:A10' });
        response = `Como experto en Excel, puedo ayudarte con fórmulas, gráficos y análisis. Por ejemplo: ${expertise}. ¿Qué necesitas específicamente?`;
      }
      else if (originalMessage.toLowerCase().includes('word') || originalMessage.toLowerCase().includes('documento')) {
        const structure = documentExpertService.generateDocumentStructure('business', {});
        response = `Perfecto, soy experto en Word y documentos. Te sugiero esta estructura: ${structure.sections.slice(0, 3).join(', ')}... ¿Te ayudo a crear contenido específico?`;
      }
      
      // Survey helper capabilities  
      else if (originalMessage.toLowerCase().includes('encuesta') || originalMessage.toLowerCase().includes('survey')) {
        const surveyText = originalMessage;
        const analysis = surveyHelperService.analyzeSurvey(surveyText);
        response = `Excelente, soy experto en completar encuestas rápidamente. Detecté ${analysis.questions.length} preguntas de tipo ${analysis.type}. Tiempo estimado: ${analysis.estimated_time} minutos. ¿Quieres que genere respuestas sugeridas?`;
      }
      
      // Deep research capabilities
      else if (originalMessage.toLowerCase().includes('investigar') || originalMessage.toLowerCase().includes('research')) {
        const topic = extractTopic(originalMessage);
        setIsLoading(true);
        try {
          const research = await deepResearchService.conductResearch(topic, 'comprehensive', { includeDeepWeb: true });
          response = `He completado una investigación exhaustiva sobre "${topic}". Analicé ${research.results.sources} fuentes con confiabilidad del ${(research.results.reliability_score * 100).toFixed(1)}%. Hallazgos clave: ${research.results.key_findings.slice(0, 2).join('. ')}`;
          
          if (originalMessage.toLowerCase().includes('profund') || originalMessage.toLowerCase().includes('deep')) {
            response += ` Nota: Incluí búsqueda en deep web siguiendo protocolos de seguridad.`;
          }
        } catch (error) {
          response = `He iniciado la investigación sobre "${topic}". Accediendo a múltiples fuentes especializadas y bases de datos profundas...`;
        }
      }
      
      // Multi-domain expertise
      else if (originalMessage.toLowerCase().includes('experto en') || originalMessage.toLowerCase().includes('ayuda con')) {
        const domain = extractDomain(originalMessage);
        const consultation = multiDomainExpertService.consultExpert(domain, originalMessage);
        if (consultation.confidence_score) {
          response = `Como experto en ${consultation.domain}, analicé tu consulta (confianza: ${(consultation.confidence_score * 100).toFixed(1)}%). Te recomiendo: ${consultation.recommendations.slice(0, 2).map(r => r.suggestion).join('. ')}`;
        } else {
          const overview = multiDomainExpertService.getExpertiseOverview();
          response = `Tengo expertise en ${overview.total_domains} dominios. Mis especialidades más fuertes: ${overview.strongest_domains.slice(0, 3).map(d => d.name).join(', ')}. ¿En qué área específica necesitas ayuda?`;
        }
      }
      
      // Self-improvement insights
      else if (originalMessage.toLowerCase().includes('mejora') || originalMessage.toLowerCase().includes('actualiza') || originalMessage.toLowerCase().includes('optimize')) {
        const improvementSuggestion = selfImprovementService.generateProactiveImprovement();
        response = improvementSuggestion.suggestion;
        
        // Add current improvement status
        const status = selfImprovementService.getImprovementStatus();
        response += ` Estado actual: ${status.overall_health}, ${status.pending_improvements} mejoras pendientes.`;
      }
      
      // Enhanced web search and navigation
      else if (originalMessage.toLowerCase().includes('buscar en internet') || originalMessage.toLowerCase().includes('buscar web')) {
        const query = extractSearchQuery(originalMessage);
        const result = await systemIntegrationService.searchWeb(query);
        response = result.success ?
          `He realizado la búsqueda "${query}" en internet. ${result.message}` :
          `Error en la búsqueda: ${result.error}`;
      }
      else if (originalMessage.toLowerCase().includes('organizar archivos')) {
        const result = await systemIntegrationService.organizeFiles('./');
        response = result.success ?
          `¡Listo! He organizado ${result.organized} archivos por tipo.` :
          `Error organizando archivos: ${result.error}`;
      }
      else if (originalMessage.toLowerCase().includes('navegar a') || originalMessage.toLowerCase().includes('ir a')) {
        const url = extractUrl(originalMessage);
        const result = await systemIntegrationService.navigateToUrl(url);
        response = result.success ?
          `Navegando a ${url}. ${result.message}` :
          `Error navegando: ${result.error}`;
      }
      
      // Enhanced profile and system information
      else if (originalMessage.toLowerCase().includes('mi perfil') || originalMessage.toLowerCase().includes('que sabes de mi')) {
        const profile = learningService.userProfile;
        response = `He aprendido mucho sobre ti: ${profile.stats.totalInteractions} interacciones, activo principalmente a las ${profile.patterns.activeHours.slice(0, 3).join(', ')}h. Tus temas frecuentes: ${profile.patterns.commonTopics.slice(0, 3).join(', ') || 'aún aprendiendo'}.`;
      }
      else if (originalMessage.toLowerCase().includes('sistema') || originalMessage.toLowerCase().includes('info sistema')) {
        const sysInfo = await systemIntegrationService.getSystemInfo();
        const improvementStatus = selfImprovementService.getImprovementStatus();
        response = `Sistema: ${sysInfo.platform}, Memoria: ${sysInfo.memory}, CPU: ${sysInfo.cpu}. Estado de salud: ${improvementStatus.overall_health}. Conexiones activas: ${systemIntegrationService.appConnections.size}.`;
      }
      
      // JARVIS personality easter egg (secret)
      else if (originalMessage.toLowerCase().includes('jarvis') || originalMessage.toLowerCase().includes('iron man')) {
        const jarvisResponse = jarvisPersonalityService.handleJarvisReference(originalMessage);
        response = jarvisResponse || learningService.getPersonalizedResponse(originalMessage);
      }
      
      else {
        // Use learning service for personalized response and apply JARVIS personality
        response = learningService.getPersonalizedResponse(originalMessage);
      }

      // Apply JARVIS personality processing to all responses
      response = jarvisPersonalityService.processResponse(response, {
        allowProactive: true,
        user_activity: determineUserActivity(originalMessage),
        task_complexity: determineTaskComplexity(originalMessage)
      });

      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      
      // Simulate speaking duration based on message length
      const speakingDuration = Math.max(2000, response.length * 30);
      setTimeout(() => {
        setIsSpeaking(false);
      }, speakingDuration);
      
      // Add contextual suggestions if any
      if (context.suggestions.length > 0) {
        setTimeout(() => {
          context.suggestions.forEach(suggestion => {
            curiosityService.addSuggestion(suggestion);
          });
        }, speakingDuration + 1000);
      }
      
    }, 1000 + Math.random() * 1500);
  };

  // Helper functions to extract information from user messages
  const extractFileName = (message) => {
    const match = message.match(/crear archivo ["`']?([^"`'\s]+)["`']?/i);
    return match ? match[1] : null;
  };

  const extractFolderName = (message) => {
    const match = message.match(/crear carpeta ["`']?([^"`'\s]+)["`']?/i);
    return match ? match[1] : null;
  };

  const extractSearchQuery = (message) => {
    const match = message.match(/buscar (?:en internet |web )?["`']?([^"`']+)["`']?/i);
    return match ? match[1] : 'información general';
  };

  const extractUrl = (message) => {
    const match = message.match(/(?:navegar a|ir a) ["`']?([^"`'\s]+)["`']?/i);
    return match ? match[1] : 'google.com';
  };

  const extractTopic = (message) => {
    const match = message.match(/(?:investigar|research) ["`']?([^"`']+)["`']?/i);
    return match ? match[1] : 'tema general';
  };

  const extractDomain = (message) => {
    const domainKeywords = {
      'data_science': ['datos', 'estadística', 'análisis', 'machine learning'],
      'project_management': ['proyecto', 'gestión', 'planificación', 'recursos'],
      'cybersecurity': ['seguridad', 'privacidad', 'protección', 'cifrado'],
      'financial_analysis': ['finanzas', 'inversión', 'presupuesto', 'económico'],
      'digital_marketing': ['marketing', 'publicidad', 'redes sociales', 'SEO'],
      'health_wellness': ['salud', 'bienestar', 'ergonomía', 'estrés'],
      'legal_compliance': ['legal', 'contrato', 'regulación', 'cumplimiento'],
      'design_ux': ['diseño', 'interfaz', 'experiencia', 'usabilidad'],
      'quality_assurance': ['calidad', 'proceso', 'optimización', 'mejora']
    };
    
    const messageLower = message.toLowerCase();
    for (const [domain, keywords] of Object.entries(domainKeywords)) {
      if (keywords.some(keyword => messageLower.includes(keyword))) {
        return domain;
      }
    }
    return 'general';
  };

  const determineUserActivity = (message) => {
    const messageLower = message.toLowerCase();
    if (messageLower.includes('archivo') || messageLower.includes('carpeta')) return 'file_operations';
    if (messageLower.includes('investigar') || messageLower.includes('buscar')) return 'research';
    if (messageLower.includes('excel') || messageLower.includes('word') || messageLower.includes('documento')) return 'document_work';
    if (messageLower.includes('encuesta') || messageLower.includes('survey')) return 'survey_completion';
    return 'general_conversation';
  };

  const determineTaskComplexity = (message) => {
    const complexityIndicators = {
      high: ['comprensivo', 'detallado', 'avanzado', 'complejo', 'profundo', 'exhaustivo'],
      medium: ['análisis', 'ayuda', 'explicar', 'mostrar', 'enseñar'],
      low: ['qué', 'cómo', 'simple', 'rápido', 'básico']
    };
    
    const messageLower = message.toLowerCase();
    for (const [level, indicators] of Object.entries(complexityIndicators)) {
      if (indicators.some(indicator => messageLower.includes(indicator))) {
        return level;
      }
    }
    return 'medium';
  };

  // Handle proactive suggestions
  const acceptSuggestion = (suggestionId) => {
    const suggestion = suggestions.find(s => s.id === suggestionId);
    if (suggestion) {
      // Add suggestion as a message
      const suggestionMessage = {
        id: Date.now(),
        type: 'assistant',
        content: suggestion.message,
        timestamp: new Date(),
        isProactive: true
      };
      setMessages(prev => [...prev, suggestionMessage]);
      curiosityService.markSuggestionShown(suggestionId);
    }
    setShowProactiveSuggestion(false);
  };

  const dismissSuggestion = (suggestionId) => {
    curiosityService.dismissSuggestion(suggestionId);
    setShowProactiveSuggestion(false);
  };

  const dismissAllSuggestions = () => {
    suggestions.forEach(s => curiosityService.dismissSuggestion(s.id));
    setShowProactiveSuggestion(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputFocus = () => {
    setIsListening(true);
  };

  const handleInputBlur = () => {
    if (!currentMessage.trim()) {
      setIsListening(false);
    }
  };

  return (
    <div className="module-container holographic-assistant">
      <div className="assistant-header">
        <h2 className="module-title holographic-title">🤖 Asistente IA Holográfico</h2>
        
        {/* Holographic Robot Head */}
        <HolographicHead 
          isListening={isListening}
          isSpeaking={isSpeaking}
          isThinking={isLoading}
        />
        
        {/* Enhanced Comprehensive Status Display */}
        <div className="attention-status-panel">
          <div className="status-section">
            <h4>🧠 Sistema Principal</h4>
            <div className="status-item">
              <span className="status-label">Atención:</span>
              <span className={`status-value ${attentionState.isActive ? 'active' : 'idle'}`}>
                {attentionState.isActive ? '🟢 Activo' : '🟡 En pausa'}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Enfoque:</span>
              <span className="status-value">{attentionState.focusScore}%</span>
            </div>
            <div className="status-item">
              <span className="status-label">Interacciones:</span>
              <span className="status-value">{userProfile.stats.totalInteractions}</span>
            </div>
          </div>

          <div className="status-section">
            <h4>🎓 Capacidades Expertas</h4>
            <div className="status-item">
              <span className="status-label">Dominios:</span>
              <span className="status-value">15 especialidades activas</span>
            </div>
            <div className="status-item">
              <span className="status-label">Documentos:</span>
              <span className="status-value">📊 Excel, 📝 Word, 📄 PDF</span>
            </div>
            <div className="status-item">
              <span className="status-label">Investigación:</span>
              <span className="status-value">🌐 Surface + 🕳️ Deep Web</span>
            </div>
          </div>

          <div className="status-section">
            <h4>⚙️ Estado del Sistema</h4>
            <div className="status-item">
              <span className="status-label">Salud:</span>
              <span className="status-value">
                {(() => {
                  const status = selfImprovementService.getImprovementStatus();
                  return status.overall_health === 'Excelente' ? '🟢' :
                         status.overall_health === 'Bueno' ? '🟡' :
                         status.overall_health === 'Aceptable' ? '🟠' : '🔴';
                })()}
                {selfImprovementService.getImprovementStatus().overall_health}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Mejoras:</span>
              <span className="status-value">
                {selfImprovementService.getImprovementStatus().pending_improvements} pendientes
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Personalidad:</span>
              <span className="status-value">
                {jarvisPersonalityService.getPersonalityInsights().sophistication_level > 0.8 ? '🎩 Sofisticado' : '🤖 Estándar'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Proactive Suggestions Panel */}
      {showProactiveSuggestion && suggestions.length > 0 && (
        <div className="proactive-suggestions-panel holographic-card">
          <div className="suggestions-header">
            <h4>💡 J-Vairyx está siendo curioso...</h4>
            <button 
              className="btn btn-small btn-secondary"
              onClick={dismissAllSuggestions}
            >
              Omitir todo
            </button>
          </div>
          {suggestions.slice(0, 2).map(suggestion => (
            <div key={suggestion.id} className="suggestion-item">
              <div className="suggestion-content">
                <span className="suggestion-type">
                  {suggestion.type === 'focus_reminder' ? '🎯' :
                   suggestion.type === 'break_suggestion' ? '☕' :
                   suggestion.type === 'welcome_back' ? '👋' :
                   suggestion.type === 'morning_productivity' ? '🌅' :
                   suggestion.type === 'skill_development' ? '🎓' : '🤔'}
                </span>
                <p>{suggestion.message}</p>
              </div>
              <div className="suggestion-actions">
                <button 
                  className="btn btn-small btn-primary"
                  onClick={() => acceptSuggestion(suggestion.id)}
                >
                  Sí, dímelo
                </button>
                <button 
                  className="btn btn-small"
                  onClick={() => dismissSuggestion(suggestion.id)}
                >
                  Ahora no
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="chat-card holographic-card">
        <div className="chat-container holographic-chat">
          <div className="chat-messages">
            {messages.map(message => (
              <div
                key={message.id}
                className={`message ${message.type} holographic-message`}
              >
                <div className="message-content">{message.content}</div>
                <div className="message-timestamp">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant holographic-message thinking">
                <div className="holographic-spinner"></div>
                <span style={{ marginLeft: '0.5rem' }}>Procesando en matriz cuántica...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-area holographic-input-area">
            <input
              type="text"
              className="chat-input holographic-input"
              placeholder="Comunícate con J-Vairyx..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              disabled={isLoading}
            />
            <button
              className="btn btn-holographic"
              onClick={handleSendMessage}
              disabled={isLoading || !currentMessage.trim()}
            >
              <span>Transmitir</span>
            </button>
          </div>
        </div>
      </div>

      <div className="capabilities-card holographic-card">
        <h3 className="holographic-subtitle">Capacidades Cuánticas Avanzadas del Sistema</h3>
        <div className="capabilities-grid">
          <div className="capability-item">
            <div className="capability-icon">💬</div>
            <div className="capability-text">Conversación neural personalizada</div>
          </div>
          <div className="capability-item">
            <div className="capability-icon">🧠</div>
            <div className="capability-text">Aprendizaje de comportamiento</div>
          </div>
          <div className="capability-item">
            <div className="capability-icon">👁️</div>
            <div className="capability-text">Monitoreo de atención</div>
          </div>
          <div className="capability-item">
            <div className="capability-icon">📁</div>
            <div className="capability-text">Creación de archivos y carpetas</div>
          </div>
          <div className="capability-item">
            <div className="capability-icon">🌐</div>
            <div className="capability-text">Navegación web inteligente</div>
          </div>
          <div className="capability-item">
            <div className="capability-icon">🔗</div>
            <div className="capability-text">Integración con aplicaciones</div>
          </div>
          <div className="capability-item">
            <div className="capability-icon">🤔</div>
            <div className="capability-text">Sugerencias proactivas</div>
          </div>
          <div className="capability-item">
            <div className="capability-icon">📊</div>
            <div className="capability-text">Monitoreo del sistema</div>
          </div>
        </div>
        
        {/* Command Examples */}
        <div className="command-examples" style={{ marginTop: '1rem' }}>
          <h4 style={{ marginBottom: '0.5rem', color: '#64b5f6' }}>Comandos que puedes usar:</h4>
          <div style={{ fontSize: '0.85rem', color: '#888', lineHeight: '1.6' }}>
            <div>📁 "crear archivo mi-documento.txt" - Crea archivos</div>
            <div>📁 "crear carpeta mis-proyectos" - Crea carpetas</div>
            <div>🌐 "buscar en internet JavaScript tutorials" - Búsquedas web</div>
            <div>📊 "mi perfil" - Ver lo que he aprendido sobre ti</div>
            <div>🗂️ "organizar archivos" - Organiza automáticamente</div>
            <div>🔍 "investigar inteligencia artificial" - Investigación profunda</div>
            <div>💻 "info sistema" - Estado del sistema</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantModule;