#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod db_bridge;
mod orchestrator;
mod mojo_bridge;
mod julia_bridge;
mod scraper_bridge;
mod learning;

use tauri::{Manager, State};
use learning::LearningState;

#[tauri::command]
async fn send_message(message: String) -> Result<String, String> {
    Ok(format!("Respuesta desde Rust Core: {}", message))
}

#[tauri::command]
async fn log_interaction(
    state: State<'_, LearningState>,
    interaction_type: String,
    data: serde_json::Value
) -> Result<(), String> {
    state.log_interaction(interaction_type, data);
    Ok(())
}

#[tauri::command]
async fn get_personalized_response(
    state: State<'_, LearningState>,
    message: String
) -> Result<String, String> {
    Ok(state.get_personalized_response(&message))
}

#[tauri::command]
async fn get_user_insights(
    state: State<'_, LearningState>
) -> Result<Vec<serde_json::Value>, String> {
    Ok(state.get_user_insights())
}

fn main() {
  tauri::Builder::default()
    .manage(LearningState::new())
    .invoke_handler(tauri::generate_handler![
        send_message,
        log_interaction,
        get_personalized_response,
        get_user_insights
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
