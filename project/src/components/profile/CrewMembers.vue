<template>
  <div class="crew-members">
    <div class="section-content">
      <div class="section-header">
        <h3 class="section-title">Crew Members</h3>
      </div>
      
      <div class="members-list">
        <div 
          v-for="(member, index) in crewMembers" 
          :key="index"
          class="member-item"
          @click="viewMember(member)"
        >
          <div class="member-info">
            <div class="member-avatar">
              <img 
                class="avatar-image" 
                :alt="member.name + ' profile'" 
                :src="member.avatar" 
              />
            </div>
            <div class="member-details">
              <div class="member-name">{{ member.name }}</div>
            </div>
          </div>
          <ChevronRightIcon class="chevron-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight as ChevronRightIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useSailingStore } from '../../stores/sailing.ts'

const router = useRouter()
const sailingStore = useSailingStore()
const crewMembers = sailingStore.crewMembers

const viewMember = (member: any) => {
  // Convert member name to user ID (in real app, you'd have the actual user ID)
  const userId = member.name.toLowerCase().replace(/\s+/g, '-')
  router.push(`/user/${userId}`)
}
</script>

<style scoped>
.crew-members {
  width: 100%;
  height: 148px;
  border: 1px solid #e0e0e0;
}

.section-content {
  padding: 16px 8px;
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 0 8px;
  width: 100%;
}

.section-title {
  margin: 0;
  font-family: var(--kwindoo-highlight-font-family);
  font-weight: var(--kwindoo-highlight-font-weight);
  color: #2a3e4a;
  font-size: var(--kwindoo-highlight-font-size);
  letter-spacing: var(--kwindoo-highlight-letter-spacing);
  line-height: var(--kwindoo-highlight-line-height);
  white-space: nowrap;
  font-style: var(--kwindoo-highlight-font-style);
}

.members-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.member-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-radius: 8px;
  min-height: 44px;
}

.member-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.member-item:active {
  transform: scale(0.98);
}

.member-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.member-avatar {
  display: flex;
  align-items: center;
  margin-right: 12px;
}

.avatar-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.member-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.member-name {
  font-weight: bold;
  color: #2a3e4a;
  font-size: 14px;
  white-space: nowrap;
  font-family: 'Roboto', Helvetica;
}

.chevron-icon {
  width: 24px;
  height: 24px;
  color: #6b7280;
  margin-left: auto;
}
</style>