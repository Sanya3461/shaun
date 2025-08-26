<template>
  <div class="comments-container">
    <!-- Mobile Status Bar -->
    <StatusBar />
    
    <!-- Header with back button -->
    <div class="comments-header">
      <button class="back-button" @click="goBack">
        <ChevronLeftIcon class="back-icon" />
      </button>
      <h1 class="header-title">Comments</h1>
    </div>

    <!-- Post Content -->
    <div class="post-section">
      <!-- Post Image -->
      <div class="post-image-container">
        <img 
          src="https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop"
          alt="Sailing photo"
          class="post-image"
        />
      </div>

      <!-- Post Details -->
      <div class="post-details">
        <div class="post-author">
          <div class="author-avatar">
            <img 
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop"
              alt="Botond Kristof"
              class="avatar-image"
            />
          </div>
          <div class="author-info">
            <div class="author-name">Botond Kristof</div>
            <div class="post-time">2 hours ago</div>
          </div>
        </div>
        
        <h2 class="post-title">Afternoon Sail</h2>
      </div>
    </div>

    <!-- Comments List -->
    <div class="comments-section">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-avatar">
          <img 
            :src="comment.author.avatar"
            :alt="comment.author.name"
            class="avatar-image"
          />
        </div>
        <div class="comment-content">
          <div class="comment-header">
            <span class="comment-author">{{ comment.author.name }}</span>
            <span class="comment-time">{{ comment.timeAgo }}</span>
          </div>
          <p class="comment-text">{{ comment.text }}</p>
          <div class="comment-actions">
            <button class="kudos-button" :class="{ active: comment.hasKudos }">
              <span class="kudos-text">Kudos</span>
              <HeartIcon class="kudos-icon" />
              <span class="kudos-count">{{ comment.kudos }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ChevronLeft as ChevronLeftIcon, Heart as HeartIcon } from 'lucide-vue-next'
import StatusBar from '../../components/layout/StatusBar.vue'
import BottomNavigation from '../../components/navigation/BottomNavigation.vue'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const comments = [
  {
    id: '1',
    author: {
      name: 'Imi Vasváry',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop'
    },
    timeAgo: '2 hours ago',
    text: 'Absolutely stunning! 🧡 Nothing beats those golden hour sails when everything just clicks',
    kudos: 2,
    hasKudos: true
  },
  {
    id: '2',
    author: {
      name: 'Lena Koval',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop'
    },
    timeAgo: '1 hour ago',
    text: 'What a breathtaking view! The vibrant colors blend together in a way that feels almost otherworldly. It\'s like stepping into a painting where every hue dances in harmony, creating a scene that\'s simply magical. 🎨',
    kudos: 5,
    hasKudos: false
  },
  {
    id: '3',
    author: {
      name: 'Marco Chen',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop'
    },
    timeAgo: '30 minutes ago',
    text: 'This is exactly why I sail! 😍 Those sunset sessions are pure magic - when you\'re out there with the perfect breeze and that incredible sky, it just reminds you why we\'re all addicted to this sport. Thanks for sharing this',
    kudos: 0,
    hasKudos: false
  }
]
</script>

<style scoped>
.comments-container {
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

.comments-header {
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

.post-section {
  background: white;
  border-bottom: 8px solid #f7f7f7;
}

.post-image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-details {
  padding: 16px;
}

.post-author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info {
  flex: 1;
}

.author-name {
  font-size: 16px;
  font-weight: 600;
  color: #2a3e4a;
  margin-bottom: 2px;
}

.post-time {
  font-size: 14px;
  color: #9ba1a6;
}

.post-title {
  font-size: 24px;
  font-weight: 600;
  color: #2a3e4a;
  margin: 0;
}

.comments-section {
  flex: 1;
  background: white;
  padding: 16px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.comment-item {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.comment-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.comment-author {
  font-size: 14px;
  font-weight: 600;
  color: #2a3e4a;
}

.comment-time {
  font-size: 12px;
  color: #9ba1a6;
}

.comment-text {
  font-size: 14px;
  color: #2a3e4a;
  line-height: 1.5;
  margin: 0 0 12px 0;
}

.comment-actions {
  display: flex;
  align-items: center;
}

.kudos-button {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 16px;
  transition: all 0.2s ease;
  min-height: 32px;
}

.kudos-button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.kudos-button.active .kudos-icon {
  color: #ff4757;
  fill: #ff4757;
}

.kudos-text {
  font-size: 12px;
  color: #6a6a6a;
  font-weight: 500;
}

.kudos-icon {
  width: 16px;
  height: 16px;
  color: #6a6a6a;
  transition: color 0.2s ease;
}

.kudos-count {
  font-size: 12px;
  color: #6a6a6a;
  font-weight: 600;
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .comments-container {
    border-radius: 0;
    border: none;
    max-width: 100vw;
    min-height: 100vh;
  }
}
</style>