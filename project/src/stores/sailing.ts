import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SailingResult, SailingSession, CrewMember } from '../types'

export const useSailingStore = defineStore('sailing', () => {
  // State
  const sailingResults = ref<SailingResult[]>([
    {
      id: '1',
      place: "1st Place",
      date: "June 15, 2025",
      event: "Balaton Cup 2025 - Final Race",
      boatClass: "⛵J70 Class",
      boats: "⚓ 25 boats",
      races: "🏁 3/3 races",
      icon: "/src/assets/medal-icon.svg"
    },
    {
      id: '2',
      place: "2nd Place",
      date: "June 15, 2025",
      event: "Hungarian National Championship",
      boatClass: "⛵J70 Class",
      boats: "⚓ 25 boats",
      races: "🏁 6/8 races",
      icon: "/src/assets/medal-icon.svg"
    },
    {
      id: '3',
      place: "3rd Place",
      date: "June 15, 2025",
      event: "Balaton Cup 2025 - Final Race",
      boatClass: "⛵J70 Class",
      boats: "⚓ 25 boats",
      races: "🏁 4/5 races",
      icon: "/src/assets/medal-icon.svg"
    }
  ])

  const recentSessions = ref<SailingSession[]>([
    {
      id: '1',
      title: "Orange Skies and Fair Winds",
      time: "0h 37m",
      distance: "22nm",
      avgSpeed: "12kts",
      maxSpeed: "19kts",
      date: "2025-01-15"
    },
    {
      id: '2',
      title: "Afternoon Sail",
      time: "0h 37m",
      distance: "22nm",
      avgSpeed: "12kts",
      maxSpeed: "19kts",
      date: "2025-01-14"
    },
    {
      id: '3',
      title: "Golden Hour on the Water",
      time: "0h 37m",
      distance: "22nm",
      avgSpeed: "12kts",
      maxSpeed: "19kts",
      date: "2025-01-13"
    }
  ])

  const crewMembers = ref<CrewMember[]>([
    {
      id: '1',
      name: "Imi Vasváry",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop",
      role: "Trimmer"
    },
    {
      id: '2',
      name: "Eszter Kósa",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop",
      role: "Navigator"
    }
  ])

  // Actions
  function addSailingResult(result: Omit<SailingResult, 'id'>) {
    const newResult = {
      ...result,
      id: Date.now().toString()
    }
    sailingResults.value.unshift(newResult)
    saveToStorage()
  }

  function addSession(session: Omit<SailingSession, 'id'>) {
    const newSession = {
      ...session,
      id: Date.now().toString()
    }
    recentSessions.value.unshift(newSession)
    saveToStorage()
  }

  function addCrewMember(member: Omit<CrewMember, 'id'>) {
    const newMember = {
      ...member,
      id: Date.now().toString()
    }
    crewMembers.value.push(newMember)
    saveToStorage()
  }

  function removeCrewMember(memberId: string) {
    const index = crewMembers.value.findIndex(m => m.id === memberId)
    if (index > -1) {
      crewMembers.value.splice(index, 1)
      saveToStorage()
    }
  }

  function saveToStorage() {
    localStorage.setItem('sailing-app-data', JSON.stringify({
      sailingResults: sailingResults.value,
      recentSessions: recentSessions.value,
      crewMembers: crewMembers.value
    }))
  }

  function loadFromStorage() {
    const stored = localStorage.getItem('sailing-app-data')
    if (stored) {
      const data = JSON.parse(stored)
      sailingResults.value = data.sailingResults || sailingResults.value
      recentSessions.value = data.recentSessions || recentSessions.value
      crewMembers.value = data.crewMembers || crewMembers.value
    }
  }

  return {
    sailingResults,
    recentSessions,
    crewMembers,
    addSailingResult,
    addSession,
    addCrewMember,
    removeCrewMember,
    saveToStorage,
    loadFromStorage
  }
})