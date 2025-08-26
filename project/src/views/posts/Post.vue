<template>
  <div class="post-view">
    <div class="header">
      <h1>Create Post</h1>
      <p>Share your sailing experience</p>
    </div>
    
    <form @submit.prevent="submitPost" class="post-form">
      <div class="form-group">
        <label for="title">Title</label>
        <input 
          id="title"
          v-model="postData.title" 
          type="text" 
          placeholder="Enter post title..."
          required
        />
      </div>
      
      <div class="form-group">
        <label for="content">Content</label>
        <textarea 
          id="content"
          v-model="postData.content" 
          placeholder="Share your sailing story..."
          rows="6"
          required
        ></textarea>
      </div>
      
      <div class="form-group">
        <label class="checkbox-label">
          <input 
            v-model="postData.lookingForCrew" 
            type="checkbox"
          />
          Looking for crew members
        </label>
      </div>
      
      <div class="form-group">
        <label class="checkbox-label">
          <input 
            v-model="postData.includeSessionData" 
            type="checkbox"
          />
          Include session data
        </label>
      </div>
      
      <div v-if="postData.includeSessionData" class="session-data-form">
        <h3>Session Data</h3>
        <div class="session-inputs">
          <div class="input-group">
            <label for="duration">Duration</label>
            <input 
              id="duration"
              v-model="sessionData.duration" 
              type="text" 
              placeholder="2h 30m"
            />
          </div>
          <div class="input-group">
            <label for="distance">Distance</label>
            <input 
              id="distance"
              v-model="sessionData.distance" 
              type="text" 
              placeholder="15nm"
            />
          </div>
          <div class="input-group">
            <label for="avgSpeed">Avg Speed</label>
            <input 
              id="avgSpeed"
              v-model="sessionData.avgSpeed" 
              type="text" 
              placeholder="12kts"
            />
          </div>
          <div class="input-group">
            <label for="maxSpeed">Max Speed</label>
            <input 
              id="maxSpeed"
              v-model="sessionData.maxSpeed" 
              type="text" 
              placeholder="18kts"
            />
          </div>
        </div>
      </div>
      
      <div class="form-actions">
        <button type="button" @click="saveDraft" class="draft-button">
          Save Draft
        </button>
        <button type="submit" class="submit-button">
          Publish Post
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const postData = reactive({
  title: '',
  content: '',
  lookingForCrew: false,
  includeSessionData: false
})

const sessionData = reactive({
  duration: '',
  distance: '',
  avgSpeed: '',
  maxSpeed: ''
})

const submitPost = () => {
  // Here you would typically send the data to your backend
  console.log('Publishing post:', {
    ...postData,
    sessionData: postData.includeSessionData ? sessionData : null,
    timestamp: new Date().toISOString()
  })
  
  // Show success message and redirect
  alert('Post published successfully!')
  router.push('/')
}

const saveDraft = () => {
  // Save to localStorage as draft
  const draft = {
    ...postData,
    sessionData: postData.includeSessionData ? sessionData : null,
    savedAt: new Date().toISOString()
  }
  
  localStorage.setItem('sailing-app-draft', JSON.stringify(draft))
  alert('Draft saved!')
}

// Load draft on component mount
const loadDraft = () => {
  const draft = localStorage.getItem('sailing-app-draft')
  if (draft) {
    const draftData = JSON.parse(draft)
    Object.assign(postData, draftData)
    if (draftData.sessionData) {
      Object.assign(sessionData, draftData.sessionData)
    }
  }
}

loadDraft()
</script>

<style scoped>
.post-view {
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

.post-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #2a3e4a;
  font-size: 14px;
}

.form-group input,
.form-group textarea {
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0099e7;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: normal !important;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.session-data-form {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.session-data-form h3 {
  margin: 0 0 16px 0;
  color: #2a3e4a;
}

.session-inputs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-group label {
  font-size: 12px;
  font-weight: 500;
  color: #6a6a6a;
}

.input-group input {
  padding: 8px;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.draft-button,
.submit-button {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
}

.draft-button {
  background: #f8f9fa;
  color: #6a6a6a;
  border: 1px solid #e0e0e0;
}

.draft-button:hover {
  background: #e9ecef;
}

.submit-button {
  background: #0099e7;
  color: white;
}

.submit-button:hover {
  background: #0088cc;
}

.draft-button:active,
.submit-button:active {
  transform: scale(0.98);
}
</style>