<template>
  <div class="discover-tab">
    <!-- Container above sections -->
    <div class="top-container">
      <!-- This container can hold additional content if needed -->
    </div>
    
    <!-- Nearby Sailors Section -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Nearby Sailors</h2>
      </div>
      
      <div class="sailors-list">
        <div v-for="sailor in nearbySailors" :key="sailor.id" class="sailor-item">
          <div class="sailor-info">
            <div class="sailor-avatar">
              <img :src="sailor.avatar" :alt="sailor.name" class="avatar-image" />
            </div>
            <div class="sailor-details">
              <div class="sailor-name">{{ sailor.name }}</div>
              <div class="sailor-distance">{{ sailor.distance }}</div>
            </div>
          </div>
          <button class="follow-btn">Follow</button>
        </div>
      </div>
    </div>

    <!-- Posts Feed -->
    <div class="posts-feed">
      <FeedPost 
        v-for="post in discoveryPosts" 
        :key="post.id"
        :post="post"
      />
    </div>

    <!-- Nearby Events Section -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Nearby Events</h2>
      </div>
      
      <div class="events-list">
        <div v-for="event in nearbyEvents" :key="event.id" class="event-item">
          <div class="event-logo">
            <img :src="event.logo" :alt="event.name" class="event-logo-img" />
          </div>
          <div class="event-details">
            <div class="event-name">{{ event.name }}</div>
            <div class="event-date">{{ event.date }}</div>
          </div>
          <ChevronRightIcon class="chevron" />
        </div>
      </div>
    </div>

    <!-- Challenge Section -->
    <div class="challenge-section">
      <div class="challenge-card">
        <div class="challenge-icon">
          <MessageSquareIcon class="challenge-icon-svg" />
        </div>
        <div class="challenge-text">Complete weekly sailing challenge</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight as ChevronRightIcon, MessageSquare as MessageSquareIcon } from 'lucide-vue-next'
import FeedPost from '../../components/home/FeedPost.vue'
import type { FeedPostData } from '../../types'

const nearbySailors = [
  {
    id: '1',
    name: 'Peter',
    distance: '2.1km',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop'
  },
  {
    id: '2',
    name: 'Cole',
    distance: '4.1km',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop'
  },
  {
    id: '3',
    name: 'Lara',
    distance: '5.5km',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop'
  },
  {
    id: '4',
    name: 'Botond Kristof',
    distance: '6.2km',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop'
  }
]

const nearbyEvents = [
  {
    id: '1',
    name: 'Balatoni Évadnyitó',
    date: 'May 3, 12:25',
    logo: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop'
  },
  {
    id: '2',
    name: 'Fesztivál a Tóparton',
    date: 'June 15, 10:00',
    logo: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop'
  }
]

const discoveryPosts: FeedPostData[] = [
  {
    id: '1',
    author: {
      name: 'Botond Kristof',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop',
      isFollowing: true
    },
    timeAgo: '2 hours ago',
    title: 'Morning Training Session',
    content: 'Two hours ago, we set sail on shimmering waves, feeling the breeze fill our sails. The sun dipped below the horizon, painting the sky in orange and pink—a perfect evening for sailing.',
    sessionData: {
      time: '0h 37m',
      distance: '22nm',
      avgSpeed: '12kts',
      maxSpeed: '19kts'
    },
    achievement: {
      text: 'Kristof gained the Merit Out badge!',
      icon: 'merit'
    },
    images: [
      'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=137&h=184&fit=crop',
      'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=137&h=184&fit=crop',
      'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=137&h=184&fit=crop'
    ],
    kudos: 20,
    comments: 16,
    lookingForCrew: false
  },
  {
    id: '2',
    author: {
      name: 'Botond Kristof',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop',
      isFollowing: true
    },
    timeAgo: '4 hours ago',
    title: 'Afternoon Sail',
    content: 'Two hours ago, we set sail on shimmering waves, feeling the breeze fill our sails. The sun dipped below the horizon, painting the sky in orange and pink—a perfect evening for sailing.',
    sessionData: {
      time: '0h 37m',
      distance: '22nm',
      avgSpeed: '12kts',
      maxSpeed: '19kts'
    },
    achievement: {
      text: 'Kristof gained the Merit Out badge!',
      icon: 'merit'
    },
    images: [
      'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=137&h=184&fit=crop',
      'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=137&h=184&fit=crop',
      'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=137&h=184&fit=crop'
    ],
    kudos: 20,
    comments: 16,
    lookingForCrew: false
  },
  {
    id: '3',
    author: {
      name: 'Botond Kristof',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop',
      isFollowing: true
    },
    timeAgo: '6 hours ago',
    title: 'Experienced Trimmer Needed for Weekend Regatta',
    content: 'We are looking for a skilled and experienced trimmer to join our team for an exciting weekend regatta. If you have a passion for sailing and a proven track record in trimming sails, we would love to hear from you!',
    kudos: 23,
    comments: 18,
    lookingForCrew: true,
    crewType: 'Looking for crew'
  }
]
</script>

<style scoped>
.discover-tab {
  padding: 0;
  background: white;
}

.top-container {
  padding: 8px 16px;
  background: #f7f7f7;
  border-bottom: 1px solid #f0f0f0;
}

.section {
  padding: 16px;
  border-bottom: 8px solid #f7f7f7;
}

.section-header {
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #2a3e4a;
  margin: 0;
}

/* Nearby Sailors */
.sailors-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sailor-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}

.sailor-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.sailor-avatar {
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

.sailor-details {
  flex: 1;
}

.sailor-name {
  font-size: 16px;
  font-weight: 600;
  color: #2a3e4a;
  margin-bottom: 2px;
}

.sailor-distance {
  font-size: 14px;
  color: #9ba1a6;
}

.follow-btn {
  background: #0099e7;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  min-height: 44px;
  transition: background-color 0.2s ease;
}

.follow-btn:hover {
  background: #0088cc;
}

/* Posts Feed */
.posts-feed {
  background: white;
}

/* Nearby Events */
.events-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  min-height: 44px;
}

.event-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.event-logo {
  width: 48px;
  height: 48px;
  border-radius: 8px;
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
  font-size: 16px;
  font-weight: 600;
  color: #175599;
  margin-bottom: 2px;
}

.event-date {
  font-size: 14px;
  color: #9ba1a6;
}

.chevron {
  width: 24px;
  height: 24px;
  color: #9ba1a6;
}

/* Challenge Section */
.challenge-section {
  padding: 16px;
  background: white;
}

.challenge-card {
  background: #0099e7;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  color: white;
}

.challenge-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.challenge-icon-svg {
  width: 24px;
  height: 24px;
  color: white;
}

.challenge-text {
  font-size: 16px;
  font-weight: 600;
  flex: 1;
}
</style>