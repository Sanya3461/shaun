<template>
  <div class="crew-finder-container">
    <!-- Mobile Status Bar -->
    <StatusBar />
    
    <!-- Header with tabs -->
    <div class="crew-finder-header">
      <div class="header-tabs">
        <button 
          :class="['tab-button', { active: activeTab === 'discover' }]"
          @click="setActiveTab('discover')"
        >
          Looking for
        </button>
        <button 
          :class="['tab-button', { active: activeTab === 'following' }]"
          @click="setActiveTab('following')"
        >
          I'm open to
        </button>
      </div>
      <h1 class="header-title">Crew</h1>
    </div>

    <!-- Main Content -->
    <div class="crew-finder-content">
      <!-- Filter Bar -->
      <FilterBar 
        v-model:searchQuery="searchQuery"
        v-model:selectedFilters="selectedFilters"
      />
      
      <!-- Radius Segment -->
      <RadiusSegment v-model:selectedRadius="selectedRadius" />
      
      <!-- Contact Filter Section -->
      <div class="contact-filter-section">
        <h3 class="filter-section-title">Contact</h3>
        <div class="contact-filter-chips">
          <button
            v-for="contact in contactOptions"
            :key="contact"
            :class="['contact-filter-chip', { active: selectedFilters.contact.includes(contact) }]"
            @click="toggleContactFilter(contact)"
          >
            {{ contact }}
          </button>
        </div>
      </div>
      
      <!-- Toggle Row -->
      <ToggleRow v-model:isLookingForCrew="isLookingForCrew" />
      
      <!-- Add Experience Button -->
      <div class="add-experience-section">
        <button class="add-experience-button" @click="navigateToAddExperience">
          Add My Experience
        </button>
      </div>
      
      <!-- Start Search Button -->
      <div class="start-search-section">
        <button class="start-search-button" @click="startSearch">
          Start
        </button>
      </div>
      
      <!-- Content Area -->
      <div class="content-area">
        <!-- Search Results Header - Only visible after search -->
        <div v-if="hasSearched" class="search-results-header">
          <h3 class="results-title">Your search results:</h3>
        </div>
        
        <!-- Initial State - Before search -->
        <div v-if="!hasSearched" class="initial-state">
          <div class="initial-icon">🔍</div>
          <h3 class="initial-title">Ready to search</h3>
          <p class="initial-description">Set your filters and click START to find crew members</p>
        </div>
        
        <!-- Loading State -->
        <LoadingSkeleton v-else-if="isLoading" />
        
        <!-- Empty State -->
        <EmptyState v-else-if="filteredUsers.length === 0" @reset-filters="resetAllFilters" />
        
        <!-- User Cards -->
        <div v-else class="user-cards-list">
          <UserCard 
            v-for="user in filteredUsers" 
            :key="user.id"
            :user="user"
            @request-contact="handleRequestContact"
            @follow="handleFollow"
            @view-profile="handleViewProfile"
          />
          
          <!-- Load More Button -->
          <div v-if="hasMoreUsers" class="load-more-section">
            <button class="load-more-button" @click="loadMore">
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Request Modal -->
    <RequestModal 
      v-if="showRequestModal"
      :user="selectedUser"
      @close="closeRequestModal"
      @send="handleSendRequest"
    />

    <!-- Bottom Navigation -->
    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import StatusBar from '../../components/layout/StatusBar.vue'
import BottomNavigation from '../../components/navigation/BottomNavigation.vue'
import FilterBar from '../../components/crew/FilterBar.vue'
import RadiusSegment from '../../components/crew/RadiusSegment.vue'
import ToggleRow from '../../components/crew/ToggleRow.vue'
import UserCard from '../../components/crew/UserCard.vue'
import EmptyState from '../../components/crew/EmptyState.vue'
import RequestModal from '../../components/crew/RequestModal.vue'
import LoadingSkeleton from '../../components/crew/LoadingSkeleton.vue'

const router = useRouter()

// State
const activeTab = ref('discover')
const searchQuery = ref('')
const selectedFilters = ref({
  positions: [],
  contact: [],
  availability: []
})
const selectedRadius = ref('anywhere')
const isLookingForCrew = ref(true)
const isLoading = ref(false) // Start with false since we haven't searched yet
const showRequestModal = ref(false)
const selectedUser = ref(null)
const searchResults = ref([]) // Store actual search results
const hasSearched = ref(false) // Track if user has clicked Start
const displayedUsers = ref([]) // Users currently displayed (max 3 at a time)
const currentPage = ref(1) // Current page for pagination
const usersPerPage = 3 // Number of users to show per page

