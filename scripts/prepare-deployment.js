const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const outputDirectory = path.join(projectRoot, 'dist');
const deploymentPaths = [
  'index.html',
  'home-2.html',
  'assets',
  'components',
  'css',
  'js',
  'pages'
];

fs.mkdirSync(outputDirectory, { recursive: true });

for (const relativePath of deploymentPaths) {
  const source = path.join(projectRoot, relativePath);

  if (!fs.existsSync(source)) {
    throw new Error(`Required deployment file or directory is missing: ${relativePath}`);
  }

  fs.cpSync(source, path.join(outputDirectory, relativePath), { recursive: true });
}
