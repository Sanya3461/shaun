<template>
  <div class="analytics-tab">
    <!-- Time Period Selector -->
    <div class="time-selector">
      <button class="time-btn">7D</button>
      <button class="time-btn active">4W</button>
      <button class="time-btn">3M</button>
      <button class="time-btn">1Y</button>
    </div>
    
    <!-- Period Title -->
    <div class="period-title">
      <h2>Last 4 Weeks</h2>
      <p>May 20-Jun 16 overview</p>
    </div>

    <!-- Calendar Grid -->
    <div class="calendar-section">
      <div class="calendar-header">
        <div v-for="day in weekDays" :key="day" class="day-header">{{ day }}</div>
      </div>
      <div class="calendar-grid">
        <div 
          v-for="(day, index) in calendarDays" 
          :key="index"
          :class="['calendar-day', getActivityClass(day.activity), { 'current-month': day.currentMonth }]"
        >
          {{ day.date }}
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="section-separator"></div>
    <div class="stats-section">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number blue">53</div>
          <div class="stat-label">Sessions</div>
        </div>
        <div class="stat-card">
          <div class="stat-number blue">173</div>
          <div class="stat-label">Nautical miles</div>
        </div>
        <div class="stat-card">
          <div class="stat-number blue">434</div>
          <div class="stat-unit">kn</div>
          <div class="stat-label">Avg speed</div>
        </div>
        <div class="stat-card">
          <div class="stat-number blue">434</div>
          <div class="stat-unit">kn</div>
          <div class="stat-label">Max speed</div>
        </div>
      </div>
    </div>

    <!-- Activity Types -->
    <div class="section-separator"></div>
    <div class="activity-section">
      <h3>Activity Types</h3>
      <div class="activity-content">
        <div class="activity-layout">
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
                      stroke-dasharray="11.3 282.7" stroke-dashoffset="-271.5" transform="rotate(-90 60 60)"/>
            </svg>
          </div>
          <div class="activity-legend">
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
      </div>
    </div>

    <!-- Achievements -->
    <div class="section-separator"></div>
    <div class="achievements-section">
      <h3>Achievements</h3>
      <div class="achievement-progress-bar merit-out-progress">
        <div class="progress-background">
          <div class="progress-fill merit-out-fill" style="width: 70%;"></div>
          <div class="progress-content">
            <div class="achievement-icon">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="24" height="24" rx="4" fill="#AED4E7" stroke="white" stroke-width="1"/>
                <path d="M14.0049 17.9411V20.0029H19.0049V22.0029H7.00488V20.0029H12.0049V17.9411C8.05857 17.449 5.00488 14.0826 5.00488 10.0029V4.00293H21.0049V10.0029C21.0049 14.0826 17.9512 17.449 14.0049 17.9411ZM7.00488 6.00293V10.0029C7.00488 13.3167 9.69117 16.0029 13.0049 16.0029C16.3186 16.0029 19.0049 13.3167 19.0049 10.0029V6.00293H7.00488ZM2.00488 6.00293H4.00488V10.0029H2.00488V6.00293ZM22.0049 6.00293H24.0049V10.0029H22.0049V6.00293Z" fill="#FD5E2B"/>
              </svg>
            </div>
            <span class="achievement-text">Merit Out Badge</span>
          </div>
        </div>
      </div>
      <div class="achievement-progress-bar distance-champion-progress">
        <div class="progress-background">
          <div class="progress-fill distance-champion-fill" style="width: 90%;"></div>
          <div class="progress-content">
            <div class="achievement-icon">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="24" height="24" rx="4" fill="#FF8B66" stroke="white" stroke-width="1"/>
                <path d="M14.0049 17.9408V20.0026H19.0049V22.0026H7.00488V20.0026H12.0049V17.9408C8.05857 17.4487 5.00488 14.0823 5.00488 10.0027V4.00269H21.0049V10.0027C21.0049 14.0823 17.9512 17.4487 14.0049 17.9408ZM7.00488 6.00269V10.0027C7.00488 13.3164 9.69117 16.0026 13.0049 16.0026C16.3186 16.0026 19.0049 13.3164 19.0049 10.0027V6.00269H7.00488ZM2.00488 6.00269H4.00488V10.0027H2.00488V6.00269ZM22.0049 6.00269H24.0049V10.0027H22.0049V6.00269Z" fill="#00599B"/>
              </svg>
            </div>
            <span class="achievement-text">Distance Champion</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Latest Events -->
    <div class="section-separator"></div>
    <div class="events-section">
      <h3>Latest Events</h3>
      <div class="events-list">
        <div class="event-item">
          <div class="event-logo balaton-logo">
            <img src="https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop" 
                 alt="Balatoni Évadnyitó" class="event-logo-img">
          </div>
          <div class="event-details">
            <div class="event-name">Balatoni Évadnyitó</div>
            <div class="event-date">May 3, 12:25</div>
          </div>
          <ChevronRightIcon class="chevron" />
        </div>
        <div class="event-item">
          <div class="event-logo festival-logo">
            <img src="https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop" 
                 alt="Fesztivál a Tóparton" class="event-logo-img">
          </div>
          <div class="event-details">
            <div class="event-name">Fesztivál a Tóparton</div>
            <div class="event-date">June 15, 10:00</div>
          </div>
          <ChevronRightIcon class="chevron" />
        </div>
      </div>
    </div>

    <!-- Crew Members -->
    <div class="section-separator"></div>
    <div class="crew-section">
      <h3>Crew Members</h3>
      <div class="crew-item">
        <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" 
             alt="Imi Vasváry" class="crew-avatar">
        <span class="crew-name">Imi Vasváry</span>
        <ChevronRightIcon class="chevron" />
      </div>
      <div class="crew-item">
        <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" 
             alt="Eszter Kósa" class="crew-avatar">
        <span class="crew-name">Eszter Kósa</span>
        <ChevronRightIcon class="chevron" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight as ChevronRightIcon } from 'lucide-vue-next'

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const calendarDays = [
  // Week 1
  { date: 29, activity: 0, currentMonth: false }, 
  { date: 30, activity: 0, currentMonth: false }, 
  { date: 31, activity: 0, currentMonth: false }, 
  { date: 1, activity: 1, currentMonth: true }, 
  { date: 2, activity: 0, currentMonth: true }, 
  { date: 3, activity: 2, currentMonth: true }, 
  { date: 4, activity: 0, currentMonth: true },
  
  // Week 2
  { date: 5, activity: 1, currentMonth: true }, 
  { date: 6, activity: 0, currentMonth: true }, 
  { date: 7, activity: 3, currentMonth: true }, 
  { date: 8, activity: 1, currentMonth: true }, 
  { date: 9, activity: 0, currentMonth: true }, 
  { date: 10, activity: 2, currentMonth: true }, 
  { date: 11, activity: 1, currentMonth: true },
  
  // Week 3
  { date: 12, activity: 0, currentMonth: true }, 
  { date: 13, activity: 1, currentMonth: true }, 
  { date: 14, activity: 0, currentMonth: true }, 
  { date: 15, activity: 2, currentMonth: true }, 
  { date: 16, activity: 3, currentMonth: true }, 
  { date: 17, activity: 1, currentMonth: true }, 
  { date: 18, activity: 0, currentMonth: true },
  
  // Week 4
  { date: 19, activity: 1, currentMonth: true }, 
  { date: 20, activity: 0, currentMonth: true }, 
  { date: 21, activity: 1, currentMonth: true }, 
  { date: 22, activity: 0, currentMonth: true }, 
  { date: 23, activity: 2, currentMonth: true }, 
  { date: 24, activity: 1, currentMonth: true }, 
  { date: 25, activity: 0, currentMonth: true }
]

