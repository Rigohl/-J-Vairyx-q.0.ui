import React, { useEffect, useRef } from 'react';

const NeuralNetworkVisualization = ({ nodes, connections, isActive }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop for neural network visualization
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isActive) {
        // Draw connections with animated pulses
        connections.forEach(conn => {
          const sourceNode = nodes.find(n => n.id === conn.source);
          const targetNode = nodes.find(n => n.id === conn.target);
          
          if (sourceNode && targetNode) {
            // Calculate positions relative to window size
            const startX = (sourceNode.x / 600) * canvas.width;
            const startY = (sourceNode.y / 400) * canvas.height;
            const endX = (targetNode.x / 600) * canvas.width;
            const endY = (targetNode.y / 400) * canvas.height;

            // Draw connection line
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw animated pulse
            const pulseOffset = (Date.now() / 1000) % 1;
            const pulseX = startX + (endX - startX) * pulseOffset;
            const pulseY = startY + (endY - startY) * pulseOffset;

            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 3, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
            ctx.fill();
          }
        });

        // Draw nodes
        nodes.forEach(node => {
          const x = (node.x / 600) * canvas.width;
          const y = (node.y / 400) * canvas.height;
          
          // Draw node circle
          ctx.beginPath();
          ctx.arc(x, y, 15, 0, 2 * Math.PI);
          
          // Different colors for different node types
          switch(node.type) {
            case 'input':
              ctx.fillStyle = 'rgba(255, 100, 100, 0.7)';
              break;
            case 'hidden':
              ctx.fillStyle = 'rgba(100, 255, 100, 0.7)';
              break;
            case 'output':
              ctx.fillStyle = 'rgba(100, 100, 255, 0.7)';
              break;
            default:
              ctx.fillStyle = 'rgba(200, 200, 200, 0.7)';
          }
          
          ctx.fill();
          
          // Draw glow effect
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes, connections, isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="neural-network-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default NeuralNetworkVisualization;