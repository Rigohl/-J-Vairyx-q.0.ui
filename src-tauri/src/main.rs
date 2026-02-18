#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod db_bridge;
mod orchestrator;
mod mojo_bridge;
mod julia_bridge;
mod scraper_bridge;

use crate::orchestrator::Orchestrator;
use tauri::Manager;

#[tauri::command]
async fn send_message(message: String) -> Result<String, String> {
    // Call the orchestrator to handle the full flow (Julia -> Scraper -> Mojo -> DB)
    let response = Orchestrator::handle_interaction(&message).await;
    Ok(response)
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![send_message])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
