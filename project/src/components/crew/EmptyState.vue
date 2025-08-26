<template>
  <div class="empty-state">
    <div class="empty-icon">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 10L50 25H70L55 35L60 55L40 45L20 55L25 35L10 25H30L40 10Z" stroke="#9ba1a6" stroke-width="2" fill="none"/>
        <path d="M40 20L45 30H55L50 35L52.5 45L40 40L27.5 45L30 35L25 30H35L40 20Z" fill="#e0e0e0"/>
      </svg>
    </div>
    <h3 class="empty-title">No crew members found</h3>
    <p class="empty-description">
      Try adjusting your filters or search terms to find more sailors in your area.
    </p>
    <button class="reset-filters-btn" @click="resetFilters">
      Reset Filters
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'reset-filters': []
}>()

const resetFilters = () => {
  emit('reset-filters')
}
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  min-height: 300px;
}

.empty-icon {
  margin-bottom: 24px;
  opacity: 0.6;
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
  color: #2a3e4a;
  margin: 0 0 12px 0;
}

.empty-description {
  font-size: 16px;
  color: #9ba1a6;
  margin: 0 0 24px 0;
  line-height: 1.5;
  max-width: 280px;
}

.reset-filters-btn {
  padding: 12px 24px;
  background: #0099e7;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
}

.reset-filters-btn:hover {
  background: #0088cc;
}

.reset-filters-btn:active {
  transform: scale(0.98);
}
</style>