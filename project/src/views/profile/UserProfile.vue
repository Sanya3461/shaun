<template>
  <div class="user-profile-container">
    <!-- Mobile Status Bar -->
    <StatusBar />
    
    <!-- Navigation Tabs -->
    <NavigationTabs :active-tab="activeTab" @tab-change="handleTabChange" />
    
    <!-- Profile sections - only show in overview -->
    <div v-if="activeTab === 'overview' && userProfile" class="profile-sections">
      <UserProfileHeader v-if="userProfile" :user="userProfile" :is-own-profile="false" />
      <UserBioDescription v-if="userProfile?.bio" :bio="userProfile.bio" />
      <UserLocationStats v-if="userProfile" :user="userProfile" />
    </div>
    
    <!-- Main Content Area -->
    <div v-if="isLoading" class="loading-state">
      <div class="loading-spinner">Loading user profile...</div>
    </div>
    <div v-else class="main-content">
      <UserOverviewTab v-if="activeTab === 'overview'" :user-id="userId" />
      <UserAnalyticsTab v-else-if="activeTab === 'analytics'" :user-id="userId" />
    </div>
    
    <!-- Bottom Navigation -->
    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { UserData } from '../../types'
import { useUserProfileStore } from '../../stores/userProfile.ts'
import StatusBar from '../../components/layout/StatusBar.vue'
import NavigationTabs from '../../components/navigation/NavigationTabs.vue'
import BottomNavigation from '../../components/navigation/BottomNavigation.vue'
import UserProfileHeader from '../../components/profile/UserProfileHeader.vue'
import UserBioDescription from '../../components/profile/UserBioDescription.vue'
import UserLocationStats from '../../components/profile/UserLocationStats.vue'
import UserOverviewTab from './UserOverviewTab.vue'
import UserAnalyticsTab from '../analytics/UserAnalyticsTab.vue'

const route = useRoute()
const userProfileStore = useUserProfileStore()

const userId = computed(() => route.params.id as string)
const activeTab = ref('overview')
const userProfile = computed((): UserData | null => userProfileStore.currentUserProfile)
const isLoading = computed(() => userProfileStore.isLoading)

const handleTabChange = (tab: string) => {
  activeTab.value = tab
}

onMounted(async () => {
  if (userId.value) {
    userProfileStore.clearUserProfile()
    userProfileStore.clearUserProfile()
    await userProfileStore.fetchUserProfile(userId.value)
  }
})
</script>

<style scoped>
.user-profile-container {
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

.loading-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.loading-spinner {
  font-size: 16px;
  color: #6a6a6a;
  padding: 40px;
}

.loading-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
}

.loading-spinner {
  font-size: 16px;
  color: #6a6a6a;
  padding: 40px;
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .user-profile-container {
    border-radius: 0;
    border: none;
    max-width: 100vw;
    min-height: 100vh;
  }
}
</style>