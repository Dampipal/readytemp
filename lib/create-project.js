import { execSync } from 'child_process';
import { createDirectory, writeFile } from './utils/fileHelpers.js';
import { generatePackageJson, generateTailwindConfig, generatePostcssConfig, generateTsConfig } from './generators/configGenerator.js';
import { templates } from './templates/index.js';

export async function createProject(projectName, options) {
  const { template, language, uiFramework, packageManager, git, installDeps } = options;
  
  try {
    // Create project directory
    createDirectory(projectName);
    process.chdir(projectName);

    // Initialize git if requested
    if (git) {
      execSync('git init');
    }

    // Generate and write package.json
    const packageJson = generatePackageJson(projectName, template, language, uiFramework);
    writeFile('package.json', JSON.stringify(packageJson, null, 2));

    // Create project structure
    const directories = [
      'src',
      'public',
      'src/components',
      'src/components/common',
      'src/components/layout',
      'src/pages',
      'src/layouts',
      'src/hooks',
      'src/utils',
      'src/services',
      'src/assets',
      'src/assets/images',
      'src/assets/icons',
      'src/styles',
      'src/types',
      'src/context',
      'src/config',
      'src/data'
    ];

    // Add template-specific directories
    switch(template) {
      case 'dashboard':
        directories.push('src/components/charts', 'src/components/widgets');
        break;
      case 'ecommerce':
        directories.push(
          'src/components/products',
          'src/components/cart',
          'src/components/checkout'
        );
        break;
    }

    // Create all directories
    directories.forEach(dir => createDirectory(dir));

    // Get the template generator function
    const templateGenerator = templates[template];
    if (!templateGenerator) {
      throw new Error(`Template '${template}' not found`);
    }

    // Generate template files
    const templateFiles = templateGenerator(projectName, language);
    Object.entries(templateFiles).forEach(([path, content]) => {
      // Ensure parent directory exists
      const parentDir = path.split('/').slice(0, -1).join('/');
      if (parentDir) {
        createDirectory(parentDir);
      }
      writeFile(path, content);
    });

    // Add UI framework configuration
    if (uiFramework === 'Tailwind CSS') {
      writeFile('tailwind.config.js', generateTailwindConfig());
      writeFile('postcss.config.js', generatePostcssConfig());
      writeFile('src/styles/globals.css', '@tailwind base;\n@tailwind components;\n@tailwind utilities;');
    }

    // Add TypeScript configuration if needed
    if (language === 'TypeScript') {
      writeFile('tsconfig.json', JSON.stringify(generateTsConfig(), null, 2));
    }

    // Create README.md
    writeFile('README.md', generateReadme(projectName, template, language, uiFramework));

    // Install dependencies if requested
    if (installDeps) {
      console.log('Installing dependencies... This might take a few minutes.');
      const installCmd = {
        npm: 'npm install',
        yarn: 'yarn',
        pnpm: 'pnpm install'
      }[packageManager];

      execSync(installCmd, { stdio: 'inherit' });
      
      if (uiFramework === 'Tailwind CSS') {
        execSync('npx tailwindcss init -p', { stdio: 'inherit' });
      }
    }

    return true;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

function generateReadme(projectName, template, language, uiFramework) {
  const templateDescriptions = {
    empty: 'A basic React application with routing and layout setup.',
    todo: 'A todo list application with local storage persistence.',
    dashboard: 'An admin dashboard with charts, widgets, and analytics.',
    ecommerce: 'An e-commerce store with product listing, cart, and checkout.',
  };

  return `# ${projectName}

${templateDescriptions[template] || 'A React application created with ReadyTemp CLI.'}

## Tech Stack

- React ${language === 'TypeScript' ? 'with TypeScript' : 'with JavaScript'}
- ${uiFramework} for UI components

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`

## Features

- Modern React development setup
- ${language} support
- ${uiFramework} integration
- Responsive design
- Production-ready configuration

## Project Structure

\`\`\`
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── layouts/       # Layout components
  ├── hooks/         # Custom hooks
  ├── utils/         # Utility functions
  ├── services/      # API services
  ├── assets/        # Static assets
  ├── styles/        # Global styles
  ├── types/         # TypeScript types
  └── context/       # React context
\`\`\`

## Created with ❤️ using ReadyTemp CLI
`;
}