<template>
  <div class="user-sailing-results">
    <div class="section-content">
      <div class="section-header">
        <h3 class="section-title">SAILING RESULTS</h3>
      </div>
      
      <div class="results-scroll">
        <div class="results-container">
          <div 
            v-for="(result, index) in sailingResults" 
            :key="index"
            class="result-card"
          >
            <div class="medal-icon">
              <img 
                :src="getMedalIcon(result.place)" 
                :alt="result.place + ' medal'"
                class="medal-icon"
              />
            </div>
            <div class="result-details">
              <div class="result-header">
                <span class="place">{{ result.place }}</span>
                <span class="date">{{ result.date }}</span>
              </div>
              <div class="event-name">{{ result.event }}</div>
              <div class="result-info">
                <span class="boat-class">{{ result.boatClass }}</span>
                <span class="boats-count">{{ result.boats }}</span>
                <span class="races-count">{{ result.races }}</span>
              </div>
            </div>
          </div>
        </div>
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
const sailingResults = computed(() => userProfileStore.userSailingResults)

const getMedalIcon = (place: string) => {
  if (place.includes('1st')) return '/src/assets/medal-1st.svg'
  if (place.includes('2nd')) return '/src/assets/medal-2nd.svg'
  if (place.includes('3rd')) return '/src/assets/medal-3rd.svg'
  return '/src/assets/medal-1st.svg' // default
}
</script>

<style scoped>
.user-sailing-results {
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
}

.section-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 16px 16px;
  background: white;
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  width: 100%;
}

.section-title {
  margin: 0;
  font-family: var(--kwindoo-TOTAL-DISTANCE-font-family);
  font-weight: var(--kwindoo-TOTAL-DISTANCE-font-weight);
  color: #0099e7;
  font-size: var(--kwindoo-TOTAL-DISTANCE-font-size);
  letter-spacing: var(--kwindoo-TOTAL-DISTANCE-letter-spacing);
  line-height: var(--kwindoo-TOTAL-DISTANCE-line-height);
  white-space: nowrap;
  font-style: var(--kwindoo-TOTAL-DISTANCE-font-style);
}

.results-scroll {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.results-container {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: max-content;
  padding: 4px 0;
}

.result-card {
  display: flex;
  width: 380px;
  align-items: center;
  gap: 20px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  flex-shrink: 0;
}

.medal-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.result-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
  flex: 1;
}

.result-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
}

.place {
  font-weight: 600;
  color: #6a6a6a;
  font-size: 14px;
  white-space: nowrap;
}

.date {
  font-family: var(--kwindoo-navigation-text-font-family);
  font-weight: var(--kwindoo-navigation-text-font-weight);
  color: #9ba1a6;
  font-size: var(--kwindoo-navigation-text-font-size);
  text-align: center;
  letter-spacing: var(--kwindoo-navigation-text-letter-spacing);
  line-height: var(--kwindoo-navigation-text-line-height);
  white-space: nowrap;
  font-style: var(--kwindoo-navigation-text-font-style);
}

.event-name {
  flex: 1;
  font-family: var(--kwindoo-highlight-font-family);
  font-weight: var(--kwindoo-highlight-font-weight);
  color: #175599;
  font-size: var(--kwindoo-highlight-font-size);
  letter-spacing: var(--kwindoo-highlight-letter-spacing);
  line-height: var(--kwindoo-highlight-line-height);
  font-style: var(--kwindoo-highlight-font-style);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-info {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
}

.boat-class,
.boats-count,
.races-count {
  font-family: var(--kwindoo-navigation-text-font-family);
  font-weight: var(--kwindoo-navigation-text-font-weight);
  color: #6a6a6a;
  font-size: var(--kwindoo-navigation-text-font-size);
  letter-spacing: var(--kwindoo-navigation-text-letter-spacing);
  white-space: nowrap;
  line-height: var(--kwindoo-navigation-text-line-height);
  font-style: var(--kwindoo-navigation-text-font-style);
}

.boats-count {
  text-align: center;
}

.races-count {
  text-align: right;
}
</style>