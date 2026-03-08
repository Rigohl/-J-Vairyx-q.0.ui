use crate::mojo_bridge;
use crate::julia_bridge;
use crate::scraper_bridge;
use crate::db_bridge;

pub struct Orchestrator;

impl Orchestrator {
    pub async fn handle_interaction(message: &str) -> String {
        println!("Orquestador Rust: Procesando mensaje...");

        // Initialize DB Config
        let db_config = db_bridge::initialize_databases();

        // 1. Detección emocional y pedagógica con Julia
        let _pedagogical_advice = julia_bridge::julia_call();

        // 2. Investigación proactiva si es necesario
        if message.contains("investigar") {
            scraper_bridge::perform_web_search(message);
        }

        // 3. Inferencia de IA con Mojo (Auto-entrenable)
        let response = mojo_bridge::get_ia_response(message);

        // 4. Registro en Neon/Supabase (Async)
        if let Err(e) = db_bridge::log_to_neon(&db_config, message).await {
            eprintln!("Error logging to Neon: {}", e);
        }

        response
    }
}
