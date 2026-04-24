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

  describe('analyzeOpportunity', () => {
    test('should analyze a valid opportunity description', () => {
      const result = BusinessIntelligenceService.analyzeOpportunity('A new AI-powered educational platform');
      expect(result).toHaveProperty('market_assessment');
      expect(result).toHaveProperty('competitive_landscape');
      expect(result).toHaveProperty('business_model_options');
      expect(result).toHaveProperty('success_factors');
      expect(result).toHaveProperty('risks_mitigation');
      expect(result).toHaveProperty('strategic_recommendations');
    });

    test('should handle empty string description', () => {
      const result = BusinessIntelligenceService.analyzeOpportunity('');
      expect(result).toBeDefined();
      expect(result.market_assessment).toBeDefined();
    });

    test('should handle null description', () => {
      const result = BusinessIntelligenceService.analyzeOpportunity(null);
      expect(result).toBeDefined();
      expect(result.market_assessment).toBeDefined();
    });

    test('should handle undefined description', () => {
      const result = BusinessIntelligenceService.analyzeOpportunity(undefined);
      expect(result).toBeDefined();
      expect(result.market_assessment).toBeDefined();
    });

    test('should handle non-string description', () => {
      const result = BusinessIntelligenceService.analyzeOpportunity(123);
      expect(result).toBeDefined();
      expect(result.market_assessment).toBeDefined();
    });

    test('should handle missing context', () => {
      const result = BusinessIntelligenceService.analyzeOpportunity('Valid description');
      expect(result).toBeDefined();
    });

    test('should handle null context', () => {
      const result = BusinessIntelligenceService.analyzeOpportunity('Valid description', null);
      expect(result).toBeDefined();
    });
  });

});
