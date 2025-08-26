<template>
  <div class="toggle-row">
    <div class="toggle-content">
      <span class="toggle-label">I'm looking for crew – show on my profile</span>
      <button
        :class="['toggle-switch', { active: isLookingForCrew }]"
        @click="toggleValue"
      >
        <div class="toggle-slider"></div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isLookingForCrew: boolean
}>()

const emit = defineEmits<{
  'update:isLookingForCrew': [value: boolean]
}>()

const isLookingForCrew = computed({
  get: () => props.isLookingForCrew,
  set: (value) => emit('update:isLookingForCrew', value)
})

const toggleValue = () => {
  isLookingForCrew.value = !isLookingForCrew.value
}
</script>

<style scoped>
.toggle-row {
  padding: 16px;
  background: white;
  border-bottom: 8px solid #f7f7f7;
}

.toggle-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.toggle-label {
  font-size: 16px;
  color: #2a3e4a;
  font-weight: 500;
  flex: 1;
}

.toggle-switch {
  position: relative;
  width: 52px;
  height: 32px;
  background: #e0e0e0;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  outline: none;
}

.toggle-switch.active {
  background: #0099e7;
}

.toggle-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch.active .toggle-slider {
  transform: translateX(20px);
}

.toggle-switch:active .toggle-slider {
  transform: scale(0.95) translateX(0);
}

.toggle-switch.active:active .toggle-slider {
  transform: scale(0.95) translateX(20px);
}
</style>