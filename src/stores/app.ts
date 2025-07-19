import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type SyncStatus = 'synced' | 'syncing' | 'offline' | 'error'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

export const useAppStore = defineStore('app', () => {
  const syncStatus = ref<SyncStatus>('synced')
  const isOnline = ref(navigator.onLine)
  const pendingWrites = ref(0)
  const toasts = ref<Toast[]>([])
  const isLoading = ref(false)
  const loadingMessage = ref('')

  const syncBadgeIcon = computed(() => {
    switch (syncStatus.value) {
      case 'synced':
        return '✓'
      case 'syncing':
        return '↻'
      case 'offline':
        return '⚠'
      case 'error':
        return '❌'
      default:
        return '?'
    }
  })

  const syncBadgeColor = computed(() => {
    switch (syncStatus.value) {
      case 'synced':
        return 'text-green-600'
      case 'syncing':
        return 'text-blue-600 animate-spin'
      case 'offline':
        return 'text-yellow-600'
      case 'error':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  })

  function setSyncStatus(status: SyncStatus) {
    syncStatus.value = status
  }
  function updateOnlineStatus(online: boolean) {
    isOnline.value = online
  }
  function updatePendingWrites(count: number) {
    pendingWrites.value = count
  }

  function addToast(toast: Omit<Toast, 'id'>) {
    const id = Date.now().toString()
    const newToast: Toast = { ...toast, id, duration: toast.duration || 5000 }
    toasts.value.push(newToast)
    if (newToast.duration > 0) {
      setTimeout(() => removeToast(id), newToast.duration)
    }
  }

  function removeToast(id: string) {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) toasts.value.splice(index, 1)
  }

  function setLoading(loading: boolean, message = '') {
    isLoading.value = loading
    loadingMessage.value = message
  }

  function initializeOnlineListeners() {
    window.addEventListener('online', () => updateOnlineStatus(true))
    window.addEventListener('offline', () => updateOnlineStatus(false))
  }

  return {
    syncStatus,
    isOnline,
    pendingWrites,
    toasts,
    isLoading,
    loadingMessage,
    syncBadgeIcon,
    syncBadgeColor,
    setSyncStatus,
    updateOnlineStatus,
    updatePendingWrites,
    addToast,
    removeToast,
    setLoading,
    initializeOnlineListeners,
  }
})