const getActivityClass = (level: number) => {
  const classes = ['activity-0', 'activity-1', 'activity-2', 'activity-3']
  return classes[level] || 'activity-0'
}
</script>

<style scoped>
.analytics-tab {
  background: white;
  min-height: 100vh;
  overflow-y: auto;
  padding-top: 0;
}

/* Time Selector */
.time-selector {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 16px 16px 8px 16px;
  background: #22313A;
}

.time-btn {
  padding: 8px 16px;
  border: 2px solid white;
  background: transparent;
  color: white;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  min-width: 44px;
  min-height: 36px;
}

.time-btn.active {
  background: #0099e7;
  border-color: white;
  color: white;
}

.period-title {
  text-align: center;
  background: #22313A;
  color: #0099E7;
  padding: 0 16px 20px 16px;
}

.period-title h2 {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
}

.period-title p {
  margin: 0;
  font-size: 14px;
  color: white;
}

/* Calendar Section */
.calendar-section {
  background: white;
  padding: 16px;
  margin-bottom: 16px;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 12px;
}

.day-header {
  text-align: center;
  font-size: 12px;
  color: #6a6a6a;
  font-weight: 500;
  padding: 8px 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.calendar-day:not(.current-month) {
  color: #d1d5db;
}

.calendar-day.current-month {
  color: #374151;
}

.activity-0 {
  background: #f8f9fa;
}

.activity-1 {
  background: #e3f2fd;
}

.activity-2 {
  background: #90caf9;
}

.activity-3 {
  background: #2196f3;
  color: white;
}

.calendar-day:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Stats Section */
.stats-section {
  background: white;
  padding: 24px 16px;
  border-top: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
  position: relative;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  width: 100%;
  position: relative;
}

.stats-grid::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 10%;
  bottom: 10%;
  width: 1px;
  background: #E0E0E0;
  transform: translateX(-50%);
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 16px;
  background: transparent;
  text-align: center;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 4px;
  display: inline;
}

