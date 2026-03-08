import React, { useState, useRef, useEffect } from 'react';

const FloatingWindow = ({ 
  title, 
  version, 
  children, 
  initialPosition = { x: 100, y: 100 }, 
  initialSize = { width: 400, height: 500 } 
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const windowRef = useRef(null);
  const headerRef = useRef(null);

  // Handle dragging functionality
  const handleMouseDown = (e) => {
    if (e.target !== headerRef.current && !headerRef.current.contains(e.target)) {
      return;
    }
    
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Boundary checks
    const boundedX = Math.max(0, Math.min(newX, window.innerWidth - size.width));
    const boundedY = Math.max(0, Math.min(newY, window.innerHeight - 50)); // Minimum 50px from bottom for controls
    
    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle resizing functionality
  const handleResizeStart = (e) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleResizeMove = (e) => {
    if (!isResizing) return;
    
    const newWidth = Math.max(300, Math.min(e.clientX - position.x, window.innerWidth - position.x));
    const newHeight = Math.max(200, Math.min(e.clientY - position.y, window.innerHeight - position.y));
    
    setSize({ width: newWidth, height: newHeight });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  // Add event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isDragging, isResizing, dragOffset]);

  // Prevent scrolling when interacting with the window
  useEffect(() => {
    if (isDragging || isResizing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDragging, isResizing]);

  return (
    <div
      ref={windowRef}
      className={`floating-window ${isMinimized ? 'minimized' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: 1000,
        position: 'fixed',
        backgroundColor: 'rgba(30, 30, 40, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Window Header */}
      <div
        ref={headerRef}
        className="floating-window-header"
        style={{
          backgroundColor: 'rgba(20, 20, 30, 0.9)',
          padding: '12px 16px',
          cursor: 'move',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          userSelect: 'none'
        }}
        onMouseDown={handleMouseDown}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #4CAF50, #2E7D32)',
              boxShadow: '0 0 8px rgba(76, 175, 80, 0.6)'
            }}
          ></div>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#fff' }}>
            {title}
          </h3>
          <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
            v{version}
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '16px',
              cursor: 'pointer',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = ''}
          >
            {isMinimized ? '最大化' : '_'}
          </button>
          <button
            onClick={() => window.close ? window.close() : null}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '16px',
              cursor: 'pointer',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 100, 100, 0.2)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = ''}
          >
            ×
          </button>
        </div>
      </div>
      
      {/* Window Content */}
      {!isMinimized && (
        <div 
          className="floating-window-content-wrapper"
          style={{ 
            flex: 1, 
            overflow: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {children}
        </div>
      )}
      
      {/* Resize Handle */}
      <div
        className="resize-handle"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '16px',
          height: '16px',
          cursor: 'se-resize',
          background: 'transparent'
        }}
        onMouseDown={handleResizeStart}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ 
            position: 'absolute', 
            bottom: '2px', 
            right: '2px',
            opacity: 0.4
          }}
        >
          <path d="M2 10L10 2M10 2H2M10 2V10" stroke="white" strokeWidth="1.5"/>
        </svg>
      </div>
    </div>
  );
};

export default FloatingWindow;