# Setup Guide: Quality Wool Contacts

## Quick Start

### Option 1: Development Mode (No Firebase Configuration Required)
The application includes a development mode that uses local storage instead of Firebase. This allows you to test the application immediately without configuring Firebase.

```bash
# Clone and install
git clone <repository-url>
cd quality-wool-contacts
npm install

# Start development server
npm run dev
```

The app will automatically detect that Firebase is not configured and use local storage for data persistence.

### Option 2: Full Firebase Setup

#### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "wool-pickup-tracker")
4. Enable Google Analytics (optional)
5. Wait for project creation

#### Step 2: Configure Firebase Services

##### Enable Authentication
1. In Firebase Console, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Anonymous" authentication
5. Click "Save"

##### Setup Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Select a location (choose closest to your users)
5. Click "Done"

##### Get Configuration Keys
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web app" (</> icon)
4. Register app name: "wool-contacts-web"
5. Copy the configuration object

#### Step 3: Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Firebase configuration:
   ```bash
   VITE_FIREBASE_API_KEY=your-actual-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-actual-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-actual-sender-id
   VITE_FIREBASE_APP_ID=your-actual-app-id
   ```

#### Step 4: Deploy Firestore Rules
```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init firestore

# Deploy security rules
firebase deploy --only firestore
```

#### Step 5: Test the Application
```bash
npm run dev
```

## Development Workflow

### Development Mode Features
- ✅ Local storage persistence
- ✅ Full CRUD operations
- ✅ Offline functionality
- ✅ No Firebase configuration required
- ⚠️ Data is device-specific
- ⚠️ No real-time sync

### Production Mode Features
- ✅ Real-time synchronization
- ✅ Multi-device access
- ✅ Backup and recovery
- ✅ Scalable database
- ✅ Authentication security

### Switching Between Modes
The application automatically detects the mode based on your Firebase configuration:

- **Development Mode**: When `VITE_FIREBASE_PROJECT_ID` is `your-project-id`
- **Production Mode**: When Firebase is properly configured

## Troubleshooting

### Common Issues

#### "Firebase not configured" warning
- **Cause**: Environment variables not set correctly
- **Solution**: Check `.env` file has real Firebase values

#### "Permission denied" errors
- **Cause**: Firestore rules not deployed or authentication failed
- **Solution**: 
  1. Ensure anonymous auth is enabled
  2. Deploy Firestore rules: `firebase deploy --only firestore`

#### "Network request failed" errors
- **Cause**: Internet connection or Firebase service issues
- **Solution**: Check network connection and Firebase status

#### Development mode not working
- **Cause**: Browser blocking localStorage
- **Solution**: Enable localStorage in browser settings

### Debug Information
The application includes a Firebase status component that appears when there are connection issues:

1. **Red dot**: Connection error
2. **Yellow dot**: Connecting...
3. **Green dot**: Connected
4. **Gray dot**: Disconnected

Triple-click the status panel to show debug information.

### Getting Help
If you encounter issues:

1. Check the browser console for error messages
2. Use the Firebase status component's "Copy Config for Support" button
3. Verify your Firebase project settings
4. Check the `TROUBLESHOOTING.md` file

## Production Deployment

### Build the Application
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
firebase deploy --only hosting
```

### Deploy Everything
```bash
firebase deploy
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | `AIzaSyC...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Auth domain | `project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Project ID | `wool-tracker-123` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket | `project.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender | `123456789` |
| `VITE_FIREBASE_APP_ID` | App ID | `1:123:web:abc123` |

## Security Notes

### Firestore Rules
The current rules require authentication for all operations:

```javascript
match /clients/{clientId} {
  allow read: if isAuthenticated();
  allow write: if isAuthenticated();
}
```

### Anonymous Authentication
- Users are automatically signed in anonymously
- No personal data is collected
- Each device gets a unique anonymous ID
- Perfect for this use case where we need data persistence without user management

### Data Privacy
- Client data is stored securely in Firestore
- No personal user information is collected
- Data is encrypted in transit and at rest
- Only authenticated users can access data