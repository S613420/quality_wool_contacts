<template>
  <div class="space-y-6">
    <div class="border-b border-gray-200 pb-4">
      <h1 class="text-2xl font-bold text-gray-900">{{ isEdit ? 'Edit Pickup' : 'New Pickup' }}</h1>
      <p class="text-gray-600 mt-1">{{ isEdit ? 'Update pickup details' : 'Record a new wool pickup' }}</p>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="text-center py-12 text-gray-500">
          <div class="text-6xl mb-4">📦</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Pickup Form</h3>
          <p class="text-gray-600 mb-4">Mode: {{ mode || 'create' }}</p>
          <p class="text-gray-600">This form will allow drivers to log pickup details including:</p>
          <ul class="text-left mt-4 text-gray-600 max-w-md mx-auto">
            <li>• Client selection</li>
            <li>• Pickup date and time</li>
            <li>• Wool grade and quantity</li>
            <li>• Photos and notes</li>
            <li>• GPS location</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  mode?: 'create' | 'edit'
}>()

const isEdit = computed(() => props.mode === 'edit')
</script>