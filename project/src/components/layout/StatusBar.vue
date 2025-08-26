<template>
  <div class="status-bar">
    <div class="time">9:30</div>
    <img 
      class="camera-cutout" 
      alt="Camera cutout" 
      src="https://images.pexels.com/photos/1/camera-cutout.svg?auto=compress&cs=tinysrgb&w=24&h=24" 
    />
    <img 
      class="right-icons" 
      alt="Right icons" 
      src="https://images.pexels.com/photos/1/right-icons.png?auto=compress&cs=tinysrgb&w=46&h=17" 
    />
  </div>
</template>

<style scoped>
.status-bar {
  display: flex;
  height: 46px;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px 24px;
  position: relative;
  width: 100%;
  z-index: 6;
  background: #22313a;
}

.time {
  font-weight: 500;
  color: white;
  font-size: 14px;
  letter-spacing: 0.14px;
  line-height: 20px;
  white-space: nowrap;
}

.camera-cutout {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
}

.right-icons {
  width: 46px;
  height: 17px;
}
</style>