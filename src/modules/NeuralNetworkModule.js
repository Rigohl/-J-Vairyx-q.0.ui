import React, { useEffect, useRef, useState } from 'react';

const NeuralNetworkModule = () => {
  const canvasRef = useRef(null);
  const [neuralData, setNeuralData] = useState({
    nodes: [],
    connections: [],
    isActive: false
  });
  const [trainingStatus, setTrainingStatus] = useState('idle');
  const [loss, setLoss] = useState(0);
  
  // Initialize neural network structure
  useEffect(() => {
    const initializeNetwork = () => {
      // Create sample neural network structure
      const nodes = [];
      const connections = [];
      
      // Input layer (3 nodes)
      for (let i = 0; i < 3; i++) {
        nodes.push({
          id: `input-${i}`,
          x: 100,
          y: 150 + i * 100,
          type: 'input',
          activation: 0
        });
      }
      
      // Hidden layer 1 (5 nodes)
      for (let i = 0; i < 5; i++) {
        nodes.push({
          id: `hidden1-${i}`,
          x: 300,
          y: 100 + i * 80,
          type: 'hidden',
          activation: 0
        });
      }
      
      // Hidden layer 2 (4 nodes)
      for (let i = 0; i < 4; i++) {
        nodes.push({
          id: `hidden2-${i}`,
          x: 500,
          y: 120 + i * 100,
          type: 'hidden',
          activation: 0
        });
      }
      
      // Output layer (2 nodes)
      for (let i = 0; i < 2; i++) {
        nodes.push({
          id: `output-${i}`,
          x: 700,
          y: 200 + i * 150,
          type: 'output',
          activation: 0
        });
      }
      
      // Create connections between layers
      // Input to Hidden1
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 5; j++) {
          connections.push({
            source: `input-${i}`,
            target: `hidden1-${j}`,
            weight: Math.random() * 2 - 1
          });
        }
      }
      
      // Hidden1 to Hidden2
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 4; j++) {
          connections.push({
            source: `hidden1-${i}`,
            target: `hidden2-${j}`,
            weight: Math.random() * 2 - 1
          });
        }
      }
      
      // Hidden2 to Output
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 2; j++) {
          connections.push({
            source: `hidden2-${i}`,
            target: `output-${j}`,
            weight: Math.random() * 2 - 1
          });
        }
      }
      
      setNeuralData({
        nodes,
        connections,
        isActive: true
      });
    };
    
    initializeNetwork();
  }, []);
  
  // Visualization effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !neuralData.isActive) return;
    
    const ctx = canvas.getContext('2d');
    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      neuralData.connections.forEach(conn => {
        const sourceNode = neuralData.nodes.find(n => n.id === conn.source);
        const targetNode = neuralData.nodes.find(n => n.id === conn.target);
        
        if (sourceNode && targetNode) {
          // Calculate color based on weight
          const intensity = Math.abs(conn.weight);
          const colorValue = Math.floor(intensity * 255);
          const r = conn.weight > 0 ? colorValue : 0;
          const g = 0;
          const b = conn.weight < 0 ? colorValue : 0;
          
          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.6)`;
          ctx.lineWidth = 1 + intensity * 2;
          ctx.stroke();
        }
      });
      
      // Draw nodes
      neuralData.nodes.forEach(node => {
        // Node color based on type
        let color;
        switch(node.type) {
          case 'input':
            color = '#4CAF50'; // Green
            break;
          case 'hidden':
            color = '#2196F3'; // Blue
            break;
          case 'output':
            color = '#FF9800'; // Orange
            break;
          default:
            color = '#9E9E9E'; // Gray
        }
        
        // Draw node with activation-based pulsing
        const pulseSize = 1 + Math.abs(node.activation) * 5;
        const alpha = 0.7 + Math.abs(node.activation) * 0.3;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, 10 + pulseSize, 0, 2 * Math.PI);
        ctx.fillStyle = color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
        ctx.fill();
        
        // Draw activation value as text
        ctx.fillStyle = 'white';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(node.activation.toFixed(2), node.x, node.y + 25);
      });
      
      requestAnimationFrame(drawNetwork);
    };
    
    drawNetwork();
    
    return () => {
      // Cleanup
    };
  }, [neuralData]);
  
  const startTraining = () => {
    setTrainingStatus('training');
    
    // Simulate training process
    const interval = setInterval(() => {
      setLoss(prev => Math.max(0, prev - 0.01 + Math.random() * 0.02));
      
      // Update node activations randomly during training
      setNeuralData(prev => ({
        ...prev,
        nodes: prev.nodes.map(node => ({
          ...node,
          activation: Math.tanh(Math.random() * 4 - 2) // Random activation between -1 and 1
        }))
      }));
    }, 100);
    
    // Stop training after some time
    setTimeout(() => {
      clearInterval(interval);
      setTrainingStatus('trained');
    }, 5000);
  };
  
  const resetNetwork = () => {
    setTrainingStatus('idle');
    setLoss(0);
    
    setNeuralData(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => ({ ...node, activation: 0 }))
    }));
  };
  
  return (
    <div className="neural-network-module">
      <div className="neural-controls">
        <button 
          className="neural-button primary"
          onClick={startTraining}
          disabled={trainingStatus === 'training'}
        >
          {trainingStatus === 'training' ? 'Entrenando...' : 'Iniciar Entrenamiento'}
        </button>
        <button 
          className="neural-button secondary"
          onClick={resetNetwork}
        >
          Reiniciar Red
        </button>
        <div className="training-info">
          <div>Estado: <span className={`status-${trainingStatus}`}>{trainingStatus}</span></div>
          <div>Pérdida: <span>{loss.toFixed(4)}</span></div>
        </div>
      </div>
      
      <div className="neural-visualization">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          style={{ 
            border: '1px solid #444',
            borderRadius: '8px',
            background: 'rgba(20, 20, 30, 0.8)'
          }}
        />
      </div>
      
      <div className="neural-description">
        <h3>Red Neuronal Artificial</h3>
        <p>Esta visualización muestra una red neuronal artificial con capas de entrada, ocultas y salida.</p>
        <ul>
          <li><strong>Nodos Verdes:</strong> Capa de entrada</li>
          <li><strong>Nodos Azules:</strong> Capas ocultas</li>
          <li><strong>Nodos Naranjas:</strong> Capa de salida</li>
          <li><strong>Líneas:</strong> Conexiones ponderadas entre nodos</li>
        </ul>
      </div>
    </div>
  );
};

export default NeuralNetworkModule;