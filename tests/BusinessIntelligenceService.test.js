import BusinessIntelligenceService from '../src/services/BusinessIntelligenceService';

describe('BusinessIntelligenceService', () => {

  describe('explainConcept', () => {
    test('should return explanation for company', () => {
      const result = BusinessIntelligenceService.explainConcept('empresa');
      expect(result.title).toContain('Qué es una Empresa');
    });

    test('should return explanation for market', () => {
      const result = BusinessIntelligenceService.explainConcept('mercado');
      expect(result.title).toContain('Mercados');
    });
  });

});
