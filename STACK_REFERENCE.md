# Modern Tech Stack Reference - 2025

This document provides a comprehensive reference for the latest features and best practices of the tech stack used in this project.

## Next.js 15.5 (Latest Features)

### 🚀 Turbopack Builds (Beta)
Next.js 15.5 introduces Turbopack for production builds, offering 2x to 5x faster compilation times.

```bash
# Enable Turbopack builds (beta)
next build --turbopack
next dev --turbopack
```

**Performance Benefits:**
- Battle-tested serving over 1.2 billion requests
- Smaller JavaScript and CSS bundles
- Better FCP, LCP, and TTFB metrics

### 🛠️ Node.js Middleware (Stable)
Middleware can now run with full Node.js APIs, enabling patterns impossible in Edge runtime.

```typescript
// middleware.ts - Now supports full Node.js APIs
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs' // ✅ Native Node.js modules now work
import crypto from 'crypto'

export function middleware(request: NextRequest) {
  // Full Node.js API access for complex auth flows
  const token = crypto.randomBytes(32).toString('hex')
  return NextResponse.next()
}
```

### 📝 TypeScript Improvements

**Typed Routes (Stable):**
```typescript
// Enable in next.config.ts
const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true // Now stable!
  }
}

// Automatic type safety for routes
<Link href="/dashboard/analytics" /> // ✅ Type-checked
<Link href="/invalid-route" />       // ❌ TypeScript error
```

**New Commands:**
```bash
# Manual type generation without dev/build
next typegen
```

### ⚠️ Deprecations for Next.js 16
Prepare for these removals in Next.js 16:

1. **`next lint` command** - Will be removed
2. **`legacyBehavior` prop** - Remove from `next/link`
3. **AMP support** - All AMP APIs will be removed

## React 19 (Major Release)

### 🔧 React Compiler (Automatic Optimization)
The React Compiler automatically optimizes components, eliminating manual memoization.

```typescript
// Before React 19 - Manual optimization
const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() =>
    data.map(item => expensiveOperation(item)), [data]
  )

  const handleClick = useCallback(() => {
    // handler logic
  }, [])

  return <div>{processedData}</div>
})

// React 19 - Compiler handles optimization automatically
const ExpensiveComponent = ({ data }) => {
  const processedData = data.map(item => expensiveOperation(item))

  const handleClick = () => {
    // handler logic
  }

  return <div>{processedData}</div>
}
```

### 🎣 New Hooks

**useActionState - Simplified form state management:**
```typescript
import { useActionState } from 'react'

async function updateUser(prevState: any, formData: FormData) {
  // Server action
  const name = formData.get('name')
  // ... update logic
  return { success: true, name }
}

function UserForm() {
  const [state, formAction, isPending] = useActionState(updateUser, null)

  return (
    <form action={formAction}>
      <input name="name" />
      <button disabled={isPending}>
        {isPending ? 'Updating...' : 'Update'}
      </button>
      {state?.success && <p>Updated {state.name}!</p>}
    </form>
  )
}
```

**useOptimistic - Optimistic UI updates:**
```typescript
import { useOptimistic } from 'react'

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  )

  const handleAdd = async (formData) => {
    const newTodo = { text: formData.get('text'), id: Date.now() }
    addOptimisticTodo(newTodo) // Immediate UI update
    await addTodo(newTodo) // Actual server call
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id} className={todo.pending ? 'opacity-50' : ''}>
          {todo.text}
        </li>
      ))}
    </ul>
  )
}
```

**useFormStatus - Form state access:**
```typescript
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus()

  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}
```

**Enhanced use() Hook - Promise and context handling:**
```typescript
import { use } from 'react'

function UserProfile({ userPromise }) {
  // Can be called conditionally, in loops, etc.
  const user = use(userPromise)

  if (!user.isActive) {
    return <div>Inactive user</div>
  }

  return <div>Welcome {user.name}!</div>
}
```

