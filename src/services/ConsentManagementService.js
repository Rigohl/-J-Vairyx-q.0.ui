// Consent Management Service - Handles GDPR explicit consent and user data rights
class ConsentManagementService {
  constructor() {
    this.storageKey = 'jvairyx-consent-settings';
    this.consents = {
      analytics: false,
      learning: false, // For personalized learning and AI models
      assistant_history: false, // For chat history and context
    };
    this.metaData = {
      lastUpdated: null,
      consentId: null
    };

    this.loadConsents();
  }

  loadConsents() {
    try {
      const savedConsents = localStorage.getItem(this.storageKey);
      if (savedConsents) {
        const data = JSON.parse(savedConsents);
        this.consents = { ...this.consents, ...data.consents };
        this.metaData = { ...this.metaData, ...data.metaData };
      }
    } catch (error) {
      console.warn('Failed to load consent settings, using defaults', error);
    }
  }

  saveConsents() {
    try {
      this.metaData.lastUpdated = new Date().toISOString();
      if (!this.metaData.consentId) {
        this.metaData.consentId = 'user_' + Math.random().toString(36).substr(2, 9);
      }
      localStorage.setItem(this.storageKey, JSON.stringify({
        consents: this.consents,
        metaData: this.metaData
      }));
    } catch (error) {
      console.error('Failed to save consent settings', error);
    }
  }

  /**
   * Check if a specific consent is granted
   * @param {string} category - 'analytics', 'learning', or 'assistant_history'
   * @returns {boolean}
   */
  hasConsent(category) {
    return !!this.consents[category];
  }

  /**
   * Get all current consent statuses
   * @returns {object}
   */
  getAllConsents() {
    return { ...this.consents };
  }

  /**
   * Grant consent for specific categories
   * @param {object} updates - e.g. { learning: true, analytics: false }
   */
  updateConsents(updates) {
    this.consents = { ...this.consents, ...updates };
    this.saveConsents();
    return this.consents;
  }

  /**
   * Grant consent for all categories
   */
  acceptAll() {
    Object.keys(this.consents).forEach(key => {
      this.consents[key] = true;
    });
    this.saveConsents();
    return this.consents;
  }

  /**
   * Revoke consent for all categories (except strictly necessary)
   */
  rejectAll() {
    Object.keys(this.consents).forEach(key => {
      this.consents[key] = false;
    });
    this.saveConsents();
    return this.consents;
  }

  /**
   * GDPR Right to Data Portability - Export all user data
   * @param {DatabaseService} databaseService - instance to fetch data from
   */
  async exportUserData(databaseService) {
    if (!databaseService) return null;

    // Aggregate data from services
    const exportData = {
      consentSettings: {
        consents: this.consents,
        metaData: this.metaData
      },
      knowledgeBase: {},
      exportDate: new Date().toISOString()
    };

    // Attempt to extract from DatabaseService
    if (databaseService.knowledgeBase) {
      try {
        // Convert Maps to objects for JSON serialization
        Object.keys(databaseService.knowledgeBase).forEach(key => {
          if (databaseService.knowledgeBase[key] instanceof Map) {
            exportData.knowledgeBase[key] = Object.fromEntries(databaseService.knowledgeBase[key]);
          } else {
            exportData.knowledgeBase[key] = databaseService.knowledgeBase[key];
          }
        });
      } catch (e) {
        console.error("Error extracting database for export", e);
      }
    }

    return exportData;
  }

  /**
   * GDPR Right to Erasure (Right to be Forgotten) - Delete all user data
   * @param {DatabaseService} databaseService - instance to delete data from
   */
  async deleteUserData(databaseService) {
    // 1. Delete from storage
    if (databaseService && typeof databaseService.clearAllDatabases === 'function') {
      databaseService.clearAllDatabases();
    } else {
      // Fallback: clear known localstorage keys
      localStorage.removeItem('jvairyx-databases');
    }

    // 2. Clear consent metadata (but keep the record that they opted out)
    this.rejectAll();

    return true;
  }

  /**
   * Utility to check if user has made a consent choice yet
   */
  hasMadeChoice() {
    return this.metaData.lastUpdated !== null;
  }
}

// Create singleton instance
const consentManagementService = new ConsentManagementService();

// Support both ES module and CommonJS (if needed by tests)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = consentManagementService;
}
export default consentManagementService;
