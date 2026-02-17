const path = require('path');

// Fixed function (copied from public/electron.js for verification)
function sanitizeForContent(str) {
  if (!str) return 'unknown';
  // Allow alphanumeric, dot, dash, underscore. Replace everything else with underscore.
  return str.replace(/[^a-zA-Z0-9._-]/g, '_');
}

function generateFileContent(file) {
  const extension = path.extname(file.name).toLowerCase();
  const safeNameForContent = sanitizeForContent(path.basename(file.name));

  // Note: We use safeNameForContent in templates now.

  switch (extension) {
    case '.js':
      return `// Archivo generado por J-Vairyx Personal Assistant
// Creado: ${new Date().toLocaleString('es-ES')}

console.log('🚀 ¡Hola desde J-Vairyx!');
console.log('Este archivo fue generado automáticamente por tu asistente personal');
console.log('Archivo: ${safeNameForContent}');
console.log('Fecha: ${new Date().toLocaleString('es-ES')}');

// Función de ejemplo
function saludarDesdeVairyx() {
    return '¡Hola! Soy J-Vairyx, tu asistente personal inteligente 🤖';
}

// Auto-ejecución
(() => {
    console.log(saludarDesdeVairyx());
    console.log('✅ Archivo ejecutado exitosamente');
})();`;

    case '.py':
      return `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Archivo generado por J-Vairyx Personal Assistant
Creado: ${new Date().toLocaleString('es-ES')}
"""

import datetime
import sys

def main():
    print("🚀 ¡Hola desde J-Vairyx!")
    print("Este archivo fue generado automáticamente por tu asistente personal")
    print(f"Archivo: ${safeNameForContent}")
    print(f"Fecha: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("¡Tu asistente inteligente está funcionando perfectamente! 🤖")

    # Información del sistema
    print(f"Python version: {sys.version}")
    print("✅ Archivo ejecutado exitosamente")

if __name__ == "__main__":
    main()`;

    default:
      return '';
  }
}

describe('RCE Vulnerability Fix Verification', () => {
  test('JS injection blocked', () => {
    // Malicious filename: test.js'); require('child_process').exec('calc'); console.log('ignored.js
    const maliciousFilename = "test.js'); require('child_process').exec('calc'); console.log('ignored.js";
    const content = generateFileContent({ name: maliciousFilename });

    // The sanitizer replaces special chars with underscores
    // Expected sanitized name: test.js___require__child_process__.exec__calc____console.log__ignored.js
    // Or similar depending on regex.
    // Quotes and parens are replaced.

    // We expect the content NOT to contain the executable code
    expect(content).not.toContain("require('child_process')");
    expect(content).not.toContain("exec('calc')");

    // Verify it contains the sanitized version (roughly)
    // The filename part in console.log should be safe
    const match = content.match(/console\.log\('Archivo: (.*)'\);/);
    expect(match).toBeTruthy();
    const injected = match[1];
    // Should verify it doesn't break out of string
    expect(injected).not.toContain("'");
    expect(injected).toMatch(/^[a-zA-Z0-9._-]+$/);
  });

  test('Python injection blocked', () => {
    const maliciousFilename = 'test.py"} + __import__("os").system("calc") + f{".py';
    const content = generateFileContent({ name: maliciousFilename });

    expect(content).not.toContain('__import__("os")');
    expect(content).not.toContain('system("calc")');

    const match = content.match(/print\(f"Archivo: (.*)"\)/);
    expect(match).toBeTruthy();
    const injected = match[1];
    // Should verify it doesn't break out of f-string
    expect(injected).not.toContain('"');
    expect(injected).not.toContain('}');
    expect(injected).toMatch(/^[a-zA-Z0-9._-]+$/);
  });
});
