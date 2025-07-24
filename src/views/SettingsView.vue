<template>
  <div class="space-y-6">
    <div class="border-b border-gray-200 pb-4">
      <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
      <p class="text-gray-600 mt-1">Configure your application preferences</p>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="text-lg font-semibold text-gray-900">Sync Preferences</h2>
      </div>
      <div class="card-body space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-900">Auto-sync</p>
            <p class="text-sm text-gray-600">
              Automatically sync data when online
            </p>
          </div>
          <input type="checkbox" v-model="autoSync" class="toggle" />
        </div>
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-900">Offline Mode</p>
            <p class="text-sm text-gray-600">Allow offline data entry</p>
          </div>
          <input type="checkbox" v-model="offlineMode" class="toggle" />
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="text-lg font-semibold text-gray-900">App Information</h2>
      </div>
      <div class="card-body space-y-4">
        <!-- Basic Version Info -->
        <div class="flex justify-between">
          <span class="text-gray-600">Version</span>
          <span class="font-medium">{{ getBuildInfo() }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Build Number</span>
          <span class="font-medium">#{{ versionInfo.buildNumber }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Environment</span>
          <span class="font-medium capitalize">{{
            versionInfo.environment
          }}</span>
        </div>

        <!-- Enhanced Project ID Section -->
        <div class="flex justify-between">
          <span class="text-gray-600">Firebase Project</span>
          <span class="font-medium text-xs" :class="projectIdClass">{{
            displayProjectId
          }}</span>
        </div>

        <!-- Enhanced Commit Information -->
        <div class="border-t pt-4">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">
            Commit Information
          </h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600 text-sm">Commit Hash</span>
              <span class="font-medium font-mono text-xs">{{
                getShortCommitHash()
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 text-sm">Commit Message</span>
              <span
                class="font-medium text-xs max-w-48 text-right truncate"
                :title="versionInfo.commitMessage"
              >
                {{ versionInfo.commitMessage }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 text-sm">Commit Time</span>
              <span class="font-medium text-xs">{{ getCommitDateTime() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 text-sm">Time Since Commit</span>
              <span class="font-medium text-xs text-blue-600">{{
                getTimeSinceCommit()
              }}</span>
            </div>
          </div>
        </div>

        <!-- Enhanced Deployment Information -->
        <div class="border-t pt-4">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">
            Deployment Information
          </h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600 text-sm">Deploy Date</span>
              <span class="font-medium text-xs">{{ getDeploymentDate() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 text-sm">Deploy Time</span>
              <span class="font-medium text-xs">{{
                getDeploymentDateTime()
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 text-sm">Time Since Deploy</span>
              <span class="font-medium text-xs text-green-600">{{
                getTimeSinceDeployment()
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 text-sm">CI Start Time</span>
              <span class="font-medium text-xs">{{ getCIStartTime() }}</span>
            </div>
          </div>
        </div>

        <!-- Time Lapses Section -->
        <div class="border-t pt-4" v-if="hasTimeLapseData">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">
            Pipeline Timing
          </h3>
          <div class="space-y-2">
            <div
              class="flex justify-between"
              v-if="versionInfo.timeLapses.commitToCI !== null"
            >
              <span class="text-gray-600 text-sm">Commit → CI Pipeline</span>
              <span class="font-medium text-xs text-orange-600">{{
                formatTimeLapse(versionInfo.timeLapses.commitToCI)
              }}</span>
            </div>
            <div
              class="flex justify-between"
              v-if="versionInfo.timeLapses.ciToBuild !== null"
            >
              <span class="text-gray-600 text-sm">CI → Build Complete</span>
              <span class="font-medium text-xs text-purple-600">{{
                formatTimeLapse(versionInfo.timeLapses.ciToBuild)
              }}</span>
            </div>
            <div
              class="flex justify-between"
              v-if="versionInfo.timeLapses.totalDeployTime !== null"
            >
              <span class="text-gray-600 text-sm">Total Deploy Time</span>
              <span class="font-medium text-xs text-indigo-600 font-semibold">{{
                formatTimeLapse(versionInfo.timeLapses.totalDeployTime)
              }}</span>
            </div>
          </div>
        </div>

        <!-- Build Metrics Section -->
        <div class="border-t pt-4">
          <h3 class="text-sm font-semibold text-gray-700 mb-3">
            Build Environment
          </h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600 text-sm">Node Version</span>
              <span class="font-medium text-xs">{{
                versionInfo.buildMetrics.nodeVersion
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 text-sm">Platform</span>
              <span class="font-medium text-xs capitalize">{{
                versionInfo.buildMetrics.platform
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 text-sm">Architecture</span>
              <span class="font-medium text-xs">{{
                versionInfo.buildMetrics.arch
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 text-sm">Timezone</span>
              <span class="font-medium text-xs">{{
                versionInfo.buildMetrics.timezone
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h2 class="text-lg font-semibold text-gray-900">Actions</h2>
      </div>
      <div class="card-body space-y-4">
        <button @click="clearCache" class="btn btn-secondary w-full">
          Clear Local Cache
        </button>
        <button @click="exportData" class="btn btn-secondary w-full">
          Export Data
        </button>
        <button @click="forcSync" class="btn btn-primary w-full">
          Force Sync Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '../stores'
import {
  versionInfo,
  getBuildInfo,
  getShortCommitHash,
  getDeploymentDate,
  getDeploymentDateTime,
  getCommitDateTime,
  getCIStartTime,
  getTimeSinceCommit,
  getTimeSinceDeployment,
  formatTimeLapse,
} from '../version'

const appStore = useAppStore()
const autoSync = ref(true)
const offlineMode = ref(true)

// Enhanced project ID handling
const displayProjectId = computed(() => {
  const projectId = versionInfo.projectId
  if (projectId === 'your-project-id') {
    return 'Not configured'
  }
  return projectId
})

const projectIdClass = computed(() => {
  const projectId = versionInfo.projectId
  if (projectId === 'your-project-id') {
    return 'text-red-500 italic'
  }
  return 'text-gray-900'
})

// Check if we have time lapse data to display
const hasTimeLapseData = computed(() => {
  return (
    versionInfo.timeLapses.commitToCI !== null ||
    versionInfo.timeLapses.ciToBuild !== null ||
    versionInfo.timeLapses.totalDeployTime !== null
  )
})

function clearCache() {
  appStore.addToast({
    type: 'success',
    title: 'Cache cleared',
    message: 'Local cache has been cleared',
  })
}

function exportData() {
  appStore.addToast({
    type: 'info',
    title: 'Export started',
    message: 'Your data export will be ready shortly',
  })
}

function forcSync() {
  appStore.setSyncStatus('syncing')
  setTimeout(() => {
    appStore.setSyncStatus('synced')
    appStore.addToast({
      type: 'success',
      title: 'Sync complete',
      message: 'All data is now synchronized',
    })
  }, 2000)
}
</script>
