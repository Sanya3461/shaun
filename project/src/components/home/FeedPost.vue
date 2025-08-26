<template>
  <div class="feed-post">
    <div class="post-content">
      <!-- Post Header -->
      <div class="post-header">
        <div class="author-info">
          <div class="author-avatar">
            <img 
              :src="post.author.avatar" 
              :alt="post.author.name + ' profile'"
              class="avatar-image"
            />
          </div>
          <div class="author-details">
            <div class="author-name">{{ post.author.name }}</div>
            <div class="post-time">{{ post.timeAgo }}</div>
          </div>
        </div>
        <button class="follow-button" :class="{ following: post.author.isFollowing }">
          {{ post.author.isFollowing ? 'Following' : 'Follow' }}
        </button>
      </div>

      <!-- Looking for crew badge -->
      <div v-if="post.lookingForCrew" class="crew-badge-container">
        <div class="crew-badge">{{ post.crewType || 'Looking for crew' }}</div>
      </div>

      <!-- Post Title -->
      <div class="post-title-container">
        <h3 class="post-title">{{ post.title }}</h3>
      </div>

      <!-- Post Content -->
      <div class="post-text-container">
        <p class="post-text">{{ post.content }}</p>
        <button v-if="post.lookingForCrew" class="interest-button">
          Show Interest
        </button>
      </div>

      <!-- Session Data -->
      <div v-if="post.sessionData" class="session-data">
        <div class="session-stats">
          <div class="session-stat">
            <div class="session-stat-label">Time</div>
            <div class="session-stat-value">{{ post.sessionData.time }}</div>
          </div>
          <div class="session-stat">
            <div class="session-stat-label">Distance</div>
            <div class="session-stat-value">{{ post.sessionData.distance }}</div>
          </div>
          <div class="session-stat">
            <div class="session-stat-label">Avg Speed</div>
            <div class="session-stat-value">{{ post.sessionData.avgSpeed }}</div>
          </div>
          <div class="session-stat">
            <div class="session-stat-label">Max speed</div>
            <div class="session-stat-value">{{ post.sessionData.maxSpeed }}</div>
          </div>
        </div>
      </div>

      <!-- Achievements -->
      <div v-if="post.achievement" class="achievements">
        <div class="merit-badge">
          <svg class="merit-icon" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 0.5C23.4853 0.5 25.5 2.51472 25.5 5V21C25.5 23.4853 23.4853 25.5 21 25.5H5C2.51472 25.5 0.5 23.4853 0.5 21V5C0.5 2.51472 2.51472 0.5 5 0.5H21Z" fill="#AED4E7"/>
            <path d="M21 0.5C23.4853 0.5 25.5 2.51472 25.5 5V21C25.5 23.4853 23.4853 25.5 21 25.5H5C2.51472 25.5 0.5 23.4853 0.5 21V5C0.5 2.51472 2.51472 0.5 5 0.5H21Z" stroke="white"/>
            <path d="M14.0049 17.9411V20.0029H19.0049V22.0029H7.00488V20.0029H12.0049V17.9411C8.05857 17.449 5.00488 14.0826 5.00488 10.0029V4.00293H21.0049V10.0029C21.0049 14.0826 17.9512 17.449 14.0049 17.9411ZM7.00488 6.00293V10.0029C7.00488 13.3167 9.69117 16.0029 13.0049 16.0029C16.3186 16.0029 19.0049 13.3167 19.0049 10.0029V6.00293H7.00488ZM2.00488 6.00293H4.00488V10.0029H2.00488V6.00293ZM22.0049 6.00293H24.0049V10.0029H22.0049V6.00293Z" fill="#FD5E2B"/>
          </svg>
          <span class="merit-text">{{ post.achievement.text }}</span>
        </div>
      </div>

      <!-- Images -->
      <div v-if="post.images && post.images.length > 0" class="post-images">
        <img 
          v-for="(image, imgIndex) in post.images" 
          :key="imgIndex"
          class="post-image" 
          :alt="'Sailing image ' + (imgIndex + 1)"
          :src="image"
        />
      </div>

      <!-- Engagement Stats -->
      <div class="engagement-stats">
        <div class="kudos-count">{{ post.kudos }} kudos</div>
        <div class="comments-count">{{ post.comments }} comments</div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <div class="left-actions">
          <div class="like-action">
            <HeartIcon class="action-icon" />
          </div>
          <MessageSquareIcon class="action-icon" @click="openComments" />
        </div>
        <ShareIcon class="action-icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Heart as HeartIcon, MessageSquare as MessageSquareIcon, Share as ShareIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import type { FeedPostData } from '../../types'

defineProps<{
  post: FeedPostData
}>()

const router = useRouter()

const openComments = () => {
  router.push('/comments')
}
</script>

<style scoped>
.feed-post {
  width: 100%;
  border-bottom: 8px solid #f7f7f7;
}

