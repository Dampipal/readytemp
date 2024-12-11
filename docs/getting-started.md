# Getting Started with ReadyTemp

This guide will help you get started with ReadyTemp CLI and create your first React project.

## Prerequisites

Before you begin, make sure you have:
- Node.js (version 14 or higher)
- npm, yarn, or pnpm package manager

## Installation

```bash
# Using npm
npm install -g readytemp

# Using yarn
yarn global add readytemp

# Using pnpm
pnpm add -g readytemp
```

## Creating Your First Project

1. Open your terminal
2. Run the create command:
```bash
readytemp create my-app
```

3. Follow the interactive prompts:
   - Choose a template (Empty, Todo, Dashboard, E-commerce)
   - Select language (JavaScript/TypeScript)
   - Pick a UI framework
   - Choose your package manager

4. Wait for the project to be created

5. Navigate to your project:
```bash
cd my-app
```

6. Start the development server:
```bash
npm start
# or
yarn start
# or
pnpm start
```

## Project Templates

### Empty Project
Best for:
- Starting from scratch
- Custom implementations
- Learning React basics

### Todo Application
Best for:
- Learning state management
- Basic CRUD operations
- Simple UI interactions

### Admin Dashboard
Best for:
- Data visualization
- Complex layouts
- Multiple pages

### E-commerce Store
Best for:
- Shopping cart implementation
- Payment integration
- Product management

## Customizing Your Project

Each template comes with:
- Modern folder structure
- Essential dependencies
- Basic routing setup
- Component templates

You can customize by:
1. Modifying components in `src/components`
2. Adding new pages in `src/pages`
3. Updating styles in `src/styles`
4. Adding new routes in `src/App.js`

## Need Help?

- Check our [FAQ](./faq.md)
- Read the [API Documentation](./api.md)
- Join our [Community](./community.md)
- Report issues on [GitHub](https://github.com/yourusername/readytemp/issues) 