import { defineStore } from 'pinia'
import { ref } from 'vue'
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../firebase'
import { useAppStore } from './app'

export const useAuthStore = defineStore('auth', () => {
  const appStore = useAppStore()
  const user = ref<User | null>(null)
  const isLoading = ref(true)
  const isAuthenticated = ref(false)
  const authError = ref<string | null>(null)
  const retryCount = ref(0)
  const maxRetries = 3

  async function signIn() {
    try {
      authError.value = null
      appStore.setSyncStatus('syncing')
      
      const result = await signInAnonymously(auth)
      user.value = result.user
      isAuthenticated.value = true
      retryCount.value = 0
      
      console.log('Anonymous authentication successful')
      appStore.setSyncStatus('synced')
      
      appStore.addToast({
        type: 'success',
        title: 'Authentication successful',
        message: 'You are now connected to the system.',
        duration: 3000
      })
    } catch (error: any) {
      console.error('Authentication failed:', error)
      authError.value = error.message || 'Authentication failed'
      appStore.setSyncStatus('error')
      
      // Retry logic for certain errors
      if (retryCount.value < maxRetries && shouldRetry(error)) {
        retryCount.value++
        console.log(`Retrying authentication (${retryCount.value}/${maxRetries})...`)
        setTimeout(() => signIn(), 2000 * retryCount.value) // Exponential backoff
      } else {
        appStore.addToast({
          type: 'error',
          title: 'Authentication failed',
          message: getErrorMessage(error),
          duration: 8000
        })
      }
      throw error
    }
  }

  function shouldRetry(error: any): boolean {
    // Retry on network errors, but not on configuration errors
    const retryableCodes = ['network-request-failed', 'timeout', 'unavailable']
    return retryableCodes.includes(error.code)
  }

  function getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/network-request-failed':
        return 'Network connection failed. Please check your internet connection.'
      case 'auth/invalid-api-key':
        return 'Invalid Firebase configuration. Please check your API key.'
      case 'auth/project-not-found':
        return 'Firebase project not found. Please check your project configuration.'
      case 'auth/app-deleted':
        return 'Firebase app has been deleted. Please check your configuration.'
      default:
        return error.message || 'Please check your Firebase configuration and try again.'
    }
  }

  function signOut() {
    auth.signOut()
    user.value = null
    isAuthenticated.value = false
    authError.value = null
    retryCount.value = 0
  }

  function initializeAuth() {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      isAuthenticated.value = !!firebaseUser
      isLoading.value = false

      if (!firebaseUser && !authError.value) {
        // Only attempt sign-in if we haven't already failed
        signIn().catch(() => {
          // Error already handled in signIn function
        })
      } else if (firebaseUser) {
        appStore.setSyncStatus('synced')
      }
    }, (error) => {
      console.error('Auth state change error:', error)
      authError.value = error.message
      isLoading.value = false
      appStore.setSyncStatus('error')
    })
  }

  // Manual retry function for UI
  function retryAuthentication() {
    retryCount.value = 0
    authError.value = null
    isLoading.value = true
    signIn()
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    authError,
    retryCount,
    maxRetries,
    signIn,
    signOut,
    initializeAuth,
    retryAuthentication,
  }
})