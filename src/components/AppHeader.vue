<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-3">
            <div class="text-2xl">🐑</div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">
                Wool Pickup Tracker
              </h1>
              <p class="text-xs text-gray-500 hidden sm:block">
                Driver Dashboard
              </p>
            </div>
          </router-link>
        </div>

        <nav class="hidden md:flex space-x-8">
          <router-link
            to="/"
            class="nav-link"
            :class="{ 'nav-link-active': $route.name === 'Home' }"
            >Dashboard</router-link
          >
          <router-link
            to="/clients"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path.startsWith('/clients') }"
            >Clients</router-link
          >
          <router-link
            to="/pickups"
            class="nav-link"
            :class="{ 'nav-link-active': $route.path.startsWith('/pickups') }"
            >Pickups</router-link
          >
        </nav>

        <div class="flex items-center space-x-4">
          <div
            class="flex items-center space-x-2 px-3 py-1 rounded-full text-sm"
            :class="syncBadgeClasses"
            :title="syncStatusText"
          >
            <span :class="appStore.syncBadgeColor">{{
              appStore.syncBadgeIcon
            }}</span>
            <span class="hidden sm:inline">{{ syncStatusText }}</span>
          </div>

          <router-link
            to="/settings"
            class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            title="Settings"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '../stores'

const appStore = useAppStore()

const syncStatusText = computed(() => {
  switch (appStore.syncStatus) {
    case 'synced':
      return 'Synced'
    case 'syncing':
      return 'Syncing...'
    case 'offline':
      return 'Offline'
    case 'error':
      return 'Sync Error'
    default:
      return 'Unknown'
  }
})

const syncBadgeClasses = computed(() => {
  switch (appStore.syncStatus) {
    case 'synced':
      return 'bg-green-100 text-green-800'
    case 'syncing':
      return 'bg-blue-100 text-blue-800'
    case 'offline':
      return 'bg-yellow-100 text-yellow-800'
    case 'error':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})
</script>

<style scoped>
.nav-link {
  @apply text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors;
}
.nav-link-active {
  @apply text-primary-600 bg-primary-50;
}
</style>
