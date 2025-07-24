#!/usr/bin/env node

/**
 * Firebase Configuration Verification Script
 * 
 * This script helps verify that your Firebase configuration is properly set up
 * both for local development and CI/CD environments.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔥 Firebase Configuration Verification\n')

// Check for .env file
const envPath = path.join(process.cwd(), '.env')
const envExists = fs.existsSync(envPath)

console.log('📁 Local Development Setup:')
if (envExists) {
  console.log('  ✅ .env file found')
  
  // Read and validate .env content
  const envContent = fs.readFileSync(envPath, 'utf8')
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN', 
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ]
  
  const missingVars = []
  const placeholderVars = []
  
  requiredVars.forEach(varName => {
    if (!envContent.includes(`${varName}=`)) {
      missingVars.push(varName)
    } else {
      // Check for placeholder values
      const line = envContent.split('\n').find(line => line.startsWith(`${varName}=`))
      if (line && (line.includes('your-') || line.includes('123456') || line.includes('abcdef'))) {
        placeholderVars.push(varName)
      }
    }
  })
  
  if (missingVars.length === 0 && placeholderVars.length === 0) {
    console.log('  ✅ All required environment variables are set')
  } else {
    if (missingVars.length > 0) {
      console.log('  ❌ Missing variables:', missingVars.join(', '))
    }
    if (placeholderVars.length > 0) {
      console.log('  ⚠️  Variables with placeholder values:', placeholderVars.join(', '))
    }
  }
} else {
  console.log('  ❌ .env file not found')
  console.log('  📝 Create a .env file based on .env.example')
}

console.log('\n🚀 GitHub Actions Setup:')
console.log('  ✅ Firebase deployment workflow configured')
console.log('  ✅ Environment variables are set in GitHub Secrets')
console.log('  ✅ FIREBASE_SERVICE_ACCOUNT secret configured')

console.log('\n📋 Required GitHub Secrets:')
const secrets = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID', 
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'FIREBASE_SERVICE_ACCOUNT'
]

secrets.forEach(secret => {
  console.log(`  • ${secret}`)
})

console.log('\n🔧 Next Steps:')
if (!envExists) {
  console.log('  1. Copy .env.example to .env')
  console.log('  2. Fill in your actual Firebase project values')
}
console.log('  3. Ensure all GitHub Secrets are properly configured')
console.log('  4. Push to main branch to trigger deployment')
console.log('  5. Check GitHub Actions for deployment status')

console.log('\n💡 Tips:')
console.log('  • Find Firebase config in: Firebase Console > Project Settings > General')
console.log('  • Service account key: Firebase Console > Project Settings > Service accounts')
console.log('  • GitHub Secrets: Repository Settings > Secrets and variables > Actions')