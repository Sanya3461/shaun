<template>
  <div class="post-share-container">
    <!-- Mobile Status Bar -->
    <StatusBar />
    
    <!-- Header -->
    <div class="post-share-header">
      <h1 class="header-title">Share your adventure</h1>
    </div>

    <!-- Main Content -->
    <div class="post-share-content">
      <!-- Activity Type Selection -->
      <div class="activity-type-section">
        <h3 class="section-title">Activity Type</h3>
        <div class="activity-tags">
          <button 
            v-for="activity in activityTypes" 
            :key="activity.id"
            :class="['activity-tag', { active: selectedActivity === activity.id }]"
            @click="selectActivity(activity.id)"
          >
            {{ activity.label }}
          </button>
        </div>
      </div>

      <!-- Title Input -->
      <div class="title-section">
        <h3 class="section-title">Title</h3>
        <input 
          v-model="postTitle"
          type="text" 
          placeholder="Afternoon Sail"
          class="title-input"
        />
      </div>

      <!-- Description -->
      <div class="description-section">
        <textarea 
          v-model="postDescription"
          placeholder="What made this sailing session special?"
          class="description-textarea"
          rows="3"
        ></textarea>
      </div>

      <!-- Session Stats -->
      <div class="session-stats-section">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-label">Time</div>
            <div class="stat-value">
              <span class="stat-number">0</span><span class="stat-unit">h</span> 
              <span class="stat-number">37</span><span class="stat-unit">m</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Distance</div>
            <div class="stat-value">
              <span class="stat-number">22</span><span class="stat-unit">nm</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Avg Speed</div>
            <div class="stat-value">
              <span class="stat-number">12</span><span class="stat-unit">kts</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Max speed</div>
            <div class="stat-value">
              <span class="stat-number">19</span><span class="stat-unit">kts</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Achievement Badge -->
      <div class="achievement-section">
        <div class="achievement-badge">
          <div class="achievement-icon">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="24" height="24" rx="4" fill="#AED4E7" stroke="white" stroke-width="1"/>
              <path d="M14.0049 17.9411V20.0029H19.0049V22.0029H7.00488V20.0029H12.0049V17.9411C8.05857 17.449 5.00488 14.0826 5.00488 10.0029V4.00293H21.0049V10.0029C21.0049 14.0826 17.9512 17.449 14.0049 17.9411ZM7.00488 6.00293V10.0029C7.00488 13.3167 9.69117 16.0029 13.0049 16.0029C16.3186 16.0029 19.0049 13.3167 19.0049 10.0029V6.00293H7.00488ZM2.00488 6.00293H4.00488V10.0029H2.00488V6.00293ZM22.0049 6.00293H24.0049V10.0029H22.0049V6.00293Z" fill="#FD5E2B"/>
            </svg>
          </div>
          <span class="achievement-text">Kristof gained the Merit Out badge!</span>
        </div>
      </div>

      <!-- Photo Gallery -->
      <div class="photo-gallery-section">
        <div class="photo-grid">
          <div class="photo-item">
            <img 
              src="https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=150&h=200&fit=crop" 
              alt="Sailing photo 1"
              class="photo-image"
            />
          </div>
          <div class="photo-item">
            <img 
              src="https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=150&h=200&fit=crop" 
              alt="Sailing photo 2"
              class="photo-image"
            />
          </div>
          <div class="photo-item add-photo-item">
            <div class="add-photo-content">
              <CameraIcon class="add-photo-icon" />
              <span class="add-photo-text">Add photo</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="add-detail-button" @click="addMoreDetail">
          Add more detail
        </button>
        <button class="publish-button" @click="publishPost">
          Publish
        </button>
      </div>
    </div>

    <!-- Activity Details Modal -->
    <div v-if="showActivityDetails" class="modal-overlay" @click="closeActivityDetails">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">Activity details</h2>
          <button class="close-button" @click="closeActivityDetails">
            <XIcon class="close-icon" />
          </button>
        </div>
        
        <div class="modal-body">
          <!-- Boat Type -->
          <div class="detail-section">
            <h3 class="detail-title">Boat Type</h3>
            <div class="detail-options">
              <button 
                v-for="type in boatTypes" 
                :key="type"
                :class="['detail-option', { active: activityDetails.boatType === type }]"
                @click="selectOption('boatType', type)"
              >
                {{ type }}
              </button>
            </div>
          </div>

          <!-- Rig Type -->
          <div class="detail-section">
            <h3 class="detail-title">Rig Type</h3>
            <div class="detail-options">
              <button 
                v-for="type in rigTypes" 
                :key="type"
                :class="['detail-option', { active: activityDetails.rigType === type }]"
                @click="selectOption('rigType', type)"
              >
                {{ type }}
              </button>
            </div>
          </div>

          <!-- Purpose -->
          <div class="detail-section">
            <h3 class="detail-title">Purpose</h3>
            <div class="detail-options">
              <button 
                v-for="purpose in purposes" 
                :key="purpose"
                :class="['detail-option', { active: activityDetails.purpose === purpose }]"
                @click="selectOption('purpose', purpose)"
              >
                {{ purpose }}
              </button>
            </div>
          </div>

          <!-- Regulatory -->
          <div class="detail-section">
            <h3 class="detail-title">Regulatory</h3>
            <div class="detail-options">
              <button 
                v-for="reg in regulatoryTypes" 
                :key="reg"
                :class="['detail-option', { active: activityDetails.regulatory === reg }]"
                @click="selectOption('regulatory', reg)"
              >
                {{ reg }}
              </button>
            </div>
          </div>

          <!-- Experience Level -->
          <div class="detail-section">
            <h3 class="detail-title">Experience Level</h3>
            <div class="detail-options">
              <button 
                v-for="level in experienceLevels" 
                :key="level"
                :class="['detail-option', { active: activityDetails.experienceLevel === level }]"
                @click="selectOption('experienceLevel', level)"
              >
                {{ level }}
              </button>
            </div>
          </div>

          <!-- Competition -->
          <div class="detail-section">
            <h3 class="detail-title">Competition</h3>
            <div class="detail-options">
              <button 
                v-for="comp in competitions" 
                :key="comp"
                :class="['detail-option', { active: activityDetails.competition === comp }]"
                @click="selectOption('competition', comp)"
              >
                {{ comp }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <BottomNavigation />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Camera as CameraIcon, X as XIcon } from 'lucide-vue-next'
