import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  // Get initial theme from localStorage or default to 'system'
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'system'

    const stored = localStorage.getItem('wool-tracker-theme') as Theme
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored
    }
    return 'system'
  }

  const theme = ref<Theme>(getInitialTheme())

  // Detect system preference
  const systemPrefersDark = ref(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false
  )

  // Computed property for actual theme being used
  const activeTheme = computed(() => {
    if (theme.value === 'system') {
      return systemPrefersDark.value ? 'dark' : 'light'
    }
    return theme.value
  })

  const isDark = computed(() => activeTheme.value === 'dark')

  // Apply theme to document
  const applyTheme = () => {
    if (typeof window === 'undefined') return

    const root = document.documentElement
    if (isDark.value) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  // Set theme and persist to localStorage
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    localStorage.setItem('wool-tracker-theme', newTheme)
    applyTheme()
  }

  // Toggle between light and dark (skips system)
  const toggleTheme = () => {
    if (theme.value === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  // Get display name for current theme
  const themeDisplayName = computed(() => {
    switch (theme.value) {
      case 'light':
        return 'Light'
      case 'dark':
        return 'Dark'
      case 'system':
        return 'System'
      default:
        return 'System'
    }
  })

  // Get icon for current theme
  const themeIcon = computed(() => {
    switch (activeTheme.value) {
      case 'light':
        return '☀️'
      case 'dark':
        return '🌙'
      default:
        return '☀️'
    }
  })

  // Initialize theme system
  const initializeTheme = () => {
    if (typeof window === 'undefined') return

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      systemPrefersDark.value = e.matches
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    systemPrefersDark.value = mediaQuery.matches

    // Apply initial theme
    applyTheme()

    // Watch for theme changes and apply them
    watch(() => isDark.value, applyTheme, { immediate: false })
  }

  return {
    theme,
    activeTheme,
    isDark,
    systemPrefersDark,
    themeDisplayName,
    themeIcon,
    setTheme,
    toggleTheme,
    initializeTheme,
  }
})
