<template>
  <div class="user-recent-posts">
    <!-- Posts Header -->
    <div class="posts-header">
      <h2 class="posts-title">RECENT POSTS</h2>
    </div>

    <!-- Posts List -->
    <div 
      v-for="(post, index) in userPosts" 
      :key="index"
      class="post-card"
    >
      <div class="post-content">
        <!-- Post Header -->
        <div class="post-header">
          <div class="author-info">
            <div class="author-avatar">
              <img 
                :src="userProfile?.profileImage || ''" 
                :alt="userProfile?.name + ' profile'"
                class="avatar-image"
              />
            </div>
            <div class="author-details">
              <div class="author-name">{{ userProfile?.name || 'Unknown User' }}</div>
              <div class="post-time">{{ post.timeAgo }}</div>
            </div>
          </div>
          <button class="follow-button">Following</button>
        </div>

        <!-- Looking for crew badge -->
        <div v-if="post.lookingForCrew" class="crew-badge-container">
          <div class="crew-badge">Looking for crew</div>
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
        <div v-if="post.hasSessionData" class="session-data">
          <div class="session-stats">
            <div class="session-stat">
              <div class="session-stat-label">Time</div>
              <div class="session-stat-value">
                <span class="stat-number">1</span><span class="stat-unit">h</span> <span class="stat-number">15</span><span class="stat-unit">m</span>
              </div>
            </div>
            <div class="session-stat">
              <div class="session-stat-label">Distance</div>
              <div class="session-stat-value">
                <span class="stat-number">18</span><span class="stat-unit">nm</span>
              </div>
            </div>
            <div class="session-stat">
              <div class="session-stat-label">Avg Speed</div>
              <div class="session-stat-value">
                <span class="stat-number">14</span><span class="stat-unit">kts</span>
              </div>
            </div>
            <div class="session-stat">
              <div class="session-stat-label">Max speed</div>
              <div class="session-stat-value">
                <span class="stat-number">22</span><span class="stat-unit">kts</span>
              </div>
            </div>
          </div>
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
            <MessageSquareIcon class="action-icon" />
          </div>
          <ShareIcon class="action-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Heart as HeartIcon, MessageSquare as MessageSquareIcon, Share as ShareIcon } from 'lucide-vue-next'
import { useUserProfileStore } from '../../stores/userProfile'
import type { RecentPost } from '../../types'

defineProps<{
  userId: string
}>()

const userProfileStore = useUserProfileStore()
const userProfile = computed(() => userProfileStore.currentUserProfile)

// Mock user posts - replace with API call
const userPosts: RecentPost[] = [
  {
    author: "Sarah Johnson",
    timeAgo: "3 hours ago",
    title: "Perfect Day on San Francisco Bay",
    content: "Had an amazing sailing session today with perfect wind conditions. The bay was absolutely stunning with clear skies and steady 15-knot winds. Can't wait for the next adventure!",
    kudos: 15,
    comments: 8,
    lookingForCrew: false,
    hasSessionData: true,
    hasAchievements: false,
    hasImages: false
  },
  {
    author: "Sarah Johnson",
    timeAgo: "1 day ago",
    title: "Looking for Experienced Crew",
    content: "Planning a weekend regatta and need an experienced trimmer. Must have racing experience and be available for practice sessions. Great opportunity to sail with a competitive team!",
    kudos: 12,
    comments: 5,
    lookingForCrew: true,
    hasSessionData: false,
    hasAchievements: false,
    hasImages: false
  }
]
</script>

<style scoped>
.user-recent-posts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.posts-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px 0;
  width: 100%;
}

.posts-title {
  margin: 0;
  font-family: var(--kwindoo-header-font-family);
  font-weight: var(--kwindoo-header-font-weight);
  color: #6a6a6a;
  font-size: var(--kwindoo-header-font-size);
  letter-spacing: var(--kwindoo-header-letter-spacing);
  line-height: var(--kwindoo-header-line-height);
  white-space: nowrap;
  font-style: var(--kwindoo-header-font-style);
}

.post-card {
  width: 100%;
  border: 1px solid #e0e0e0;
}

.post-content {
  padding: 16px 8px;
  background: white;
}

.post-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 8px;
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
  border: 1px solid #e0e0e0;
  color: #0099e7;
  background: #f8f9fa;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  flex-shrink: 0;
}

.follow-button:hover {
  background: #e9ecef;
  border-color: #0099e7;
}

.follow-button:active {
  transform: scale(0.95);
}

.crew-badge-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 8px;
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
  padding: 0 8px;
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
  padding: 0 8px;
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
  padding: 16px 8px;
  width: 100%;
  margin-bottom: 16px;
  background: white;
  border-radius: 8px;
  margin-left: 8px;
  margin-right: 8px;
  width: calc(100% - 16px);
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
  font-weight: normal;
  color: #2a3e4a;
  font-size: 16px;
  text-align: center;
  line-height: 16px;
  font-family: 'Roboto', Helvetica;
}

.stat-number {
  font-weight: 700;
  font-size: 16px;
  color: #2a3e4a;
}

.stat-unit {
  font-weight: 400;
  font-size: 12px;
  color: #6a6a6a;
  margin-left: 2px;
}

.engagement-stats {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 8px;
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
  padding: 0 8px;
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