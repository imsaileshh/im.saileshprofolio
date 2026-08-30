# System Architecture Documentation

## Overview
The Sailesh P ecosystem integrates three complementary applications sharing a centralized PostgreSQL database and business logic layer:
1. Next.js Public Portfolio (Interactive paper-style personal web presentation)
2. Next.js Web Dashboard (Secure real-time analytics & CMS interface)
3. React Native / Expo Android Companion APK (Biometric authenticated mobile control & live visitor monitor)

## Technology Stack
- **Web App**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion
- **Mobile App**: React Native, Expo SDK 52, Expo Local Authentication (Passkeys/Biometrics)
- **Database & ORM**: PostgreSQL, Prisma ORM
- **Authentication**: WebAuthn Passkeys & Session Tokens (Zero plaintext credentials)
