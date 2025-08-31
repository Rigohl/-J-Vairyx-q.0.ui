import React from 'react';

const Header = ({ version }) => {
  return (
    <header className="header">
      <div>
        <h1>J-Vairyx</h1>
        <span className="version">Personal Assistant v{version}</span>
      </div>
      <div>
        <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
          Asistente Personal Inteligente
        </span>
      </div>
    </header>
  );
};

export default Header;