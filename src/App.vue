<template>
  <div
    id="app"
    class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
  >
    <AppHeader />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <router-view />
    </main>

    <div class="fixed top-4 right-4 z-50 space-y-2">
      <transition-group name="toast" tag="div">
        <div
          v-for="toast in appStore.toasts"
          :key="toast.id"
          class="toast"
          :class="toastClasses(toast.type)"
        >
          <div class="flex items-start">
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium">{{ toast.title }}</p>
              <p v-if="toast.message" class="text-sm mt-1 opacity-90">
                {{ toast.message }}
              </p>
            </div>
            <button
              @click="appStore.removeToast(toast.id)"
              class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
            >
              <svg
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </transition-group>
    </div>

    <div
      v-if="appStore.isLoading"
      class="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4 border border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center space-x-3">
          <div
            class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 dark:border-primary-400"
          ></div>
          <p class="text-gray-900 dark:text-gray-100">
            {{ appStore.loadingMessage || 'Loading...' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import { useAppStore, useThemeStore } from './stores'
import type { Toast } from './stores/app'

const appStore = useAppStore()
const themeStore = useThemeStore()

function toastClasses(type: Toast['type']) {
  const base = 'toast-base'
  switch (type) {
    case 'success':
      return `${base} bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700`
    case 'error':
      return `${base} bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700`
    case 'warning':
      return `${base} bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700`
    case 'info':
      return `${base} bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700`
    default:
      return `${base} bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700`
  }
}

onMounted(() => {
  // Initialize theme system
  themeStore.initializeTheme()

  // Initialize app
  appStore.initializeOnlineListeners()
  appStore.addToast({
    type: 'info',
    title: 'Welcome to Quality Wool Contacts',
    message: 'Ready to log pickups',
    duration: 3000,
  })
})
</script>

<style>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.toast-base {
  @apply max-w-sm p-4 rounded-lg border shadow-lg;
}
</style>
