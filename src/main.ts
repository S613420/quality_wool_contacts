import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './stores'
import { useAuthStore } from './stores/auth'
import './style.css'
import './firebase'

const app = createApp(App)
app.use(pinia)
app.use(router)

// Initialize authentication
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')
