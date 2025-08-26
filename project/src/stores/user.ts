import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserData } from '../types'

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref<UserData[]>([
    {
      id: '1',
      name: "Botond Kristof PenzesSS",
      email: "botondpenzes@kwindoo.com",
      profileImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=72&h=72&fit=crop",
      location: "Lake Balaton, Hungary",
      bio: "Passionate racer with 10+ years experience.\nLove tactical sailing and teaching newcomers!",
      following: 243,
      followers: 122,
      totalDistance: 434,
      totalTime: 33
    },
    {
      id: '2',
      name: "Eszter Kósa",
      email: "eszter.kosa@kwindoo.com",
      profileImage: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=72&h=72&fit=crop",
      location: "Lake Balaton, Hungary",
      bio: "Navigator and sailing enthusiast.\nLove exploring new waters and techniques.",
      following: 189,
      followers: 156,
      totalDistance: 387,
      totalTime: 42
    }
  ])

  const currentUserId = ref('1')
  const user = computed(() => users.value.find(u => u.id === currentUserId.value) || users.value[0])

  const isAuthenticated = ref(false)
  const activeTab = ref('overview')

  // Getters
  const fullName = computed(() => user.value?.name || '')
  const profileStats = computed(() => ({
    following: user.value?.following || 0,
    followers: user.value?.followers || 0,
    totalDistance: user.value?.totalDistance || 0,
    totalTime: user.value?.totalTime || 0
  }))

  // Actions
  function switchUser(userId: string) {
    currentUserId.value = userId
    saveToStorage()
  }

  function updateProfile(userData: Partial<UserData>) {
    const currentUser = user.value
    if (currentUser) {
      const userIndex = users.value.findIndex(u => u.id === currentUser.id)
      if (userIndex !== -1) {
        users.value[userIndex] = { ...currentUser, ...userData }
      }
    }
    saveToStorage()
  }

  function setActiveTab(tab: string) {
    activeTab.value = tab
  }

  function login(userData: UserData) {
    const existingUserIndex = users.value.findIndex(u => u.id === userData.id)
    if (existingUserIndex !== -1) {
      users.value[existingUserIndex] = userData
    } else {
      users.value.push(userData)
    }
    currentUserId.value = userData.id
    isAuthenticated.value = true
    saveToStorage()
  }

  function logout() {
    isAuthenticated.value = false
    currentUserId.value = '1' // Reset to default user
    localStorage.removeItem('sailing-app-user')
  }

  function saveToStorage() {
    localStorage.setItem('sailing-app-user', JSON.stringify({
      users: users.value,
      currentUserId: currentUserId.value,
      isAuthenticated: isAuthenticated.value,
      activeTab: activeTab.value
    }))
  }

  function loadFromStorage() {
    const stored = localStorage.getItem('sailing-app-user')
    if (stored) {
      const data = JSON.parse(stored)
      if (data.users) {
        users.value = data.users
      }
      if (data.currentUserId) {
        currentUserId.value = data.currentUserId
      }
      isAuthenticated.value = data.isAuthenticated || false
      activeTab.value = data.activeTab || 'overview'
    }
  }

  return {
    users,
    currentUserId,
    user,
    isAuthenticated,
    activeTab,
    fullName,
    profileStats,
    switchUser,
    updateProfile,
    setActiveTab,
    login,
    logout,
    saveToStorage,
    loadFromStorage
  }
})