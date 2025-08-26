<template>
  <div class="navigation-tabs">
    <button 
      v-for="tab in tabs" 
      :key="tab.id"
      :class="['tab-button', { active: activeTab === tab.id }]"
      @click="$emit('tab-change', tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  id: string
  label: string
}

defineProps<{
  activeTab: string
}>()

defineEmits<{
  'tab-change': [tab: string]
}>()

const tabs: Tab[] = [
  { id: 'overview', label: 'OVERVIEW' },
  { id: 'analytics', label: 'ANALYTICS' }
]
</script>

<style scoped>
.navigation-tabs {
  width: 100%;
  background: #33414c;
  z-index: 5;
  display: flex;
  height: 50px;
}

.tab-button {
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  color: #9ba1a6;
  font-family: var(--kwindoo-tab-font-family);
  font-weight: var(--kwindoo-tab-font-weight);
  font-size: var(--kwindoo-tab-font-size);
  letter-spacing: var(--kwindoo-tab-letter-spacing);
  line-height: var(--kwindoo-tab-line-height);
  font-style: var(--kwindoo-tab-font-style);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.tab-button.active {
  color: white;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #0099e7;
}

.tab-button:active {
  transform: scale(0.98);
}
</style>