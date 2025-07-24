<template>
  <div v-if="showStatus" class="fixed bottom-4 right-4 z-50">
    <div class="bg-white rounded-lg shadow-lg border p-4 max-w-sm">
      <div class="flex items-center space-x-3">
        <div class="flex-shrink-0">
          <div 
            class="w-3 h-3 rounded-full"
            :class="statusColor"
          ></div>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900">
            {{ statusTitle }}
          </p>
          <p class="text-sm text-gray-500">
            {{ statusMessage }}
          </p>
          <div v-if="authStore.authError" class="mt-2">
            <button
              @click="authStore.retryAuthentication()"
              class="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
              :disabled="authStore.isLoading"
            >
              {{ authStore.isLoading ? 'Retrying...' : 'Retry Connection' }}
            </button>
          </div>
        </div>
        <button
          @click="showStatus = false"
          class="flex-shrink-0 text-gray-400 hover:text-gray-600"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Firebase Config Status -->
      <div v-if="showDebugInfo" class="mt-3 pt-3 border-t text-xs text-gray-600">
        <div class="space-y-1">
          <div class="flex justify-between">
            <span>Project ID:</span>
            <span class="font-mono">{{ firebaseConfig.projectId }}</span>
          </div>
          <div class="flex justify-between">
            <span>Auth Domain:</span>
            <span class="font-mono text-xs">{{ firebaseConfig.authDomain }}</span>
          </div>
          <div class="flex justify-between">
            <span>API Key:</span>
            <span class="font-mono">{{ maskedApiKey }}</span>
          </div>
        </div>
        <button
          @click="copyConfigToClipboard"
          class="mt-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
        >
          Copy Config for Support
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useAppStore } from '../stores/app'

const authStore = useAuthStore()
const appStore = useAppStore()
const showStatus = ref(false)
const showDebugInfo = ref(false)

// Show status automatically if there are issues
onMounted(() => {
  // Show status panel if auth fails or takes too long
  setTimeout(() => {
    if (!authStore.isAuthenticated || authStore.authError) {
      showStatus.value = true
    }
  }, 5000)
})

const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'not-configured',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'not-configured',
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'not-configured',
}

const maskedApiKey = computed(() => {
  const key = firebaseConfig.apiKey
  if (key === 'not-configured' || key === 'your-api-key-here') {
    return 'NOT CONFIGURED'
  }
  return key.substring(0, 8) + '...' + key.substring(key.length - 4)
})

const statusColor = computed(() => {
  if (authStore.authError) return 'bg-red-500'
  if (authStore.isLoading) return 'bg-yellow-500 animate-pulse'
  if (authStore.isAuthenticated) return 'bg-green-500'
  return 'bg-gray-500'
})

const statusTitle = computed(() => {
  if (authStore.authError) return 'Connection Error'
  if (authStore.isLoading) return 'Connecting...'
  if (authStore.isAuthenticated) return 'Connected'
  return 'Disconnected'
})

const statusMessage = computed(() => {
  if (authStore.authError) {
    if (firebaseConfig.projectId === 'your-project-id') {
      return 'Firebase not configured. Check environment variables.'
    }
    return authStore.authError
  }
  if (authStore.isLoading) return 'Establishing connection to Firebase...'
  if (authStore.isAuthenticated) return 'All systems operational'
  return 'Not connected to Firebase'
})

function copyConfigToClipboard() {
  const config = {
    ...firebaseConfig,
    authError: authStore.authError,
    isAuthenticated: authStore.isAuthenticated,
    syncStatus: appStore.syncStatus,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  }
  
  navigator.clipboard.writeText(JSON.stringify(config, null, 2))
  appStore.addToast({
    type: 'info',
    title: 'Config copied',
    message: 'Firebase configuration copied to clipboard for debugging.',
    duration: 3000
  })
}

// Toggle debug info on triple click
let clickCount = 0
function handleStatusClick() {
  clickCount++
  if (clickCount === 3) {
    showDebugInfo.value = !showDebugInfo.value
    clickCount = 0
  }
  setTimeout(() => { clickCount = 0 }, 1000)
}
</script>