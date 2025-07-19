<template>
  <div class="space-y-6">
    <div class="border-b border-gray-200 pb-4">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600 mt-1">
        Welcome back! Here's what's happening today.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Today's Pickups</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.todayPickups }}
              </p>
            </div>
            <div class="text-3xl">📦</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Total Clients</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ stats.totalClients }}
              </p>
            </div>
            <div class="text-3xl">🏪</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Sync Status</p>
              <p class="text-2xl font-bold" :class="syncStatusColor">
                {{ appStore.syncStatus }}
              </p>
            </div>
            <div class="text-3xl">{{ appStore.syncBadgeIcon }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="text-lg font-semibold text-gray-900">Quick Actions</h2>
      </div>
      <div class="card-body">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <router-link to="/pickups/new" class="btn btn-primary"
            >➕ New Pickup</router-link
          >
          <router-link to="/clients" class="btn btn-secondary"
            >👥 Browse Clients</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '../stores'

const appStore = useAppStore()
const stats = ref({ todayPickups: 0, totalClients: 0 })

const syncStatusColor = computed(() => {
  switch (appStore.syncStatus) {
    case 'synced':
      return 'text-green-600'
    case 'syncing':
      return 'text-blue-600'
    case 'offline':
      return 'text-yellow-600'
    case 'error':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
})
</script>
