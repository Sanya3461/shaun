<template>
  <div class="bottom-navigation">
    <div class="nav-container">
      <button 
        v-for="item in navigationItems" 
        :key="item.id"
        :class="['nav-item', { active: isActive(item.id) }]"
        @click="navigateTo(item.id)"
      >
        <div class="nav-icon">
          <!-- Home Icon -->
          <svg v-if="item.id === 'home'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3L20 9V21H15V14H9V21H4V9L12 3Z" fill="currentColor"/>
          </svg>
          
          <!-- Events Icon -->
          <svg v-else-if="item.id === 'events'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H12V15H7V10Z" fill="currentColor"/>
          </svg>
          
          <!-- Tracking Icon -->
          <svg v-else-if="item.id === 'tracking'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3V21H21M7 7L12 12L17 7M7 12L12 17L17 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          
          <!-- Post Icon -->
          <svg v-else-if="item.id === 'post'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.0049 17.9411V20.0029H19.0049V22.0029H7.00488V20.0029H12.0049V17.9411C8.05857 17.449 5.00488 14.0826 5.00488 10.0029V4.00293H21.0049V10.0029C21.0049 14.0826 17.9512 17.449 14.0049 17.9411ZM7.00488 6.00293V10.0029C7.00488 13.3167 9.69117 16.0029 13.0049 16.0029C16.3186 16.0029 19.0049 13.3167 19.0049 10.0029V6.00293H7.00488ZM2.00488 6.00293H4.00488V10.0029H2.00488V6.00293ZM22.0049 6.00293H24.0049V10.0029H22.0049V6.00293Z" fill="currentColor"/>
          </svg>
          
          <!-- Profile Icon -->
          <svg v-else-if="item.id === 'profile'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
          </svg>
        </div>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </div>
    <div class="home-indicator"></div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useNavigationStore } from '../../stores/navigation.ts'

const router = useRouter()
const navigationStore = useNavigationStore()

interface NavigationItem {
  id: string
  label: string
}

const navigationItems: NavigationItem[] = [
  { id: "home", label: "Home" },
  { id: "events", label: "Events" },
  { id: "tracking", label: "Tracking" },
  { id: "post", label: "Post" },
  { id: "profile", label: "Profile" }
]

const isActive = (itemId: string) => {
  const currentPath = router.currentRoute.value.path
  if (itemId === 'home') return currentPath === '/'
  if (itemId === 'profile') return currentPath === '/profile'
  return currentPath === `/${itemId}`
}

const navigateTo = (itemId: string) => {
  navigationStore.navigateTo(itemId)
  
  switch (itemId) {
    case 'home':
      router.push('/')
      break
    case 'events':
      router.push('/events')
      break
    case 'tracking':
      router.push('/tracking')
      break
    case 'post':
      router.push('/post')
      break
    case 'profile':
      router.push('/profile')
      break
    default:
      router.push('/')
  }
}
</script>

<style scoped>
.bottom-navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #22313a;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: env(safe-area-inset-bottom);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 12px 16px 16px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 4px 8px;
  border-radius: 8px;
  min-height: 44px;
  min-width: 44px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-item:active {
  transform: scale(0.95);
}

.nav-icon {
  width: 24px;
  height: 24px;
  color: #697c83;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item.active .nav-icon {
  color: white;
}

.nav-label {
  font-size: 10px;
  font-weight: 400;
  color: #697c83;
  transition: color 0.2s ease;
  font-family: 'Roboto', Helvetica;
  white-space: nowrap;
  letter-spacing: 0.1px;
}

.nav-item.active .nav-label {
  color: white;
}

.home-indicator {
  width: 134px;
  height: 5px;
  background: #1c1f26;
  border-radius: 2.5px;
  margin: 8px 0 4px 0;
}
</style>