import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import OrganizerModule from './modules/OrganizerModule';
import AssistantModule from './modules/AssistantModule';
import DriveModule from './modules/DriveModule';

const App = () => {
  const [activeModule, setActiveModule] = useState('asistente');
  const [appVersion, setAppVersion] = useState('0.0.1');

  useEffect(() => {
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

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'organizador':
        return <OrganizerModule />;
      case 'asistente':
        return <AssistantModule />;
      case 'drive':
        return <DriveModule />;
      default:
        return <AssistantModule />;
    }
  };

  return (
    <div className="app">
      <Header version={appVersion} />
      <div className="main-content">
        <Sidebar 
          activeModule={activeModule} 
          onModuleChange={setActiveModule} 
        />
        <div className="content-area">
          {renderActiveModule()}
        </div>
      </div>
    </div>
  );
};

export default App;