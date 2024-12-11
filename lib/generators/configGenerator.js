export function generateTailwindConfig() {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
}

export function generatePostcssConfig() {
  return `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
}

export function generateTsConfig() {
  return {
    compilerOptions: {
      target: 'es5',
      lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true,
      skipLibCheck: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      noFallthroughCasesInSwitch: true,
      module: 'esnext',
      moduleResolution: 'node',
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'react-jsx',
    },
    include: ['src'],
  };
}

export function generatePackageJson(name, template, language, uiFramework) {
  const basePackage = {
    name,
    version: '0.1.0',
    private: true,
    dependencies: {
      'react': '^18.2.0',
      'react-dom': '^18.2.0',
      'react-scripts': '5.0.1',
      'react-router-dom': '^6.18.0',
      'web-vitals': '^2.1.4',
    },
    scripts: {
      'start': 'react-scripts start',
      'build': 'react-scripts build',
      'test': 'react-scripts test',
      'eject': 'react-scripts eject',
    },
    eslintConfig: {
      extends: ['react-app', 'react-app/jest'],
    },
    browserslist: {
      production: ['>0.2%', 'not dead', 'not op_mini all'],
      development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version'],
    },
  };

  // Add UI framework dependencies
  const uiDependencies = {
    'Tailwind CSS': {
      'tailwindcss': '^3.3.0',
      'postcss': '^8.4.31',
      'autoprefixer': '^10.4.16',
    },
    'Material UI': {
      '@mui/material': '^5.14.17',
      '@mui/icons-material': '^5.14.17',
      '@emotion/react': '^11.11.1',
      '@emotion/styled': '^11.11.0',
    },
    'Chakra UI': {
      '@chakra-ui/react': '^2.8.1',
      '@emotion/react': '^11.11.1',
      '@emotion/styled': '^11.11.0',
      'framer-motion': '^10.16.4',
    },
  };

  if (uiDependencies[uiFramework]) {
    basePackage.dependencies = {
      ...basePackage.dependencies,
      ...uiDependencies[uiFramework],
    };
  }

  // Add template-specific dependencies
  const templateDependencies = {
    'dashboard': {
      '@nivo/core': '^0.84.0',
      '@nivo/bar': '^0.84.0',
      '@nivo/line': '^0.84.0',
      '@nivo/pie': '^0.84.0',
      'react-grid-layout': '^1.4.2',
    },
    'ecommerce': {
      '@stripe/stripe-js': '^2.2.0',
      'react-image-gallery': '^1.3.0',
      'react-hook-form': '^7.48.2',
    },
    'todo': {
      'uuid': '^9.0.1',
    },
  };

  if (templateDependencies[template]) {
    basePackage.dependencies = {
      ...basePackage.dependencies,
      ...templateDependencies[template],
    };
  }

  // Add TypeScript dependencies
  if (language === 'TypeScript') {
    basePackage.dependencies = {
      ...basePackage.dependencies,
      'typescript': '^4.9.5',
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      '@types/node': '^16.18.0',
    };
  }

  return basePackage;
} 