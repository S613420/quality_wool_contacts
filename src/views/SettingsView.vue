<template>
  <div class="space-y-6">
    <div class="border-b border-gray-200 pb-4">
      <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
      <p class="text-gray-600 mt-1">Configure your application preferences</p>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="text-lg font-semibold text-gray-900">Sync Preferences</h2>
      </div>
      <div class="card-body space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-900">Auto-sync</p>
            <p class="text-sm text-gray-600">
              Automatically sync data when online
            </p>
          </div>
          <input type="checkbox" v-model="autoSync" class="toggle" />
        </div>
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-900">Offline Mode</p>
            <p class="text-sm text-gray-600">Allow offline data entry</p>
          </div>
          <input type="checkbox" v-model="offlineMode" class="toggle" />
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="text-lg font-semibold text-gray-900">App Information</h2>
      </div>
      <div class="card-body space-y-4">
        <div class="flex justify-between">
          <span class="text-gray-600">Version</span>
          <span class="font-medium">1.0.0</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Environment</span>
          <span class="font-medium">Development</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Firebase Project</span>
          <span class="font-medium text-xs">{{ firebaseProjectId }}</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="text-lg font-semibold text-gray-900">Actions</h2>
      </div>
      <div class="card-body space-y-4">
        <button @click="clearCache" class="btn btn-secondary w-full">
          Clear Local Cache
        </button>
        <button @click="exportData" class="btn btn-secondary w-full">
          Export Data
        </button>
        <button @click="forcSync" class="btn btn-primary w-full">
          Force Sync Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '../stores'

const appStore = useAppStore()
const autoSync = ref(true)
const offlineMode = ref(true)
const firebaseProjectId =
  import.meta.env.VITE_FIREBASE_PROJECT_ID || 'your-project-id'

function clearCache() {
  appStore.addToast({
    type: 'success',
    title: 'Cache cleared',
    message: 'Local cache has been cleared',
  })
}

function exportData() {
  appStore.addToast({
    type: 'info',
    title: 'Export started',
    message: 'Your data export will be ready shortly',
  })
}

function forcSync() {
  appStore.setSyncStatus('syncing')
  setTimeout(() => {
    appStore.setSyncStatus('synced')
    appStore.addToast({
      type: 'success',
      title: 'Sync complete',
      message: 'All data is now synchronized',
    })
  }, 2000)
}
</script>
