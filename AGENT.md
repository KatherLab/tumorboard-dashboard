# Arena - Tumor Board Evaluator

## Overview

Arena is a tumor board evaluation tool built with Vue 3 and Vite. It provides an interface for evaluating and comparing cancer treatment recommendations.

## Technology Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Production URL

https://arena.kather.ai

## Directory Structure

```
arena/
├── src/
│   ├── components/       # Vue components
│   ├── data/             # Static data files
│   ├── stores/           # Pinia state stores
│   ├── types/            # TypeScript type definitions
│   ├── App.vue           # Root component
│   ├── main.ts           # Application entry point
│   └── style.css         # Global styles
├── dist/                 # Production build output
├── index.html            # HTML entry point
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Development

### Local Development
```bash
npm run dev       # Start Vite dev server
```

### Build for Production
```bash
npm run build     # TypeScript check + Vite build
npm run preview   # Preview production build locally
```

## Key Features

1. **Tumor Board Interface**: Display and compare treatment recommendations
2. **Evaluation Tools**: Rate and evaluate treatment plans
3. **Data Visualization**: Charts and metrics display

## Deployment

This is a static site. The built `dist/` folder can be served by nginx.

### Build and Deploy
```bash
npm run build
# Copy dist/ to web server or configure nginx to serve from dist/
```

### Nginx Configuration
Located at `/etc/nginx/sites-available/arena.kather.ai`

## Common Tasks

### Adding New Component
1. Create `.vue` file in `src/components/`
2. Use Composition API with `<script setup lang="ts">`
3. Import and use in parent component

### Adding New Store
1. Create store in `src/stores/`
2. Use Pinia's `defineStore` with setup syntax
3. Import store in components using `useXxxStore()`

### Modifying Data
Edit files in `src/data/` to update evaluation criteria or case data.

## Code Style

- Vue 3 Composition API
- TypeScript strict mode
- Tailwind CSS for styling
- Single-file components (.vue)
