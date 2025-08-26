<template>
  <div class="user-card">
    <div class="user-header">
      <div class="user-info">
        <div class="user-avatar">
          <img :src="user.avatar" :alt="user.name" class="avatar-image" />
        </div>
        <div class="user-details">
          <h3 class="user-name">{{ user.name }}</h3>
          <p class="user-distance">{{ user.distance }}</p>
        </div>
      </div>
      <button class="view-profile-btn" @click="$emit('view-profile', user)">
        View Profile
      </button>
    </div>

    <div class="user-content">
      <!-- Position Tags -->
      <div class="position-tags">
        <span
          v-for="position in user.positions"
          :key="position"
          class="position-tag"
        >
          {{ position }}
        </span>
      </div>

      <!-- Availability -->
      <div class="availability-pill">
        {{ user.availability }}
      </div>

      <!-- Contact Icons (only show if approved) -->
      <div v-if="user.status === 'approved'" class="contact-icons">
        <div
          v-for="method in user.contact"
          :key="method"
          :class="['contact-icon', method]"
        >
          <MailIcon v-if="method === 'email'" />
          <PhoneIcon v-if="method === 'phone'" />
          <MessageSquareIcon v-if="method === 'whatsapp'" />
          <MessageCircleIcon v-if="method === 'signal'" />
        </div>
      </div>
    </div>

    <div class="user-actions">
      <button
        :class="['action-btn', 'primary', { requesting: user.status === 'requesting' }]"
        :disabled="user.status === 'requesting'"
        @click="handleRequestContact"
      >
        {{ getRequestButtonText() }}
      </button>
      <button
        :class="['action-btn', 'outline', { following: user.isFollowing }]"
        @click="$emit('follow', user)"
      >
        {{ user.isFollowing ? 'Following' : 'Follow' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Mail as MailIcon, Phone as PhoneIcon, MessageSquare as MessageSquareIcon, MessageCircle as MessageCircleIcon } from 'lucide-vue-next'

const props = defineProps<{
  user: {
    id: string
    name: string
    avatar: string
    distance: string
    positions: string[]
    availability: string
    contact: string[]
    status: string
    isFollowing: boolean
  }
}>()

const emit = defineEmits<{
  'request-contact': [user: any]
  'follow': [user: any]
  'view-profile': [user: any]
}>()

const handleRequestContact = () => {
  if (props.user.status !== 'requesting') {
    emit('request-contact', props.user)
  }
}

const getRequestButtonText = () => {
  switch (props.user.status) {
    case 'requesting':
      return 'Requesting...'
    case 'approved':
      return 'Contact Approved'
    default:
      return 'Request Contact'
  }
}
</script>

<style scoped>
.user-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.user-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  color: #2a3e4a;
  margin: 0 0 4px 0;
}

.user-distance {
  font-size: 14px;
  color: #9ba1a6;
  margin: 0;
}

.view-profile-btn {
  padding: 8px 16px;
  border: 1px solid #0099e7;
  background: white;
  color: #0099e7;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 36px;
  white-space: nowrap;
}

.view-profile-btn:hover {
  background: rgba(0, 153, 231, 0.1);
}

.view-profile-btn:active {
  transform: scale(0.98);
}

.user-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.position-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.position-tag {
  padding: 6px 12px;
  background: #f8f9fa;
  color: #2a3e4a;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #e0e0e0;
}

.availability-pill {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background: #f0f0f0;
  color: #2a3e4a;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  width: fit-content;
}

.contact-icons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.contact-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.contact-icon.email {
  background: #ea4335;
}

.contact-icon.phone {
  background: #34a853;
}

.contact-icon.whatsapp {
  background: #25d366;
}

.contact-icon.signal {
  background: #3a76f0;
}

.contact-icon svg {
  width: 16px;
  height: 16px;
}

.user-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  padding: 12px 16px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.action-btn.primary {
  background: #0099e7;
  color: white;
}

.action-btn.primary:hover:not(:disabled) {
  background: #0088cc;
}

.action-btn.primary.requesting {
  background: #9ba1a6;
  cursor: not-allowed;
}

.action-btn.outline {
  background: white;
  color: #0099e7;
  border: 1px solid #0099e7;
}

.action-btn.outline:hover {
  background: rgba(0, 153, 231, 0.1);
}

.action-btn.outline.following {
  background: #f8f9fa;
  color: #2a3e4a;
  border-color: #e0e0e0;
}

.action-btn:active:not(:disabled) {
  transform: scale(0.98);
}
</style>