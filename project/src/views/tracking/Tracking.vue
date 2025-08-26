<template>
  <div class="tracking-container">
    <!-- Mobile Status Bar -->
    <StatusBar />
    
    <!-- Header with tabs -->
    <div class="tracking-header">
      <div class="header-tabs">
        <button 
          :class="['tab-button', { active: activeTab === 'event' }]"
          @click="setActiveTab('event')"
        >
          EVENT
        </button>
        <button 
          :class="['tab-button', { active: activeTab === 'self' }]"
          @click="setActiveTab('self')"
        >
          SELF
        </button>
        <button 
          :class="['tab-button', { active: activeTab === 'invitations' }]"
          @click="setActiveTab('invitations')"
        >
          INVITATIONS
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="tracking-content">
      <!-- EVENT Tab Content -->
      <EventTab v-if="activeTab === 'event'" />

      <!-- SELF Tab Content -->
      <SelfTab v-else-if="activeTab === 'self'" />

      <!-- INVITATIONS Tab Content -->
      <div v-else-if="activeTab === 'invitations'" class="invitations-content">
        <div class="empty-state">
          <div class="empty-icon">
            <MailIcon class="mail-icon" />
          </div>
          <div class="empty-title">No Invitations</div>
          <div class="empty-subtitle">You don't have any event invitations at the moment.</div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Mail as MailIcon } from 'lucide-vue-next'
import StatusBar from '../../components/layout/StatusBar.vue'
import BottomNavigation from '../../components/navigation/BottomNavigation.vue'
import EventTab from './EventTab.vue'
import SelfTab from './SelfTab.vue'

const activeTab = ref('event')

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}
</script>

<style scoped>
.tracking-container {
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

.tracking-header {
  background: #33414c;
  z-index: 5;
}

.header-tabs {
  display: flex;
  height: 50px;
  width: 100%;
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
  padding: 0 8px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
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

.tracking-content {
  flex: 1;
  background: #f7f7f7;
  padding: 20px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Invitations Content */
.invitations-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  padding: 40px 20px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.empty-icon {
  width: 64px;
  height: 64px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mail-icon {
  width: 32px;
  height: 32px;
  color: #9ba1a6;
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
  color: #2a3e4a;
}

.empty-subtitle {
  font-size: 14px;
  color: #9ba1a6;
  max-width: 280px;
  line-height: 1.5;
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .tracking-container {
    border-radius: 0;
    border: none;
    max-width: 100vw;
    min-height: 100vh;
  }
}
</style>