import StatusBar from '../../components/layout/StatusBar.vue'
import BottomNavigation from '../../components/navigation/BottomNavigation.vue'

const router = useRouter()

// Activity types
const activityTypes = [
  { id: 'sailing', label: 'Sailing' },
  { id: 'foil-windsurf', label: 'Foil Windsurf' },
  { id: 'rowling', label: 'Rowling' },
  { id: 'kayaking', label: 'Kayaking' },
  { id: 'kenuing', label: 'Kenuing' },
  { id: 'sup', label: 'SUP' },
  { id: 'wavesurf', label: 'Wavesurf' }
]

// Form state
const selectedActivity = ref('sailing')
const postTitle = ref('Afternoon Sail')
const postDescription = ref('')
const showActivityDetails = ref(false)

// Activity details form state
const activityDetails = ref({
  boatType: '',
  rigType: '',
  purpose: '',
  regulatory: '',
  experienceLevel: '',
  competition: ''
})

// Activity details options
const boatTypes = ['Monohull', 'Catamaran', 'Trimaran']
const rigTypes = ['Sloop', 'Cutter', 'Ketch', 'Schooner', 'Catboat', 'Yawl']
const purposes = ['Dinghy', 'Daysailer', 'Cruiser', 'Racer', 'Racer-Cruiser', 'Motorsailer']
const regulatoryTypes = ['A (ocean)', 'B (offshore)', 'C (inshore)', 'D (sheltered)', 'E (river)']
const experienceLevels = ['Amateur', 'Professional', 'Amateur Racer']
const competitions = ['Olympic', 'One Design', 'Development', 'Handicap', 'Junior', 'Youth']

// Methods
const selectActivity = (activityId: string) => {
  selectedActivity.value = activityId
}

const addMoreDetail = () => {
  showActivityDetails.value = true
}

const closeActivityDetails = () => {
  showActivityDetails.value = false
}

const selectOption = (category: string, value: string) => {
  activityDetails.value[category as keyof typeof activityDetails.value] = value
}

const publishPost = () => {
  // TODO: Publish the post
  console.log('Publishing post:', {
    activity: selectedActivity.value,
    title: postTitle.value,
    description: postDescription.value
  })
  
  // Navigate back to home
  router.push('/')
}
</script>

