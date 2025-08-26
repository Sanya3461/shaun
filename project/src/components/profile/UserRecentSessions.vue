<template>
  <div class="user-recent-sessions">
    <div class="section-content">
      <div class="section-header">
        <h3 class="section-title">Recent Sessions</h3>
      </div>
      
      <div class="sessions-scroll">
        <div class="sessions-container">
          <div 
            v-for="(session, index) in recentSessions" 
            :key="index"
            class="session-card"
          >
            <div class="session-header">
              <h4 class="session-title">{{ session.title }}</h4>
            </div>
            <div class="session-stats">
              <div class="stats-row">
                <div class="stat-item">
                  <div class="stat-label">Time</div>
                  <div class="stat-value">{{ session.time }}</div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">Distance</div>
                  <div class="stat-value">{{ session.distance }}</div>
                </div>
              </div>
              <div class="stats-row">
                <div class="stat-item">
                  <div class="stat-label">Avg Speed</div>
                  <div class="stat-value">{{ session.avgSpeed }}</div>
                </div>
                <div class="stat-item">
                  <div class="stat-label">Max speed</div>
                  <div class="stat-value">{{ session.maxSpeed }}</div>
                </div>
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
const recentSessions = computed(() => userProfileStore.userSailingSessions)
</script>

<style scoped>
.user-recent-sessions {
  width: 100%;
  border: 1px solid #e0e0e0;
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
  align-items: flex-start;
  gap: 8px;
  padding: 0 8px;
  width: 100%;
}

.section-title {
  margin: 0;
  font-family: var(--kwindoo-highlight-font-family);
  font-weight: var(--kwindoo-highlight-font-weight);
  color: #2a3e4a;
  font-size: var(--kwindoo-highlight-font-size);
  letter-spacing: var(--kwindoo-highlight-letter-spacing);
  line-height: var(--kwindoo-highlight-line-height);
  white-space: nowrap;
  font-style: var(--kwindoo-highlight-font-style);
}

.sessions-scroll {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.sessions-container {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: max-content;
}

.session-card {
  width: 321px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #0099e7;
  flex-shrink: 0;
}

.session-header {
  padding: 8px 0 16px;
  width: 100%;
}

.session-title {
  flex: 1;
  margin: 0;
  font-family: var(--kwindoo-card-header-font-family);
  font-weight: var(--kwindoo-card-header-font-weight);
  color: #175599;
  font-size: var(--kwindoo-card-header-font-size);
  letter-spacing: var(--kwindoo-card-header-letter-spacing);
  line-height: var(--kwindoo-card-header-line-height);
  font-style: var(--kwindoo-card-header-font-style);
}

.session-stats {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stats-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
}

.stat-label {
  font-family: var(--kwindoo-label-small-font-family);
  font-weight: var(--kwindoo-label-small-font-weight);
  color: #6a6a6a;
  font-size: var(--kwindoo-label-small-font-size);
  letter-spacing: var(--kwindoo-label-small-letter-spacing);
  line-height: var(--kwindoo-label-small-line-height);
  font-style: var(--kwindoo-label-small-font-style);
  margin-bottom: 4px;
  text-align: left;
}

.stat-value {
  font-weight: bold;
  color: #2a3e4a;
  font-size: 16px;
  line-height: 16px;
  font-family: 'Roboto', Helvetica;
  text-align: left;
}
</style>