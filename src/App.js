import React, { useState, useEffect } from 'react';
import AssistantModule from './modules/AssistantModule';
import OrganizerModule from './modules/OrganizerModule';
import DriveModule from './modules/DriveModule';
import FloatingWindow from './components/FloatingWindow';
import './styles/global.css';

const App = () => {
  const [activeModule, setActiveModule] = useState('assistant');
  const [version] = useState('0.1.0');

  return (
    <div className="app-container">
      {/* El fondo puede tener la visualización de red neuronal si se desea,
          pero la prioridad es la Chat App Flotante */}
      <div className="background-decor">
        <div className="blob"></div>
        <div className="blob"></div>
      </div>

      <FloatingWindow 
        title="J-VAIRYX: COMPAÑERO INTELIGENTE"
        version={version}
        initialPosition={{ x: 50, y: 50 }}
        initialSize={{ width: 450, height: 650 }}
      >
        <div className="companion-nav">
          <button
            className={`nav-btn ${activeModule === 'assistant' ? 'active' : ''}`}
            onClick={() => setActiveModule('assistant')}
          >
            💬 Chat
          </button>
          <button
            className={`nav-btn ${activeModule === 'organizer' ? 'active' : ''}`}
            onClick={() => setActiveModule('organizer')}
          >
            📋 Tareas
          </button>
          <button
            className={`nav-btn ${activeModule === 'drive' ? 'active' : ''}`}
            onClick={() => setActiveModule('drive')}
          >
            💾 Archivos
          </button>
        </div>

        <div className="module-content">
          {activeModule === 'assistant' && <AssistantModule />}
          {activeModule === 'organizer' && <OrganizerModule />}
          {activeModule === 'drive' && <DriveModule />}
        </div>
      </FloatingWindow>
    </div>
  );
};

export default App;
