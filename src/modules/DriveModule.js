import React, { useState, useEffect } from 'react';
import systemIntegrationService from '../services/SystemIntegrationService';

const DriveModule = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'documento_importante.pdf', size: '2.3 MB', type: 'pdf', uploadDate: new Date('2025-01-01') },
    { id: 2, name: 'proyecto_vairyx.docx', size: '856 KB', type: 'docx', uploadDate: new Date('2025-01-02') },
    { id: 3, name: 'configuracion.json', size: '1.2 KB', type: 'json', uploadDate: new Date() }
  ]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileType, setNewFileType] = useState('txt');
  const [newFileContent, setNewFileContent] = useState('');
  const [folderName, setFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [showAdvancedCreate, setShowAdvancedCreate] = useState(false);

  const handleFileUpload = () => {
    // Simulate file upload
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add new file to list
          const newFile = {
            id: Date.now(),
            name: `archivo_${Date.now()}.txt`,
            size: `${Math.floor(Math.random() * 1000) + 100} KB`,
            type: 'txt',
            uploadDate: new Date()
          };
          
          setFiles(prevFiles => [...prevFiles, newFile]);
          setUploadProgress(0);
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Enhanced file creation
  const handleCreateFile = async () => {
    if (!newFileName.trim()) return;
    
    setIsCreating(true);
    
    const fileName = `${newFileName}.${newFileType}`;
    const result = await systemIntegrationService.createFile(fileName, newFileContent);
    
    if (result.success) {
      const newFile = {
        id: Date.now(),
        name: fileName,
        size: `${Math.max(1, newFileContent.length)} B`,
        type: newFileType,
        uploadDate: new Date(),
        isCreated: true
      };
      
      setFiles(prevFiles => [...prevFiles, newFile]);
      setNewFileName('');
      setNewFileContent('');
      alert(`✅ ${result.message}`);
    } else {
      alert(`❌ Error: ${result.error}`);
    }
    
    setIsCreating(false);
  };

  // Enhanced folder creation
  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;
    
    setIsCreatingFolder(true);
    
    const result = await systemIntegrationService.createFolder(folderName);
    
    if (result.success) {
      const newFolder = {
        id: Date.now(),
        name: folderName,
        size: '--',
        type: 'folder',
        uploadDate: new Date(),
        isFolder: true
      };
      
      setFiles(prevFiles => [...prevFiles, newFolder]);
      setFolderName('');
      alert(`📁 ${result.message}`);
    } else {
      alert(`❌ Error: ${result.error}`);
    }
    
    setIsCreatingFolder(false);
  };

  // Smart file organization
  const handleOrganizeFiles = async () => {
    const result = await systemIntegrationService.organizeFiles('./', 'by_type');
    
    if (result.success) {
      alert(`🗂️ ¡Archivos organizados! ${result.message}`);
      
      // Simulate organization in UI
      const organizedFiles = [...files];
      organizedFiles.sort((a, b) => a.type.localeCompare(b.type));
      setFiles(organizedFiles);
    } else {
      alert(`❌ Error organizando: ${result.error}`);
    }
  };

  const deleteFile = (id) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const downloadFile = async (file) => {
    try {
      const result = await window.electronAPI.invoke('drive-download-file', file);
      if (result.success) {
        alert(`✅ ${result.message}`);
      } else {
        alert(`❌ ${result.error || result.message}`);
      }
    } catch (error) {
      alert(`❌ Error descargando archivo: ${error.message}`);
    }
  };

  const executeFile = async (file) => {
    try {
      const result = await window.electronAPI.invoke('execute-file', file);
      if (result.success) {
        alert(`🚀 ${result.message}`);
      } else {
        alert(`❌ ${result.error || result.message}`);
      }
    } catch (error) {
      alert(`❌ Error ejecutando archivo: ${error.message}`);
    }
  };

  const getFileIcon = (type, isFolder = false) => {
    if (isFolder) return '📁';
    
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'docx': case 'doc': return '📝';
      case 'json': return '⚙️';
      case 'txt': return '📃';
      case 'md': return '📋';
      case 'js': return '📜';
      case 'css': return '🎨';
      case 'html': return '🌐';
      case 'py': return '🐍';
      case 'jpg': case 'jpeg': case 'png': return '🖼️';
      case 'mp3': case 'wav': return '🎵';
      case 'mp4': case 'avi': return '🎬';
      case 'zip': case 'rar': return '🗜️';
      case 'folder': return '📁';
      default: return '📄';
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalSize = () => {
    const totalKB = files.reduce((total, file) => {
      const sizeNum = parseFloat(file.size);
      const unit = file.size.includes('MB') ? 1024 : 1;
      return total + (sizeNum * unit);
    }, 0);
    
    return totalKB > 1024 ? 
      `${(totalKB / 1024).toFixed(1)} MB` : 
      `${totalKB.toFixed(0)} KB`;
  };

  return (
    <div className="module-container">
      <h2 className="module-title">💾 Drive Personal</h2>
      
      {/* Statistics */}
      <div className="card">
        <h3>Estado del Drive</h3>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
              {files.length}
            </div>
            <div style={{ color: '#666' }}>Archivos</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
              {getTotalSize()}
            </div>
            <div style={{ color: '#666' }}>Espacio usado</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#17a2b8' }}>
              ∞
            </div>
            <div style={{ color: '#666' }}>Disponible</div>
          </div>
        </div>
      </div>

      {/* Upload section */}
      <div className="card">
        <h3>Subir Archivos</h3>
        <div style={{ marginTop: '1rem' }}>
          <button 
            className="btn btn-primary"
            onClick={handleFileUpload}
            disabled={isUploading}
          >
            {isUploading ? 'Subiendo...' : 'Seleccionar Archivo'}
          </button>
          
          {isUploading && (
            <div style={{ marginTop: '1rem' }}>
              <div style={{ 
                background: '#f1f3f4',
                borderRadius: '4px',
                height: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${uploadProgress}%`,
                  height: '100%',
                  background: '#667eea',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
                {uploadProgress}% completado
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced File Creation */}
      <div className="card">
        <h3>🚀 Crear Archivos y Carpetas</h3>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAdvancedCreate(!showAdvancedCreate)}
          >
            {showAdvancedCreate ? '📁 Crear Simple' : '⚡ Crear Avanzado'}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleOrganizeFiles}
          >
            🗂️ Organizar Todo
          </button>
        </div>
        
        {showAdvancedCreate ? (
          <div className="advanced-create-panel">
            {/* Advanced File Creation */}
            <div className="create-section">
              <h4>📄 Crear Archivo</h4>
              <div className="form-group">
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre del archivo"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    style={{ flex: 2 }}
                  />
                  <select
                    className="form-control"
                    value={newFileType}
                    onChange={(e) => setNewFileType(e.target.value)}
                    style={{ flex: 1 }}
                  >
                    <option value="txt">TXT</option>
                    <option value="md">Markdown</option>
                    <option value="js">JavaScript</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                    <option value="json">JSON</option>
                    <option value="py">Python</option>
                  </select>
                </div>
                <textarea
                  className="form-control"
                  placeholder="Contenido del archivo (opcional)"
                  value={newFileContent}
                  onChange={(e) => setNewFileContent(e.target.value)}
                  rows="4"
                  style={{ marginBottom: '0.5rem' }}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleCreateFile}
                  disabled={isCreating || !newFileName.trim()}
                >
                  {isCreating ? 'Creando...' : '📄 Crear Archivo'}
                </button>
              </div>
            </div>

            {/* Folder Creation */}
            <div className="create-section">
              <h4>📁 Crear Carpeta</h4>
              <div className="form-group">
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre de la carpeta"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                  />
                  <button
                    className="btn btn-secondary"
                    onClick={handleCreateFolder}
                    disabled={isCreatingFolder || !folderName.trim()}
                  >
                    {isCreatingFolder ? 'Creando...' : '📁 Crear'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="simple-create-panel">
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="text"
                className="form-control"
                placeholder="archivo.txt o carpeta/"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const value = e.target.value;
                    if (value.endsWith('/')) {
                      setFolderName(value.slice(0, -1));
                      handleCreateFolder();
                    } else {
                      const parts = value.split('.');
                      setNewFileName(parts[0]);
                      setNewFileType(parts[1] || 'txt');
                      handleCreateFile();
                    }
                    e.target.value = '';
                  }
                }}
              />
              <span style={{ fontSize: '0.8rem', color: '#666' }}>
                Enter para crear
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="card">
        <div className="form-group">
          <label htmlFor="file-search">🔍 Buscar archivos:</label>
          <input
            id="file-search"
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* File list */}
      <div className="card">
        <h3>Mis Archivos</h3>
        {filteredFiles.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#666', 
            padding: '2rem',
            fontStyle: 'italic' 
          }}>
            {searchTerm ? 'No se encontraron archivos' : 'No hay archivos'}
          </div>
        ) : (
          <ul className="file-list">
            {filteredFiles.map(file => (
              <li key={file.id} className="file-item">
                <div className="file-icon">
                  {getFileIcon(file.type, file.isFolder)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500' }}>{file.name}</div>
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: '#666',
                    marginTop: '0.25rem'
                  }}>
                    {file.size} • {file.uploadDate.toLocaleDateString()}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-small"
                    style={{ background: '#28a745', color: 'white' }}
                    onClick={() => executeFile(file)}
                    title="Ejecutar/Abrir archivo"
                  >
                    🚀 Ejecutar
                  </button>
                  <button
                    className="btn btn-small btn-secondary"
                    onClick={() => downloadFile(file)}
                  >
                    💾 Descargar
                  </button>
                  <button
                    className="btn btn-small"
                    style={{ background: '#dc3545', color: 'white' }}
                    onClick={() => deleteFile(file.id)}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Drive features */}
      <div className="card">
        <h3>Características del Drive</h3>
        <ul style={{ marginTop: '1rem', color: '#666' }}>
          <li>☁️ Sincronización automática</li>
          <li>🔒 Cifrado de extremo a extremo</li>
          <li>📱 Acceso desde cualquier dispositivo</li>
          <li>🗂️ Organización inteligente</li>
          <li>🔍 Búsqueda avanzada</li>
        </ul>
      </div>
    </div>
  );
};

export default DriveModule;