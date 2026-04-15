import React, { useState, useEffect } from 'react';

const SettingsModule = () => {
  const [settings, setSettings] = useState({
    backgroundMode: true,
    autoStart: false,
    notifications: true,
    theme: 'dark',
    language: 'es',
    intelligenceLevel: 'high'
  });

  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    // Load settings from Electron
    const loadSettings = async () => {
      try {
        if (window.electronAPI && window.electronAPI.getSettings) {
          const savedSettings = await window.electronAPI.getSettings();
          if (savedSettings) {
            setSettings(prev => ({ ...prev, ...savedSettings }));
          }
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    setSaveStatus('Guardando...');
    try {
      if (window.electronAPI && window.electronAPI.saveSettings) {
        await window.electronAPI.saveSettings(settings);
        setSaveStatus('✅ Configuración guardada');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (error) {
      setSaveStatus('❌ Error al guardar');
      console.error('Error saving settings:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="module-container">
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="holographic-spinner"></div>
          <p>Cargando configuraciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="module-container">
      <h2 className="module-title">⚙️ Configuraciones del Sistema</h2>

      <div className="card">
        <h3>Preferencias Generales</h3>

        <div className="form-group" style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>Modo en segundo plano</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>Mantener J-Vairyx activo al cerrar la ventana principal</div>
            </div>
            <input
              type="checkbox"
              checked={settings.backgroundMode}
              onChange={() => handleToggle('backgroundMode')}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>Inicio automático</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>Iniciar J-Vairyx al encender el equipo</div>
            </div>
            <input
              type="checkbox"
              checked={settings.autoStart}
              onChange={() => handleToggle('autoStart')}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>Notificaciones</div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>Mostrar globos de notificación en la bandeja del sistema</div>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => handleToggle('notifications')}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Nivel de Inteligencia</h3>
        <div className="form-group" style={{ marginTop: '1rem' }}>
          <select
            className="form-control"
            value={settings.intelligenceLevel}
            onChange={(e) => handleChange('intelligenceLevel', e.target.value)}
          >
            <option value="standard">Estándar (Reactivo)</option>
            <option value="high">Alto (Proactivo & Curioso)</option>
            <option value="quantum">Cuántico (Aprendizaje Profundo Continuo)</option>
          </select>
          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
            Controla la frecuencia y profundidad de las sugerencias autónomas.
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Apariencia</h3>
        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label>Tema de interfaz</label>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button
              className={`btn ${settings.theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleChange('theme', 'dark')}
            >
              Oscuro (Holográfico)
            </button>
            <button
              className={`btn ${settings.theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleChange('theme', 'light')}
            >
              Claro
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
        <div style={{ color: settings.theme === 'dark' ? '#aaa' : '#666' }}>{saveStatus}</div>
        <button className="btn btn-primary" onClick={saveSettings} style={{ padding: '0.75rem 2rem' }}>
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default SettingsModule;