// Contact options for filter
const contactOptions = [
  'Email',
  'Phone',
  'WhatsApp',
  'Signal'
]

// Mock data
const mockUsers = ref([
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    distance: '5 km away',
    positions: ['Bowman', 'Trimmer'],
    availability: 'Available Anytime',
    contact: ['email', 'phone'],
    status: 'available',
    isFollowing: false
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    distance: '8 km away',
    positions: ['Tactician', 'Navigator'],
    availability: 'Weekdays only',
    contact: ['email', 'whatsapp'],
    status: 'available',
    isFollowing: false
  },
  {
    id: '3',
    name: 'Mike Chen',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    distance: '12 km away',
    positions: ['Grinder', 'Pit'],
    availability: 'Business hours',
    contact: ['phone', 'signal'],
    status: 'available',
    isFollowing: false
  },
  {
    id: '4',
    name: 'Emma Rodriguez',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    distance: '15 km away',
    positions: ['Coach', 'Meteorologist'],
    availability: 'Available Anytime',
    contact: ['email', 'phone', 'whatsapp'],
    status: 'available',
    isFollowing: false
  },
  {
    id: '5',
    name: 'David Thompson',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    distance: '3 km away',
    positions: ['Bowman', 'Grinder'],
    availability: 'Weekdays only',
    contact: ['phone', 'whatsapp'],
    status: 'available',
    isFollowing: false
  },
  {
    id: '6',
    name: 'Lisa Wang',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    distance: '22 km away',
    positions: ['Tactician', 'Coach'],
    availability: 'Business hours',
    contact: ['email', 'signal'],
    status: 'available',
    isFollowing: false
  },
  {
    id: '7',
    name: 'James Wilson',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    distance: '7 km away',
    positions: ['Pit', 'Trimmer'],
    availability: 'Available Anytime',
    contact: ['phone'],
    status: 'available',
    isFollowing: false
  },
  {
    id: '8',
    name: 'Maria Garcia',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    distance: '18 km away',
    positions: ['Meteorologist', 'Navigator'],
    availability: 'Weekdays only',
    contact: ['email', 'whatsapp', 'signal'],
    status: 'available',
    isFollowing: false
  },
  {
    id: '9',
    name: 'Robert Kim',
    avatar: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    distance: '11 km away',
    positions: ['Grinder', 'Pit', 'Trimmer'],
    availability: 'Business hours',
    contact: ['phone', 'whatsapp'],
    status: 'available',
    isFollowing: false
  },
  {
    id: '10',
    name: 'Anna Novak',
    avatar: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    distance: '25 km away',
    positions: ['Coach', 'Tactician'],
    availability: 'Available Anytime',
    contact: ['email'],
    status: 'available',
    isFollowing: false
  },
  {
    id: '11',
    name: 'Carlos Mendez',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    distance: '9 km away',
    positions: ['Bowman', 'Navigator'],
    availability: 'Weekdays only',
    contact: ['whatsapp', 'signal'],
    status: 'available',
    isFollowing: false
  },
  {
    id: '12',
    name: 'Sophie Turner',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    distance: '14 km away',
    positions: ['Meteorologist', 'Grinder'],
    availability: 'Business hours',
    contact: ['phone', 'email'],
    status: 'available',
    isFollowing: false
  },
  {
    id: '13',
    name: 'Marcus Johnson',
    avatar: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    distance: '6 km away',
    positions: ['Pit', 'Trimmer', 'Bowman'],
    availability: 'Available Anytime',
    contact: ['phone', 'whatsapp', 'signal'],
    status: 'available',
    isFollowing: false
  },
  {
    id: '14',
    name: 'Elena Petrov',
    avatar: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    distance: '20 km away',
    positions: ['Tactician', 'Coach', 'Navigator'],
    availability: 'Weekdays only',
    contact: ['email', 'phone'],
    status: 'available',
    isFollowing: false
  }
])

