import React, { useState, useEffect } from 'react';

const OrganizerModule = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Configurar J-Vairyx', completed: true, priority: 'high', createdAt: new Date('2025-01-01') },
    { id: 2, text: 'Revisar documentos importantes', completed: false, priority: 'medium', createdAt: new Date() },
    { id: 3, text: 'Organizar archivos del escritorio', completed: false, priority: 'low', createdAt: new Date() }
  ]);
  const [newTask, setNewTask] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');

  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority: 'medium',
      createdAt: new Date()
    };

    setTasks(prev => [...prev, task]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const updateTaskPriority = (id, priority) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, priority } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filterPriority === 'all') return true;
    return task.priority === filterPriority;
  });

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  const stats = getStats();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <div className="module-container">
      <h2 className="module-title">📋 Organizador de Tareas</h2>
      
      {/* Statistics */}
      <div className="card">
        <h3>Estadísticas</h3>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
              {stats.total}
            </div>
            <div style={{ color: '#666' }}>Total</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
              {stats.completed}
            </div>
            <div style={{ color: '#666' }}>Completadas</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>
              {stats.pending}
            </div>
            <div style={{ color: '#666' }}>Pendientes</div>
          </div>
        </div>
      </div>

      {/* Add new task */}
      <div className="card">
        <h3>Agregar Nueva Tarea</h3>
        <div className="form-group">
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Escribe una nueva tarea..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button className="btn btn-primary" onClick={addTask}>
              Agregar
            </button>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label htmlFor="priority-filter">Filtrar por prioridad:</label>
          <select
            id="priority-filter"
            className="form-control"
            style={{ width: 'auto' }}
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">Todas</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </div>
      </div>

      {/* Task list */}
      <div className="card">
        <h3>Lista de Tareas</h3>
        {filteredTasks.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#666', 
            padding: '2rem',
            fontStyle: 'italic' 
          }}>
            No hay tareas que mostrar
          </div>
        ) : (
          <ul className="task-list">
            {filteredTasks.map(task => (
              <li key={task.id} className="task-item">
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <div className={`task-text ${task.completed ? 'completed' : ''}`}>
                  <div>{task.text}</div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: '#666',
                    marginTop: '0.25rem'
                  }}>
                    Creada: {task.createdAt.toLocaleDateString()}
                  </div>
                </div>
                <div style={{ 
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  backgroundColor: getPriorityColor(task.priority),
                  color: 'white',
                  textTransform: 'uppercase'
                }}>
                  {task.priority === 'high' ? 'Alta' : 
                   task.priority === 'medium' ? 'Media' : 'Baja'}
                </div>
                <div className="task-actions">
                  <select
                    className="btn btn-small"
                    value={task.priority}
                    onChange={(e) => updateTaskPriority(task.id, e.target.value)}
                    style={{ fontSize: '0.7rem' }}
                  >
                    <option value="high">Alta</option>
                    <option value="medium">Media</option>
                    <option value="low">Baja</option>
                  </select>
                  <button
                    className="btn btn-small btn-secondary"
                    onClick={() => deleteTask(task.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrganizerModule;