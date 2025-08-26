<template>
  <div class="events-view">
    <div class="header">
      <h1>Events</h1>
      <p>Upcoming sailing events and competitions</p>
    </div>
    
    <div class="events-list">
      <div v-for="event in events" :key="event.id" class="event-card">
        <div class="event-date">
          <div class="day">{{ event.day }}</div>
          <div class="month">{{ event.month }}</div>
        </div>
        <div class="event-details">
          <h3>{{ event.title }}</h3>
          <p>{{ event.location }}</p>
          <div class="event-meta">
            <span>{{ event.participants }} participants</span>
            <span>{{ event.type }}</span>
          </div>
        </div>
        <button class="join-button">Join</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Event } from '../types'

const events = ref<Event[]>([
  {
    id: '1',
    title: 'Balaton Cup 2025',
    location: 'Lake Balaton, Hungary',
    day: '15',
    month: 'JUN',
    participants: 45,
    type: 'Regatta'
  },
  {
    id: '2',
    title: 'Summer Sailing Championship',
    location: 'Adriatic Sea, Croatia',
    day: '22',
    month: 'JUL',
    participants: 78,
    type: 'Championship'
  }
])
</script>

<style scoped>
.events-view {
  padding: 20px;
  background: white;
  min-height: 100vh;
}

.header {
  margin-bottom: 24px;
}

.header h1 {
  font-size: 24px;
  font-weight: 700;
  color: #2a3e4a;
  margin: 0 0 8px 0;
}

.header p {
  color: #6a6a6a;
  margin: 0;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
}

.event-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
  padding: 8px;
  background: #0099e7;
  border-radius: 8px;
  color: white;
}

.day {
  font-size: 20px;
  font-weight: 700;
}

.month {
  font-size: 12px;
  font-weight: 500;
}

.event-details {
  flex: 1;
}

.event-details h3 {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #2a3e4a;
}

.event-details p {
  margin: 0 0 8px 0;
  color: #6a6a6a;
  font-size: 14px;
}

.event-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #9ba1a6;
}

.join-button {
  padding: 8px 16px;
  background: #0099e7;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  min-height: 44px;
}

.join-button:hover {
  background: #0088cc;
}
</style>