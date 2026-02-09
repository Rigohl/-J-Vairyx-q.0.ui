import React, { useState, useEffect } from 'react';
import NeuralNetworkVisualization from './components/NeuralNetworkVisualization';
import FloatingWindow from './components/FloatingWindow';

const App = () => {
  const [appVersion, setAppVersion] = useState('0.0.1');
  const [neuralNetworkData, setNeuralNetworkData] = useState({
    nodes: [],
    connections: [],
    isActive: false
  });

  useEffect(() => {
    // Initialize neural network data
    initializeNeuralNetwork();
    
    // Get app version from Electron if available
    if (window.electronAPI) {
      window.electronAPI.getVersion().then(version => {
        setAppVersion(version);
      }).catch(() => {
        // Fallback if not in Electron
        setAppVersion('0.0.1');
      });
    }
  }, []);

  const initializeNeuralNetwork = () => {
    // Create initial neural network structure
    const nodes = [
      { id: 'input1', x: 100, y: 150, type: 'input', label: 'Entrada' },
      { id: 'input2', x: 100, y: 250, type: 'input', label: 'Datos' },
      { id: 'hidden1', x: 300, y: 100, type: 'hidden', label: 'Nodo Oculto' },
      { id: 'hidden2', x: 300, y: 200, type: 'hidden', label: 'Procesamiento' },
      { id: 'hidden3', x: 300, y: 300, type: 'hidden', label: 'IA' },
      { id: 'output', x: 500, y: 200, type: 'output', label: 'Salida' }
    ];

    const connections = [
      { source: 'input1', target: 'hidden1' },
      { source: 'input1', target: 'hidden2' },
      { source: 'input2', target: 'hidden2' },
      { source: 'input2', target: 'hidden3' },
      { source: 'hidden1', target: 'output' },
      { source: 'hidden2', target: 'output' },
      { source: 'hidden3', target: 'output' }
    ];

    setNeuralNetworkData({
      nodes,
      connections,
      isActive: true
    });
  };

  return (
    <div className="app floating-neural-network">
      <NeuralNetworkVisualization 
        nodes={neuralNetworkData.nodes} 
        connections={neuralNetworkData.connections} 
        isActive={neuralNetworkData.isActive}
      />
      
      <FloatingWindow 
        title="J-Vairyx Neural Assistant"
        version={appVersion}
        initialPosition={{ x: 100, y: 100 }}
        initialSize={{ width: 400, height: 500 }}
      >
        <div className="floating-window-content">
          <div className="neural-status">
            <div className="status-indicator active"></div>
            <span className="status-text">Red Neuronal Activa</span>
          </div>
          
          <div className="assistant-interface">
            <div className="message-bubble ai-message">
              ¡Hola! Soy J-Vairyx, tu asistente basado en red neuronal. ¿En qué puedo ayudarte?
            </div>
            
            <div className="input-area">
              <textarea 
                placeholder="Escribe tu consulta..."
                className="neural-input"
                rows="3"
              ></textarea>
              <button className="neural-button primary">Enviar Consulta</button>
            </div>
          </div>
          
          <div className="neural-controls">
            <button className="neural-button secondary">Aprender</button>
            <button className="neural-button secondary">Analizar</button>
            <button className="neural-button secondary">Optimizar</button>
          </div>
        </div>
      </FloatingWindow>
      
      {/* Additional floating elements */}
      <div className="floating-element element-1"></div>
      <div className="floating-element element-2"></div>
      <div className="floating-element element-3"></div>
    </div>
  );
};

export default App;