### 🖥️ Server Components & Directives
```typescript
// Server Component (default)
async function ServerComponent() {
  const data = await fetchData() // Runs on server
  return <div>{data}</div>
}

// Client Component (for interactivity)
'use client'
import { useState } from 'react'

function ClientComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

## Tailwind CSS v4 (Major Rewrite)

### ⚡ Performance & Configuration
- **5x faster builds** with the new Oxide engine
- **100x faster incremental builds** (microseconds)
- **CSS-based configuration** instead of JavaScript

```css
/* styles/globals.css - CSS-based configuration */
@import "tailwindcss";

/* Custom configuration in CSS */
@config {
  theme: {
    colors: {
      primary: #3b82f6;
      secondary: #64748b;
    }
  }
}
```

### 🎨 Modern CSS Features
Built on cutting-edge CSS features:

```css
/* Cascade layers for better specificity control */
@layer components {
  .btn {
    @apply px-4 py-2 rounded;
  }
}

/* Color-mix() support */
.text-primary-50 { color: color-mix(in srgb, theme(colors.primary) 50%, white); }

/* @property for custom properties */
@property --spacing {
  syntax: '<length>';
  inherits: false;
  initial-value: 1rem;
}
```

### 🆕 New Utilities & Variants

**not-* variant:**
```html
<!-- Style when NOT matching a variant -->
<div class="bg-blue-500 not-hover:bg-gray-500">
  Hover to see blue, otherwise gray
</div>
```

**New utilities:**
```html
<!-- Color scheme -->
<html class="color-scheme-dark">

<!-- Field sizing -->
<input class="field-sizing-content">

<!-- Text shadows -->
<h1 class="text-shadow-lg">Shadowed text</h1>

<!-- Mask utilities -->
<div class="mask-gradient-to-r">Masked content</div>
```

### 🔧 Simplified Setup
```bash
npm install tailwindcss@next
```

```css
/* Single line setup */
@import "tailwindcss";
```

## ESLint 9 (Flat Config)

### 📁 Flat Config Migration
Your current setup uses the modern flat config format:

```javascript
// eslint.config.mjs - Modern flat config
import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
    ],
  },
]
```

### 🛠️ Migration Tools
```bash
# Automated migration from old config
npx @eslint/migrate-config .eslintrc.json

# Modern helpers for easier config
npm install @eslint/compat @eslint/js
```

### 📝 Best Practices

**Define config with helpers:**
```javascript
import js from '@eslint/js'
import { defineConfig } from 'eslint-define-config'

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error'
    }
  }
])
```

**Global ignores:**
```javascript
export default [
  {
    ignores: ['dist/**', 'build/**'] // Global ignores
  },
  {
    files: ['src/**/*.ts'],
    ignores: ['**/*.test.ts'] // File-specific ignores
  }
]
```

## Browser Compatibility

### Minimum Requirements (2025)
- **Safari 16.4+**
- **Chrome 111+**
- **Firefox 128+**

These versions support modern CSS features like `@property`, `color-mix()`, and cascade layers that the stack relies on.

## Upgrade Commands

```bash
# Update to latest versions
npm install next@latest react@latest react-dom@latest
npm install tailwindcss@latest
npm install eslint@latest @eslint/js@latest

# Enable Turbopack
next dev --turbopack
next build --turbopack

# Run type generation
next typegen
```

## Key Takeaways for Development

1. **Use React Compiler** - Remove manual `useMemo`/`useCallback` optimizations
2. **Leverage new hooks** - `useActionState` for forms, `useOptimistic` for UI updates
3. **Configure in CSS** - Move Tailwind config from JS to CSS files
4. **Prepare for Next.js 16** - Remove deprecated features now
5. **Use Turbopack** - Enable for faster builds in development and production
6. **Modern ESLint** - Flat config is the standard, legacy configs are deprecated

---

*Last updated: September 2025*
*Stack versions: Next.js 15.5.3, React 19.1.0, Tailwind CSS v4, ESLint 9*