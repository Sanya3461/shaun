<template>
  <div class="self-content">
    <!-- Join Running Header -->
    <div class="join-tracking-header">
      <span class="join-tracking-label">JOIN RUNNING SELF TRACKING</span>
    </div>
    
    <!-- Join Running Self Tracking Card -->
    <div class="join-tracking-card">
      <div class="tracking-session-info">
        <div class="session-header">
          <div class="session-title-container">
            <h3 class="session-title">Botond Kristof Penzes's Self Tracking 2018/08/22 11:13</h3>
            <button class="delete-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H21V8H19V20C19 21.1 18.1 22 17 22H7C5.9 22 5 21.1 5 20V8H3V6ZM8 4V6H16V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4ZM7 8V20H17V8H7ZM9 10H11V18H9V10ZM13 10H15V18H13V10Z"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="session-details">
          <div class="session-avatar">
            <img 
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
              alt="Botond Kristof Penzes"
              class="avatar-image"
            />
          </div>
          
          <div class="session-info">
            <div class="rejoin-info">
              <span class="rejoin-text">You can rejoin until</span>
              <span class="rejoin-time">2018/08/23 03:13</span>
            </div>
            <div class="session-location">Budapest, Hungary</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Start Self Tracking Button -->
    <div class="start-tracking-section">
      <button class="start-self-tracking-button" @click="startSelfTracking">
        START SELF TRACKING
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const startSelfTracking = () => {
  console.log('Starting self tracking')
}
</script>

<style scoped>
.self-content {
  display: flex;
  flex-direction: column;
  gap: 0px;
  height: 100%;
}

/* Join Tracking Card */
.join-tracking-card {
  margin-top: auto;
}

.join-tracking-header {
  padding: 12px 10px;
  margin: 0 -20px;
  background: #f7f7f7;
}

.join-tracking-label {
  font-size: 16px;
  font-weight: 600;
  color: #6a6a6a;
  letter-spacing: 0.5px;
}

.tracking-session-info {
  padding: 20px 20px;
  background: white;
  margin: 0 -20px;
}

.session-header {
  margin-bottom: 20px;
}

.session-title-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.session-title {
  font-size: 18px;
  font-weight: 600;
  color: #0099e7;
  margin: 0;
  line-height: 1.3;
  flex: 1;
}

.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  color: #9ba1a6;
  flex-shrink: 0;
}

.delete-button:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #ef4444;
}

.session-details {
  display: flex;
  align-items: center;
  gap: 16px;
}

.session-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.session-info {
  flex: 1;
}

.rejoin-info {
  margin-bottom: 4px;
}

.rejoin-text {
  font-size: 14px;
  color: #22c55e;
  font-weight: 500;
}

.rejoin-time {
  font-size: 14px;
  color: #22c55e;
  font-weight: 600;
  margin-left: 4px;
}

.session-location {
  font-size: 14px;
  color: #9ba1a6;
}

/* Start Self Tracking Section */
.start-tracking-section {
  margin-top: 24px;
}

.start-self-tracking-button {
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

.start-self-tracking-button:hover {
  background: #0088cc;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 153, 231, 0.3);
}

.start-self-tracking-button:active {
  transform: translateY(0);
}
</style>