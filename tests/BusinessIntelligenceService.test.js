import BusinessIntelligenceService from '../src/services/BusinessIntelligenceService';

describe('BusinessIntelligenceService', () => {

  describe('analyzeOpportunity', () => {
    test('should return a complete analysis object', () => {
      const description = 'A new SaaS platform for project management';
      const result = BusinessIntelligenceService.analyzeOpportunity(description);

      expect(result).toHaveProperty('market_assessment');
      expect(result).toHaveProperty('competitive_landscape');
      expect(result).toHaveProperty('business_model_options');
      expect(result).toHaveProperty('success_factors');
      expect(result).toHaveProperty('risks_mitigation');
      expect(result).toHaveProperty('strategic_recommendations');
    });

    test('should handle empty description gracefully', () => {
      const result = BusinessIntelligenceService.analyzeOpportunity('');
      expect(result).toBeDefined();
      expect(result.competitive_landscape.direct_competitors).toContain('Competidores no identificados específicamente');
    });
  });

  describe('analyzeCompetition', () => {
    test('should identify known competitors based on keywords', () => {
      const description = 'Competitor to Netflix and Spotify';
      const result = BusinessIntelligenceService.analyzeCompetition(description);
      expect(result.direct_competitors).toContain('Spotify');
      expect(result.direct_competitors).toContain('Netflix');
    });

    test('should return generic message if no competitors found', () => {
        const result = BusinessIntelligenceService.analyzeCompetition('Unknown product');
        expect(result.direct_competitors).toContain('Competidores no identificados específicamente');
    });
  });

  describe('suggestBusinessModels', () => {
      test('should suggest SaaS for software keywords', () => {
          const result = BusinessIntelligenceService.suggestBusinessModels('software platform');
          expect(result.some(m => m.name === 'Software as a Service')).toBe(true);
      });

      test('should suggest Marketplace for buying/selling keywords', () => {
        const result = BusinessIntelligenceService.suggestBusinessModels('online marketplace to sell goods');
        expect(result.some(m => m.name === 'Marketplace')).toBe(true);
      });

      test('should suggest Freemium for free/gratis keywords', () => {
        const result = BusinessIntelligenceService.suggestBusinessModels('app gratis free');
        expect(result.some(m => m.name === 'Freemium')).toBe(true);
      });
  });

  describe('identifySuccessFactors', () => {
      test('should return general and specific success factors', () => {
          const result = BusinessIntelligenceService.identifySuccessFactors('software');
          expect(result).toContain('Equipo fuerte');
          expect(result).toContain('Producto que resuelve un problema real'); // SaaS factor
      });
  });

  describe('identifyRisks', () => {
      test('should return risks based on model', () => {
          const result = BusinessIntelligenceService.identifyRisks('software');
          expect(result).toContain('Alta competencia y facilidad de cambio'); // SaaS risk
      });

      test('should return default risks if no model matched', () => {
        // 'Unknown' matches no model, but code defaults to SaaS if suggests returns nothing?
        // Wait, my implementation returns SaaS if empty?
        // "return suggestions.length > 0 ? suggestions : (this.businessModels ? [this.businessModels.saas] : []);"
        // So yes, it defaults to SaaS.

        // Let's force empty suggestions if possible or check that default works
        const result = BusinessIntelligenceService.identifyRisks('nothing special');
        // Should get SaaS risks because of default
        expect(result.length).toBeGreaterThan(0);
      });
  });

  describe('generateRecommendations', () => {
      test('should return actionable recommendations', () => {
          const result = BusinessIntelligenceService.generateRecommendations('test');
          expect(result.length).toBeGreaterThan(0);
          expect(typeof result[0]).toBe('string');
      });
  });

  describe('generateBusinessInsight', () => {
    test('should run without error and use aliased methods', () => {
      const result = BusinessIntelligenceService.generateBusinessInsight('new market');
      expect(result).toHaveProperty('insights');
      expect(result.insights).toHaveProperty('market_opportunity');
      expect(result.insights).toHaveProperty('competitive_analysis');
    });
  });

});