.post-content {
  padding: 16px;
  background: white;
}

.post-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.author-avatar {
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

.author-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}

.author-name {
  font-family: var(--kwindoo-highlight-font-family);
  font-weight: var(--kwindoo-highlight-font-weight);
  color: #2a3e4a;
  font-size: var(--kwindoo-highlight-font-size);
  letter-spacing: var(--kwindoo-highlight-letter-spacing);
  white-space: nowrap;
  line-height: var(--kwindoo-highlight-line-height);
  font-style: var(--kwindoo-highlight-font-style);
}

.post-time {
  font-family: var(--kwindoo-navigation-text-font-family);
  font-weight: var(--kwindoo-navigation-text-font-weight);
  color: #9ba1a6;
  font-size: var(--kwindoo-navigation-text-font-size);
  letter-spacing: var(--kwindoo-navigation-text-letter-spacing);
  white-space: nowrap;
  line-height: var(--kwindoo-navigation-text-line-height);
  font-style: var(--kwindoo-navigation-text-font-style);
}

.follow-button {
  height: 32px;
  border-radius: 1000px;
  border: 1px solid #0099e7;
  color: #0099e7;
  background: #0099E7;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  flex-shrink: 0;
}

.follow-button.following {
  background: #f8f9fa;
  border-color: #e0e0e0;
  color: #6a6a6a;
}

.follow-button:hover {
  background: #e9ecef;
}

.follow-button:active {
  transform: scale(0.95);
}

.crew-badge-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 8px;
}

.crew-badge {
  height: 24px;
  padding: 4px 8px;
  background: #ff5e27;
  color: white;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.post-title-container {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
}

.post-title {
  flex: 1;
  margin: 0;
  font-family: var(--kwindoo-card-header-font-family);
  font-weight: var(--kwindoo-card-header-font-weight);
  color: #2a3e4a;
  font-size: var(--kwindoo-card-header-font-size);
  letter-spacing: var(--kwindoo-card-header-letter-spacing);
  line-height: var(--kwindoo-card-header-line-height);
  font-style: var(--kwindoo-card-header-font-style);
}

.post-text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-bottom: 16px;
}

.post-text {
  width: 100%;
  margin: 0;
  font-family: var(--kwindoo-body-font-family);
  font-weight: var(--kwindoo-body-font-weight);
  color: #2a3e4a;
  font-size: var(--kwindoo-body-font-size);
  letter-spacing: var(--kwindoo-body-letter-spacing);
  line-height: var(--kwindoo-body-line-height);
  font-style: var(--kwindoo-body-font-style);
}

.interest-button {
  height: 32px;
  border-radius: 1000px;
  border: 1px solid #0099e7;
  color: #0099e7;
  background: #f8f9fa;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
}

.interest-button:hover {
  background: #e9ecef;
}

.interest-button:active {
  transform: scale(0.95);
}

.session-data {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  width: 100%;
  margin-bottom: 16px;
  background: white;
  border-radius: 8px;
}

.session-stats {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}

.session-stat {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

.session-stat-label {
  font-family: var(--kwindoo-label-small-font-family);
  font-weight: var(--kwindoo-label-small-font-weight);
  color: #6a6a6a;
  font-size: var(--kwindoo-label-small-font-size);
  letter-spacing: var(--kwindoo-label-small-letter-spacing);
  text-align: center;
  line-height: var(--kwindoo-label-small-line-height);
  font-style: var(--kwindoo-label-small-font-style);
}

.session-stat-value {
  font-weight: bold;
  color: #2a3e4a;
  font-size: 16px;
  text-align: center;
  line-height: 16px;
  font-family: 'Roboto', Helvetica;
}

.achievements {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  margin-bottom: 16px;
}

.merit-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  width: 100%;
  background: #00A8E8;
  border-radius: 8px;
}

.merit-icon {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
}

.merit-text {
  font-weight: 500;
  color: white;
  font-size: 14px;
  font-family: 'Roboto', Helvetica;
  line-height: 1.4;
}

.post-images {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 16px;
}

.post-image {
  width: 137px;
  height: 184px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.engagement-stats {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
}

.kudos-count,
.comments-count {
  font-family: var(--kwindoo-label-small-font-family);
  font-weight: var(--kwindoo-label-small-font-weight);
  color: #6a6a6a;
  font-size: var(--kwindoo-label-small-font-size);
  letter-spacing: var(--kwindoo-label-small-letter-spacing);
  white-space: nowrap;
  text-align: center;
  line-height: var(--kwindoo-label-small-line-height);
  font-style: var(--kwindoo-label-small-font-style);
}

.action-buttons {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 48px;
}

.left-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.like-action {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-icon {
  width: 24px;
  height: 24px;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 12px;
  border-radius: 8px;
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-icon:hover {
  color: #0099e7;
  background: rgba(0, 153, 231, 0.1);
}

.action-icon:active {
  transform: scale(0.95);
}
</style>