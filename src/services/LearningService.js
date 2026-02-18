import { invoke } from "@tauri-apps/api/tauri";

// Named constants for better code health
const IDLE_TIMEOUT = 30000; // 30 seconds of inactivity
const FOCUS_RETURN_TIMEOUT = 300000; // 5 minutes window for focus return check
const LOG_LIMIT = 1000;
const LOG_SLICE = 500;

// Learning Service - Tracks user behavior and learns patterns
// Logic migrated to Rust backend for performance and safety
class LearningService {
  constructor() {
    this.startBehaviorTracking();
  }

  // Track user interaction by sending data to Rust backend
  async logInteraction(type, data) {
    try {
      await invoke("log_interaction", {
        interaction_type: type,
        data: data
      });
    } catch (error) {
      console.error("Error logging interaction to Rust:", error);
    }
  }

  // Start tracking user behavior
  startBehaviorTracking() {
    this.trackFocus();
    this.trackTypingPatterns();
  }

  // Track user focus/attention
  trackFocus() {
    let focusStart = Date.now();
    let isUserActive = true;
    let idleTimer;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      if (!isUserActive) {
        isUserActive = true;
        this.logInteraction("focus_return", { duration: Date.now() - focusStart });
      }
      
      idleTimer = setTimeout(() => {
        if (isUserActive) {
          isUserActive = false;
          this.logInteraction("idle_detected", { duration: Date.now() - focusStart });
        }
      }, IDLE_TIMEOUT);
    };

    // Track various user activities
    document.addEventListener("mousemove", resetIdleTimer);
    document.addEventListener("keypress", resetIdleTimer);
    document.addEventListener("click", resetIdleTimer);
    document.addEventListener("scroll", resetIdleTimer);

    // Track window focus
    window.addEventListener("focus", () => {
      this.logInteraction("window_focus", {});
      resetIdleTimer();
    });

    window.addEventListener("blur", () => {
      this.logInteraction("window_blur", {});
    });

    resetIdleTimer();
  }

  // Track typing patterns
  trackTypingPatterns() {
    let keyStrokes = [];
    let typingStart = null;

    document.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        if (!typingStart) typingStart = Date.now();
        keyStrokes.push(Date.now());
      }
    });

    document.addEventListener("keyup", async (e) => {
      if (e.key === "Enter" && keyStrokes.length > 0) {
        const duration = Date.now() - typingStart;
        const speed = keyStrokes.length / (duration / 1000); // chars per second
        
        await this.logInteraction("typing_pattern", {
          speed,
          duration,
          keyCount: keyStrokes.length
        });

        keyStrokes = [];
        typingStart = null;
      }
    });
  }

  // Get personalized response from Rust backend
  async getPersonalizedResponse(userMessage) {
    try {
      const response = await invoke("get_personalized_response", { message: userMessage });
      return response;
    } catch (error) {
      console.error("Error getting response from Rust:", error);
      // Fallback response if Rust fails
      return "Lo siento, mis circuitos de aprendizaje están momentáneamente desconectados. ¿En qué puedo ayudarte?";
    }
  }

  // Get user insights for proactive suggestions from Rust backend
  async getUserInsights() {
    try {
      const insights = await invoke("get_user_insights");
      return insights;
    } catch (error) {
      console.error("Error getting insights from Rust:", error);
      return [];
    }
  }
}

// Create singleton instance
const learningService = new LearningService();

export default learningService;
