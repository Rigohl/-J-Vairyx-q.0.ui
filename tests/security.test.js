const path = require('path');

// Updated logic from public/electron.js
const SAFE_BASE_DIR = '/app/storage'; // Mocked for test

const validatePath = (userInputPath) => {
  if (!userInputPath) {
    throw new Error('Path is required');
  }

  // Resolve the path to an absolute path
  const resolvedPath = path.resolve(SAFE_BASE_DIR, userInputPath);

  // Use path.relative to ensure it's inside SAFE_BASE_DIR
  const relative = path.relative(SAFE_BASE_DIR, resolvedPath);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error('Access denied: Path is outside of allowed storage area');
  }

  return resolvedPath;
};

describe('Security Path Validation', () => {
  test('allows relative path within safe base', () => {
    const userInput = 'my-folder';
    const result = validatePath(userInput);
    expect(result).toBe(path.resolve(SAFE_BASE_DIR, 'my-folder'));
  });

  test('allows nested relative path within safe base', () => {
    const userInput = 'folders/subfolder/file.txt';
    const result = validatePath(userInput);
    expect(result).toBe(path.resolve(SAFE_BASE_DIR, 'folders/subfolder/file.txt'));
  });

  test('blocks directory traversal attempt', () => {
    const userInput = '../traversal';
    expect(() => validatePath(userInput)).toThrow('Access denied');
  });

  test('blocks sophisticated directory traversal attempt', () => {
    const userInput = 'valid/../../traversal';
    expect(() => validatePath(userInput)).toThrow('Access denied');
  });

  test('blocks sibling directory bypass', () => {
    // If base is /app/storage, /app/storage-private should be blocked
    const base = '/app/storage';
    const target = '/app/storage-private';
    const rel = path.relative(base, target);
    expect(rel.startsWith('..')).toBe(true);

    expect(() => validatePath('../storage-private')).toThrow('Access denied');
  });

  test('blocks absolute path outside safe base', () => {
    const userInput = '/tmp/exploit';
    expect(() => validatePath(userInput)).toThrow('Access denied');
  });

  test('blocks null/empty path', () => {
    expect(() => validatePath('')).toThrow('Path is required');
    expect(() => validatePath(null)).toThrow('Path is required');
  });
});
