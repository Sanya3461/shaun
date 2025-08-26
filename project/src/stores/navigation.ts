import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavigationStore = defineStore('navigation', () => {
  // State
  const currentRoute = ref('profile')
  const previousRoute = ref('')
  const navigationHistory = ref<string[]>([])

  // Actions
  function navigateTo(route: string) {
    previousRoute.value = currentRoute.value
    currentRoute.value = route
    navigationHistory.value.push(route)
    
    // Keep only last 10 navigation entries
    if (navigationHistory.value.length > 10) {
      navigationHistory.value = navigationHistory.value.slice(-10)
    }
    
    saveToStorage()
  }

  function goBack() {
    if (navigationHistory.value.length > 1) {
      navigationHistory.value.pop() // Remove current
      const previous = navigationHistory.value[navigationHistory.value.length - 1]
      currentRoute.value = previous
      saveToStorage()
    }
  }

  function saveToStorage() {
    localStorage.setItem('sailing-app-navigation', JSON.stringify({
      currentRoute: currentRoute.value,
      previousRoute: previousRoute.value,
      navigationHistory: navigationHistory.value
    }))
  }

  function loadFromStorage() {
    const stored = localStorage.getItem('sailing-app-navigation')
    if (stored) {
      const data = JSON.parse(stored)
      currentRoute.value = data.currentRoute || 'profile'
      previousRoute.value = data.previousRoute || ''
      navigationHistory.value = data.navigationHistory || []
    }
  }

  return {
    currentRoute,
    previousRoute,
    navigationHistory,
    navigateTo,
    goBack,
    saveToStorage,
    loadFromStorage
  }
})