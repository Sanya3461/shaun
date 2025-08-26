<template>
  <div class="user-profile-header">
    <div class="profile-content">
      <div class="profile-info">
        <div class="avatar">
          <img 
            :src="user.profileImage" 
            :alt="user.name + ' profile picture'"
            class="avatar-image"
          />
        </div>
        <div class="user-details">
          <h2 class="user-name">{{ user.name }}</h2>
          <p class="user-email">{{ user.email }}</p>
        </div>
      </div>
      <div class="action-buttons">
        <button v-if="!isOwnProfile" class="follow-button" @click="toggleFollow">
          {{ isFollowing ? 'Following' : 'Follow' }}
        </button>
        <button v-if="!isOwnProfile" class="message-button" @click="sendMessage">
          <MessageSquareIcon class="message-icon" />
        </button>
        <button v-if="isOwnProfile" class="settings-button" @click="openSettings">
          <SettingsIcon class="settings-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Settings as SettingsIcon, MessageSquare as MessageSquareIcon } from 'lucide-vue-next'
import type { UserData } from '../../types'

defineProps<{
  user: UserData
  isOwnProfile: boolean
}>()

const isFollowing = ref(false)

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value
  // TODO: API call to follow/unfollow user
}

const sendMessage = () => {
  // TODO: Navigate to messaging or open message modal
  console.log('Send message')
}

const openSettings = () => {
  // TODO: Open settings
  console.log('Open settings')
}
</script>

<style scoped>
.user-profile-header {
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
  flex: 1;
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
  flex: 1;
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

.action-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.follow-button,
.message-button,
.settings-button {
  background: none;
  border: 1px solid white;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.2s ease;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.follow-button {
  min-width: 80px;
}

.message-button {
  min-width: 44px;
  padding: 8px;
}

.follow-button:hover,
.message-button:hover,
.settings-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.follow-button:active,
.message-button:active,
.settings-button:active {
  transform: scale(0.95);
}

.message-icon,
.settings-icon {
  width: 20px;
  height: 20px;
}
</style>