// Document Expert Service - Specialized handling for Excel, Word, PDF, and other document types
class DocumentExpertService {
  constructor() {
    this.supportedFormats = {
      excel: ['.xlsx', '.xls', '.csv', '.ods'],
      word: ['.docx', '.doc', '.rtf', '.odt'],
      pdf: ['.pdf'],
      powerpoint: ['.pptx', '.ppt', '.odp'],
      text: ['.txt', '.md', '.json', '.xml', '.yaml', '.yml'],
      databases: ['.db', '.sqlite', '.sql', '.mdb']
    };
    this.documentTemplates = this.initializeTemplates();
    this.expertiseAreas = [
      'formulas', 'charts', 'pivot_tables', 'formatting', 
      'document_structure', 'mail_merge', 'presentations',
      'databases', 'data_analysis', 'automation'
    ];
  }

  initializeTemplates() {
    return {
      excel: {
        budget: `Nombre,Categoría,Presupuesto,Gasto Real,Diferencia
Alimentos,Gastos,500,450,50
Transporte,Gastos,200,180,20
Entretenimiento,Gastos,100,120,-20`,
        
        inventory: `Producto,Código,Cantidad,Precio Unitario,Total
Producto A,001,50,10.00,500.00
Producto B,002,30,15.50,465.00
Producto C,003,25,8.75,218.75`,
        
        timesheet: `Empleado,Proyecto,Fecha,Horas,Tarifa,Total
Juan Pérez,Proyecto A,2025-01-01,8,25.00,200.00
María García,Proyecto B,2025-01-01,6,30.00,180.00`
      },
      
      word: {
        report: `# REPORTE EJECUTIVO

## Resumen Ejecutivo
[Resumen de los puntos principales]

## Objetivos
- Objetivo 1
- Objetivo 2
- Objetivo 3

## Metodología
[Descripción de la metodología utilizada]

## Resultados
[Presentación de resultados]

## Conclusiones
[Conclusiones principales]

## Recomendaciones
[Recomendaciones de acción]`,

        letter: `[Fecha]

[Nombre del destinatario]
[Dirección]

Estimado/a [Nombre]:

[Cuerpo de la carta]

Atentamente,

[Su nombre]
[Su título]
[Información de contacto]`,

        contract: `CONTRATO DE [TIPO]

Entre: [Parte 1]
Y: [Parte 2]

CLÁUSULAS:

1. OBJETO DEL CONTRATO
[Descripción del objeto]

2. OBLIGACIONES DE LAS PARTES
[Obligaciones]

3. DURACIÓN
[Período de vigencia]

4. CONDICIONES ECONÓMICAS
[Términos financieros]

Firmas:
_________________    _________________
Parte 1              Parte 2`
      }
    };
  }

  // Excel expertise methods
  generateExcelFormulas(type, data) {
    const formulas = {
      sum: `=SUM(${data.range || 'A1:A10'})`,
      average: `=AVERAGE(${data.range || 'A1:A10'})`,
      vlookup: `=VLOOKUP(${data.lookup || 'A1'},${data.table || 'B:C'},${data.column || '2'},FALSE)`,
      countif: `=COUNTIF(${data.range || 'A:A'},${data.criteria || '"criteria"'})`,
      sumif: `=SUMIF(${data.range || 'A:A'},${data.criteria || '"criteria"'},${data.sumRange || 'B:B'})`,
      pivotTable: `Tabla dinámica sugerida:
- Filas: ${data.rows || 'Categoría'}
- Columnas: ${data.columns || 'Mes'}
- Valores: ${data.values || 'Suma de Ventas'}
- Filtros: ${data.filters || 'Región'}`
    };
    return formulas[type] || 'Fórmula no encontrada';
  }

  // Word expertise methods
  generateDocumentStructure(type, content) {
    const structures = {
      academic: {
        sections: ['Título', 'Resumen', 'Introducción', 'Metodología', 'Resultados', 'Discusión', 'Conclusiones', 'Referencias'],
        formatting: 'Times New Roman 12pt, doble espacio, márgenes 2.5cm'
      },
      business: {
        sections: ['Resumen Ejecutivo', 'Antecedentes', 'Análisis', 'Propuesta', 'Implementación', 'Presupuesto', 'Cronograma'],
        formatting: 'Arial 11pt, espacio simple, márgenes 2cm'
      },
      legal: {
        sections: ['Encabezado', 'Comparecientes', 'Antecedentes', 'Cláusulas', 'Firmas'],
        formatting: 'Times New Roman 12pt, numeración legal'
      }
    };
    return structures[type] || structures.business;
  }

