import fs from 'fs';

export function createDirectory(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

export function writeFile(path, content) {
  fs.writeFileSync(path, content);
}

export function readFile(path) {
  return fs.readFileSync(path, 'utf-8');
}

export function fileExists(path) {
  return fs.existsSync(path);
}

export function getFileExtension(language) {
  return language === 'TypeScript' ? 'tsx' : 'js';
} 