<template>
  <div class="user-overview-tab">
    <!-- User Sailing Results -->
    <UserSailingResults :user-id="userId" />
    
    <!-- User Stats Section -->
    <UserStatsSection :user-id="userId" />
    
    <!-- User Recent Sessions -->
    <UserRecentSessions :user-id="userId" />
    
    <!-- User Crew Members -->
    <UserCrewMembers :user-id="userId" />
    
    <!-- User Recent Posts -->
    <UserRecentPosts :user-id="userId" />
  </div>
</template>

<script setup lang="ts">
import UserSailingResults from '../../components/profile/UserSailingResults.vue'
import UserStatsSection from '../../components/profile/UserStatsSection.vue'
import UserRecentSessions from '../../components/profile/UserRecentSessions.vue'
import UserCrewMembers from '../../components/profile/UserCrewMembers.vue'
import UserRecentPosts from '../../components/posts/UserRecentPosts.vue'

defineProps<{
  userId: string
}>()
</script>

<style scoped>
.user-overview-tab {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>