  // PDF analysis and suggestions
  analyzePDF(filename) {
    // Simulate PDF analysis
    return {
      pageCount: Math.floor(Math.random() * 50) + 1,
      hasImages: Math.random() > 0.5,
      hasTable: Math.random() > 0.6,
      textContent: Math.random() > 0.3,
      suggestions: [
        'Optimizar imágenes para reducir tamaño',
        'Añadir marcadores para navegación',
        'Verificar accesibilidad del documento',
        'Considerar protección con contraseña'
      ]
    };
  }

  // Database expertise
  generateSQLQuery(operation, table, conditions = {}) {
    const queries = {
      select: `SELECT ${conditions.columns || '*'} FROM ${table}${conditions.where ? ` WHERE ${conditions.where}` : ''}${conditions.orderBy ? ` ORDER BY ${conditions.orderBy}` : ''};`,
      insert: `INSERT INTO ${table} (${conditions.columns || 'column1, column2'}) VALUES (${conditions.values || "'value1', 'value2'"});`,
      update: `UPDATE ${table} SET ${conditions.set || 'column1 = value1'} WHERE ${conditions.where || 'id = 1'};`,
      delete: `DELETE FROM ${table} WHERE ${conditions.where || 'id = 1'};`,
      create: `CREATE TABLE ${table} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ${conditions.columns || 'name TEXT NOT NULL, created_date DATETIME DEFAULT CURRENT_TIMESTAMP'}
);`
    };
    return queries[operation] || 'Operación SQL no reconocida';
  }

  // Survey and forms expertise
  generateFormStructure(type, fields) {
    const structures = {
      feedback: {
        title: 'Encuesta de Satisfacción',
        fields: [
          { type: 'radio', name: 'satisfaction', label: '¿Qué tan satisfecho está?', options: ['Muy satisfecho', 'Satisfecho', 'Neutral', 'Insatisfecho', 'Muy insatisfecho'] },
          { type: 'text', name: 'comments', label: 'Comentarios adicionales' },
          { type: 'rating', name: 'rating', label: 'Califique del 1 al 5', min: 1, max: 5 }
        ]
      },
      registration: {
        title: 'Formulario de Registro',
        fields: [
          { type: 'text', name: 'name', label: 'Nombre completo', required: true },
          { type: 'email', name: 'email', label: 'Correo electrónico', required: true },
          { type: 'tel', name: 'phone', label: 'Teléfono' },
          { type: 'date', name: 'birthdate', label: 'Fecha de nacimiento' }
        ]
      },
      survey: {
        title: 'Encuesta General',
        fields: fields || [
          { type: 'text', name: 'question1', label: 'Pregunta 1' },
          { type: 'select', name: 'question2', label: 'Pregunta 2', options: ['Opción 1', 'Opción 2', 'Opción 3'] }
        ]
      }
    };
    return structures[type] || structures.survey;
  }

  // Quick survey response suggestions
  generateQuickResponses(surveyType, context) {
    const responses = {
      satisfaction: {
        positive: ['Excelente servicio', 'Muy satisfecho con la experiencia', 'Superó mis expectativas'],
        neutral: ['Servicio adecuado', 'Experiencia estándar', 'Sin comentarios especiales'],
        negative: ['Necesita mejoras', 'Experiencia por debajo de lo esperado', 'Varios aspectos a mejorar']
      },
      feedback: {
        constructive: ['Sugerencia: [detalle específico]', 'Consideren implementar: [idea]', 'Sería útil si: [propuesta]'],
        appreciation: ['Agradezco especialmente: [aspecto]', 'Muy profesional el: [elemento]', 'Destacable: [característica]']
      },
      evaluation: {
        criteria: ['Cumple completamente', 'Cumple parcialmente', 'No cumple', 'Excede expectativas'],
        numeric: ['1-2: Necesita mejora significativa', '3-4: Desempeño aceptable', '5: Excelente desempeño']
      }
    };
    return responses[surveyType] || responses.feedback;
  }

