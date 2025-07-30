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

  // Actions
  async function fetchClients() {
    try {
      isLoading.value = true
      appStore.setSyncStatus('syncing')

      // Check if Firebase is properly configured
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      }
      
      if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your-api-key' || 
          !firebaseConfig.projectId || firebaseConfig.projectId === 'your-project-id') {
        console.warn('Firebase not properly configured. Using mock data.')
        
        // Set mock data for development/demo purposes
        clients.value = [
          {
            id: 'demo-1',
            name: 'Sunrise Farm',
            contactName: 'John Smith',
            phone: '+61 123 456 789',
            email: 'john@sunrisefarm.com.au',
            address: '123 Farm Road, Woolville NSW 2000',
            region: 'New South Wales',
            notes: 'Preferred pickup time: Morning',
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-15'),
          },
          {
            id: 'demo-2',
            name: 'Green Valley Ranch',
            contactName: 'Sarah Johnson',
            phone: '+61 987 654 321',
            email: 'sarah@greenvalley.com.au',
            address: '456 Valley Road, Farmington VIC 3000',
            region: 'Victoria',
            notes: 'Large property, call ahead',
            createdAt: new Date('2024-01-10'),
            updatedAt: new Date('2024-01-20'),
          },
          {
            id: 'demo-3',
            name: 'Highland Wool Co.',
            contactName: 'Mike Wilson',
            phone: '+61 555 123 456',
            address: '789 Highland Drive, Wooltown QLD 4000',
            region: 'Queensland',
            notes: 'Premium quality wool',
            createdAt: new Date('2024-01-05'),
            updatedAt: new Date('2024-01-18'),
          },
        ]
        
        appStore.setSyncStatus('offline')
        appStore.addToast({
          type: 'warning',
          title: 'Demo Mode',
          message: 'Firebase not configured. Showing demo data.',
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
      
      // Check if it's a Firebase configuration error
      if (error instanceof Error && (
        error.message.includes('api-key') || 
        error.message.includes('project') ||
        error.message.includes('auth') ||
        error.message.includes('invalid-api-key')
      )) {
        appStore.addToast({
          type: 'error',
          title: 'Firebase Configuration Error',
          message: 'Please check your Firebase settings and try again.',
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
    // Check if Firebase is properly configured
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    }
    
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your-api-key' || 
        !firebaseConfig.projectId || firebaseConfig.projectId === 'your-project-id') {
      console.warn('Firebase not properly configured. Skipping real-time listener.')
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
        appStore.addToast({
          type: 'error',
          title: 'Connection Error',
          message: 'Lost connection to server. Some features may not work.',
        })
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
