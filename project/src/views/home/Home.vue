<template>
  <div class="home-container">
    <!-- Mobile Status Bar -->
    <StatusBar />
    
    <!-- Header with tabs -->
    <div class="home-header">
      <div class="header-tabs">
        <button 
          :class="['tab-button', { active: activeTab === 'discover' }]"
          @click="setActiveTab('discover')"
        >
          DISCOVER
        </button>
        <button 
          :class="['tab-button', { active: activeTab === 'following' }]"
          @click="setActiveTab('following')"
        >
          FOLLOWING
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="home-content">
      <DiscoverTab v-if="activeTab === 'discover'" />
      <FollowingTab v-else-if="activeTab === 'following'" />
    </div>
    
    <!-- Bottom Navigation -->
    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StatusBar from '../../components/layout/StatusBar.vue'
import BottomNavigation from '../../components/navigation/BottomNavigation.vue'
import DiscoverTab from './DiscoverTab.vue'
import FollowingTab from './FollowingTab.vue'

const activeTab = ref('discover')

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}
</script>

<style scoped>
.home-container {
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

.home-header {
  background: #33414c;
  z-index: 5;
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

.home-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: white;
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .home-container {
    border-radius: 0;
    border: none;
    max-width: 100vw;
    min-height: 100vh;
  }
}
</style>