# LMS Frontend

Learning Management System - Frontend Application

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Framer Motion** - Animation library
- **Lucide Icons** - Icon set

## Architecture

Feature-Based Architecture with shared components, services, and utilities.

## Getting Started

```
npm install
npm run dev
```

## Project Structure

```
src/
  app/              # Store, router, and provider configuration
  assets/           # Static assets (images, icons, fonts)
  components/       # Shared reusable components
  context/          # React context providers
  hooks/            # Shared custom hooks
  layouts/          # Page layout wrappers
  routes/           # Route configuration and guards
  services/         # API client and interceptors
  features/         # Feature modules (auth, courses, etc.)
  utils/            # Shared utility functions
  helpers/          # Helper functions
  constants/        # Global constants
  validations/      # Global validation schemas
  styles/           # Global styles
  i18n/             # Internationalization (future)
  __tests__/        # Global test utilities
```

## Feature Module Structure

Each feature follows a consistent internal structure:

```
feature/
  pages/            # Page components
  components/       # Feature-specific components
  hooks/            # Feature-specific hooks
  services/         # API calls
  store/            # Redux slice, selectors, thunks
  utils/            # Utilities
  constants/        # Constants
  validation/       # Zod schemas
  README.md         # Feature documentation
```
