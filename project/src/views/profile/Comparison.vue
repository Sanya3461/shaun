<template>
  <div class="comparison-container">
    <!-- Mobile Status Bar -->
    <StatusBar />
    
    <!-- Header with back button -->
    <div class="comparison-header">
      <button class="back-button" @click="goBack">
        <ChevronLeftIcon class="back-icon" />
      </button>
      <h1 class="header-title">Side by Side Comparison</h1>
    </div>

    <!-- User Comparison Section -->
    <div class="users-comparison">
      <div class="user-card left-user">
        <div class="user-avatar">
          <img 
            :src="leftUser.profileImage" 
            :alt="leftUser.name"
            class="avatar-image"
          />
        </div>
        <div class="user-name">{{ leftUser.name }}</div>
      </div>
      
      <div class="vs-divider">
        <span class="vs-text">VS</span>
      </div>
      
      <div class="user-card right-user">
        <div class="user-avatar">
          <img 
            :src="rightUser.profileImage" 
            :alt="rightUser.name"
            class="avatar-image"
          />
        </div>
        <div class="user-name">{{ rightUser.name }}</div>
      </div>
    </div>

    <!-- Time Period -->
    <div class="time-period">
      <h2 class="period-title">Last 4 Weeks</h2>
      <p class="period-subtitle">May 20-25th overview</p>
    </div>

    <!-- Main Content -->
    <div class="comparison-content">
      <!-- Activity Types Section -->
      <div class="activity-types-section">
        <h3 class="section-title">Activity Types</h3>
        
        <div class="charts-container">
          <!-- Left User Chart -->
          <div class="chart-container">
            <div class="donut-chart">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" stroke-width="12"/>
                <!-- Sailing 27% - Purple -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#8b5cf6" stroke-width="12" 
                        stroke-dasharray="76.3 282.7" stroke-dashoffset="0" transform="rotate(-90 60 60)"/>
                <!-- Foil Windsurf 23% - Blue -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#3b82f6" stroke-width="12" 
                        stroke-dasharray="65.1 282.7" stroke-dashoffset="-76.3" transform="rotate(-90 60 60)"/>
                <!-- Rowling 16% - Green -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" stroke-width="12" 
                        stroke-dasharray="45.2 282.7" stroke-dashoffset="-141.4" transform="rotate(-90 60 60)"/>
                <!-- Kayaking 13% - Red -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#ef4444" stroke-width="12" 
                        stroke-dasharray="36.8 282.7" stroke-dashoffset="-186.6" transform="rotate(-90 60 60)"/>
                <!-- Kenuing 10% - Orange -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#f59e0b" stroke-width="12" 
                        stroke-dasharray="28.3 282.7" stroke-dashoffset="-223.4" transform="rotate(-90 60 60)"/>
                <!-- SUP 7% - Light Green -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#22c55e" stroke-width="12" 
                        stroke-dasharray="19.8 282.7" stroke-dashoffset="-251.7" transform="rotate(-90 60 60)"/>
                <!-- Wavesurf 4% - Pink -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#ec4899" stroke-width="12" 
                        stroke-dasharray="11.3 282.7" stroke-dashoffset="-271.5" transform="rotate(-90 60 60)"/>
              </svg>
            </div>
            
            <div class="chart-legend">
              <div class="legend-item">
                <div class="legend-color purple"></div>
                <span class="legend-label">Sailing</span>
                <span class="legend-percent">27%</span>
              </div>
              <div class="legend-item">
                <div class="legend-color blue"></div>
                <span class="legend-label">Foil Windsurf</span>
                <span class="legend-percent">23%</span>
              </div>
              <div class="legend-item">
                <div class="legend-color green"></div>
                <span class="legend-label">Rowling</span>
                <span class="legend-percent">16%</span>
              </div>
              <div class="legend-item">
                <div class="legend-color red"></div>
                <span class="legend-label">Kayaking</span>
                <span class="legend-percent">13%</span>
              </div>
              <div class="legend-item">
                <div class="legend-color orange"></div>
                <span class="legend-label">Kenuing</span>
                <span class="legend-percent">10%</span>
              </div>
              <div class="legend-item">
                <div class="legend-color light-green"></div>
                <span class="legend-label">SUP</span>
                <span class="legend-percent">7%</span>
              </div>
              <div class="legend-item">
                <div class="legend-color pink"></div>
                <span class="legend-label">Wavesurf</span>
                <span class="legend-percent">4%</span>
              </div>
            </div>
          </div>

          <!-- Right User Chart -->
          <div class="chart-container">
            <div class="donut-chart">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" stroke-width="12"/>
                <!-- Sailing 45% - Purple -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#8b5cf6" stroke-width="12" 
                        stroke-dasharray="127.2 282.7" stroke-dashoffset="0" transform="rotate(-90 60 60)"/>
                <!-- Foil Windsurf 30% - Blue -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#3b82f6" stroke-width="12" 
                        stroke-dasharray="84.8 282.7" stroke-dashoffset="-127.2" transform="rotate(-90 60 60)"/>
                <!-- Kenuing 12% - Orange -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#f59e0b" stroke-width="12" 
                        stroke-dasharray="33.9 282.7" stroke-dashoffset="-212" transform="rotate(-90 60 60)"/>
                <!-- SUP 8% - Light Green -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#22c55e" stroke-width="12" 
                        stroke-dasharray="22.6 282.7" stroke-dashoffset="-245.9" transform="rotate(-90 60 60)"/>
                <!-- Wavesurf 5% - Pink -->
                <circle cx="60" cy="60" r="45" fill="none" stroke="#ec4899" stroke-width="12" 
                        stroke-dasharray="14.1 282.7" stroke-dashoffset="-268.5" transform="rotate(-90 60 60)"/>
              </svg>
            </div>
            
            <div class="chart-legend">
              <div class="legend-item">
                <div class="legend-color purple"></div>
                <span class="legend-label">Sailing</span>
                <span class="legend-percent">45%</span>
              </div>
              <div class="legend-item">
                <div class="legend-color blue"></div>
                <span class="legend-label">Foil Windsurf</span>
                <span class="legend-percent">30%</span>
              </div>
              <div class="legend-item">
                <div class="legend-color orange"></div>
                <span class="legend-label">Kenuing</span>
                <span class="legend-percent">12%</span>
              </div>
              <div class="legend-item">
                <div class="legend-color light-green"></div>
                <span class="legend-label">SUP</span>
                <span class="legend-percent">8%</span>
              </div>
              <div class="legend-item">
                <div class="legend-color pink"></div>
                <span class="legend-label">Wavesurf</span>
                <span class="legend-percent">5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activities Section -->
      <div class="activities-section">
        <h3 class="section-title">Activities</h3>
        
        <div class="activity-tags">
          <span class="activity-tag active">Sailing</span>
          <span class="activity-tag">Foil Windsurf</span>
          <span class="activity-tag">Kenuing</span>
          <span class="activity-tag">SUP</span>
          <span class="activity-tag">Wavesurf</span>
        </div>

        <!-- Comparison Stats -->
        <div class="stats-comparison">
          <!-- Sessions -->
          <div class="stat-row">
            <div class="stat-left">
              <div class="stat-number">53</div>
              <div class="stat-label">session</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-right">
              <div class="stat-number">70</div>
              <div class="stat-label">session</div>
            </div>
          </div>

          <!-- Nautical Miles -->
          <div class="stat-row">
            <div class="stat-left">
              <div class="stat-number">173</div>
              <div class="stat-label">nautical miles</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-right">
              <div class="stat-number">203</div>
              <div class="stat-label">nautical miles</div>
            </div>
          </div>

          <!-- Avg Speed -->
          <div class="stat-row">
            <div class="stat-left">
              <div class="stat-number">434<span class="stat-unit">kn</span></div>
              <div class="stat-label">Avg speed</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-right">
              <div class="stat-number">324<span class="stat-unit">kn</span></div>
              <div class="stat-label">Avg speed</div>
            </div>
          </div>

          <!-- Max Speed -->
          <div class="stat-row">
            <div class="stat-left">
              <div class="stat-number">434<span class="stat-unit">kn</span></div>
              <div class="stat-label">Max speed</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-right">
              <div class="stat-number">368<span class="stat-unit">kn</span></div>
              <div class="stat-label">Max speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ChevronLeft as ChevronLeftIcon } from 'lucide-vue-next'
