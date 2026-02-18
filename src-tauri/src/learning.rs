use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use std::collections::HashSet;
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Preferences {
    pub language: String,
    pub formality: String,
    pub response_length: String,
    pub interests: Vec<String>,
}

impl Default for Preferences {
    fn default() -> Self {
        Self {
            language: "es".to_string(),
            formality: "informal".to_string(),
            response_length: "medium".to_string(),
            interests: vec![],
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Patterns {
    pub active_hours: Vec<u32>,
    pub common_topics: Vec<String>,
    pub typing_speed: f64,
    pub avg_session_time: f64,
}

impl Default for Patterns {
    fn default() -> Self {
        Self {
            active_hours: vec![],
            common_topics: vec![],
            typing_speed: 0.0,
            avg_session_time: 0.0,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Stats {
    pub total_interactions: u32,
    pub total_time: f64,
    pub last_activity: String,
}

impl Default for Stats {
    fn default() -> Self {
        Self {
            total_interactions: 0,
            total_time: 0.0,
            last_activity: SystemTime::now()
                .duration_since(UNIX_EPOCH)
                .unwrap_or_default()
                .as_millis()
                .to_string(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserProfile {
    pub name: String,
    pub preferences: Preferences,
    pub patterns: Patterns,
    pub stats: Stats,
}

impl Default for UserProfile {
    fn default() -> Self {
        Self {
            name: String::new(),
            preferences: Preferences::default(),
            patterns: Patterns::default(),
            stats: Stats::default(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Interaction {
    pub type_: String,
    pub data: serde_json::Value,
    pub timestamp: u64,
    pub hour: u32,
}

pub struct LearningState {
    pub profile: Mutex<UserProfile>,
    pub logs: Mutex<Vec<Interaction>>,
}

impl LearningState {
    pub fn new() -> Self {
        // In a real app, load from disk here
        Self {
            profile: Mutex::new(UserProfile::default()),
            logs: Mutex::new(Vec::new()),
        }
    }

    pub fn log_interaction(&self, type_: String, data: serde_json::Value) {
        let now = SystemTime::now();
        let timestamp = now.duration_since(UNIX_EPOCH).unwrap().as_millis() as u64;
        let hour = (timestamp / 1000 / 60 / 60 % 24) as u32; // Simplified UTC hour logic

        let interaction = Interaction {
            type_: type_.clone(),
            data: data.clone(),
            timestamp,
            hour,
        };

        // Update logs
        let mut logs = self.logs.lock().unwrap();
        logs.push(interaction.clone());
        if logs.len() > 1000 {
            *logs = logs.split_off(logs.len() - 500);
        }

        // Update profile stats
        let mut profile = self.profile.lock().unwrap();
        profile.stats.total_interactions += 1;
        profile.stats.last_activity = timestamp.to_string();

        // Update patterns
        self.update_patterns(&mut profile, &interaction);
    }

    fn update_patterns(&self, profile: &mut UserProfile, interaction: &Interaction) {
        // Active Hours
        if !profile.patterns.active_hours.contains(&interaction.hour) {
            profile.patterns.active_hours.push(interaction.hour);
        }

        // Common Topics
        if interaction.type_ == "message" {
            if let Some(content) = interaction.data.get("content").and_then(|v| v.as_str()) {
                let topics = self.extract_topics(content);
                for topic in topics {
                    if !profile.patterns.common_topics.contains(&topic) {
                        profile.patterns.common_topics.push(topic);
                    }
                }
            }
        }
    }

    fn extract_topics(&self, text: &str) -> Vec<String> {
        let keywords = vec![
            "archivo", "carpeta", "documento", "tarea", "proyecto", "trabajo",
            "internet", "web", "buscar", "ayuda", "configuracion", "sistema",
            "tiempo", "recordatorio", "nota", "organizacion", "productividad"
        ];

        let text_lower = text.to_lowercase();
        keywords.into_iter()
            .filter(|&k| text_lower.contains(k))
            .map(|s| s.to_string())
            .collect()
    }

    pub fn get_personalized_response(&self, message: &str) -> String {
        let profile = self.profile.lock().unwrap();
        let formality = &profile.preferences.formality;

        // Contextual response generation
        let msg_lower = message.to_lowercase();
        let formal = formality == "formal";

        if msg_lower.contains("distraid") || msg_lower.contains("concentr") || msg_lower.contains("focus") {
            return if formal {
                "Entiendo su preocupación por la concentración. Permítame sugerir algunas técnicas de productividad.".to_string()
            } else {
                "¡Te entiendo! La concentración puede ser difícil. ¿Te ayudo con algunas técnicas para mantenerte enfocado?".to_string()
            };
        }

        if msg_lower.contains("archivo") || msg_lower.contains("carpeta") || msg_lower.contains("documento") {
            return if formal {
                "Puedo asistirle con la gestión de archivos y documentos. ¿Qué operación específica necesita realizar?".to_string()
            } else {
                "¡Perfecto! Puedo ayudarte con archivos y carpetas. ¿Qué necesitas hacer exactamente?".to_string()
            };
        }

        if msg_lower.contains("internet") || msg_lower.contains("web") || msg_lower.contains("buscar") {
            return if formal {
                "Tengo capacidades de navegación web. Permítame ayudarle con su búsqueda.".to_string()
            } else {
                "¡Genial! Puedo ayudarte a navegar por internet. ¿Qué quieres buscar?".to_string()
            };
        }

        // Default responses
        let responses = if formal {
            vec![
                "Comprendo su solicitud. Procesando la información en mis sistemas.",
                "Perfecto. Permítame analizar su consulta con mis algoritmos avanzados.",
                "Excelente pregunta. Estoy evaluando las mejores opciones para usted.",
                "He recibido su mensaje. Procesando respuesta optimizada."
            ]
        } else {
            vec![
                "¡Entendido! Déjame pensar en la mejor forma de ayudarte.",
                "Perfecto, estoy analizando tu consulta con toda mi capacidad neural.",
                "¡Excelente! Mis circuitos están trabajando en tu respuesta.",
                "Recibido. Procesando tu mensaje en tiempo real."
            ]
        };

        // Simple random selection (could use rand crate but keeping deps minimal)
        let index = (SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_nanos() as usize) % responses.len();
        responses[index].to_string()
    }

    pub fn get_user_insights(&self) -> Vec<serde_json::Value> {
        let profile = self.profile.lock().unwrap();
        let mut insights = Vec::new();
        let now = SystemTime::now();
        let hour = (now.duration_since(UNIX_EPOCH).unwrap().as_millis() / 1000 / 60 / 60 % 24) as u32;

        // Unusual time check
        if !profile.patterns.active_hours.is_empty() {
            let sum: u32 = profile.patterns.active_hours.iter().sum();
            let avg = sum as f64 / profile.patterns.active_hours.len() as f64;

            if (hour as f64 - avg).abs() > 3.0 {
                insights.push(serde_json::json!({
                    "type": "unusual_time",
                    "message": "Noto que normalmente no estás activo a esta hora. ¿Hay algo específico en lo que pueda ayudarte?"
                }));
            }
        }

        // Topic suggestion (randomized)
        if !profile.patterns.common_topics.is_empty() {
             // Simple random selection
            let idx = (now.duration_since(UNIX_EPOCH).unwrap().as_nanos() as usize) % profile.patterns.common_topics.len();
            let topic = &profile.patterns.common_topics[idx];

            // Random chance (simulated > 0.7)
            if (now.duration_since(UNIX_EPOCH).unwrap().as_millis() % 10) > 7 {
                insights.push(serde_json::json!({
                    "type": "topic_suggestion",
                    "message": format!("He notado que sueles preguntar sobre {}. ¿Te gustaría que profundice en algún aspecto específico?", topic)
                }));
            }
        }

        insights
    }
}
