<template>
  <div class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">Request Contact</h2>
        <button class="close-button" @click="$emit('close')">
          <XIcon class="close-icon" />
        </button>
      </div>
      
      <div class="modal-body">
        <div class="user-info">
          <img :src="user?.avatar" :alt="user?.name" class="user-avatar" />
          <div class="user-details">
            <h3 class="user-name">{{ user?.name }}</h3>
            <p class="user-distance">{{ user?.distance }}</p>
          </div>
        </div>
        
        <div class="message-section">
          <label for="message" class="message-label">Message (optional)</label>
          <textarea
            id="message"
            v-model="message"
            placeholder="Hi! I'd like to connect about potential crew opportunities..."
            class="message-textarea"
            rows="4"
          ></textarea>
          <p class="info-text">
            The recipient and you will both get an email with this text. Once you have sent the request, if the person has allowed phone / text contact, we will display the number
          </p>
        </div>
      </div>
      
      <div class="modal-actions">
        <button class="cancel-btn" @click="$emit('close')">
          Cancel
        </button>
        <button 
          :class="['send-btn', { 'sent': isRequestSent }]" 
          @click="handleSend"
          :disabled="isRequestSent"
        >
          {{ isRequestSent ? 'Request Sent' : 'Send Request' }}
        </button>
      </div>
    </div>
  </div>
  
  <!-- Success Modal -->
  <div v-if="showSuccessModal" class="success-modal-overlay" @click="closeSuccessModal">
    <div class="success-modal-content" @click.stop>
      <div class="success-icon">✅</div>
      <h3 class="success-title">Request Sent Successfully!</h3>
      <p class="success-message">
        The recipient and you will both get an email with this text. Once you have sent the request, if the person has allowed phone / text contact, we will display the number
      </p>
      <button class="success-close-btn" @click="closeSuccessModal">
        Got it
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { X as XIcon } from 'lucide-vue-next'

defineProps<{
  user: {
    id: string
    name: string
    avatar: string
    distance: string
  } | null
}>()

const emit = defineEmits<{
  'close': []
  'send': [message: string]
}>()

const message = ref('')
const isRequestSent = ref(false)
const showSuccessModal = ref(false)

const handleOverlayClick = () => {
  emit('close')
}

const handleSend = () => {
  isRequestSent.value = true
  emit('send', message.value)
  
  // Show success modal after a short delay
  setTimeout(() => {
    showSuccessModal.value = true
  }, 500)
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: #2a3e4a;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.05);
}

.close-icon {
  width: 24px;
  height: 24px;
  color: #6a6a6a;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  -webkit-overflow-scrolling: touch;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 16px;
  font-weight: 600;
  color: #2a3e4a;
  margin: 0 0 4px 0;
}

.user-distance {
  font-size: 14px;
  color: #9ba1a6;
  margin: 0;
}

.message-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message-label {
  font-size: 14px;
  font-weight: 600;
  color: #2a3e4a;
}

.message-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  outline: none;
  transition: border-color 0.2s ease;
}

.message-textarea:focus {
  border-color: #0099e7;
}

.message-textarea::placeholder {
  color: #9ba1a6;
}

.info-text {
  font-size: 13px;
  color: #6a6a6a;
  line-height: 1.4;
  margin: 8px 0 0 0;
  font-style: italic;
}

.modal-actions {
  display: flex;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
}

.cancel-btn,
.send-btn {
  flex: 1;
  padding: 12px 16px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
  border: none;
}

.cancel-btn {
  background: white;
  color: #2a3e4a;
  border: 1px solid #e0e0e0;
}

.cancel-btn:hover {
  background: #f8f9fa;
}

.send-btn {
  background: #0099e7;
  color: white;
}

.send-btn:hover {
  background: #0088cc;
}

.send-btn.sent {
  background: #34a853;
  cursor: not-allowed;
}

.send-btn.sent:hover {
  background: #34a853;
}

.cancel-btn:active,
.send-btn:active {
  transform: scale(0.98);
}

/* Success Modal Styles */
.success-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 20px;
}

.success-modal-content {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  padding: 32px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.success-icon {
  font-size: 48px;
  margin-bottom: 8px;
}

.success-title {
  font-size: 20px;
  font-weight: 600;
  color: #2a3e4a;
  margin: 0;
}

.success-message {
  font-size: 14px;
  color: #6a6a6a;
  line-height: 1.5;
  margin: 0;
  max-width: 320px;
}

.success-close-btn {
  background: #0099e7;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
  margin-top: 8px;
}

.success-close-btn:hover {
  background: #0088cc;
}

.success-close-btn:active {
  transform: scale(0.98);
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .modal-overlay {
    padding: 10px;
  }
  
  .modal-content {
    max-height: 90vh;
  }
  
  .success-modal-overlay {
    padding: 10px;
  }
}
</style>