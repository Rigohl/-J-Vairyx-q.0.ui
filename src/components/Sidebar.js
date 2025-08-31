import React from 'react';

const Sidebar = ({ activeModule, onModuleChange }) => {
  const modules = [
    { id: 'asistente', name: 'Asistente IA', icon: '🤖' },
    { id: 'organizador', name: 'Organizador', icon: '📋' },
    { id: 'drive', name: 'Drive', icon: '💾' }
  ];

  return (
    <aside className="sidebar">
      <nav>
        <ul className="sidebar-nav">
          {modules.map(module => (
            <li key={module.id}>
              <button
                className={activeModule === module.id ? 'active' : ''}
                onClick={() => onModuleChange(module.id)}
              >
                <span style={{ marginRight: '0.5rem' }}>{module.icon}</span>
                {module.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: '8px',
        fontSize: '0.8rem',
        color: 'rgba(255, 255, 255, 0.8)'
      }}>
        <strong>Estado:</strong> Activo<br />
        <strong>Fase:</strong> 1<br />
        <strong>Módulos:</strong> 3/3
      </div>
    </aside>
  );
};

export default Sidebar;