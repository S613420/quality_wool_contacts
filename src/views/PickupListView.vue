<template>
  <div class="space-y-6">
    <div
      class="flex justify-between items-center border-b border-gray-200 pb-4"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Pickups</h1>
        <p class="text-gray-600 mt-1">Track and manage wool pickups</p>
      </div>
      <router-link to="/pickups/new" class="btn btn-primary"
        >➕ New Pickup</router-link
      >
    </div>

    <div class="card">
      <div class="card-body">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search pickups..."
              class="input"
            />
          </div>
          <select v-model="statusFilter" class="input sm:w-auto">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="text-center py-12 text-gray-500">
          <div class="text-6xl mb-4">📦</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No pickups found
          </h3>
          <p class="text-gray-600 mb-4">
            Start by creating your first pickup record
          </p>
          <router-link to="/pickups/new" class="btn btn-primary"
            >Create First Pickup</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const searchQuery = ref('')
const statusFilter = ref('')
</script>
