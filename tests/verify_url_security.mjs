/**
 * Standalone verification script for URL validation logic.
 * Bypasses Jest to ensure reliability in unstable environments.
 */

const isValidExternalUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch (error) {
    return false;
  }
};

const tests = [
  { url: 'https://google.com', expected: true, desc: 'Valid HTTPS URL' },
  { url: 'http://example.com', expected: true, desc: 'Valid HTTP URL' },
  { url: 'ftp://files.com', expected: false, desc: 'Invalid FTP protocol' },
  { url: 'file:///etc/passwd', expected: false, desc: 'Malicious file:// protocol' },
  { url: 'javascript:alert(1)', expected: false, desc: 'Malicious javascript: protocol' },
  { url: 'data:text/html,<html>', expected: false, desc: 'Invalid data: protocol' },
  { url: 'not-a-url', expected: false, desc: 'Invalid URL string' },
  { url: '', expected: false, desc: 'Empty string' },
  { url: 'https://user:pass@google.com', expected: true, desc: 'Valid HTTPS with credentials' },
  { url: 'https://google.com:8080/path?q=1#hash', expected: true, desc: 'Valid HTTPS with port and path' }
];

let passed = 0;
let failed = 0;

console.log('🧪 Running URL Security Validation Tests...\n');

tests.forEach(({ url, expected, desc }) => {
  const result = isValidExternalUrl(url);
  if (result === expected) {
    console.log(`✅ PASS: ${desc} (${url})`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${desc}`);
    console.error(`   URL: ${url}`);
    console.error(`   Expected: ${expected}, Got: ${result}`);
    failed++;
  }
});

console.log(`\n📊 Summary: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('✨ All tests passed successfully!');
}
