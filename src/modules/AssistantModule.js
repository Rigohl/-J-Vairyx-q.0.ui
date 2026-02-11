import React, { useState, useEffect, useRef } from 'react';
import HolographicHead from '../components/HolographicHead';
import pedagogicalService from '../services/PedagogicalService';
import jarvisPersonalityService from '../services/JarvisPersonalityService';
import '../styles/holographic.css';

const AssistantModule = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: '¡Hola! 🚀 Soy J-Vairyx, tu compañero inteligente. Mi sistema visual y de investigación ha sido actualizado para ofrecerte una experiencia más inmersiva. ¿Qué vamos a investigar hoy?',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emotionalState, setEmotionalState] = useState('Neutral');
  const [activeTheory, setActiveTheory] = useState('Bloom');
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

    // Detección pedagógica y emocional mejorada
    const adaptation = pedagogicalService.analyzeMessage(userMessage.content);
    
    setTimeout(() => {
      let response = "He procesado tu consulta. Mis fuentes en Julia han encontrado información relevante que Mojo ha optimizado para tu estilo de aprendizaje.";
      
      if (adaptation) {
        setActiveTheory(adaptation.theory);
        setEmotionalState('Apoyando');
        response = `He detectado que esto requiere un enfoque de ${adaptation.theory}. ${response}`;
      } else {
        setEmotionalState('Curioso');
      }

      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: jarvisPersonalityService.processResponse(response),
        timestamp: new Date(),
        theory: activeTheory
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="module-container holographic-assistant">
      <div className="assistant-header">
        <h2 className="module-title holographic-title">J-VAIRYX COMPANION</h2>
        
        <div className="status-panel-companion">
          <div className="status-badge" title="Técnica de enseñanza actual">🎓 {activeTheory}</div>
          <div className="status-badge" title="Mi estado emocional">🎭 {emotionalState}</div>
          <div className="status-badge" title="Motor de IA">⚡ Rust Core</div>
        </div>

        <HolographicHead isThinking={isLoading} />
      </div>

      <div className="chat-card holographic-card">
        <div className="chat-container">
          <div className="chat-messages" style={{ height: '380px', overflowY: 'auto' }}>
            {messages.map(message => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-content">{message.content}</div>
                {message.theory && <div className="theory-tag">Pedagogía: {message.theory}</div>}
              </div>
            ))}
            {isLoading && (
              <div className="message assistant" style={{ opacity: 0.6 }}>
                Investigando fuentes profundas...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Escribe aquí para aprender..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
            />
            <button className="btn-holographic" onClick={handleSendMessage} disabled={isLoading || !currentMessage.trim()}>
              ENVIAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantModule;
