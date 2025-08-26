<template>
  <div class="profile-container">
    <!-- Mobile Status Bar -->
    <StatusBar />
    
    <!-- Navigation Tabs -->
    <NavigationTabs :active-tab="activeTab" @tab-change="handleTabChange" />
    
    <!-- Profile sections - only show in overview -->
    <div v-if="activeTab === 'overview'" class="profile-sections">
      <ProfileHeader />
      <BioDescription />
      <LocationStats />
      
      <!-- Crew Finder Button -->
      <div class="crew-finder-section">
        <button class="crew-finder-btn" @click="navigateToCrewFinder">
          Crew Finder
        </button>
      </div>
      
      <!-- Add My Experience Button -->
      <div class="add-experience-section">
        <button class="add-experience-btn" @click="navigateToAddExperience">
          Add My Experience
        </button>
      </div>
    </div>
    
    <!-- Main Content Area -->
    <div class="main-content">
      <OverviewTab v-if="activeTab === 'overview'" />
      <AnalyticsTab v-else-if="activeTab === 'analytics'" />
    </div>
    
    <!-- Bottom Navigation -->
    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.ts'
import { useSailingStore } from '../stores/sailing.ts'
import { useNavigationStore } from '../stores/navigation.ts'
import ProfileHeader from './profile/ProfileHeader.vue'
import BioDescription from './profile/BioDescription.vue'
import LocationStats from './profile/LocationStats.vue'
import StatusBar from './layout/StatusBar.vue'
import NavigationTabs from './navigation/NavigationTabs.vue'
import BottomNavigation from './navigation/BottomNavigation.vue'
import OverviewTab from '../views/profile/OverviewTab.vue'
import AnalyticsTab from '../views/analytics/AnalyticsTab.vue'

// Initialize stores
const router = useRouter()
const userStore = useUserStore()
const sailingStore = useSailingStore()
const navigationStore = useNavigationStore()

const activeTab = ref(userStore.activeTab)

const handleTabChange = (tab: string) => {
  activeTab.value = tab
  userStore.setActiveTab(tab)
}

const navigateToCrewFinder = () => {
  router.push('/crew')
}

const navigateToAddExperience = () => {
  router.push('/crew/experience')
}

// Load data from storage on mount
onMounted(() => {
  userStore.loadFromStorage()
  sailingStore.loadFromStorage()
  navigationStore.loadFromStorage()
})
</script>

<style scoped>
.profile-container {
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

.main-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .profile-container {
    border-radius: 0;
    border: none;
    max-width: 100vw;
    min-height: 100vh;
  }
}

.crew-finder-section {
  padding: 4px 16px 8px 16px;
  background: #22313a;
}

.crew-finder-btn {
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

.crew-finder-btn:hover {
  background: #0088cc;
}

.crew-finder-btn:active {
  transform: scale(0.98);
}

.add-experience-section {
  padding: 8px 16px 4px 16px;
  background: #22313a;
}

.add-experience-btn {
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

.add-experience-btn:hover {
  background: #0088cc;
}

.add-experience-btn:active {
  transform: scale(0.98);
}
</style>