<template>
  <ClientForm :client-id="clientId" :mode="mode" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ClientForm from '../components/ClientForm.vue'

const route = useRoute()

const clientId = computed(() => route.params.id as string)
const mode = computed(() => {
  if (route.name === 'ClientEdit') return 'edit'
  return 'create'
})
</script>
