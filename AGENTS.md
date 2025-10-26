# Agent Guidelines for Diabetes Tracker

## Build Commands
- **Dev**: `npm run dev` (Next.js development server)
- **Build**: `npm run build` (Production build)
- **Lint**: `npm run lint` (ESLint validation)
- **Start**: `npm run start` (Production server)

## Code Style Guidelines

### Imports & Structure
- Use absolute imports with `@/` prefix (e.g., `@/components/ui/button`)
- Group imports: external packages first, then internal modules
- Use named exports for components and utilities

### React/Next.js Patterns
- Use "use client" directive for client components
- Follow Next.js App Router structure (`app/` directory)
- Functional components with TypeScript interfaces
- Use React hooks (useState, useEffect) for state management

### Styling & UI
- Tailwind CSS for all styling with dark theme preferences
- Use shadcn/ui components from `@/components/ui/`
- Utility-first CSS with `cn()` helper from `@/lib/utils`
- Responsive design with mobile-first approach

### TypeScript
- Strict TypeScript configuration enabled
- Use proper typing for props and state
- Leverage type inference where possible

### Error Handling
- Use try-catch blocks for async operations
- Validate user inputs before processing
- Provide user-friendly error messages