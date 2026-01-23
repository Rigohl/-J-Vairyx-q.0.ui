// tests/monitor.test.js
// Prueba básica para el módulo monitor

const monitor = require('../monitor');

describe('Monitor', () => {
  test('init() imprime mensaje de inicio', () => {
    console.log = jest.fn();
    monitor.init();
    expect(console.log).toHaveBeenCalledWith("Monitor inicializado. Listo para escuchar eventos.");
  });

  test('onAction() procesa una acción', () => {
    console.log = jest.fn();
    monitor.onAction('prueba');
    expect(console.log).toHaveBeenCalledWith("Acción recibida: prueba");
  });
});