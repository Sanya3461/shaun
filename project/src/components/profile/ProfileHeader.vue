<template>
  <div class="profile-header">
    <div class="profile-content">
      <div class="profile-info">
        <div class="avatar">
          <img 
            :src="userData.profileImage" 
            :alt="userData.name + ' profile picture'"
            class="avatar-image"
          />
        </div>
        <div class="user-details">
          <h2 class="user-name">{{ userData.name }}</h2>
          <p class="user-email">{{ userData.email }}</p>
        </div>
      </div>
      <button class="settings-button" @click="openSettings">
        <SettingsIcon class="settings-icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Settings as SettingsIcon } from 'lucide-vue-next'
import { useUserStore } from '../../stores/user.ts'

const userStore = useUserStore()
const userData = userStore.user

const openSettings = () => {
  console.log('Opening settings for:', userData.name)
}
</script>

<style scoped>
.profile-header {
  width: 100%;
  background: #22313a;
  z-index: 4;
}

.profile-content {
  padding: 20px;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}

.user-name {
  color: white;
  font-family: var(--kwindoo-botond-kristof-font-family);
  font-size: 21px;
  letter-spacing: -0.21px;
  margin: 0;
  font-weight: 400;
}

.user-email {
  color: #9ba1a6;
  font-family: var(--kwindoo-label1-font-family);
  font-size: 16px;
  letter-spacing: 0.48px;
  margin: 0;
}

.settings-button {
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

.settings-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.settings-button:active {
  transform: scale(0.95);
}

.settings-icon {
  width: 24px;
  height: 24px;
  color: white;
}
</style>