<template>
  <div class="event-content">
    <!-- User Profile Section -->
    <div class="user-profile-section">
      <div class="user-avatar">
        <img 
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
          alt="Botond Kristof Penzes"
          class="avatar-image"
        />
      </div>
      <div class="user-info">
        <div class="user-name">Botond Kristof Penzes</div>
        <div class="user-email">botondpenzes@kwindoo.com</div>
      </div>
    </div>

    <!-- Boat Name Section -->
    <div class="form-section">
      <label class="form-label">Boat name</label>
      <div class="form-input-container">
        <input 
          v-model="boatName"
          type="text" 
          class="form-input"
          placeholder="Enter boat name"
        />
        <div class="input-underline"></div>
      </div>
    </div>

    <!-- Name Section -->
    <div class="form-section">
      <div class="form-input-container">
        <input 
          v-model="sessionName"
          type="text" 
          class="form-input placeholder-style"
          placeholder="Name"
        />
      </div>
    </div>

    <!-- More Details Section -->
    <div class="detail-item" @click="openMoreDetails">
      <div class="detail-content">
        <span class="detail-label">More details</span>
      </div>
      <ChevronRightIcon class="detail-chevron" />
    </div>

    <!-- Boat Type Section -->
    <div class="detail-item" @click="openBoatTypeSelector">
      <div class="detail-icon-container">
        <div class="detail-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        </div>
      </div>
      <div class="detail-content">
        <div class="detail-label">Boat Type</div>
        <div class="detail-value">{{ selectedBoatType }}</div>
      </div>
      <ChevronRightIcon class="detail-chevron" />
    </div>

    <!-- Events Available Section -->
    <div class="events-available-section">
      <div class="events-icon-container">
        <div class="events-icon">
          <div class="events-count">3</div>
        </div>
      </div>
      <div class="events-content">
        <div class="events-title">3 events available to join</div>
        <div class="events-subtitle">Select event to start tracking</div>
      </div>
      <button class="refresh-button" @click="refreshEvents">
        <RefreshCwIcon class="refresh-icon" />
      </button>
    </div>

    <!-- Select Event Button -->
    <div class="select-event-section">
      <button class="select-event-button" @click="selectEvent">
        SELECT EVENT...
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronRight as ChevronRightIcon, RefreshCw as RefreshCwIcon } from 'lucide-vue-next'

const boatName = ref('')
const sessionName = ref('')
const selectedBoatType = ref('Monohull')

const openMoreDetails = () => {
  console.log('Opening more details')
}

const openBoatTypeSelector = () => {
  console.log('Opening boat type selector')
}

const refreshEvents = () => {
  console.log('Refreshing events')
}

const selectEvent = () => {
  console.log('Selecting event')
}
</script>

<style scoped>
.event-content {
  display: flex;
  flex-direction: column;
  gap: 0px;
  height: 100%;
}

/* User Profile Section */
.user-profile-section {
  background: white;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  margin: 0 -20px;
  border-bottom: 1px solid #f0f0f0;
}

.user-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  color: #2a3e4a;
  margin-bottom: 4px;
}

.user-email {
  font-size: 14px;
  color: #9ba1a6;
}

/* Form Sections */
.form-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 16px;
  font-weight: 500;
  color: #2a3e4a;
}

.form-input-container {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 12px 0;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #2a3e4a;
  outline: none;
  border-bottom: 2px solid #e0e0e0;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  border-bottom-color: #ff6b35;
}

.form-input.placeholder-style::placeholder {
  color: #9ba1a6;
  font-size: 16px;
}

.input-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: #ff6b35;
  width: 0;
  transition: width 0.3s ease;
}

.form-input:focus + .input-underline {
  width: 100%;
}

/* Detail Items */
.detail-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 8px;
  min-height: 60px;
}

.detail-item:hover {
  background: rgba(0, 0, 0, 0.02);
}

.detail-item:active {
  transform: scale(0.98);
}

.detail-icon-container {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.detail-icon {
  width: 24px;
  height: 24px;
  color: #9ba1a6;
}

.detail-content {
  flex: 1;
}

.detail-label {
  font-size: 16px;
  font-weight: 500;
  color: #2a3e4a;
  margin-bottom: 2px;
}

.detail-value {
  font-size: 14px;
  color: #9ba1a6;
}

.detail-chevron {
  width: 24px;
  height: 24px;
  color: #9ba1a6;
  flex-shrink: 0;
}

/* Events Available Section */
.events-available-section {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  min-height: 60px;
}

.events-icon-container {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #0099e7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
}

.events-icon {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.events-count {
  font-size: 12px;
  font-weight: 700;
  color: #0099e7;
}

.events-content {
  flex: 1;
}

.events-title {
  font-size: 16px;
  font-weight: 600;
  color: #2a3e4a;
  margin-bottom: 2px;
}

.events-subtitle {
  font-size: 14px;
  color: #9ba1a6;
}

.refresh-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.refresh-button:hover {
  background: rgba(0, 153, 231, 0.1);
}

.refresh-button:active {
  transform: scale(0.95);
}

.refresh-icon {
  width: 20px;
  height: 20px;
  color: #0099e7;
}

/* Select Event Section */
.select-event-section {
  margin-top: auto;
  padding-top: 24px;
}

.select-event-button {
  width: 100%;
  padding: 16px;
  background: #0099e7;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 56px;
  letter-spacing: 0.5px;
}

.select-event-button:hover {
  background: #0088cc;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 153, 231, 0.3);
}

.select-event-button:active {
  transform: translateY(0);
}
</style>