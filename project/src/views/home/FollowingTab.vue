<template>
  <div class="following-tab">
    <!-- Posts Feed -->
    <div class="posts-feed">
      <FeedPost 
        v-for="post in followingPosts" 
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import FeedPost from '../../components/home/FeedPost.vue'
import type { FeedPostData } from '../../types'

const followingPosts: FeedPostData[] = [
  {
    id: '1',
    author: {
      name: 'Botond Kristof',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop',
      isFollowing: true
    },
    timeAgo: '2 hours ago',
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
    id: '2',
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
.following-tab {
  background: white;
}

.posts-feed {
  background: white;
}
</style>