  // Document automation suggestions
  suggestAutomation(documentType, frequency) {
    const suggestions = {
      reports: [
        'Crear plantilla con campos variables',
        'Automatizar generación de gráficos',
        'Configurar actualización automática de datos',
        'Implementar sistema de distribución automática'
      ],
      invoices: [
        'Sistema de numeración automática',
        'Cálculo automático de impuestos',
        'Integración con sistema contable',
        'Envío automático por correo'
      ],
      contracts: [
        'Banco de cláusulas estándar',
        'Sistema de aprobaciones automáticas',
        'Alertas de vencimiento',
        'Gestión de firmas digitales'
      ]
    };
    return suggestions[documentType] || suggestions.reports;
  }

  // Expert advice for specific document tasks
  getExpertAdvice(task, document_type) {
    const advice = {
      excel: {
        formula_error: 'Verifica referencias de celdas, usa F9 para evaluar paso a paso, considera usar IFERROR para manejar errores',
        slow_file: 'Reduce fórmulas volátiles (NOW, TODAY), elimina formatos condicionales excesivos, considera dividir en múltiples hojas',
        data_analysis: 'Usa tablas dinámicas para resúmenes, aplica filtros avanzados, considera Power Query para datos externos'
      },
      word: {
        formatting: 'Usa estilos en lugar de formato manual, configura párrafos antes de escribir, utiliza la función de navegación',
        collaboration: 'Activa control de cambios, usa comentarios para feedback, considera usar versiones online para colaboración real-time',
        large_document: 'Divide en secciones, usa referencias cruzadas, crea índice automático, utiliza documento maestro'
      },
      pdf: {
        optimization: 'Comprime imágenes, elimina metadatos innecesarios, usa fuentes integradas, considera PDF/A para archivo',
        security: 'Establece permisos granulares, usa cifrado apropiado, considera firma digital, evita contraseñas débiles',
        accessibility: 'Añade texto alternativo a imágenes, usa estructura de encabezados, verifica orden de lectura'
      }
    };
    return advice[document_type]?.[task] || 'Consulta específica no encontrada, pero puedo ayudarte con tareas generales del documento.';
  }

  // Generate document templates
  createTemplate(type, specifications) {
    const template = this.documentTemplates[type.toLowerCase()];
    if (!template) {
      return `Plantilla para ${type} no disponible. Tipos disponibles: ${Object.keys(this.documentTemplates).join(', ')}`;
    }
    
    if (specifications && specifications.subtype) {
      return template[specifications.subtype] || template[Object.keys(template)[0]];
    }
    
    return template[Object.keys(template)[0]];
  }

  // Analyze document and provide insights
  analyzeDocument(filename, content) {
    const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
    const analysis = {
      type: this.getDocumentType(extension),
      size: content ? content.length : 0,
      complexity: this.assessComplexity(content),
      suggestions: [],
      expertise_tips: []
    };

    // Add specific suggestions based on document type
    if (analysis.type === 'excel') {
      analysis.suggestions.push('Considera usar tablas para mejor organización de datos');
      analysis.suggestions.push('Aplica validación de datos para prevenir errores');
      analysis.expertise_tips.push('Usa Ctrl+Shift+L para aplicar filtros rápidamente');
    } else if (analysis.type === 'word') {
      analysis.suggestions.push('Utiliza estilos para formato consistente');
      analysis.suggestions.push('Activa la corrección automática');
      analysis.expertise_tips.push('F5 abre el navegador de documentos');
    }

    return analysis;
  }

  getDocumentType(extension) {
    for (const [type, extensions] of Object.entries(this.supportedFormats)) {
      if (extensions.includes(extension)) return type;
    }
    return 'unknown';
  }

  assessComplexity(content) {
    if (!content) return 'unknown';
    const length = content.length;
    if (length < 1000) return 'simple';
    if (length < 5000) return 'moderate';
    return 'complex';
  }
}

// Create singleton instance
const documentExpertService = new DocumentExpertService();

export default documentExpertService;