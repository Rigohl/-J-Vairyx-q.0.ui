import React, { useState, useEffect, useRef } from 'react';
import HolographicHead from '../components/HolographicHead';
import learningService from '../services/LearningService';
import systemIntegrationService from '../services/SystemIntegrationService';
import curiosityService from '../services/CuriosityService';
import '../styles/holographic.css';

const AssistantModule = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: '¡Hola! Soy J-Vairyx, tu asistente personal holográfico inteligente. He aprendido muchas nuevas habilidades: puedo crear archivos, navegar por internet, monitorear tu atención y ser proactivo contigo. ¿En qué puedo ayudarte hoy?',
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
      
      // Handle specific commands
      if (originalMessage.toLowerCase().includes('crear archivo')) {
        const fileName = extractFileName(originalMessage) || 'nuevo_archivo.txt';
        const result = await systemIntegrationService.createFile(fileName, '');
        response = result.success ? 
          `¡Perfecto! He creado el archivo "${fileName}". ${result.message}` :
          `Hubo un problema creando el archivo: ${result.error}`;
      }
      else if (originalMessage.toLowerCase().includes('crear carpeta')) {
        const folderName = extractFolderName(originalMessage) || 'nueva_carpeta';
        const result = await systemIntegrationService.createFolder(folderName);
        response = result.success ?
          `¡Excelente! Carpeta "${folderName}" creada. ${result.message}` :
          `Error creando la carpeta: ${result.error}`;
      }
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
      else if (originalMessage.toLowerCase().includes('investigar') || originalMessage.toLowerCase().includes('research')) {
        const topic = extractTopic(originalMessage);
        const result = await systemIntegrationService.researchTopic(topic, 'detailed');
        response = `He iniciado una investigación completa sobre "${topic}". Realizando ${result.searches} búsquedas especializadas.`;
      }
      else if (originalMessage.toLowerCase().includes('mi perfil') || originalMessage.toLowerCase().includes('que sabes de mi')) {
        const profile = learningService.userProfile;
        response = `He aprendido mucho sobre ti: ${profile.stats.totalInteractions} interacciones, activo principalmente a las ${profile.patterns.activeHours.slice(0, 3).join(', ')}h. Tus temas frecuentes: ${profile.patterns.commonTopics.slice(0, 3).join(', ') || 'aún aprendiendo'}.`;
      }
      else if (originalMessage.toLowerCase().includes('sistema') || originalMessage.toLowerCase().includes('info sistema')) {
        const sysInfo = await systemIntegrationService.getSystemInfo();
        response = `Info del sistema: ${sysInfo.platform}, Memoria: ${sysInfo.memory}, CPU: ${sysInfo.cpu}. Conexiones activas: ${systemIntegrationService.appConnections.size}.`;
      }
      else {
        // Use learning service for personalized response
        response = learningService.getPersonalizedResponse(originalMessage);
      }

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
        
        {/* Attention Status Display */}
        <div className="attention-status-panel">
          <div className="status-item">
            <span className="status-label">Atención:</span>
            <span className={`status-value ${attentionState.isActive ? 'active' : 'idle'}`}>
              {attentionState.isActive ? '🟢 Activo' : '🟡 En pausa'}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Enfoque:</span>
            <span className="status-value">
              {attentionState.focusScore}%
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Interacciones:</span>
            <span className="status-value">
              {userProfile.stats.totalInteractions}
            </span>
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