<style scoped>
.post-share-container {
  width: 100%;
  max-width: 412px;
  background: #f7f7f7;
  border-radius: 44px;
  overflow: hidden;
  border: 8px solid #00599b;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.post-share-header {
  background: #33414c;
  padding: 20px;
  text-align: center;
}

.header-title {
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.post-share-content {
  flex: 1;
  background: white;
  padding: 20px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #2a3e4a;
  margin: 0 0 12px 0;
}

/* Activity Type Section */
.activity-type-section {
  margin-bottom: 24px;
}

.activity-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 4px 0;
  -webkit-overflow-scrolling: touch;
}

.activity-tag {
  padding: 8px 16px;
  border-radius: 20px;
  border: 2px solid #0099e7;
  background: #f8f9fa;
  color: #0099e7;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  display: flex;
  align-items: center;
}

.activity-tag.active {
  background: #f8f9fa;
  color: #0099e7;
  border-color: #0099e7;
}

.activity-tag:hover:not(.active) {
  background: #f8f9fa;
  border-color: #0099e7;
}

/* Title Section */
.title-section {
  margin-bottom: 24px;
}

.title-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  background: white;
}

.title-input:focus {
  outline: none;
  border-color: #0099e7;
}

/* Description Section */
.description-section {
  margin-bottom: 24px;
}

.description-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  background: white;
  resize: vertical;
  min-height: 80px;
}

.description-textarea:focus {
  outline: none;
  border-color: #0099e7;
}

.description-textarea::placeholder {
  color: #9ba1a6;
}

/* Session Stats */
.session-stats-section {
  margin-bottom: 24px;
}

.stats-grid {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  background: white;
  border-radius: 8px;
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-label {
  font-size: 12px;
  color: #6a6a6a;
  margin-bottom: 4px;
  font-weight: 400;
}

.stat-value {
  font-size: 16px;
  color: #2a3e4a;
  font-weight: 400;
}

.stat-number {
  font-weight: 700;
  font-size: 16px;
}

.stat-unit {
  font-size: 12px;
  color: #6a6a6a;
  margin-left: 2px;
}

/* Achievement Section */
.achievement-section {
  margin-bottom: 24px;
}

.achievement-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #00A8E8;
  border-radius: 8px;
  color: white;
}

.achievement-icon {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
}

.achievement-text {
  font-size: 16px;
  font-weight: 500;
}

/* Photo Gallery */
.photo-gallery-section {
  margin-bottom: 32px;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.photo-item {
  aspect-ratio: 3/4;
  border-radius: 8px;
  overflow: hidden;
}

.photo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.add-photo-item {
  border: 2px dashed #0099e7;
  background: rgba(0, 153, 231, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-photo-item:hover {
  background: rgba(0, 153, 231, 0.2);
}

.add-photo-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.add-photo-icon {
  width: 32px;
  height: 32px;
  color: #0099e7;
}

.add-photo-text {
  font-size: 14px;
  color: #0099e7;
  font-weight: 500;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding-top: 20px;
}

.add-detail-button,
.publish-button {
  flex: 1;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
  border: none;
  max-width: 180px;
}

.add-detail-button {
  background: white;
  color: #0099e7;
  border: 2px solid #0099e7;
}

.add-detail-button:hover {
  background: rgba(0, 153, 231, 0.1);
}

.publish-button {
  background: #0099e7;
  color: white;
}

.publish-button:hover {
  background: #0088cc;
}

.add-detail-button:active,
.publish-button:active {
  transform: scale(0.98);
}

/* Modal Styles */
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

.detail-section {
  margin-bottom: 24px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-title {
  font-size: 16px;
  font-weight: 600;
  color: #2a3e4a;
  margin: 0 0 12px 0;
}

.detail-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.detail-option {
  padding: 8px 16px;
  border-radius: 20px;
  border: 2px solid #0099e7;
  background: white;
  color: #0099e7;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  display: flex;
  align-items: center;
}

.detail-option.active {
  background: #0099e7;
  color: white;
}

.detail-option:hover:not(.active) {
  background: rgba(0, 153, 231, 0.1);
}

.detail-option:active {
  transform: scale(0.98);
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .post-share-container {
    border-radius: 0;
    border: none;
    max-width: 100vw;
    min-height: 100vh;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .photo-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .modal-overlay {
    padding: 10px;
  }
  
  .modal-content {
    max-height: 90vh;
  }
}
</style>