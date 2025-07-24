import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'your-api-key',
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com',
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'your-app-id',
}

// Log configuration status for debugging
if (firebaseConfig.apiKey === 'your-api-key' || firebaseConfig.projectId === 'your-project-id') {
  console.warn('⚠️ Firebase not properly configured. The app will run in demo mode.')
  console.warn('Please update your .env file with actual Firebase configuration values.')
} else {
  console.log('✅ Firebase configuration loaded successfully')
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Only try to enable persistence if Firebase is properly configured
if (firebaseConfig.apiKey !== 'your-api-key' && firebaseConfig.projectId !== 'your-project-id') {
  enableIndexedDbPersistence(db).catch(err => {
    if (err.code == 'failed-precondition') {
      console.warn(
        'Multiple tabs open, persistence can only be enabled in one tab at a time.'
      )
    } else if (err.code == 'unimplemented') {
      console.warn('The current browser does not support persistence.')
    } else {
      console.warn('Failed to enable persistence:', err)
    }
  })
} else {
  console.log('Skipping Firebase persistence due to missing configuration')
}
