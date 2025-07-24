<template>
  <div class="space-y-6">
    <div class="border-b border-gray-200 pb-4">
      <h1 class="text-2xl font-bold text-gray-900">
        {{ isEditMode ? 'Edit Client' : 'Add New Client' }}
      </h1>
      <p class="text-gray-600 mt-1">
        {{
          isEditMode
            ? 'Update client information'
            : 'Enter client details below'
        }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="card">
        <div class="card-body">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Basic Information
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Farm/Business Name <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="input"
                :class="{ 'border-red-500': errors.name }"
                placeholder="Enter farm or business name"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">
                {{ errors.name }}
              </p>
            </div>

            <div>
              <label
                for="contactName"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Contact Person <span class="text-red-500">*</span>
              </label>
              <input
                id="contactName"
                v-model="form.contactName"
                type="text"
                required
                class="input"
                :class="{ 'border-red-500': errors.contactName }"
                placeholder="Enter contact person name"
              />
              <p v-if="errors.contactName" class="mt-1 text-sm text-red-600">
                {{ errors.contactName }}
              </p>
            </div>

            <div>
              <label
                for="phone"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number <span class="text-red-500">*</span>
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                class="input"
                :class="{ 'border-red-500': errors.phone }"
                placeholder="Enter phone number"
              />
              <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
                {{ errors.phone }}
              </p>
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="input"
                :class="{ 'border-red-500': errors.email }"
                placeholder="Enter email address (optional)"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Location Information
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label
                for="address"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Address <span class="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                v-model="form.address"
                required
                rows="3"
                class="input"
                :class="{ 'border-red-500': errors.address }"
                placeholder="Enter full address including street, suburb, postcode"
              ></textarea>
              <p v-if="errors.address" class="mt-1 text-sm text-red-600">
                {{ errors.address }}
              </p>
            </div>

            <div>
              <label
                for="region"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Region <span class="text-red-500">*</span>
              </label>
              <select
                id="region"
                v-model="form.region"
                required
                class="input"
                :class="{ 'border-red-500': errors.region }"
              >
                <option value="">Select a region</option>
                <option value="Mallee">Mallee</option>
                <option value="Riverland">Riverland</option>
                <option value="Mid North">Mid North</option>
                <option value="Fleurieu Peninsula">Fleurieu Peninsula</option>
                <option value="Adelaide Hills">Adelaide Hills</option>
                <option value="Barossa Valley">Barossa Valley</option>
                <option value="Murray Lands">Murray Lands</option>
                <option value="Limestone Coast">Limestone Coast</option>
                <option value="Eyre Peninsula">Eyre Peninsula</option>
                <option value="Yorke Peninsula">Yorke Peninsula</option>
              </select>
              <p v-if="errors.region" class="mt-1 text-sm text-red-600">
                {{ errors.region }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            Additional Information
          </h3>

          <div>
            <label
              for="notes"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Notes
            </label>
            <textarea
              id="notes"
              v-model="form.notes"
              rows="4"
              class="input"
              placeholder="Enter any additional notes about this client (optional)"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="handleCancel"
          class="btn btn-secondary"
          :disabled="isSubmitting"
        >
          Cancel
        </button>
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          <span v-if="isSubmitting" class="flex items-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isEditMode ? 'Updating...' : 'Adding...' }}
          </span>
          <span v-else>
            {{ isEditMode ? 'Update Client' : 'Add Client' }}
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useClientsStore } from '../stores/clients'

interface Props {
  clientId?: string
  mode?: 'create' | 'edit'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'create',
})

const router = useRouter()
const clientsStore = useClientsStore()

const isEditMode = computed(() => props.mode === 'edit' || !!props.clientId)
const isSubmitting = ref(false)

const form = reactive({
  name: '',
  contactName: '',
  phone: '',
  email: '',
  address: '',
  region: '',
  notes: '',
})

const errors = reactive({
  name: '',
  contactName: '',
  phone: '',
  email: '',
  address: '',
  region: '',
})

// Load client data if editing
onMounted(async () => {
  if (isEditMode.value && props.clientId) {
    const client = await clientsStore.getClientById(props.clientId)
    if (client) {
      Object.assign(form, {
        name: client.name,
        contactName: client.contactName,
        phone: client.phone,
        email: client.email || '',
        address: client.address,
        region: client.region,
        notes: client.notes || '',
      })
    }
  }
})

function validateForm(): boolean {
  // Clear previous errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  let isValid = true

  // Required field validation
  if (!form.name.trim()) {
    errors.name = 'Farm/Business name is required'
    isValid = false
  }

  if (!form.contactName.trim()) {
    errors.contactName = 'Contact person name is required'
    isValid = false
  }

  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required'
    isValid = false
  } else {
    // Basic phone validation
    const phoneRegex = /^[\d\s\-+()]{8,}$/
    if (!phoneRegex.test(form.phone)) {
      errors.phone = 'Please enter a valid phone number'
      isValid = false
    }
  }

  if (!form.address.trim()) {
    errors.address = 'Address is required'
    isValid = false
  }

  if (!form.region) {
    errors.region = 'Please select a region'
    isValid = false
  }

  // Email validation (if provided)
  if (form.email && form.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }
  }

  return isValid
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    const clientData = {
      name: form.name.trim(),
      contactName: form.contactName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      address: form.address.trim(),
      region: form.region,
      notes: form.notes.trim() || undefined,
    }

    if (isEditMode.value && props.clientId) {
      await clientsStore.updateClient(props.clientId, clientData)
    } else {
      await clientsStore.addClient(clientData)
    }

    router.push('/clients')
  } catch (error) {
    console.error('Error saving client:', error)
    
    // The error is already handled by the store with a toast notification
    // but we can add additional debugging here
    if (error?.code === 'permission-denied') {
      console.error('Permission denied - check Firestore rules and authentication')
    } else if (error?.code === 'unavailable') {
      console.error('Firestore service unavailable - check network connection')
    } else if (error?.code === 'unauthenticated') {
      console.error('User not authenticated - check authentication setup')
    }
  } finally {
    isSubmitting.value = false
  }
}

function handleCancel() {
  router.push('/clients')
}
</script>
