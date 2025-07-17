// Firebase Configuration Template
// Copy this file to firebase.js and replace with your actual values
// DO NOT commit the actual firebase.js file to version control

export const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
  measurementId: "your-measurement-id" // Optional for Analytics
};

// Environment-specific configurations
export const getFirebaseConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      ...firebaseConfig,
      // You can override specific settings for production if needed
    };
  }
  
  return firebaseConfig;
};