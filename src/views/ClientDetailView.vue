<template>
  <div class="space-y-6">
    <!-- Loading State -->
    <div v-if="isLoading" class="card">
      <div class="card-body">
        <div class="text-center py-12">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
          ></div>
          <p class="text-gray-600">Loading client details...</p>
        </div>
      </div>
    </div>

    <!-- Client not found -->
    <div v-else-if="!client" class="card">
      <div class="card-body">
        <div class="text-center py-12 text-gray-500">
          <div class="text-6xl mb-4">❌</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Client Not Found
          </h3>
          <p class="text-gray-600 mb-4">
            The client you're looking for doesn't exist or may have been
            deleted.
          </p>
          <router-link to="/clients" class="btn btn-primary">
            Back to Clients
          </router-link>
        </div>
      </div>
    </div>

    <!-- Client Details -->
    <template v-else>
      <div class="border-b border-gray-200 pb-4">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ client.name }}</h1>
            <p class="text-gray-600 mt-1">Client details and information</p>
          </div>
          <div class="flex space-x-3">
            <router-link
              :to="`/clients/${client.id}/edit`"
              class="btn btn-secondary"
            >
              ✏️ Edit Client
            </router-link>
            <button @click="showDeleteModal = true" class="btn btn-danger">
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Information -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Contact Information -->
          <div class="card">
            <div class="card-body">
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                Contact Information
              </h3>

              <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Farm/Business Name
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ client.name }}</dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Contact Person
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ client.contactName }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Phone Number
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    <a
                      :href="`tel:${client.phone}`"
                      class="text-blue-600 hover:text-blue-800"
                    >
                      {{ client.phone }}
                    </a>
                  </dd>
                </div>

                <div v-if="client.email">
                  <dt class="text-sm font-medium text-gray-500">
                    Email Address
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    <a
                      :href="`mailto:${client.email}`"
                      class="text-blue-600 hover:text-blue-800"
                    >
                      {{ client.email }}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Location Information -->
          <div class="card">
            <div class="card-body">
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                Location Information
              </h3>

              <dl class="grid grid-cols-1 gap-4">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Address</dt>
                  <dd class="mt-1 text-sm text-gray-900 whitespace-pre-line">
                    {{ client.address }}
                  </dd>
                </div>

                <div>
                  <dt class="text-sm font-medium text-gray-500">Region</dt>
                  <dd class="mt-1">
                    <span
                      class="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                    >
                      {{ client.region }}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Notes -->
          <div v-if="client.notes" class="card">
            <div class="card-body">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Notes</h3>
              <p class="text-sm text-gray-700 whitespace-pre-line">
                {{ client.notes }}
              </p>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <div class="card">
            <div class="card-body">
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>

              <div class="space-y-3">
                <router-link to="/pickups/new" class="btn btn-primary w-full">
                  📦 Schedule Pickup
                </router-link>

                <router-link
                  :to="`/clients/${client.id}/edit`"
                  class="btn btn-secondary w-full"
                >
                  ✏️ Edit Details
                </router-link>

                <a
                  :href="`tel:${client.phone}`"
                  class="btn btn-secondary w-full"
                >
                  📞 Call Client
                </a>

                <a
                  v-if="client.email"
                  :href="`mailto:${client.email}`"
                  class="btn btn-secondary w-full"
                >
                  ✉️ Send Email
                </a>
              </div>
            </div>
          </div>

          <!-- Client Statistics -->
          <div class="card">
            <div class="card-body">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Statistics</h3>

              <dl class="space-y-3">
                <div class="flex justify-between">
                  <dt class="text-sm text-gray-500">Total Pickups</dt>
                  <dd class="text-sm font-medium text-gray-900">0</dd>
                </div>

                <div class="flex justify-between">
                  <dt class="text-sm text-gray-500">Last Pickup</dt>
                  <dd class="text-sm font-medium text-gray-900">Never</dd>
                </div>

                <div class="flex justify-between">
                  <dt class="text-sm text-gray-500">Client Since</dt>
                  <dd class="text-sm font-medium text-gray-900">
                    {{ formatDate(client.createdAt) }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Pickups -->
      <div class="card">
        <div class="card-body">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Recent Pickups</h3>
            <router-link to="/pickups/new" class="btn btn-primary btn-sm">
              Schedule New Pickup
            </router-link>
          </div>

          <div class="text-center py-8 text-gray-500">
            <div class="text-4xl mb-2">📦</div>
            <p class="text-sm">No pickups scheduled yet</p>
          </div>
        </div>
      </div>
    </template>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      @click="showDeleteModal = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" @click.stop>
        <div class="flex items-center mb-4">
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
          >
            <svg
              class="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>
        <div class="text-center">
          <h3 class="text-lg font-medium text-gray-900 mb-2">Delete Client</h3>
          <p class="text-sm text-gray-500 mb-6">
            Are you sure you want to delete <strong>{{ client?.name }}</strong
            >? This action cannot be undone and will also delete all associated
            pickups.
          </p>
          <div class="flex space-x-4">
            <button
              @click="showDeleteModal = false"
              class="btn btn-secondary flex-1"
              :disabled="isDeleting"
            >
              Cancel
            </button>
            <button
              @click="handleDelete"
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
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClientsStore, type Client } from '../stores/clients'

const route = useRoute()
const router = useRouter()
const clientsStore = useClientsStore()

const client = ref<Client | null>(null)
const isLoading = ref(true)
const showDeleteModal = ref(false)
const isDeleting = ref(false)

const clientId = computed(() => route.params.id as string)

onMounted(async () => {
  await loadClient()
})

async function loadClient() {
  if (!clientId.value) return

  isLoading.value = true
  try {
    client.value = await clientsStore.getClientById(clientId.value)
  } catch (error) {
    console.error('Error loading client:', error)
  } finally {
    isLoading.value = false
  }
}

async function handleDelete() {
  if (!client.value?.id) return

  isDeleting.value = true
  try {
    await clientsStore.deleteClient(client.value.id)
    router.push('/clients')
  } catch (error) {
    console.error('Error deleting client:', error)
    isDeleting.value = false
  }
}

function formatDate(date?: Date): string {
  if (!date) return 'Unknown'

  return new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
</script>
