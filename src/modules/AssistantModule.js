import React, { useState, useEffect, useRef } from 'react';
import HolographicHead from '../components/HolographicHead';
import '../styles/holographic.css';

const AssistantModule = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: '¡Hola! Soy J-Vairyx, tu asistente personal holográfico. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    setCurrentMessage('');
    setIsLoading(true);

    // Enhanced AI response simulation with speaking animation
    setTimeout(() => {
      setIsSpeaking(true);
      
      const responses = [
        'Entiendo perfectamente tu consulta. Estoy procesando la información en mis sistemas cuánticos...',
        'Basándome en mi análisis de datos neurales, puedo sugerirte las siguientes opciones optimizadas...',
        'He completado un escaneo profundo de tu solicitud. Aquí tienes mi recomendación holográfica...',
        'Perfecto, mis circuitos han analizado tu petición. Aquí está la respuesta que necesitas...',
        'Excelente pregunta para mi matriz de conocimiento. Déjame ayudarte con esa información...',
        'Mi procesador de IA ha evaluado tu solicitud. Te proporciono la solución más eficiente...'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      
      // Simulate speaking duration based on message length
      const speakingDuration = Math.max(2000, randomResponse.length * 30);
      setTimeout(() => {
        setIsSpeaking(false);
      }, speakingDuration);
    }, 1000 + Math.random() * 1500);
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
      </div>
      
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
        <h3 className="holographic-subtitle">Capacidades Cuánticas del Sistema</h3>
        <div className="capabilities-grid">
          <div className="capability-item">
            <div className="capability-icon">💬</div>
            <div className="capability-text">Conversación neural avanzada</div>
          </div>
          <div className="capability-item">
            <div className="capability-icon">🧠</div>
            <div className="capability-text">Procesamiento de IA cuántica</div>
          </div>
          <div className="capability-item">
            <div className="capability-icon">⚡</div>
            <div className="capability-text">Respuestas en tiempo real</div>
          </div>
          <div className="capability-item">
            <div className="capability-icon">🔍</div>
            <div className="capability-text">Análisis predictivo avanzado</div>
          </div>
          <div className="capability-item">
            <div className="capability-icon">🌐</div>
            <div className="capability-text">Interfaz holográfica 3D</div>
          </div>
          <div className="capability-item">
            <div className="capability-icon">🚀</div>
            <div className="capability-text">Asistencia de productividad IA</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantModule;