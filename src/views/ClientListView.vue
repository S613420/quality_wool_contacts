<template>
  <div class="space-y-6">
    <div
      class="flex justify-between items-center border-b border-gray-200 pb-4"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Clients</h1>
        <p class="text-gray-600 mt-1">Manage farm contacts and locations</p>
      </div>
      <router-link 
        to="/clients/new" 
        class="btn btn-primary"
      >
        ➕ Add Client
      </router-link>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="clientsStore.searchQuery"
              type="text"
              placeholder="Search clients..."
              class="input"
            />
          </div>
          <select v-model="clientsStore.selectedRegion" class="input sm:w-auto">
            <option value="">All Regions</option>
            <option 
              v-for="region in clientsStore.regions" 
              :key="region"
              :value="region"
            >
              {{ region }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="clientsStore.isLoading" class="card">
      <div class="card-body">
        <div class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Loading clients...</p>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="clientsStore.filteredClients.length === 0 && !clientsStore.isLoading" class="card">
      <div class="card-body">
        <div class="text-center py-12 text-gray-500">
          <div class="text-6xl mb-4">🏪</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            {{ clientsStore.totalClients === 0 ? 'No clients found' : 'No matching clients' }}
          </h3>
          <p class="text-gray-600 mb-4">
            {{ clientsStore.totalClients === 0 
              ? 'Get started by adding your first client contact' 
              : 'Try adjusting your search or filter criteria'
            }}
          </p>
          <router-link 
            v-if="clientsStore.totalClients === 0"
            to="/clients/new" 
            class="btn btn-primary"
          >
            Add Your First Client
          </router-link>
          <button 
            v-else
            @click="clientsStore.clearFilters()" 
            class="btn btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Clients Grid -->
    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="client in clientsStore.filteredClients"
        :key="client.id"
        class="card hover:shadow-lg transition-shadow duration-200"
      >
        <div class="card-body">
          <div class="flex justify-between items-start mb-3">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                {{ client.name }}
              </h3>
              <p class="text-sm text-gray-600">{{ client.contactName }}</p>
            </div>
            <div class="flex space-x-2">
              <router-link
                :to="`/clients/${client.id}/edit`"
                class="text-blue-600 hover:text-blue-800 transition-colors"
                title="Edit client"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </router-link>
              <button
                @click="handleDeleteClient(client)"
                class="text-red-600 hover:text-red-800 transition-colors"
                title="Delete client"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div class="space-y-2 text-sm text-gray-600">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {{ client.phone }}
            </div>
            
            <div v-if="client.email" class="flex items-center">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {{ client.email }}
            </div>
            
            <div class="flex items-start">
              <svg class="w-4 h-4 mr-2 mt-0.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <div class="line-clamp-2">{{ client.address }}</div>
                <span class="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1">
                  {{ client.region }}
                </span>
              </div>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-gray-200">
            <router-link
              :to="`/clients/${client.id}`"
              class="btn btn-secondary btn-sm w-full"
            >
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="clientToDelete"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      @click="cancelDelete"
    >
      <div
        class="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        @click.stop
      >
        <div class="flex items-center mb-4">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        <div class="text-center">
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Delete Client
          </h3>
          <p class="text-sm text-gray-500 mb-6">
            Are you sure you want to delete <strong>{{ clientToDelete.name }}</strong>? 
            This action cannot be undone.
          </p>
          <div class="flex space-x-4">
            <button
              @click="cancelDelete"
              class="btn btn-secondary flex-1"
              :disabled="isDeleting"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete"
              class="btn btn-danger flex-1"
              :disabled="isDeleting"
            >
              <span v-if="isDeleting">Deleting...</span>
              <span v-else>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useClientsStore, type Client } from '../stores/clients'

const clientsStore = useClientsStore()
const clientToDelete = ref<Client | null>(null)
const isDeleting = ref(false)
let unsubscribe: (() => void) | null = null

onMounted(async () => {
  // Start real-time listener
  unsubscribe = clientsStore.startRealtimeListener()
  
  // Initial fetch if no clients loaded
  if (clientsStore.clients.length === 0) {
    await clientsStore.fetchClients()
  }
})

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})

function handleDeleteClient(client: Client) {
  clientToDelete.value = client
}

function cancelDelete() {
  clientToDelete.value = null
  isDeleting.value = false
}

async function confirmDelete() {
  if (!clientToDelete.value?.id) return
  
  isDeleting.value = true
  try {
    await clientsStore.deleteClient(clientToDelete.value.id)
    clientToDelete.value = null
  } catch (error) {
    console.error('Error deleting client:', error)
  } finally {
    isDeleting.value = false
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
