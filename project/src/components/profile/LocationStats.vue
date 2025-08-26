<template>
  <div class="location-stats">
    <div class="location">
      <span class="location-text">Lake Balaton, Hungary</span>
    </div>
    <div class="social-stats">
      <div v-for="stat in socialStats" :key="stat.label" class="stat-item">
        <span class="stat-label">{{ stat.label }}</span>
        <span class="stat-count">{{ stat.count }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../stores/user.ts'

const userStore = useUserStore()

interface SocialStat {
  label: string
  count: string
}

const socialStats: SocialStat[] = [
  { label: "Following", count: userStore.user.following.toString() },
  { label: "Followers", count: userStore.user.followers.toString() }
]
</script>

<style scoped>
.location-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  background: #22313a;
}

.location {
  padding: 4px 16px;
  display: flex;
  align-items: center;
}

.location-text {
  font-weight: bold;
  color: white;
  font-size: 12px;
  letter-spacing: 0.36px;
  font-family: 'Roboto', Helvetica;
}

.social-stats {
  padding: 4px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-label {
  font-family: var(--kwindoo-label-small-font-family);
  color: #9ba1a6;
  font-size: var(--kwindoo-label-small-font-size);
  letter-spacing: var(--kwindoo-label-small-letter-spacing);
  line-height: var(--kwindoo-label-small-line-height);
  white-space: nowrap;
}

.stat-count {
  font-weight: bold;
  color: white;
  font-size: 12px;
  letter-spacing: 0.36px;
  font-family: 'Roboto', Helvetica;
}
</style>