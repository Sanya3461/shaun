<template>
  <div class="recent-posts">
    <!-- Posts Header -->
    <div class="posts-header">
      <h2 class="posts-title">RECENT POSTS</h2>
    </div>

    <!-- Posts List -->
    <div 
      v-for="(post, index) in recentPosts" 
      :key="index"
      class="post-card"
    >
      <div class="post-content">
        <!-- Post Header -->
        <div class="post-header">
          <div class="author-info">
            <div class="author-avatar"></div>
            <div class="author-details">
              <div class="author-name">{{ post.author }}</div>
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
                <span class="stat-number">0</span><span class="stat-unit">h</span> <span class="stat-number">37</span><span class="stat-unit">m</span>
              </div>
            </div>
            <div class="session-stat">
              <div class="session-stat-label">Distance</div>
              <div class="session-stat-value">
                <span class="stat-number">22</span><span class="stat-unit">nm</span>
              </div>
            </div>
            <div class="session-stat">
              <div class="session-stat-label">Avg Speed</div>
              <div class="session-stat-value">
                <span class="stat-number">12</span><span class="stat-unit">kts</span>
              </div>
            </div>
            <div class="session-stat">
              <div class="session-stat-label">Max speed</div>
              <div class="session-stat-value">
                <span class="stat-number">19</span><span class="stat-unit">kts</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Achievements -->
        <div v-if="post.hasAchievements" class="achievements">
          <div class="merit-badge">
            <svg class="merit-icon" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 0.5C23.4853 0.5 25.5 2.51472 25.5 5V21C25.5 23.4853 23.4853 25.5 21 25.5H5C2.51472 25.5 0.5 23.4853 0.5 21V5C0.5 2.51472 2.51472 0.5 5 0.5H21Z" fill="#AED4E7"/>
              <path d="M21 0.5C23.4853 0.5 25.5 2.51472 25.5 5V21C25.5 23.4853 23.4853 25.5 21 25.5H5C2.51472 25.5 0.5 23.4853 0.5 21V5C0.5 2.51472 2.51472 0.5 5 0.5H21Z" stroke="white"/>
              <path d="M14.0049 17.9411V20.0029H19.0049V22.0029H7.00488V20.0029H12.0049V17.9411C8.05857 17.449 5.00488 14.0826 5.00488 10.0029V4.00293H21.0049V10.0029C21.0049 14.0826 17.9512 17.449 14.0049 17.9411ZM7.00488 6.00293V10.0029C7.00488 13.3167 9.69117 16.0029 13.0049 16.0029C16.3186 16.0029 19.0049 13.3167 19.0049 10.0029V6.00293H7.00488ZM2.00488 6.00293H4.00488V10.0029H2.00488V6.00293ZM22.0049 6.00293H24.0049V10.0029H22.0049V6.00293Z" fill="#FD5E2B"/>
            </svg>
            <span class="merit-text">Kristof gained the Merit Out badge!</span>
          </div>
        </div>

        <!-- Images -->
        <div v-if="post.hasImages" class="post-images">
          <img 
            v-for="(image, imgIndex) in postImages" 
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
  </div>
</template>

<script setup lang="ts">
import { Heart as HeartIcon, MessageSquare as MessageSquareIcon, Share as ShareIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useSailingStore } from '../../stores/sailing.ts'

const router = useRouter()

const recentPosts: RecentPost[] = [
  {
    author: "Botond Kristof",
    timeAgo: "2 hours ago",
    title: "Experienced Trimmer Needed for Weekend Regatta",
    content: "We are looking for a skilled and experienced trimmer to join our team for an exciting weekend regatta. If you have a passion for sailing and a proven track record in trimming sails, we would love to hear from you!",
    kudos: 20,
    comments: 16,
    lookingForCrew: true,
    hasSessionData: false,
    hasAchievements: false,
    hasImages: false
  },
  {
    author: "Botond Kristof",
    timeAgo: "2 hours ago",
    title: "Afternoon Sail",
    content: "Two hours ago, we set sail on shimmering waves, feeling the breeze fill our sails. The sun dipped below the horizon, painting the sky in orange and pink—a perfect evening for sailing.",
    kudos: 20,
    comments: 16,
    lookingForCrew: false,
    hasSessionData: true,
    hasAchievements: true,
    hasImages: true
  }
]

const postImages = [
  "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=137&h=184&fit=crop",
  "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=137&h=184&fit=crop",
  "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=137&h=184&fit=crop"
]

const openComments = () => {
  router.push('/comments')
}
</script>

<style scoped>
.recent-posts {
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
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
}

.post-content {
  padding: 24px;
  background: white;
}

.post-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.author-avatar {
  width: 56px;
  height: 56px;
  background-image: url('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=56&h=56&fit=crop');
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  flex-shrink: 0;
  border: 3px solid #f0f0f0;
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
  font-family: 'Roboto', Helvetica;
  font-weight: 400;
  color: #9ba1a6;
  font-size: 13px;
  white-space: nowrap;
  line-height: 1.2;
}

.follow-button {
  height: 36px;
  border-radius: 18px;
  border: 2px solid #0099e7;
  color: #0099e7;
  background: rgba(0, 153, 231, 0.1);
  padding: 0 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.follow-button:hover {
  background: rgba(0, 153, 231, 0.2);
  border-color: #0088cc;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 153, 231, 0.2);
}

.follow-button:active {
  transform: scale(0.95);
}

.crew-badge-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 12px;
}

.crew-badge {
  height: 32px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #ff5e27, #ff7a3d);
  color: white;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(255, 94, 39, 0.3);
}

.post-title-container {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
}

.post-title {
  flex: 1;
  margin: 0;
  font-family: 'Roboto', Helvetica;
  font-weight: 700;
  color: #1a2a3a;
  font-size: 20px;
  line-height: 1.3;
}

.post-text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 20px;
}

.post-text {
  width: 100%;
  margin: 0;
  font-family: 'Roboto', Helvetica;
  font-weight: 400;
  color: #4a5a6a;
  font-size: 16px;
  line-height: 1.6;
}

.interest-button {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: none;
  color: white;
  background: linear-gradient(135deg, #0099e7, #0088cc);
  padding: 0 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 153, 231, 0.3);
}

.interest-button:hover {
  background: linear-gradient(135deg, #0088cc, #0077bb);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 153, 231, 0.4);
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

.achievements {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 0 8px;
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

.hug-badge {
  background: #8B5CF6;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Roboto', Helvetica;
}

.post-images {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  padding: 0 8px;
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
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  width: 100%;
  margin-bottom: 12px;
}

.kudos-count,
.comments-count {
  font-family: 'Roboto', Helvetica;
  font-weight: 600;
  color: #2a3e4a;
  font-size: 14px;
  white-space: nowrap;
  text-align: center;
  line-height: 1.2;
}

.action-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  width: 100%;
  height: 40px;
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
  width: 28px;
  height: 28px;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 12px;
  min-height: 48px;
  min-width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-icon:hover {
  color: #0099e7;
  background: rgba(0, 153, 231, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 153, 231, 0.2);
}

.action-icon:active {
  transform: scale(0.95);
}
</style>