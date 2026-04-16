import DocumentExpertService from '../src/services/DocumentExpertService';

describe('DocumentExpertService', () => {

  describe('generateExcelFormulas', () => {
    test('should return default sum formula', () => {
      const result = DocumentExpertService.generateExcelFormulas('sum', {});
      expect(result).toBe('=SUM(A1:A10)');
    });

    test('should return custom sum formula', () => {
      const result = DocumentExpertService.generateExcelFormulas('sum', { range: 'B1:B20' });
      expect(result).toBe('=SUM(B1:B20)');
    });

    test('should return default average formula', () => {
      const result = DocumentExpertService.generateExcelFormulas('average', {});
      expect(result).toBe('=AVERAGE(A1:A10)');
    });

    test('should return default vlookup formula', () => {
      const result = DocumentExpertService.generateExcelFormulas('vlookup', {});
      expect(result).toBe('=VLOOKUP(A1,B:C,2,FALSE)');
    });

    test('should return custom vlookup formula', () => {
      const data = { lookup: 'D1', table: 'F:G', column: '3' };
      const result = DocumentExpertService.generateExcelFormulas('vlookup', data);
      expect(result).toBe('=VLOOKUP(D1,F:G,3,FALSE)');
    });

    test('should return default countif formula', () => {
      const result = DocumentExpertService.generateExcelFormulas('countif', {});
      expect(result).toBe('=COUNTIF(A:A,"criteria")');
    });

    test('should return default sumif formula', () => {
      const result = DocumentExpertService.generateExcelFormulas('sumif', {});
      expect(result).toBe('=SUMIF(A:A,"criteria",B:B)');
    });

    test('should return suggested pivot table description', () => {
      const result = DocumentExpertService.generateExcelFormulas('pivotTable', {});
      expect(result).toContain('Tabla dinámica sugerida:');
      expect(result).toContain('- Filas: Categoría');
    });

    test('should return error message for unknown formula type', () => {
      const result = DocumentExpertService.generateExcelFormulas('unknown', {});
      expect(result).toBe('Fórmula no encontrada');
    });
  });

  describe('generateSQLQuery', () => {
    test('should generate default select query', () => {
      const result = DocumentExpertService.generateSQLQuery('select', 'users');
      expect(result).toBe('SELECT * FROM users;');
    });

    test('should generate select query with where and orderBy', () => {
      const conditions = { where: 'age > 18', orderBy: 'name ASC' };
      const result = DocumentExpertService.generateSQLQuery('select', 'users', conditions);
      expect(result).toBe('SELECT * FROM users WHERE age > 18 ORDER BY name ASC;');
    });

    test('should generate insert query', () => {
      const conditions = { columns: 'name, email', values: "'John', 'john@example.com'" };
      const result = DocumentExpertService.generateSQLQuery('insert', 'users', conditions);
      expect(result).toBe("INSERT INTO users (name, email) VALUES ('John', 'john@example.com');");
    });

    test('should return error for unknown operation', () => {
      const result = DocumentExpertService.generateSQLQuery('drop', 'users');
      expect(result).toBe('Operación SQL no reconocida');
    });
  });

  describe('getExpertAdvice', () => {
    test('should return specific advice for excel formula_error', () => {
      const result = DocumentExpertService.getExpertAdvice('formula_error', 'excel');
      expect(result).toContain('Verifica referencias de celdas');
    });

    test('should return specific advice for word formatting', () => {
      const result = DocumentExpertService.getExpertAdvice('formatting', 'word');
      expect(result).toContain('Usa estilos en lugar de formato manual');
    });

    test('should return default message for unknown task', () => {
      const result = DocumentExpertService.getExpertAdvice('unknown', 'excel');
      expect(result).toBe('Consulta específica no encontrada, pero puedo ayudarte con tareas generales del documento.');
    });
  });

  describe('getDocumentType', () => {
    test('should identify excel files', () => {
      expect(DocumentExpertService.getDocumentType('.xlsx')).toBe('excel');
      expect(DocumentExpertService.getDocumentType('.csv')).toBe('excel');
    });

    test('should identify word files', () => {
      expect(DocumentExpertService.getDocumentType('.docx')).toBe('word');
    });

    test('should return unknown for unsupported extension', () => {
      expect(DocumentExpertService.getDocumentType('.exe')).toBe('unknown');
    });
  });

  describe('assessComplexity', () => {
    test('should return unknown for empty content', () => {
      expect(DocumentExpertService.assessComplexity(null)).toBe('unknown');
    });

    test('should return simple for short content', () => {
      expect(DocumentExpertService.assessComplexity('short')).toBe('simple');
    });

    test('should return complex for long content', () => {
      const longContent = 'a'.repeat(6000);
      expect(DocumentExpertService.assessComplexity(longContent)).toBe('complex');
    });
  });

  describe('analyzeDocument', () => {
    test('should return basic analysis for an excel file', () => {
      const result = DocumentExpertService.analyzeDocument('test.xlsx', 'some content');
      expect(result.type).toBe('excel');
      expect(result.suggestions).toContain('Considera usar tablas para mejor organización de datos');
    });
  });

});
