# ReadyTemp API Documentation

## CLI Commands

### `create`
Creates a new React project with the specified template.

```bash
readytemp create <project-name>
```

Options:
- `project-name`: Name of your project (required)

Interactive Prompts:
- Template selection
- Language selection
- UI framework selection
- Package manager selection

## Configuration

### Project Configuration
The project configuration is stored in `package.json`:

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "dependencies": {
    // Project dependencies
  }
}
```

### Template Structure
Each template follows this structure:

```
template/
├── public/
│   ├── index.html
│   └── manifest.json
└── src/
    ├── components/
    ├── pages/
    ├── hooks/
    ├── context/
    ├── styles/
    ├── App.js
    └── index.js
```

## Programmatic Usage

You can also use ReadyTemp programmatically in your Node.js applications:

```javascript
import { createProject } from 'readytemp';

await createProject('my-app', {
  template: 'empty',
  language: 'JavaScript',
  uiFramework: 'Tailwind CSS',
  packageManager: 'npm'
});
```

## Template API

### Base Template
The base template provides:
- Basic React setup
- Routing configuration
- Component structure
- Style setup

### Todo Template
Extends base template with:
- Todo list functionality
- Local storage integration
- CRUD operations

### Dashboard Template
Extends base template with:
- Chart components
- Data visualization
- Mock data integration
- Responsive layout

### E-commerce Template
Extends base template with:
- Product management
- Shopping cart
- Checkout process
- Payment integration

## Hooks

### `useCart`
```javascript
const { items, addItem, removeItem } = useCart();
```

### `useTodos`
```javascript
const { todos, addTodo, removeTodo } = useTodos();
```

### `useStats`
```javascript
const { data, loading, error } = useStats();
```

## Components

### Common Components
- `Header`
- `Footer`
- `Layout`
- `Navigation`

### Template-Specific Components
Each template provides its own set of components. Refer to individual template documentation for details.

## Error Handling

The CLI handles common errors:
- Invalid project names
- Missing dependencies
- Configuration errors
- Template generation failures

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for details on:
- Adding new templates
- Modifying existing templates
- Adding new features
- Fixing bugs 