// Computed - This now only applies filters to the search results, doesn't run search automatically
const filteredUsers = computed(() => {
  if (!hasSearched.value) {
    return [] // No results until Start is clicked
  }

  let filtered = displayedUsers.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.positions.some(pos => pos.toLowerCase().includes(query))
    )
  }

  // Filter by positions
  if (selectedFilters.value.positions.length > 0) {
    filtered = filtered.filter(user =>
      user.positions.some(pos => selectedFilters.value.positions.includes(pos))
    )
  }

  // Filter by contact methods
  if (selectedFilters.value.contact.length > 0) {
    filtered = filtered.filter(user =>
      user.contact.some(method => selectedFilters.value.contact.includes(method))
    )
  }

  // Filter by availability
  if (selectedFilters.value.availability.length > 0) {
    filtered = filtered.filter(user =>
      selectedFilters.value.availability.some(avail => 
        user.availability.toLowerCase().includes(avail.toLowerCase())
      )
    )
  }

  // Filter by distance/radius
  if (selectedRadius.value && selectedRadius.value !== 'anywhere') {
    const maxDistance = parseInt(selectedRadius.value)
    console.log(`Filtering by distance: max ${maxDistance} km`)
    filtered = filtered.filter(user => {
      // Extract the number from "5 km away", "8 km away", etc.
      const distanceMatch = user.distance.match(/(\d+)\s*km/)
      if (distanceMatch) {
        const userDistance = parseInt(distanceMatch[1])
        const isWithinRange = userDistance <= maxDistance
        console.log(`${user.name}: ${userDistance} km <= ${maxDistance} km = ${isWithinRange}`)
        return isWithinRange
      }
      return true // If no distance info, include the user
    })
  } else if (selectedRadius.value === 'anywhere') {
    console.log('Distance filter disabled - showing users from anywhere')
  }

  return filtered
})

// Check if there are more users to load
const hasMoreUsers = computed(() => {
  return displayedUsers.value.length < searchResults.value.length
})

// Methods
const setActiveTab = (tab: string) => {
  if (tab === 'following') {
    // If "I'm open to" is clicked, navigate to Add Experience page
    router.push('/crew/experience')
    return
  }
  activeTab.value = tab
}

const handleRequestContact = (user: any) => {
  selectedUser.value = user
  showRequestModal.value = true
}

const handleFollow = (user: any) => {
  const userIndex = mockUsers.value.findIndex(u => u.id === user.id)
  if (userIndex !== -1) {
    mockUsers.value[userIndex].isFollowing = !mockUsers.value[userIndex].isFollowing
  }
}

const handleViewProfile = (user: any) => {
  router.push(`/user/${user.id}`)
}

const navigateToAddExperience = () => {
  router.push('/crew/experience')
}

const startSearch = () => {
  // Set loading state
  isLoading.value = true
  hasSearched.value = true
  
  // Simulate API call delay
  setTimeout(() => {
    // Apply all filters to mock data to get initial search results
    let results = mockUsers.value

    // Filter by positions
    if (selectedFilters.value.positions.length > 0) {
      results = results.filter(user =>
        user.positions.some(pos => selectedFilters.value.positions.includes(pos))
      )
    }

    // Filter by contact methods
    if (selectedFilters.value.contact.length > 0) {
      results = results.filter(user =>
        user.contact.some(method => selectedFilters.value.contact.includes(method))
      )
    }

    // Filter by availability
    if (selectedFilters.value.availability.length > 0) {
      results = results.filter(user =>
        selectedFilters.value.availability.some(avail => 
          user.availability.toLowerCase().includes(avail.toLowerCase())
        )
      )
    }

    // Filter by distance/radius
    if (selectedRadius.value && selectedRadius.value !== 'anywhere') {
      const maxDistance = parseInt(selectedRadius.value)
      results = results.filter(user => {
        const distanceMatch = user.distance.match(/(\d+)\s*km/)
        if (distanceMatch) {
          const userDistance = parseInt(distanceMatch[1])
          return userDistance <= maxDistance
        }
        return true
      })
    } else if (selectedRadius.value === 'anywhere') {
      console.log('Distance filter disabled in search - including users from anywhere')
    }

    // Store search results
    searchResults.value = results
    
    // Initialize displayed users (first 3)
    currentPage.value = 1
    displayedUsers.value = results.slice(0, usersPerPage)
    
    // Stop loading
    isLoading.value = false
    
    // Show success message
    showToast(`Found ${results.length} crew members`)
    
    console.log('Search completed with results:', results)
  }, 1000) // 1 second delay to simulate API call
}

const toggleContactFilter = (contact: string) => {
  const index = selectedFilters.value.contact.indexOf(contact)
  if (index > -1) {
    selectedFilters.value.contact.splice(index, 1)
  } else {
    selectedFilters.value.contact.push(contact)
  }
}

const loadMore = () => {
  const nextPage = currentPage.value + 1
  const startIndex = (nextPage - 1) * usersPerPage
  const endIndex = startIndex + usersPerPage
  
  const newUsers = searchResults.value.slice(startIndex, endIndex)
  displayedUsers.value = [...displayedUsers.value, ...newUsers]
  currentPage.value = nextPage
  
  console.log(`Loaded more users. Page ${nextPage}, showing ${displayedUsers.value.length} of ${searchResults.value.length}`)
}

