import React, { useState } from 'react';
import consentManagementService from '../services/ConsentManagementService';
import * as CookieConsent from "vanilla-cookieconsent";

const ConsentManager = () => {
  const [consents, setConsents] = useState(consentManagementService.getAllConsents());
  const [exportMessage, setExportMessage] = useState('');

  const openPreferences = () => {
    if (typeof CookieConsent.showPreferences === 'function') {
      CookieConsent.showPreferences();
    }
  };

  const handleExport = async () => {
    try {
      const databaseService = require('../services/DatabaseService').default;
      const data = await consentManagementService.exportUserData(databaseService);

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `jvairyx_gdpr_export_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setExportMessage('Datos exportados correctamente.');
    } catch (e) {
      setExportMessage('Error al exportar datos.');
      console.error(e);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("⚠️ ADVERTENCIA: Esto eliminará todos tus datos locales, memoria de aprendizaje e historial. ¿Estás seguro de que deseas invocar el Derecho al Olvido (GDPR)?")) {
      try {
        const databaseService = require('../services/DatabaseService').default;
        await consentManagementService.deleteUserData(databaseService);
        setConsents(consentManagementService.getAllConsents());
        setExportMessage('Todos los datos han sido eliminados correctamente.');

        if (typeof CookieConsent.show === 'function') {
           CookieConsent.reset();
           window.location.reload();
        }
      } catch (e) {
        setExportMessage('Error al eliminar datos.');
      }
    }
  };

  return (
    <div className="consent-manager" style={{ padding: '20px', background: 'rgba(20, 25, 35, 0.9)', borderRadius: '10px', marginTop: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
      <h3 style={{ color: '#61dafb', marginBottom: '15px' }}>🛡️ Gestión de Privacidad y GDPR</h3>
      <p style={{ color: '#ddd', fontSize: '14px', marginBottom: '15px' }}>
        Controla los permisos de datos o ejerce tus derechos de privacidad.
      </p>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={openPreferences} style={btnStyle('#4CAF50')}>
          ⚙️ Configurar Permisos
        </button>

        <button onClick={handleExport} style={btnStyle('#2196F3')}>
          📥 Exportar mis Datos
        </button>

        <button onClick={handleDelete} style={btnStyle('#f44336')}>
          🗑️ Eliminar Todos Mis Datos (Derecho al Olvido)
        </button>
      </div>

      {exportMessage && <p style={{ color: '#aaa', marginTop: '10px', fontSize: '13px' }}>{exportMessage}</p>}
    </div>
  );
};

const btnStyle = (bg) => ({
  background: bg,
  color: 'white',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
});

export default ConsentManager;
