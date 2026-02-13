// main.js
// Entrada principal para J Vairyx Bot

const monitor = require('./monitor');

function startBot() {
  console.log("J Vairyx Bot iniciado 🚀");
  // Inicialización del monitor de eventos y módulos adicionales
  monitor.init();
}

startBot();