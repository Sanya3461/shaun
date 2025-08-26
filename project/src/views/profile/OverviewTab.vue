<template>
  <div class="overview-tab">
    <!-- Sailing Results -->
    <SailingResults />
    
    <!-- Stats Section -->
    <StatsSection />
    
    <!-- Recent Sessions -->
    <RecentSessions />
    
    <!-- Crew Members -->
    <CrewMembers />
    
    <!-- Recent Posts -->
    <RecentPosts />
  </div>
</template>

<script setup lang="ts">
import SailingResults from '../../components/profile/SailingResults.vue'
import StatsSection from '../../components/profile/StatsSection.vue'
import RecentSessions from '../../components/profile/RecentSessions.vue'
import CrewMembers from '../../components/profile/CrewMembers.vue'
import RecentPosts from '../../components/posts/RecentPosts.vue'
</script>

<style scoped>
.overview-tab {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>