<template>
  <div class="space-y-6">
    <div class="border-b border-gray-200 pb-4">
      <h1 class="text-2xl font-bold text-gray-900">Client Details</h1>
      <p class="text-gray-600 mt-1">View and edit client information</p>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="text-center py-12 text-gray-500">
          <div class="text-6xl mb-4">🏪</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Client Detail View</h3>
          <p class="text-gray-600 mb-4">Client ID: {{ $route.params.id }}</p>
          <p class="text-gray-600">This view will show detailed client information and pickup history.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Client detail view placeholder
</script>