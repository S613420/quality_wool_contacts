<template>
  <div class="relative" ref="dropdownRef">
    <!-- Toggle Button -->
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
      :title="`Current theme: ${themeStore.themeDisplayName}`"
    >
      <span class="text-lg">{{ themeStore.themeIcon }}</span>
      <span class="hidden sm:inline">{{ themeStore.themeDisplayName }}</span>
      <svg
        class="h-4 w-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-gray-700 z-50"
      >
        <div class="py-1">
          <button
            v-for="option in themeOptions"
            :key="option.value"
            @click="selectTheme(option.value)"
            class="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-150"
            :class="{
              'bg-gray-50 dark:bg-gray-700 font-medium':
                themeStore.theme === option.value,
            }"
          >
            <span class="text-lg mr-3">{{ option.icon }}</span>
            <div class="flex-1">
              <div class="font-medium">{{ option.label }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                {{ option.description }}
              </div>
            </div>
            <svg
              v-if="themeStore.theme === option.value"
              class="h-4 w-4 text-primary-600 dark:text-primary-400 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '../stores/theme'
import type { Theme } from '../stores/theme'

const themeStore = useThemeStore()
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement>()

const themeOptions = [
  {
    value: 'light' as Theme,
    label: 'Light',
    description: 'Light mode',
    icon: '☀️',
  },
  {
    value: 'dark' as Theme,
    label: 'Dark',
    description: 'Dark mode',
    icon: '🌙',
  },
  {
    value: 'system' as Theme,
    label: 'System',
    description: 'Follow system preference',
    icon: '💻',
  },
]

function selectTheme(theme: Theme) {
  themeStore.setTheme(theme)
  isOpen.value = false
}

// Close dropdown when clicking outside
function handleClickOutside(event: Event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

// Close dropdown on escape key
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>
