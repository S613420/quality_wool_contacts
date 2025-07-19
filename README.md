# 🐑 Wool Pickup Tracker

A Progressive Web App (PWA) for wool farm drivers to track pickups with offline capabilities, featuring real-time synchronization and mobile-first design.

[![CI](https://github.com/your-username/wool-pickup-tracker/workflows/CI/badge.svg)](https://github.com/your-username/wool-pickup-tracker/actions)
[![Firebase Deploy](https://github.com/your-username/wool-pickup-tracker/workflows/Deploy%20to%20Firebase%20Hosting/badge.svg)](https://github.com/your-username/wool-pickup-tracker/actions)

## 🚀 Features

- **📱 Mobile First** - Optimized for tablets and smartphones
- **🔄 Offline Support** - Full functionality without internet connection
- **📍 GPS Tracking** - Automatic location capture for pickups
- **📸 Photo Documentation** - Capture and store pickup photos
- **👥 Client Management** - Comprehensive farm contact database
- **📊 Dashboard** - Real-time pickup statistics and summaries
- **🔄 Auto Sync** - Seamless data synchronization when online
- **🔐 Secure** - Firebase authentication and role-based access

## 🛠️ Tech Stack

- **Frontend**: Vue 3 + TypeScript + Vite + Tailwind CSS
- **Backend**: Firebase (Firestore, Storage, Auth, Hosting)
- **State Management**: Pinia
- **Testing**: Vitest + ESLint + Prettier
- **CI/CD**: GitHub Actions + Firebase Hosting

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- Firebase account
- Git

### 1. Clone & Install
```bash
git clone https://github.com/your-username/wool-pickup-tracker.git
cd wool-pickup-tracker
npm install
```

### 2. Firebase Setup
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your Firebase config
# Get these values from Firebase Console → Project Settings
```

### 3. Start Development
```bash
npm run dev
# Open http://localhost:5173
```

## 🔧 Environment Configuration

Create `.env.local` with your Firebase credentials:

```bash
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

## 🚀 Deployment

### Automatic Deployment (Recommended)
Push to `main` branch triggers automatic deployment to Firebase Hosting.

### Manual Deployment
```bash
npm run build
npm run firebase:deploy:hosting
```

### Local Testing
```bash
npm run build
npm run preview
```

## 🧪 Development Commands

```bash
# Development
npm run dev                    # Start dev server
npm run test                   # Run tests in watch mode
npm run test:run              # Run tests once
npm run lint                  # Check code quality
npm run format               # Format code

# Building
npm run build                 # Production build
npm run preview               # Preview build locally

# Firebase
npm run firebase:emulate      # Start Firebase emulators
npm run firebase:deploy:all   # Deploy everything
```

## 📁 Project Structure

```
wool-pickup-tracker/
├── src/
│   ├── components/           # Reusable Vue components
│   ├── views/               # Page components
│   ├── stores/              # Pinia state management
│   ├── router/              # Vue Router configuration
│   ├── utils/               # Utilities and tests
│   ├── firebase.ts          # Firebase configuration
│   └── main.ts              # App entry point
├── docs/                    # Documentation & schemas
├── scripts/                 # Deployment helpers
├── .github/workflows/       # CI/CD pipelines
├── firebase.json           # Firebase configuration
├── firestore.rules         # Database security rules
└── storage.rules           # Storage security rules
```

## 🔄 Data Models

### Client
```typescript
{
  id: string
  name: string              // Farm/business name
  contactName: string       // Primary contact person
  phone: string            // Contact phone
  email?: string           // Contact email
  address: string          // Farm address
  region: string           // Geographic region
  notes?: string           // Additional notes
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Pickup
```typescript
{
  id: string
  clientId: string         // Reference to client
  driverId: string         // Driver user ID
  timestamp: timestamp     // Pickup date/time
  location: {
    lat: number           // GPS coordinates
    lng: number
    address?: string      // Human-readable address
  }
  wool: {
    grade: string         // Premium | Good | Average | Lower
    quantity: number      // Amount of wool
    unit: string         // kg | bales
  }
  photos?: string[]       // Photo URLs
  notes?: string          // Additional notes
  status: string          // pending | completed | cancelled
  createdAt: timestamp
  updatedAt: timestamp
}
```

## 🔒 Security Features

- **🔐 Authentication**: Firebase Auth with email/password
- **👥 Role-based Access**: Driver, admin, and manager roles
- **🛡️ Database Rules**: Firestore security rules enforce data access
- **📁 File Security**: Storage rules protect photo uploads
- **🔍 Input Validation**: Client-side and server-side validation

## 🌍 Regional Support

Designed for South Australian wool farming regions:
- Mallee
- Riverland  
- Mid North
- Adelaide Hills
- Eyre Peninsula

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚨 Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check deployment readiness
./scripts/check-deployment.sh
```

### Firebase Connection
1. Verify environment variables are set correctly
2. Check Firebase project settings
3. Ensure Firestore and Storage are enabled
4. Verify security rules are deployed

### CI/CD Issues
- Check GitHub Actions logs in the Actions tab
- Verify all GitHub secrets are configured
- Ensure Firebase service account has proper permissions

## 📚 Additional Documentation

- [📋 Firebase CI/CD Setup Guide](FIREBASE_CICD_SETUP.md)
- [📈 Deployment Status](DEPLOYMENT_STATUS.md)
- [📐 Database Schema](docs/schema.yaml)
- [📖 Technical Specification](docs/spec.md)

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run `npm run lint` and `npm run test:run`
5. Commit: `git commit -m "feat: description"`
6. Push: `git push origin feature-name`
7. Create a Pull Request

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/wool-pickup-tracker/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/wool-pickup-tracker/discussions)
- 📧 **Email**: your-email@example.com

---

**🇦🇺 Built with ❤️ for South Australian wool farmers**