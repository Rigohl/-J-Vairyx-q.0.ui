// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    }
  };
})();
global.localStorage = localStorageMock;

const consentManagementService = require('../src/services/ConsentManagementService');

describe('ConsentManagementService', () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset service state
    consentManagementService.consents = {
      analytics: false,
      learning: false,
      assistant_history: false,
    };
    consentManagementService.metaData = {
      lastUpdated: null,
      consentId: null
    };
  });

  test('should default to no consent', () => {
    expect(consentManagementService.hasConsent('analytics')).toBe(false);
    expect(consentManagementService.hasConsent('learning')).toBe(false);
  });

  test('should update consents and save to localStorage', () => {
    consentManagementService.updateConsents({ learning: true });
    expect(consentManagementService.hasConsent('learning')).toBe(true);
    expect(consentManagementService.hasConsent('analytics')).toBe(false);

    const saved = JSON.parse(localStorage.getItem('jvairyx-consent-settings'));
    expect(saved.consents.learning).toBe(true);
    expect(saved.metaData.lastUpdated).not.toBeNull();
  });

  test('should accept all consents', () => {
    consentManagementService.acceptAll();
    expect(consentManagementService.hasConsent('analytics')).toBe(true);
    expect(consentManagementService.hasConsent('learning')).toBe(true);
    expect(consentManagementService.hasConsent('assistant_history')).toBe(true);
  });

  test('should reject all consents', () => {
    consentManagementService.acceptAll();
    consentManagementService.rejectAll();
    expect(consentManagementService.hasConsent('analytics')).toBe(false);
    expect(consentManagementService.hasConsent('learning')).toBe(false);
    expect(consentManagementService.hasConsent('assistant_history')).toBe(false);
  });

  test('should export user data correctly', async () => {
    consentManagementService.updateConsents({ learning: true });

    // Mock database service
    const mockDbService = {
      knowledgeBase: {
        test_topic: new Map([['key', 'value']])
      }
    };

    const exportData = await consentManagementService.exportUserData(mockDbService);

    expect(exportData.consentSettings.consents.learning).toBe(true);
    expect(exportData.knowledgeBase.test_topic).toEqual({ key: 'value' });
    expect(exportData.exportDate).toBeDefined();
  });

  test('should delete user data and revoke consents (Right to Erasure)', async () => {
    consentManagementService.acceptAll();

    let dbCleared = false;
    const mockDbService = {
      clearAllDatabases: () => {
        dbCleared = true;
      }
    };

    await consentManagementService.deleteUserData(mockDbService);

    expect(dbCleared).toBe(true);
    // Consents should be revoked
    expect(consentManagementService.hasConsent('learning')).toBe(false);
  });
});
