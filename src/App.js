import React, { useState } from 'react';
import AssistantModule from './modules/AssistantModule';
import OrganizerModule from './modules/OrganizerModule';
import DriveModule from './modules/DriveModule';
import SettingsModule from './modules/SettingsModule';
import FloatingWindow from './components/FloatingWindow';
import ConsentBanner from './components/ConsentBanner';
import './styles/global.css';

const App = () => {
  const [activeModule, setActiveModule] = useState('assistant');
  const [version] = useState('0.1.0');

  // Determine if we should show settings based on URL parameters
  const queryParams = new URLSearchParams(window.location.search);
  const isSettingsView = queryParams.get('view') === 'settings';

  if (isSettingsView) {
    return (
      <div className="app-container settings-view">
        <ConsentBanner />
        <div className="background-decor">
          <div className="blob"></div>
        </div>
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <SettingsModule />
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <ConsentBanner />
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