const resetAllFilters = () => {
  // Reset search query
  searchQuery.value = ''
  
  // Reset all filter categories
  selectedFilters.value = {
    positions: [],
    contact: [],
    availability: []
  }
  
  // Reset radius to default
  selectedRadius.value = 'anywhere'
  
  // Reset crew visibility toggle to default
  isLookingForCrew.value = true
  
  // Clear search results and reset search state
  searchResults.value = []
  displayedUsers.value = []
  hasSearched.value = false
  currentPage.value = 1
  
  // Show confirmation toast
  showToast('All filters have been reset')
  
  console.log('All filters reset to default values')
}

const closeRequestModal = () => {
  showRequestModal.value = false
  selectedUser.value = null
}

const handleSendRequest = (message: string) => {
  if (selectedUser.value) {
    const userIndex = mockUsers.value.findIndex(u => u.id === selectedUser.value.id)
    if (userIndex !== -1) {
      mockUsers.value[userIndex].status = 'requesting'
    }
  }
  closeRequestModal()
  
  // Show toast notification
  showToast('Request sent')
}

const showToast = (message: string) => {
  // Simple toast implementation
  const toast = document.createElement('div')
  toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg z-50'
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => {
    document.body.removeChild(toast)
  }, 3000)
}

// Lifecycle
onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<style scoped>
.crew-finder-container {
  width: 100%;
  max-width: 412px;
  background: #f7f7f7;
  border-radius: 44px;
  overflow: hidden;
  border: 8px solid #00599b;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.crew-finder-header {
  background: #33414c;
  z-index: 5;
}

.header-title {
  color: white;
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  text-align: center;
  padding: 20px;
}

.header-tabs {
  display: flex;
  height: 50px;
}

.tab-button {
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  color: #9ba1a6;
  font-family: var(--kwindoo-tab-font-family);
  font-weight: var(--kwindoo-tab-font-weight);
  font-size: var(--kwindoo-tab-font-size);
  letter-spacing: var(--kwindoo-tab-letter-spacing);
  line-height: var(--kwindoo-tab-line-height);
  font-style: var(--kwindoo-tab-font-style);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.tab-button.active {
  color: white;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #0099e7;
}

.tab-button:active {
  transform: scale(0.98);
}

.crew-finder-content {
  flex: 1;
  background: #f7f7f7;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.add-experience-section {
  padding: 16px;
  background: white;
  border-bottom: 8px solid #f7f7f7;
}

.add-experience-button {
  width: 100%;
  padding: 12px 16px;
  background: #0099e7;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
}

.add-experience-button:hover {
  background: #0088cc;
}

.add-experience-button:active {
  transform: scale(0.98);
}

.start-search-section {
  padding: 16px;
  background: white;
  border-bottom: 8px solid #f7f7f7;
}

.start-search-button {
  width: 100%;
  padding: 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 56px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.start-search-button:hover {
  background: #218838;
}

.start-search-button:active {
  transform: scale(0.98);
}

.contact-filter-section {
  background: white;
  padding: 20px 16px;
  border-bottom: 8px solid #f7f7f7;
}

.filter-section-title {
  color: #2a3e4a;
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 16px 0;
}

.contact-filter-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.contact-filter-chip {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #e8e8e8;
  color: #2a3e4a;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-filter-chip.active {
  background: #0099e7;
  color: white;
}

.contact-filter-chip:hover {
  transform: translateY(-1px);
}

.contact-filter-chip:active {
  transform: scale(0.98);
}

.content-area {
  padding: 0 16px 16px;
}

.search-results-header {
  padding: 20px 0 16px 0;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 16px;
}

.results-title {
  color: #2a3e4a;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.initial-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  min-height: 300px;
}

.initial-icon {
  font-size: 64px;
  margin-bottom: 24px;
  opacity: 0.6;
}

.initial-title {
  font-size: 20px;
  font-weight: 600;
  color: #2a3e4a;
  margin: 0 0 12px 0;
}

.initial-description {
  font-size: 16px;
  color: #9ba1a6;
  margin: 0;
  line-height: 1.5;
  max-width: 280px;
}

.user-cards-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.load-more-section {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.load-more-button {
  padding: 12px 24px;
  background: #0099e7;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
}

.load-more-button:hover {
  background: #0088cc;
}

.load-more-button:active {
  transform: scale(0.98);
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .crew-finder-container {
    border-radius: 0;
    border: none;
    max-width: 100vw;
    min-height: 100vh;
  }
}
</style>