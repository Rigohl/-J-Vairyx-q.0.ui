import React, { useState, useEffect, useRef } from 'react';

const AssistantModule = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: '¡Hola! Soy J-Vairyx, tu asistente personal. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    // Simulate AI response (in a real implementation, this would call the AI model)
    setTimeout(() => {
      const responses = [
        'Entiendo tu consulta. Estoy procesando la información...',
        'Basándome en los datos disponibles, puedo sugerirte las siguientes opciones...',
        'He analizado tu solicitud y aquí tienes algunas recomendaciones...',
        'Perfecto, he completado el análisis. Aquí está la respuesta que buscas...',
        'Excelente pregunta. Déjame ayudarte con eso...'
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
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="module-container">
      <h2 className="module-title">🤖 Asistente IA</h2>
      
      <div className="card">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map(message => (
              <div
                key={message.id}
                className={`message ${message.type}`}
              >
                <div>{message.content}</div>
                <div style={{ 
                  fontSize: '0.7rem', 
                  opacity: 0.7, 
                  marginTop: '0.25rem' 
                }}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="loading-spinner"></div>
                <span style={{ marginLeft: '0.5rem' }}>Pensando...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Escribe tu mensaje aquí..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              className="btn btn-primary"
              onClick={handleSendMessage}
              disabled={isLoading || !currentMessage.trim()}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Capacidades del Asistente</h3>
        <ul style={{ marginTop: '1rem', color: '#666' }}>
          <li>💬 Conversación natural en español</li>
          <li>📊 Análisis de datos y documentos</li>
          <li>⚡ Respuestas rápidas e inteligentes</li>
          <li>🔍 Búsqueda y organización de información</li>
          <li>📝 Ayuda con tareas de productividad</li>
        </ul>
      </div>
    </div>
  );
};

export default AssistantModule;