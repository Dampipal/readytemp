# Contributing to ReadyTemp

First off, thank you for considering contributing to ReadyTemp! It's people like you that make ReadyTemp such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible

### Suggesting Enhancements 💡

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* Use a clear and descriptive title
* Provide a step-by-step description of the suggested enhancement
* Provide specific examples to demonstrate the steps
* Describe the current behavior and explain which behavior you expected to see instead
* Explain why this enhancement would be useful

### Pull Requests 🎯

* Fork the repo and create your branch from `main`
* If you've added code that should be tested, add tests
* If you've changed APIs, update the documentation
* Ensure the test suite passes
* Make sure your code lints
* Issue that pull request!

## Development Process 🛠️

1. Clone the repository
```bash
git clone https://github.com/yourusername/readytemp.git
```

2. Install dependencies
```bash
npm install
```

3. Create a new branch
```bash
git checkout -b feature/your-feature-name
```

4. Make your changes and commit them
```bash
git add .
git commit -m "Add your commit message"
```

5. Push to your fork and submit a pull request
```bash
git push origin feature/your-feature-name
```

## Project Structure 📁

```
readytemp/
├── bin/              # CLI entry point
├── lib/              # Main source code
│   ├── templates/    # Project templates
│   ├── generators/   # Code generators
│   └── utils/        # Utility functions
├── tests/            # Test files
└── docs/             # Documentation
```

## Style Guide 📝

* Use 2 spaces for indentation
* Use semicolons
* Use meaningful variable names
* Comment your code when necessary
* Follow React best practices
* Use ES6+ features when possible

## Adding New Templates 🎨

1. Create a new file in `lib/templates/`
2. Follow the existing template structure
3. Add necessary components and styles
4. Update the template selection in `bin/index.js`
5. Add documentation for the new template

## Testing 🧪

```bash
# Run all tests
npm test

# Run specific test
npm test <test-name>
```

## Documentation 📚

* Keep README.md updated
* Document new features
* Add JSDoc comments for functions
* Update API documentation when needed

## Questions? 🤔

Feel free to open an issue or contact the maintainers directly.

Thank you for contributing! 🙏 