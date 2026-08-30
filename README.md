# Sailesh P — Interactive Portfolio + Web Dashboard + Android Dashboard APK

A unified personal ecosystem featuring an interactive portfolio, content management & analytics web dashboard, and companion Android Dashboard APK built with modern full-stack TypeScript technologies.

## Architecture Overview

- **`src/`**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion. Contains public interactive portfolio and administrative web dashboard.
- **`mobile/`**: React Native & Expo mobile dashboard targeting Android APK with biometric/passkey authentication.
- **`prisma/`**: PostgreSQL schema definition, migrations, and database seed scripts shared between web & mobile.
- **`api/`**: Modular backend API services and business logic shared across endpoints.
- **`public/`**: Static public assets, paper textures, sound fx, and portfolio imagery.
- **`docs/`**: Technical specifications, architecture docs, database schemas, and deployment guides.
- **`scripts/`**: Build, seed, and type-generation automation scripts.

## Getting Started

### Prerequisites
- Node.js >= 20
- PostgreSQL
- Expo CLI / Android SDK (for mobile development)

### Installation
```bash
npm install
cd mobile && npm install && cd ..
```

### Environment Setup
```bash
cp .env.example .env
```

### Database Setup
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### Run Development Servers
```bash
# Web Portfolio & Dashboard
npm run dev

# Mobile Expo App
npm run mobile:dev
```
