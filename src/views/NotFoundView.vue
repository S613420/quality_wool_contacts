<template>
  <div class="text-center py-16">
    <div class="text-6xl mb-6">🐑❓</div>
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
    <p class="text-gray-600 mb-8 max-w-md mx-auto">
      The page you're looking for doesn't exist. It might have been moved or
      deleted.
    </p>
    <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
      <router-link to="/" class="btn btn-primary"
        >Back to Dashboard</router-link
      >
      <router-link to="/clients" class="btn btn-secondary"
        >Browse Clients</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
// 404 Not Found page
</script>
