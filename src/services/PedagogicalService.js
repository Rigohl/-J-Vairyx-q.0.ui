/**
 * Servicio de Lógica Pedagógica Adaptativa (Mejorado)
 */
class PedagogicalService {
  constructor() {
    this.learningHistory = [];
    this.preferredFormat = 'video'; // Default
  }

  updateLearningPreference(success) {
    if (success) {
      console.log("Julia: Confirmando éxito del camino actual.");
    } else {
      console.log("Julia: Recalculando ruta... ¿Quizás otro formato?");
      this.preferredFormat = this.preferredFormat === 'video' ? 'text' : 'video';
    }
  }

  getRecommendedFormat() {
    return this.preferredFormat;
  }

  analyzeMessage(message) {
    const msg = message.toLowerCase();
    if (msg.includes('prefiero ver')) return { type: 'preference', format: 'video' };
    if (msg.includes('prefiero leer')) return { type: 'preference', format: 'text' };
    return null;
  }
}

export default new PedagogicalService();
