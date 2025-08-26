<template>
  <div class="bio-description">
    <div class="bio-content">
      <p class="bio-text">
        Passionate racer with 10+ years experience.<br />
        Love tactical sailing and teaching newcomers!
      </p>
    </div>
  </div>
</template>

<style scoped>
.bio-description {
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
}
</style>