import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAppStore } from './app'

export interface Client {
  id?: string
  name: string
  contactName: string
  phone: string
  email?: string
  address: string
  region: string
  notes?: string
  createdAt?: Date
  updatedAt?: Date
}

// Development mode fallback
const isDevelopmentMode = import.meta.env.VITE_FIREBASE_PROJECT_ID === 'your-project-id'
let mockClients: Client[] = []
let mockIdCounter = 1

export const useClientsStore = defineStore('clients', () => {
  const appStore = useAppStore()
  const clients = ref<Client[]>([])
  const isLoading = ref(false)
  const searchQuery = ref('')
  const selectedRegion = ref('')

  const clientsCollection = collection(db, 'clients')

  // Computed properties
  const filteredClients = computed(() => {
    let filtered = clients.value

    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        client =>
          client.name.toLowerCase().includes(query) ||
          client.contactName.toLowerCase().includes(query) ||
          client.phone.includes(query) ||
          client.email?.toLowerCase().includes(query) ||
          client.address.toLowerCase().includes(query)
      )
    }

    if (selectedRegion.value) {
      filtered = filtered.filter(
        client => client.region === selectedRegion.value
      )
    }

    return filtered
  })

  const regions = computed(() => {
    const uniqueRegions = new Set(clients.value.map(client => client.region))
    return Array.from(uniqueRegions).sort()
  })

  const totalClients = computed(() => clients.value.length)

  // Development mode functions
  function createMockClient(clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Client {
    const now = new Date()
    return {
      id: `mock-${mockIdCounter++}`,
      ...clientData,
      createdAt: now,
      updatedAt: now,
    }
  }

  function saveMockData() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('wool-tracker-mock-clients', JSON.stringify(mockClients))
    }
  }

  function loadMockData() {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('wool-tracker-mock-clients')
      if (saved) {
        mockClients = JSON.parse(saved)
        clients.value = [...mockClients]
      }
    }
  }

  // Actions
  async function fetchClients() {
    try {
      isLoading.value = true
      appStore.setSyncStatus('syncing')

      if (isDevelopmentMode) {
        // Development mode - use mock data
        console.log('Development mode: Using mock data for clients')
        loadMockData()
        appStore.setSyncStatus('synced')
        appStore.addToast({
          type: 'warning',
          title: 'Development Mode',
          message: 'Using local storage for client data. Configure Firebase for production.',
          duration: 5000
        })
        return
      }

      const q = query(clientsCollection, orderBy('name'))
      const querySnapshot = await getDocs(q)

      clients.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Client[]

      appStore.setSyncStatus('synced')
    } catch (error) {
      console.error('Error fetching clients:', error)
      appStore.setSyncStatus('error')
      
      if (isDevelopmentMode) {
        // Fallback to mock data even if Firebase fails
        console.log('Firebase failed, falling back to mock data')
        loadMockData()
        appStore.addToast({
          type: 'warning',
          title: 'Using offline mode',
          message: 'Firebase unavailable. Using local storage.',
        })
      } else {
        appStore.addToast({
          type: 'error',
          title: 'Failed to load clients',
          message: 'Please check your connection and try again.',
        })
      }
    } finally {
      isLoading.value = false
    }
  }

  async function addClient(
    clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>
  ) {
    try {
      appStore.setSyncStatus('syncing')

      if (isDevelopmentMode) {
        // Development mode - use mock data
        const newClient = createMockClient(clientData)
        mockClients.push(newClient)
        clients.value.push(newClient)
        clients.value.sort((a, b) => a.name.localeCompare(b.name))
        saveMockData()

        appStore.setSyncStatus('synced')
        appStore.addToast({
          type: 'success',
          title: 'Client added (offline)',
          message: `${clientData.name} has been added to local storage.`,
        })

        return newClient
      }

      const now = Timestamp.now()
      const docRef = await addDoc(clientsCollection, {
        ...clientData,
        createdAt: now,
        updatedAt: now,
      })

      const newClient: Client = {
        id: docRef.id,
        ...clientData,
        createdAt: now.toDate(),
        updatedAt: now.toDate(),
      }

      clients.value.push(newClient)
      clients.value.sort((a, b) => a.name.localeCompare(b.name))

      appStore.setSyncStatus('synced')
      appStore.addToast({
        type: 'success',
        title: 'Client added',
        message: `${clientData.name} has been added successfully.`,
      })

      return newClient
    } catch (error) {
      console.error('Error adding client:', error)
      appStore.setSyncStatus('error')
      
      if (isDevelopmentMode) {
        // Fallback to mock data
        const newClient = createMockClient(clientData)
        mockClients.push(newClient)
        clients.value.push(newClient)
        clients.value.sort((a, b) => a.name.localeCompare(b.name))
        saveMockData()

        appStore.addToast({
          type: 'warning',
          title: 'Client added offline',
          message: `${clientData.name} saved locally. Configure Firebase to sync.`,
        })

        return newClient
      }

      appStore.addToast({
        type: 'error',
        title: 'Failed to add client',
        message: 'Please check your connection and try again.',
      })
      throw error
    }
  }

  async function updateClient(id: string, clientData: Partial<Client>) {
    try {
      appStore.setSyncStatus('syncing')

      if (isDevelopmentMode) {
        // Development mode
        const index = mockClients.findIndex(client => client.id === id)
        if (index !== -1) {
          mockClients[index] = {
            ...mockClients[index],
            ...clientData,
            updatedAt: new Date(),
          }
          const clientIndex = clients.value.findIndex(client => client.id === id)
          if (clientIndex !== -1) {
            clients.value[clientIndex] = mockClients[index]
            clients.value.sort((a, b) => a.name.localeCompare(b.name))
          }
          saveMockData()
        }

        appStore.setSyncStatus('synced')
        appStore.addToast({
          type: 'success',
          title: 'Client updated (offline)',
          message: 'Client information has been updated locally.',
        })
        return
      }

      const clientRef = doc(db, 'clients', id)
      const updateData = {
        ...clientData,
        updatedAt: Timestamp.now(),
      }

      await updateDoc(clientRef, updateData)

      const index = clients.value.findIndex(client => client.id === id)
      if (index !== -1) {
        clients.value[index] = {
          ...clients.value[index],
          ...clientData,
          updatedAt: updateData.updatedAt.toDate(),
        }
        clients.value.sort((a, b) => a.name.localeCompare(b.name))
      }

      appStore.setSyncStatus('synced')
      appStore.addToast({
        type: 'success',
        title: 'Client updated',
        message: 'Client information has been updated successfully.',
      })
    } catch (error) {
      console.error('Error updating client:', error)
      appStore.setSyncStatus('error')
      appStore.addToast({
        type: 'error',
        title: 'Failed to update client',
        message: 'Please check your connection and try again.',
      })
      throw error
    }
  }

  async function deleteClient(id: string) {
    try {
      appStore.setSyncStatus('syncing')

      if (isDevelopmentMode) {
        // Development mode
        const index = mockClients.findIndex(client => client.id === id)
        if (index !== -1) {
          const clientName = mockClients[index].name
          mockClients.splice(index, 1)
          const clientIndex = clients.value.findIndex(client => client.id === id)
          if (clientIndex !== -1) {
            clients.value.splice(clientIndex, 1)
          }
          saveMockData()

          appStore.addToast({
            type: 'success',
            title: 'Client deleted (offline)',
            message: `${clientName} has been deleted locally.`,
          })
        }

        appStore.setSyncStatus('synced')
        return
      }

      const clientRef = doc(db, 'clients', id)
      await deleteDoc(clientRef)

      const index = clients.value.findIndex(client => client.id === id)
      if (index !== -1) {
        const clientName = clients.value[index].name
        clients.value.splice(index, 1)

        appStore.addToast({
          type: 'success',
          title: 'Client deleted',
          message: `${clientName} has been deleted.`,
        })
      }

      appStore.setSyncStatus('synced')
    } catch (error) {
      console.error('Error deleting client:', error)
      appStore.setSyncStatus('error')
      appStore.addToast({
        type: 'error',
        title: 'Failed to delete client',
        message: 'Please check your connection and try again.',
      })
      throw error
    }
  }

  async function getClientById(id: string): Promise<Client | null> {
    try {
      if (isDevelopmentMode) {
        const client = mockClients.find(client => client.id === id)
        return client || null
      }

      const clientRef = doc(db, 'clients', id)
      const clientSnap = await getDoc(clientRef)

      if (clientSnap.exists()) {
        return {
          id: clientSnap.id,
          ...clientSnap.data(),
          createdAt: clientSnap.data().createdAt?.toDate(),
          updatedAt: clientSnap.data().updatedAt?.toDate(),
        } as Client
      }

      return null
    } catch (error) {
      console.error('Error getting client by ID:', error)
      appStore.addToast({
        type: 'error',
        title: 'Failed to load client',
        message: 'Please check your connection and try again.',
      })
      return null
    }
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function setSelectedRegion(region: string) {
    selectedRegion.value = region
  }

  function clearFilters() {
    searchQuery.value = ''
    selectedRegion.value = ''
  }

  // Initialize real-time listener
  function startRealtimeListener() {
    if (isDevelopmentMode) {
      console.log('Development mode: Skipping real-time listener')
      return () => {} // Return empty unsubscribe function
    }

    const q = query(clientsCollection, orderBy('name'))

    return onSnapshot(
      q,
      snapshot => {
        clients.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        })) as Client[]

        if (!isLoading.value) {
          appStore.setSyncStatus('synced')
        }
      },
      error => {
        console.error('Error in real-time listener:', error)
        appStore.setSyncStatus('error')
      }
    )
  }

  return {
    // State
    clients,
    isLoading,
    searchQuery,
    selectedRegion,

    // Computed
    filteredClients,
    regions,
    totalClients,

    // Actions
    fetchClients,
    addClient,
    updateClient,
    deleteClient,
    getClientById,
    setSearchQuery,
    setSelectedRegion,
    clearFilters,
    startRealtimeListener,
  }
})
