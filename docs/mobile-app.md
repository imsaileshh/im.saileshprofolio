# Android Dashboard APK Architecture

- **Engine**: React Native + Expo (EAS Build target for Android APK/AAB).
- **Backend Coupling**: Directly interfaces with the centralized Next.js `/api/*` server over HTTPS.
- **Features**: Biometric fingerprint / face unlock, push notifications for new contact messages, live visitor radar, and CMS quick edits.
