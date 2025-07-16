# 🐑 Wool Pickup Tracker - Technical Specification

## Overview
A Progressive Web App (PWA) for wool farm drivers to track pickups with offline capabilities.

## Core Features

### 1. Driver Dashboard
- Today's pickup summary
- Sync status indicator
- Quick actions (New Pickup, Browse Clients)
- Statistics cards

### 2. Client Management
- Client contact database
- Farm location details
- Regional filtering
- Search functionality

### 3. Pickup Tracking
- Create new pickup records
- Photo capture
- GPS coordinates
- Wool grade/quantity logging
- Timestamp tracking

### 4. Offline Support
- Local data persistence
- Sync when online
- Conflict resolution
- Pending changes indicator

### 5. Settings & Sync
- Sync preferences
- Data export
- Cache management
- App information

## Technical Stack

### Frontend
- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vite** build tool
- **Tailwind CSS** for styling
- **Vue Router** for navigation
- **Pinia** for state management

### Backend
- **Firebase Firestore** for database
- **Firebase Storage** for photos
- **Firebase Auth** for authentication
- **Firebase Hosting** for deployment

### Testing
- **Vitest** for unit testing
- **ESLint** for code quality
- **Prettier** for formatting

## Data Models

### Client
```typescript
interface Client {
  id: string
  name: string
  contactName: string
  phone: string
  email?: string
  address: string
  region: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}
```

### Pickup
```typescript
interface Pickup {
  id: string
  clientId: string
  driverId: string
  timestamp: Date
  location: {
    lat: number
    lng: number
    address?: string
  }
  wool: {
    grade: string
    quantity: number
    unit: 'kg' | 'bales'
  }
  photos: string[]
  notes?: string
  status: 'pending' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}
```

## Security Rules

- Authenticated users can read all data
- Drivers can create pickups assigned to them
- Admins can modify client data
- Users can only edit their own data

## Deployment

1. **Development**: Local Vite dev server
2. **Testing**: Firebase Emulators
3. **Production**: Firebase Hosting with CDN

## Performance Requirements

- Initial load: < 3 seconds
- Offline functionality: Full CRUD operations
- Sync time: < 10 seconds for typical data
- Mobile responsive: 320px minimum width