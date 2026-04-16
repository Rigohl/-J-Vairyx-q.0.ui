/**
 * Servicio de Investigación Web y Scraping
 * Conecta con el motor Julia vía Tauri/Rust
 */
class WebResearchService {
  async searchEducationalContent(query) {
    console.log(`Investigando tema: ${query}...`);
    return await window.__TAURI__.invoke('perform_web_search', { query });
  }

  async scrapeForTraining(url) {
    console.log(`Extrayendo datos de ${url} para auto-entrenamiento...`);
    return await window.__TAURI__.invoke('scrape_url', { url });
  }
}

export default new WebResearchService();
