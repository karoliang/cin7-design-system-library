# Cin7 DSL Playground

An interactive playground for exploring and learning the Cin7 DSL syntax.

## Features

- **Interactive Editor**: Write Cin7 DSL code with syntax highlighting
- **Live Preview**: See how your code would render (simulated)
- **Example Gallery**: Browse and learn from curated examples
- **Documentation**: Quick reference and API documentation
- **Multi-layer Support**: Examples showcasing Vanilla JS, React/Polaris, and ExtJS

## Getting Started

```bash
# From the repository root
pnpm install
cd apps/playground
pnpm dev
```

The playground will be available at http://localhost:3001

## Project Structure

```
playground/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── examples/       # Example DSL code
│   ├── store/          # State management
│   └── styles/         # Global styles
├── public/             # Static assets
└── package.json
```

## Adding Examples

To add a new example, edit `src/examples/index.ts`:

```typescript
export const examples = {
  'your-example': {
    name: 'Your Example',
    type: 'component', // or 'page', 'logic'
    description: 'Description of your example',
    technologies: ['Vanilla JS', 'React'],
    tags: ['Category'],
    code: `// Your DSL code here`
  }
}
```

## Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Monaco Editor**: Code editor (VS Code's editor)
- **Cin7 Packages**: All DSL packages for demonstration
- **React Router**: Client-side routing
- **TypeScript**: Type safety

## Development

### Running Tests

```bash
pnpm test
```

### Building for Production

```bash
pnpm build
pnpm preview # Preview production build
```

### Code Style

The project uses TypeScript strict mode and follows the coding conventions of the main repository.

## Roadmap

- [ ] Real DSL compilation (when compiler is ready)
- [ ] Interactive component preview
- [ ] Save/share playground sessions
- [ ] Export to CodeSandbox/StackBlitz
- [ ] Performance profiling tools
- [ ] Visual DSL builder
- [ ] Collaborative editing

## Contributing

See the main repository's contributing guide. The playground is a great place to test new DSL features and examples.

## License

MIT