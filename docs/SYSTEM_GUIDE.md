# Guía Maestra del Sistema J-Vairyx (V. 0.1.0)

## 🆔 Identidad y Propósito
J-Vairyx es un **Compañero IA Educativo** diseñado para evolucionar con el usuario. Su misión es facilitar el aprendizaje adaptativo y la investigación proactiva.

- **J**: Jarvis (Inteligencia)
- **Vairyx**: Sistema de conciencia evolutiva.
- **q.0.ui**: Versión con interfaz gráfica avanzada.

## 🛠 Arquitectura Híbrida (Rust + Mojo + Julia)

### 1. El Cerebro (Mojo)
- **Localidad**: Ejecuta modelos LLM (Mistral/Llama) en GPU local.
- **Auto-Entrenamiento**: Ajusta sus propios pesos basados en la efectividad de las tutorías.

### 2. El Investigador (Julia)
- **Scraping**: Investigación profunda en Wikipedia, ArXiv y StackOverflow.
- **Pedagogía**: Aplica algoritmos matemáticos para Repetición Espaciada y Taxonomía de Bloom.

### 3. El Corazón (Rust/Tauri)
- **Orquestación**: Conecta la UI con los motores de IA.
- **Seguridad**: Gestión de archivos y bases de datos (Supabase/Neon).

## 🎓 Metodología Pedagógica
J-Vairyx detecta y se adapta a:
- **TDAH**: Interfaz minimalista y micro-lecciones.
- **Dislexia**: Fuentes adaptadas y apoyo visual.
- **Estilos de Aprendizaje**: Si detectas que el usuario aprende mejor por video, el sistema prioriza ese canal.

## 📁 Estructura del Proyecto
- `src/`: Interfaz React (Holographic UI).
- `src-tauri/`: Núcleo operativo en Rust.
- `backend/`: Motores nativos en Mojo y Julia.
- `docs/`: Documentación técnica consolidada.

## 🚀 Uso y Comandos
El chat acepta comandos naturales y técnicos para gestionar archivos, realizar investigaciones y monitorear el progreso del aprendizaje.

## 🚀 Instalación Rápida
1. Instalar **Rust**, **Mojo** y **Julia**.
2. `npm install`
3. `npm start` (Inicia el entorno Tauri)
