<template>
  <div class="radius-segment">
    <div class="segment-container">
      <button
        v-for="option in radiusOptions"
        :key="option.value"
        :class="['segment-button', { active: selectedRadius === option.value }]"
        @click="selectRadius(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  selectedRadius: string
}>()

const emit = defineEmits<{
  'update:selectedRadius': [value: string]
}>()

const selectedRadius = computed({
  get: () => props.selectedRadius,
  set: (value) => emit('update:selectedRadius', value)
})

const radiusOptions = [
  { value: '10', label: '10 km' },
  { value: '50', label: '50 km' },
  { value: '200', label: '200 km' },
  { value: 'anywhere', label: 'Anywhere' }
]

const selectRadius = (value: string) => {
  selectedRadius.value = value
}
</script>

<style scoped>
.radius-segment {
  padding: 16px;
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.segment-container {
  display: flex;
  border: 2px solid #0099e7;
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

.segment-button {
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: white;
  color: #0099e7;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.segment-button:not(:last-child) {
  border-right: 1px solid #0099e7;
}

.segment-button.active {
  background: #0099e7;
  color: white;
}

.segment-button:hover:not(.active) {
  background: rgba(0, 153, 231, 0.1);
}

.segment-button:active {
  transform: scale(0.98);
}
</style>