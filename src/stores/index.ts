import { createPinia } from 'pinia'

export const pinia = createPinia()
export { useAppStore } from './app'
export { useAuthStore } from './auth'
export { useClientsStore } from './clients'
export { useThemeStore } from './theme'
