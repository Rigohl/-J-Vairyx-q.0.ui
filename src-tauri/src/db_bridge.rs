use std::env;
use dotenv::dotenv;
use serde::{Deserialize, Serialize};
use reqwest::Client;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DbConfig {
    pub supabase_url: String,
    pub supabase_key: String,
    pub neon_connection_string: String,
}

pub fn initialize_databases() -> DbConfig {
    dotenv().ok(); // Load .env file if present

    let supabase_url = env::var("SUPABASE_URL")
        .unwrap_or_else(|_| "https://q8-KF5WzGJHcrVOZyNNDWA.supabase.co".to_string());

    let supabase_key = env::var("SUPABASE_KEY")
        .unwrap_or_else(|_| "sb_publishable_q8-KF5WzGJHcrVOZyNNDWA_xrtDMOit".to_string());

    let neon_connection_string = env::var("NEON_CONNECTION_STRING")
        .unwrap_or_else(|_| "postgresql://user:password@neon-db-url.com/main".to_string());

    DbConfig {
        supabase_url,
        supabase_key,
        neon_connection_string,
    }
}

pub async fn sync_learning_profile(config: &DbConfig) -> Result<(), String> {
    println!("Rust: Sincronizando perfil con Supabase...");

    // Example using reqwest (safe skeleton)
    let _client = Client::new();
    let _url = format!("{}/rest/v1/profiles", config.supabase_url);

    // Placeholder for actual logic.
    // In a real scenario, we would POST/PUT data here.
    // We just print for now to avoid runtime errors with dummy URLs.
    // but we show we have the client ready.

    Ok(())
}

pub async fn log_to_neon(_config: &DbConfig, event: &str) -> Result<(), String> {
    println!("Rust: Enviando log de interacción a Neon: {}", event);

    // For Neon (Postgres), we would typically use sqlx or tokio-postgres.
    // Since we only added reqwest, we will simulate or use an HTTP proxy if available.
    // For now, we keep the log but structured as async result.

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::env;
    use std::sync::Mutex;

    // Use a static mutex to ensure tests running in parallel don't clobber env vars
    // Note: Rust tests run in threads, so this is just a basic safeguard within this module.
    // If other tests modify env vars, we might still have issues, but usually tests don't.
    static ENV_LOCK: Mutex<()> = Mutex::new(());

    fn clear_env() {
        env::remove_var("SUPABASE_URL");
        env::remove_var("SUPABASE_KEY");
        env::remove_var("NEON_CONNECTION_STRING");
    }

    #[test]
    fn test_config_workflow() {
        // Lock to ensure exclusive access to env vars during this test
        let _guard = ENV_LOCK.lock().unwrap();

        // 1. Test Defaults
        clear_env();
        let config = initialize_databases();
        assert_eq!(config.supabase_url, "https://q8-KF5WzGJHcrVOZyNNDWA.supabase.co");
        assert!(config.supabase_key.starts_with("sb_publishable"));

        // 2. Test Env Override
        env::set_var("SUPABASE_URL", "https://override.com");
        env::set_var("SUPABASE_KEY", "override-key");
        env::set_var("NEON_CONNECTION_STRING", "postgres://override");

        let config_override = initialize_databases();
        assert_eq!(config_override.supabase_url, "https://override.com");
        assert_eq!(config_override.supabase_key, "override-key");
        assert_eq!(config_override.neon_connection_string, "postgres://override");

        // Cleanup
        clear_env();
    }

    #[test]
    fn test_struct_integrity() {
        let config = DbConfig {
            supabase_url: "url".into(),
            supabase_key: "key".into(),
            neon_connection_string: "conn".into(),
        };
        assert_eq!(config.supabase_url, "url");
    }
}
