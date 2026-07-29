# Contributing to Iconic Sports Complexes

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/iconic-sports-complexes.git
   cd iconic-sports-complexes
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint

# Run type checker
npm run type-check
```

## Code Style

- Use TypeScript for all new code
- Follow ESLint rules configured in the project
- Use Prettier for code formatting (auto-formatted on commit)
- Component names should be PascalCase
- File names should be kebab-case

### TypeScript Guidelines
- Always define types explicitly
- Use interfaces over type aliases when possible
- Avoid `any` type unless absolutely necessary
- Document complex types with comments

### Component Guidelines
- Keep components small and focused (single responsibility)
- Use functional components with hooks
- Memoize expensive computations with useMemo
- Lift state up only when necessary

## Commit Message Format

Follow conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

Types: feat, fix, docs, style, refactor, test, chore, perf

Example:
```
feat(poster): add compass rose to venue map

- Implement compass rose SVG component
- Add rotation based on venue orientation
- Include cardinal direction labels

Closes #123
```

## Submitting Pull Requests

1. **Update your feature branch** with latest main:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Ensure tests pass**:
   ```bash
   npm test
   ```

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request** with:
   - Clear title describing the changes
   - Description of what and why
   - Screenshots/videos if relevant
   - Reference to related issues

## PR Review Process

- Maintainers will review your PR
- Address feedback constructively
- Keep discussions professional and respectful
- PRs require approval before merging

## Reporting Issues

- **Bug reports**: Include steps to reproduce, expected vs actual behavior
- **Feature requests**: Describe the use case and potential implementation
- **Documentation**: Point out unclear or missing documentation

Use GitHub issues for all reports with appropriate labels.

## Architecture Guidelines

### Project Structure
Follow the existing folder structure. When adding new features:
- Create components in `/components`
- Add types in `/lib/types`
- Add utilities in `/lib/utils`
- Add API routes in `/app/api`

### Database Management
- Always verify Excel changes with sample data
- Document new columns in README.md
- Maintain backward compatibility

### Performance Considerations
- Optimize large image processing with web workers
- Lazy load heavy components
- Minimize bundle size
- Cache computations appropriately

## Documentation

- Update README.md for user-facing changes
- Add JSDoc comments to complex functions
- Document breaking changes clearly
- Update CHANGELOG when making significant changes

## Testing

- Write tests for new features
- Maintain >80% code coverage
- Test edge cases and error scenarios

## Questions?

- Open a discussion on GitHub
- Check existing issues and PRs first
- Be respectful and patient

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Welcome diverse perspectives
- Respect intellectual property

---

Thank you for contributing to make this project better! 🎉