.stat-number.blue {
  color: #0099e7;
}

.stat-unit {
  display: inline;
  font-size: 16px;
  color: #0099E7;
  font-weight: 400;
  margin-left: 2px;
}

.stat-label {
  font-size: 14px;
  color: #6a6a6a;
  margin-top: 4px;
}

/* Activity Section */
.activity-section {
  background: white;
  padding: 20px 16px;
  border: 1px solid #E0E0E0;
}

.activity-section h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2a3e4a;
}

.activity-content {
  width: 100%;
}

.activity-layout {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.donut-chart {
  flex-shrink: 0;
}

.activity-legend {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 10px;
  height: 10px;
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
  font-size: 14px;
  color: #2a3e4a;
}

.legend-percent {
  font-size: 14px;
  font-weight: 600;
  color: #2a3e4a;
}

/* Achievements Section */
.achievements-section {
  background: white;
  padding: 20px 16px;
  border: 1px solid #E0E0E0;
}

.achievements-section h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2a3e4a;
}

.achievement-progress-bar {
  margin-bottom: 12px;
  position: relative;
  height: 56px;
  border-radius: 8px;
  overflow: hidden;
}

.progress-background {
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba(0, 168, 232, 0.3);
  border-radius: 8px;
}

.distance-champion-progress .progress-background {
  background: rgba(255, 107, 53, 0.3);
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #00A8E8;
  transition: width 0.8s ease-in-out;
  border-radius: 8px;
}

.merit-out-fill {
  background: #00A8E8;
}

.distance-champion-fill {
  background: #FF6B35;
}

.progress-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  z-index: 2;
}

.achievement-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.achievement-text {
  color: white;
  font-weight: 500;
  font-size: 16px;
}

/* Events Section */
.events-section {
  background: white;
  padding: 20px 16px;
  border: 1px solid #E0E0E0;
}

.events-section h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2a3e4a;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 8px;
  cursor: pointer;
  min-height: 44px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.event-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.event-item:active {
  transform: scale(0.98);
}

.event-logo {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.event-logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-details {
  flex: 1;
}

.event-name {
  font-size: 17px;
  font-weight: 500;
  color: #175599;
  margin-bottom: 2px;
  line-height: 1.3;
}

.event-date {
  font-size: 13px;
  color: #9ba1a6;
  line-height: 1.2;
  font-weight: 400;
}

.chevron {
  width: 24px;
  height: 24px;
  color: #9ba1a6;
  flex-shrink: 0;
}

/* Crew Section */
.crew-section {
  background: white;
  padding: 20px 16px;
  border: 1px solid #E0E0E0;
}

.crew-section h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2a3e4a;
}

.crew-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  cursor: pointer;
  min-height: 44px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.crew-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.crew-item:active {
  transform: scale(0.98);
}

.crew-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.crew-name {
  flex: 1;
  font-size: 16px;
  font-weight: 700;
  color: #175599;
}

/* Section Separators */
.section-separator {
  height: 8px;
  background: #f7f7f7;
  width: 100%;
}
</style>