<template>
  <div class="user-bio-description">
    <div class="bio-content">
      <p class="bio-text">{{ bio }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  bio: string
}>()
</script>

<style scoped>
.user-bio-description {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px 0;
  width: 100%;
  z-index: 3;
  background: #22313a;
}

.bio-content {
  flex: 1;
}

.bio-text {
  margin: 0;
  font-family: var(--kwindoo-label1-font-family);
  font-weight: var(--kwindoo-label1-font-weight);
  color: white;
  font-size: var(--kwindoo-label1-font-size);
  letter-spacing: var(--kwindoo-label1-letter-spacing);
  line-height: var(--kwindoo-label1-line-height);
  font-style: var(--kwindoo-label1-font-style);
  white-space: pre-line;
}
</style>