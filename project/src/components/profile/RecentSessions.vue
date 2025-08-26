<template>
  <div class="recent-sessions">
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
import { useSailingStore } from '../../stores/sailing.ts'

const sailingStore = useSailingStore()
const recentSessions = sailingStore.recentSessions
</script>

<style scoped>
.recent-sessions {
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
  gap: 12px;
  padding: 0 8px;
  width: 100%;
  margin-bottom: 8px;
}

.section-title {
  margin: 0;
  font-family: 'Roboto', Helvetica;
  font-weight: 600;
  color: #2a3e4a;
  font-size: 16px;
  line-height: 1.2;
  white-space: nowrap;
}

.sessions-scroll {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 40px;
}

.sessions-container {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: max-content;
  padding-right: 60px;
  padding-bottom: 20px;
}

.session-card {
  width: 260px;
  min-width: 260px;
  max-width: 260px;
  height: 180px;
  min-height: 180px;
  max-height: 180px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 2px solid #0099e7;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 153, 231, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.session-header {
  padding: 0;
  width: 100%;
  margin-bottom: 16px;
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
  flex: 1;
}

.stats-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  text-align: center;
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