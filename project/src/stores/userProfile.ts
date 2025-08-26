import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserData, SailingResult, SailingSession, CrewMember } from '../types'

export const useUserProfileStore = defineStore('userProfile', () => {
  // State
  const currentUserProfile = ref<UserData | null>(null)
  const userSailingResults = ref<SailingResult[]>([])
  const userSailingSessions = ref<SailingSession[]>([])
  const userCrewMembers = ref<CrewMember[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  async function fetchUserProfile(userId: string) {
    isLoading.value = true
    error.value = null
    
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/users/${userId}`)
      // const userData = await response.json()
      
      // Mock data for now - replace with API call
      const mockUserData: UserData = {
        id: userId,
        name: getUserNameFromId(userId),
        email: `${userId.replace('-', '.')}@example.com`,
        profileImage: getProfileImageFromId(userId),
        location: getLocationFromId(userId),
        bio: getBioFromId(userId),
        following: 156,
        followers: 89,
        totalDistance: 287,
        totalTime: 45
      }
      
      currentUserProfile.value = mockUserData
      await fetchUserSailingData(userId)
      
    } catch (err) {
      error.value = 'Failed to fetch user profile'
      console.error('Error fetching user profile:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchUserSailingData(userId: string) {
    try {
      // TODO: Replace with actual API calls
      // const [resultsResponse, sessionsResponse, crewResponse] = await Promise.all([
      //   fetch(`/api/users/${userId}/sailing-results`),
      //   fetch(`/api/users/${userId}/sailing-sessions`),
      //   fetch(`/api/users/${userId}/crew-members`)
      // ])
      
      // Mock data - replace with API calls
      userSailingResults.value = [
        {
          id: '1',
          place: "2nd Place",
          date: "July 20, 2024",
          event: "San Francisco Bay Championship",
          boatClass: "⛵J24 Class",
          boats: "⚓ 18 boats",
          races: "🏁 5/5 races",
          icon: "/src/assets/medal-icon.svg"
        },
        {
          id: '2',
          place: "1st Place",
          date: "June 15, 2024",
          event: "Golden Gate Regatta",
          boatClass: "⛵J24 Class",
          boats: "⚓ 22 boats",
          races: "🏁 3/3 races",
          icon: "/src/assets/medal-icon.svg"
        }
      ]

      userSailingSessions.value = [
        {
          id: '1',
          title: "Morning Practice Session",
          time: "1h 15m",
          distance: "18nm",
          avgSpeed: "14kts",
          maxSpeed: "22kts",
          date: "2024-07-25"
        },
        {
          id: '2',
          title: "Sunset Sail",
          time: "2h 05m",
          distance: "25nm",
          avgSpeed: "11kts",
          maxSpeed: "18kts",
          date: "2024-07-23"
        }
      ]

      userCrewMembers.value = [
        {
          id: '1',
          name: "Mike Chen",
          avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop",
          role: "Skipper"
        },
        {
          id: '2',
          name: "Lisa Rodriguez",
          avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop",
          role: "Tactician"
        }
      ]
      
    } catch (err) {
      console.error('Error fetching user sailing data:', err)
    }
  }

  function clearUserProfile() {
    currentUserProfile.value = null
    userSailingResults.value = []
    userSailingSessions.value = []
    userCrewMembers.value = []
    error.value = null
  }

  // Helper functions to generate mock data based on user ID
  function getUserNameFromId(userId: string): string {
    const nameMap: { [key: string]: string } = {
      '1': 'Botond Kristof PenzesSS',
      '2': 'Eszter Kósa',
      'botond-kristof': 'Botond Kristof PenzesSS',
      'imi-vasvary': 'Imi Vasváry',
      'eszter-kosa': 'Eszter Kósa',
      'sarah-johnson': 'Sarah Johnson'
    }
    return nameMap[userId] || userId.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  function getProfileImageFromId(userId: string): string {
    const imageMap: { [key: string]: string } = {
      '1': 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=72&h=72&fit=crop',
      '2': 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=72&h=72&fit=crop',
      'botond-kristof': 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=72&h=72&fit=crop',
      'imi-vasvary': 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=72&h=72&fit=crop',
      'eszter-kosa': 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=72&h=72&fit=crop',
      'sarah-johnson': 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=72&h=72&fit=crop'
    }
    return imageMap[userId] || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=72&h=72&fit=crop'
  }
  function getLocationFromId(userId: string): string {
    const locationMap: { [key: string]: string } = {
      '1': 'Lake Balaton, Hungary',
      '2': 'Lake Balaton, Hungary',
      'botond-kristof': 'Lake Balaton, Hungary',
      'imi-vasvary': 'Lake Balaton, Hungary',
      'eszter-kosa': 'Lake Balaton, Hungary',
      'sarah-johnson': 'San Francisco Bay, USA'
    }
    return locationMap[userId] || 'Unknown Location'
  }

  function getBioFromId(userId: string): string {
    const bioMap: { [key: string]: string } = {
      '1': 'Passionate racer with 10+ years experience.\nLove tactical sailing and teaching newcomers!',
      '2': 'Navigator and sailing enthusiast.\nLove exploring new waters and techniques.',
      'botond-kristof': 'Passionate racer with 10+ years experience.\nLove tactical sailing and teaching newcomers!',
      'imi-vasvary': 'Experienced trimmer and sailing instructor.\nSpecializing in competitive racing.',
      'eszter-kosa': 'Navigator and sailing enthusiast.\nLove exploring new waters and techniques.',
      'sarah-johnson': 'Competitive sailor with 8+ years experience.\nSpecializing in offshore racing and crew training.'
    }
    return bioMap[userId] || 'Sailing enthusiast and competitor.'
  }

  return {
    currentUserProfile,
    userSailingResults,
    userSailingSessions,
    userCrewMembers,
    isLoading,
    error,
    fetchUserProfile,
    fetchUserSailingData,
    clearUserProfile
  }
})