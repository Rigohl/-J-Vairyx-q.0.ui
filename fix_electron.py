import os

file_path = 'public/electron.js'

with open(file_path, 'r') as f:
    content = f.read()

search_block = """// Background intelligence services
function initializeBackgroundServices() {
  console.log('🚀 Inicializando servicios de inteligencia en segundo plano...');

  // Start autonomous learning and improvement cycles
  setInterval(() => {
    // Simulate autonomous learning processes
    console.log('🧠 Proceso de aprendizaje autónomo ejecutándose...');
  }, 300000); // Every 5 minutes

  // Start intelligent monitoring
  setInterval(() => {
    // Simulate system monitoring and optimization
    console.log('⚡ Monitoreo inteligente del sistema...');
  }, 600000); // Every 10 minutes"""

replace_block = """// Background intelligence services
function initializeBackgroundServices() {
  if (isDev) {
    console.log('🚀 Inicializando servicios de inteligencia en segundo plano...');
  }

  // Start autonomous learning and improvement cycles
  setInterval(() => {
    // Simulate autonomous learning processes
    if (isDev) {
      console.log('🧠 Proceso de aprendizaje autónomo ejecutándose...');
    }
  }, 300000); // Every 5 minutes

  // Start intelligent monitoring
  setInterval(() => {
    // Simulate system monitoring and optimization
    if (isDev) {
      console.log('⚡ Monitoreo inteligente del sistema...');
    }
  }, 600000); // Every 10 minutes"""

if search_block in content:
    new_content = content.replace(search_block, replace_block)
    with open(file_path, 'w') as f:
        f.write(new_content)
    print("Successfully replaced content.")
else:
    print("Could not find exact match. Trying looser matching...")
    # Trying to replace parts individually if the block match fails
    updated_content = content

    part1_search = "console.log('🚀 Inicializando servicios de inteligencia en segundo plano...');"
    part1_replace = "if (isDev) { console.log('🚀 Inicializando servicios de inteligencia en segundo plano...'); }"

    part2_search = "console.log('🧠 Proceso de aprendizaje autónomo ejecutándose...');"
    part2_replace = "if (isDev) { console.log('🧠 Proceso de aprendizaje autónomo ejecutándose...'); }"

    part3_search = "console.log('⚡ Monitoreo inteligente del sistema...');"
    part3_replace = "if (isDev) { console.log('⚡ Monitoreo inteligente del sistema...'); }"

    if part1_search in updated_content:
        updated_content = updated_content.replace(part1_search, part1_replace)

    if part2_search in updated_content:
        updated_content = updated_content.replace(part2_search, part2_replace)

    if part3_search in updated_content:
        updated_content = updated_content.replace(part3_search, part3_replace)

    if updated_content != content:
        with open(file_path, 'w') as f:
            f.write(updated_content)
        print("Replaced parts individually.")
    else:
        print("Failed to replace anything.")
