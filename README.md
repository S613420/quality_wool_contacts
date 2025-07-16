# 🐑 Wool Pickup Tracker

A Progressive Web App (PWA) for wool farm drivers to track pickups with offline capabilities.

## 🚀 Features

- **Driver Dashboard** - Quick overview of today's pickups and stats
- **Client Management** - Farm contact database with regional filtering
- **Pickup Tracking** - Record wool pickups with photos and GPS
- **Offline Support** - Full functionality without internet connection
- **Real-time Sync** - Automatic data synchronization when online
- **Mobile First** - Optimized for mobile devices and tablets

## 🛠️ Tech Stack

### Frontend
- **Vue 3** with Composition API and TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **Vue Router 4** for navigation
- **Pinia** for state management

### Backend
- **Firebase Firestore** for database
- **Firebase Storage** for photo uploads
- **Firebase Auth** for authentication
- **Firebase Hosting** for deployment

### Development Tools
- **Vitest** for unit testing
- **ESLint** + **Prettier** for code quality
- **GitHub Actions** for CI/CD

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pickup-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🔧 Configuration

### Environment Variables
Create `.env.local` with your Firebase configuration:

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

### Firebase Setup
1. Create a new Firebase project
2. Enable Firestore Database
3. Enable Storage
4. Enable Authentication
5. Deploy security rules: `npm run firebase:deploy`

## 📱 Usage

### For Drivers
1. **Dashboard**: View daily pickup summary and quick stats
2. **New Pickup**: Record pickup details, photos, and location
3. **Clients**: Browse and search farm contacts
4. **Sync**: Monitor online/offline status and data sync

### For Administrators
1. **Client Management**: Add and edit farm contact information
2. **User Management**: Control driver access and permissions
3. **Data Export**: Download pickup records for reporting

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint

# Format code
npm run format
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Firebase Hosting
```bash
npm run build
firebase deploy
```

## 📁 Project Structure

```
pickup-tracker/
├── src/
│   ├── components/     # Reusable Vue components
│   ├── views/         # Page components
│   ├── stores/        # Pinia state management
│   ├── router/        # Vue Router configuration
│   ├── utils/         # Utility functions and tests
│   ├── firebase.ts    # Firebase configuration
│   └── main.ts        # Application entry point
├── docs/              # Documentation
├── logs/              # Development logs
└── public/            # Static assets
```

## 🔄 Data Models

### Client
- Farm/business information
- Contact details
- Geographic region
- Notes and preferences

### Pickup
- Client reference
- Driver information
- Timestamp and location
- Wool grade and quantity
- Photos and notes
- Status tracking

## 🔒 Security

- **Authentication**: Firebase Auth with email/password
- **Authorization**: Role-based access control
- **Data Access**: Firestore security rules
- **File Upload**: Secure Storage rules

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for South Australian wool farmers**