<template>
  <div class="user-stats-section">
    <div class="stats-container">
      <div class="stat-item">
        <div class="stat-content">
          <div class="stat-title">TOTAL DISTANCE SAILED</div>
          <div class="stat-value">{{ userProfile?.totalDistance || 0 }}</div>
        </div>
        <div class="stat-unit">km</div>
      </div>
      
      <div class="separator"></div>
      
      <div class="stat-item">
        <div class="stat-content">
          <div class="stat-title">TOTAL TIME SPENT SAILING</div>
          <div class="stat-value">{{ userProfile?.totalTime || 0 }}</div>
        </div>
        <div class="stat-unit">hours</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserProfileStore } from '../../stores/userProfile'

defineProps<{
  userId: string
}>()

const userProfileStore = useUserProfileStore()
const userProfile = computed(() => userProfileStore.currentUserProfile)
</script>

<style scoped>
.user-stats-section {
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
}

.stats-container {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 24px 16px;
  background: white;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
}

.stat-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
}

.stat-title {
  width: 100%;
  font-family: var(--kwindoo-TOTAL-DISTANCE-font-family);
  font-weight: var(--kwindoo-TOTAL-DISTANCE-font-weight);
  color: #0099e7;
  font-size: var(--kwindoo-TOTAL-DISTANCE-font-size);
  text-align: left;
  letter-spacing: var(--kwindoo-TOTAL-DISTANCE-letter-spacing);
  line-height: var(--kwindoo-TOTAL-DISTANCE-line-height);
  font-style: var(--kwindoo-TOTAL-DISTANCE-font-style);
  white-space: nowrap;
}

.stat-value {
  width: 100%;
  font-family: var(--kwindoo-434-font-family);
  font-weight: var(--kwindoo-434-font-weight);
  color: #2a3e4a;
  font-size: var(--kwindoo-434-font-size);
  text-align: center;
  letter-spacing: var(--kwindoo-434-letter-spacing);
  line-height: var(--kwindoo-434-line-height);
  font-style: var(--kwindoo-434-font-style);
}

.stat-unit {
  width: 100%;
  font-family: var(--kwindoo-km-font-family);
  font-weight: var(--kwindoo-km-font-weight);
  color: #9ba1a6;
  font-size: var(--kwindoo-km-font-size);
  text-align: center;
  letter-spacing: var(--kwindoo-km-letter-spacing);
  line-height: var(--kwindoo-km-line-height);
  font-style: var(--kwindoo-km-font-style);
}

.separator {
  height: 100%;
  width: 1px;
  background: #e0e0e0;
  margin: 0 16px;
}
</style>