import { useUserStore } from '../../stores/user.ts'
import StatusBar from '../../components/layout/StatusBar.vue'
import BottomNavigation from '../../components/navigation/BottomNavigation.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// Get users from route params or use defaults
const leftUserId = route.params.leftUserId as string || '1'
const rightUserId = route.params.rightUserId as string || '2'

// Get user data from store
const leftUser = ref({
  id: leftUserId,
  name: leftUserId === '1' ? 'Botond Kristof Penzes' : 'Eszter Kósa',
  profileImage: leftUserId === '1' 
    ? 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'
    : 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'
})

const rightUser = ref({
  id: rightUserId,
  name: rightUserId === '2' ? 'Eszter Kósa' : 'Alex Thompson',
  profileImage: rightUserId === '2'
    ? 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'
    : 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'
})

const goBack = () => {
  router.go(-1)
}

onMounted(() => {
  console.log('Comparison page loaded with users:', leftUserId, 'vs', rightUserId)
})
</script>

<style scoped>
.comparison-container {
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

.comparison-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: #33414c;
  color: white;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.back-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.header-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: white;
}

.users-comparison {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 20px;
  background: #22313a;
}

.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid white;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  line-height: 1.3;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.vs-text {
  color: white;
  font-size: 18px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
}

.time-period {
  text-align: center;
  background: #22313a;
  color: white;
  padding: 0 20px 24px;
}

