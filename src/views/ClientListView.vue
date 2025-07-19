<template>
  <div class="space-y-6">
    <div
      class="flex justify-between items-center border-b border-gray-200 pb-4"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Clients</h1>
        <p class="text-gray-600 mt-1">Manage farm contacts and locations</p>
      </div>
      <button class="btn btn-primary">➕ Add Client</button>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search clients..."
              class="input"
            />
          </div>
          <select v-model="selectedRegion" class="input sm:w-auto">
            <option value="">All Regions</option>
            <option value="Mallee">Mallee</option>
            <option value="Riverland">Riverland</option>
            <option value="Mid North">Mid North</option>
          </select>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="text-center py-12 text-gray-500">
          <div class="text-6xl mb-4">🏪</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No clients found
          </h3>
          <p class="text-gray-600 mb-4">
            Get started by adding your first client contact
          </p>
          <button class="btn btn-primary">Add Your First Client</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const searchQuery = ref('')
const selectedRegion = ref('')
</script>
