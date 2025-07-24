import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../firebase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(true)
  const isAuthenticated = ref(false)

  async function signIn() {
    try {
      const result = await signInAnonymously(auth)
      user.value = result.user
      isAuthenticated.value = true
      console.log('Anonymous authentication successful')
    } catch (error) {
      console.error('Authentication failed:', error)
      throw error
    }
  }

  function signOut() {
    auth.signOut()
    user.value = null
    isAuthenticated.value = false
  }

  function initializeAuth() {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      isAuthenticated.value = !!firebaseUser
      isLoading.value = false

      // If no user is authenticated, sign in anonymously
      if (!firebaseUser) {
        signIn().catch(console.error)
      }
    })
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    signIn,
    signOut,
    initializeAuth,
  }
})