.period-title {
  margin: 0 0 4px 0;
  font-size: 24px;
  font-weight: 600;
  color: #0099e7;
}

.period-subtitle {
  margin: 0;
  font-size: 16px;
  color: white;
}

.comparison-content {
  flex: 1;
  background: white;
  padding: 20px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.activity-types-section {
  margin-bottom: 32px;
}

.section-title {
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2a3e4a;
}

.charts-container {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.chart-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.donut-chart {
  flex-shrink: 0;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.legend-color {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-color.purple { background: #8b5cf6; }
.legend-color.blue { background: #3b82f6; }
.legend-color.green { background: #10b981; }
.legend-color.orange { background: #f59e0b; }
.legend-color.red { background: #ef4444; }
.legend-color.light-green { background: #22c55e; }
.legend-color.pink { background: #ec4899; }

.legend-label {
  flex: 1;
  color: #2a3e4a;
}

.legend-percent {
  font-weight: 600;
  color: #2a3e4a;
}

.activities-section {
  margin-bottom: 32px;
}

.activity-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.activity-tag {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e0e0e0;
  background: white;
  color: #6a6a6a;
  min-height: 44px;
  display: flex;
  align-items: center;
}

.activity-tag.active {
  background: #0099e7;
  color: white;
  border-color: #0099e7;
}

.activity-tag:hover:not(.active) {
  background: #f8f9fa;
  border-color: #0099e7;
}

.stats-comparison {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.stat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-left,
.stat-right {
  flex: 1;
  text-align: center;
}

.stat-divider {
  width: 1px;
  height: 60px;
  background: #e0e0e0;
  margin: 0 20px;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #0099e7;
  margin-bottom: 4px;
}

.stat-unit {
  font-size: 16px;
  font-weight: 400;
  margin-left: 2px;
}

.stat-label {
  font-size: 14px;
  color: #6a6a6a;
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .comparison-container {
    border-radius: 0;
    border: none;
    max-width: 100vw;
    min-height: 100vh;
  }
  
  .charts-container {
    flex-direction: column;
    gap: 32px;
  }
  
  .chart-container {
    align-items: center;
  }
}
</style>