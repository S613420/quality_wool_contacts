<template>
  <div class="space-y-6">
    <div class="border-b border-gray-200 pb-4">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600 mt-1">
        Welcome back! Here's what's happening today.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- Today's Pickups -->
      <div class="card">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-sm font-medium text-gray-500">Today's Pickups</h3>
              <p class="text-2xl font-bold text-gray-900">0</p>
            </div>
            <div class="text-3xl">📦</div>
          </div>
        </div>
      </div>

      <!-- Total Clients -->
      <div class="card">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-sm font-medium text-gray-500">Total Clients</h3>
              <p class="text-2xl font-bold text-gray-900">
                {{ clientsStore.totalClients }}
              </p>
            </div>
            <div class="text-3xl relative">
              🏪
              <span
                v-if="clientsStore.totalClients > 0"
                class="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{
                  clientsStore.totalClients > 99
                    ? '99+'
                    : clientsStore.totalClients
                }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sync Status -->
      <div class="card">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-sm font-medium text-gray-500">Sync Status</h3>
              <p
                class="text-lg font-semibold capitalize"
                :class="syncStatusColor"
              >
                {{ appStore.syncStatus }}
              </p>
            </div>
            <div class="text-2xl" :class="appStore.syncBadgeColor">
              {{ appStore.syncBadgeIcon }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card">
      <div class="card-body">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>

        <div class="grid gap-4 sm:grid-cols-2">
          <router-link to="/pickups/new" class="btn btn-primary">
            ➕ New Pickup
          </router-link>

          <router-link to="/clients" class="btn btn-secondary">
            👥 Browse Clients
          </router-link>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="card">
      <div class="card-body">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>

        <div class="text-center py-8 text-gray-500">
          <div class="text-4xl mb-2">📋</div>
          <p class="text-sm">No recent activity</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAppStore } from '../stores/app'
import { useClientsStore } from '../stores/clients'

const appStore = useAppStore()
const clientsStore = useClientsStore()

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

onMounted(async () => {
  // Load clients if not already loaded
  if (clientsStore.clients.length === 0) {
    await clientsStore.fetchClients()
  }
})
</script>
