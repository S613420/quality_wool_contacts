import { createPinia } from 'pinia'

export const pinia = createPinia()
export { useAppStore } from './app'
export { useClientsStore } from './clients'
export { useAuthStore } from './auth'
