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
        '¡Hola! Soy J-Vairyx, tu asistente personal. ¿En qué te puedo ayudar hoy?',
        { allowProactive: true, curiosityLevel: 'high' }
      ),
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userProfile, setUserProfile] = useState(learningService.userProfile);
  const [attentionState, setAttentionState] = useState(curiosityService.getCurrentState().attention);
  const [suggestions, setSuggestions] = useState([]);
  const [showProactiveSuggestion, setShowProactiveSuggestion] = useState(false);
  const [activeDomain, setActiveDomain] = useState('general');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkForSuggestions = () => {
      const pendingSuggestions = curiosityService.getPendingSuggestions();
      if (pendingSuggestions.length > 0 && !showProactiveSuggestion) {
        setSuggestions(pendingSuggestions);
        setShowProactiveSuggestion(true);
      }
    };
    const interval = setInterval(checkForSuggestions, 10000);
    return () => clearInterval(interval);
  }, [showProactiveSuggestion]);

  useEffect(() => {
    surveyHelperService.setUserProfile(userProfile);
  }, [userProfile]);

  useEffect(() => {
    const updateAttention = () => {
      setAttentionState(curiosityService.getCurrentState().attention);
    };
    const interval = setInterval(updateAttention, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    learningService.logInteraction('message', { content: currentMessage });
    const originalMessage = currentMessage;
    setCurrentMessage('');
    setIsLoading(true);

    const context = curiosityService.analyzeContext(originalMessage, 'assistant');
    const domain = 'general';
    setActiveDomain(domain);

    setTimeout(async () => {
      setIsSpeaking(true);
      let response = '';

      if (originalMessage.toLowerCase().includes('protocolo')) {
        const match = originalMessage.match(/protocolo (\d+)/i);
        if (match) {
          const protocolResult = jarvisPersonalityService.runProtocol(match[1]);
          response = protocolResult.message;
        }
      } else if (originalMessage.toLowerCase().includes('jarvis') || originalMessage.toLowerCase().includes('iron man')) {
        const jarvisResponse = jarvisPersonalityService.handleJarvisReference(originalMessage);
        response = jarvisResponse || learningService.getPersonalizedResponse(originalMessage);
      } else if (originalMessage.toLowerCase().includes('mi perfil') || originalMessage.toLowerCase().includes('que sabes de mi')) {
        const profile = learningService.userProfile;
        response = `He aprendido sobre ti: ${profile.stats?.totalInteractions || 0} interacciones.`;
      } else if (originalMessage.toLowerCase().includes('sistema') || originalMessage.toLowerCase().includes('info sistema')) {
        try {
          const sysInfo = await systemIntegrationService.getSystemInfo();
          response = `Info del sistema: ${sysInfo.platform}, Memoria: ${sysInfo.memory}, CPU: ${sysInfo.cpu}.`;
        } catch (e) {
          response = 'No pude obtener la información del sistema en este entorno.';
        }
      } else {
        response = learningService.getPersonalizedResponse(originalMessage);
      }

      response = jarvisPersonalityService.processResponse(response, {
        allowProactive: true,
        domain: domain
      });

      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      setIsSpeaking(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="assistant-module">
      <HolographicHead isSpeaking={isSpeaking} attentionState={attentionState} />
      <div className="messages-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.type}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="message-content">Pensando...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <textarea
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu mensaje..."
          rows={2}
        />
        <button onClick={handleSendMessage} disabled={isLoading || !currentMessage.trim()}>
          Enviar
        </button>
      </div>
      {showProactiveSuggestion && suggestions.length > 0 && (
        <div className="proactive-suggestion">
          <p>{suggestions[0].message}</p>
          <button onClick={() => {
            curiosityService.dismissSuggestion(suggestions[0].id);
            setShowProactiveSuggestion(false);
            setSuggestions([]);
          }}>Descartar</button>
        </div>
      )}
    </div>
  );
};

export default AssistantModule;
