<template>
  <div class="crew-finder-container">
    <!-- Mobile Status Bar -->
    <StatusBar />
    
    <!-- Header with back button -->
    <div class="crew-finder-header">
      <div class="header-content">
        <button class="back-button" @click="goBack">
          <ChevronLeftIcon class="back-icon" />
        </button>
        <div class="header-text">
          <h1 class="header-title">Add My Experience</h1>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="add-experience-content">
      <!-- Intro Text Box -->
      <div class="intro-box">
        <p>Add your roles and how you prefer to be contacted. This helps skippers find you.</p>
      </div>

      <!-- Roles Section -->
      <div class="section">
        
        <!-- Sailor Section -->
        <div class="role-category">
          <h3 class="category-header">Sailor</h3>
          <div class="role-grid">
            <!-- First row -->
            <button 
              :class="['role-card', { selected: selectedRoles.includes('Bowman') }]"
              @click="toggleRole('Bowman')"
            >
              <AnchorIcon class="role-icon" />
              <span class="role-text">Bowman</span>
            </button>
            <button 
              :class="['role-card', { selected: selectedRoles.includes('Pit') }]"
              @click="toggleRole('Pit')"
            >
              <WrenchIcon class="role-icon" />
              <span class="role-text">Pit</span>
            </button>
            <button 
              :class="['role-card', { selected: selectedRoles.includes('Grinder') }]"
              @click="toggleRole('Grinder')"
            >
              <SettingsIcon class="role-icon" />
              <span class="role-text">Grinder</span>
            </button>
            <button 
              :class="['role-card', { selected: selectedRoles.includes('Trimmer') }]"
              @click="toggleRole('Trimmer')"
            >
              <SailboatIcon class="role-icon" />
              <span class="role-text">Trimmer</span>
            </button>
            
            <!-- Second row -->
            <button 
              :class="['role-card', { selected: selectedRoles.includes('Tactician') }]"
              @click="toggleRole('Tactician')"
            >
              <CompassIcon class="role-icon" />
              <span class="role-text">Tactician</span>
            </button>
            <button 
              :class="['role-card', { selected: selectedRoles.includes('Meteorologist') }]"
              @click="toggleRole('Meteorologist')"
            >
              <CloudIcon class="role-icon" />
              <span class="role-text">Meteorologist</span>
            </button>
            <button 
              :class="['role-card', { selected: selectedRoles.includes('Navigator') }]"
              @click="toggleRole('Navigator')"
            >
              <ScrollTextIcon class="role-icon" />
              <span class="role-text">Navigator</span>
            </button>
            <button 
              :class="['role-card', { selected: selectedRoles.includes('Coach') }]"
              @click="toggleRole('Coach')"
            >
              <HammerIcon class="role-icon" />
              <span class="role-text">Coach</span>
            </button>
          </div>
        </div>
        
        <!-- Rigger Section (REDESIGNED) -->
        <div class="role-category">
          <h3 class="category-header">Rigger</h3>

          <!-- Top row: Sail, Rope, Hull -->
          <div class="rigger-grid">
            <button
              :class="['tag-btn', { selected: selectedRoles.includes('Sail') }]"
              @click="toggleRole('Sail')"
            >
              <SailboatIcon class="tag-icon" />
              <span class="tag-text">Sail</span>
            </button>

            <button
              :class="['tag-btn', { selected: selectedRoles.includes('Rope') }]"
              @click="toggleRole('Rope')"
            >
              <LassoIcon class="tag-icon" />
              <span class="tag-text">Rope</span>
            </button>

            <button
              :class="['tag-btn', { selected: selectedRoles.includes('Hull') }]"
              @click="toggleRole('Hull')"
              :aria-expanded="showHullOptions"
              aria-controls="hull-subrow"
            >
              <ShipIcon class="tag-icon" />
              <span class="tag-text">Hull</span>
            </button>
          </div>

          <!-- Bottom row: Wood, Comp, Metal (only when Hull is selected) -->
          <Transition name="fade-slide">
            <div
              v-show="showHullOptions"
              id="hull-subrow"
              class="rigger-grid subrow"
              role="group"
              aria-label="Hull material"
            >
              <button
                :class="['tag-btn', { selected: selectedRoles.includes('Wood') }]"
                @click="toggleRole('Wood')"
              >
                <div class="material-dot wood"></div>
                <span class="tag-text">Wood</span>
              </button>

              <button
                :class="['tag-btn', { selected: selectedRoles.includes('Composite') }]"
                @click="toggleRole('Composite')"
              >
                <div class="material-dot comp"></div>
                <span class="tag-text">Comp</span>
              </button>

              <button
                :class="['tag-btn', { selected: selectedRoles.includes('Metal') }]"
                @click="toggleRole('Metal')"
              >
                <div class="material-dot metal"></div>
                <span class="tag-text">Metal</span>
              </button>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Contact Preferences Section -->
      <div class="section">
        <h2 class="section-title">Contact Preferences</h2>
        
        <div class="input-group">
          <label class="input-label">Email</label>
          <input 
            v-model="email"
            type="email"
            class="input-field"
            placeholder="alex.johnson@email.com"
          />
          <p class="helper-text">Shown after approval</p>
        </div>

        <div class="input-group">
          <label class="input-label">Phone number</label>
          <input 
            v-model="phone"
            type="tel"
            class="input-field"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <!-- Contact Method Selection Section -->
      <div class="section">
        <h2 class="section-title">Contact Method</h2>
        <div class="contact-methods">
          <button 
            v-for="method in ['Phone', 'WhatsApp', 'Signal']" 
            :key="method"
            :class="['contact-method-button', { selected: selectedContactMethods.includes(method) }]"
            @click="toggleContactMethod(method)"
          >
            {{ method }}
          </button>
        </div>
        <p class="section-description">You can select if you prefer calls / whatsapp / signal</p>
      </div>

      <!-- Preferred Contact Time Section -->
      <div class="section">
        <h2 class="section-title">Preferred contact time</h2>
        <div class="contact-time-segment">
          <button 
            v-for="time in ['Anytime', 'Weekdays only', 'Business hours']" 
            :key="time"
            :class="['contact-time-button', { selected: selectedContactTime === time }]"
            @click="selectContactTime(time)"
          >
            {{ time }}
          </button>
        </div>
      </div>

      <!-- Crew Visibility Toggle Section -->
      <div class="section">
        <div class="toggle-row">
          <div class="toggle-text">
            <span class="toggle-label">I'm open to crew - show on my profile</span>
            <p class="toggle-helper">People can request your contact via Crew Finder.</p>
          </div>
          <button 
            :class="['toggle-switch', { active: isOpenToCrew }]"
            @click="toggleCrewVisibility"
          >
            <div class="toggle-slider"></div>
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="save-button" @click="handleSave">
          Save
        </button>
        <button class="cancel-button" @click="handleCancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ChevronLeft as ChevronLeftIcon,
  Anchor as AnchorIcon,
  Wrench as WrenchIcon,
  Settings as SettingsIcon,
  Sailboat as SailboatIcon,
  Compass as CompassIcon,
  Cloud as CloudIcon,
  ScrollText as ScrollTextIcon,
  Hammer as HammerIcon,
  Ship as ShipIcon,
  Lasso as LassoIcon
} from 'lucide-vue-next'
import StatusBar from '../../components/layout/StatusBar.vue'

const router = useRouter()

// State
const selectedRoles = ref(['Pit', 'Tactician', 'Composite'])
const email = ref('')
const phone = ref('')
const selectedContactMethods = ref(['Phone'])
const selectedContactTime = ref('Anytime')
const isOpenToCrew = ref(true)

// Derived
const showHullOptions = computed(() => selectedRoles.value.includes('Hull'))

// Methods
const goBack = () => {
  router.go(-1)
}

const toggleRole = (role: string) => {
  const index = selectedRoles.value.indexOf(role)
  if (index > -1) {
    selectedRoles.value.splice(index, 1)
  } else {
    selectedRoles.value.push(role)
  }
}

const toggleContactMethod = (method: string) => {
  const index = selectedContactMethods.value.indexOf(method)
  if (index > -1) {
    selectedContactMethods.value.splice(index, 1)
  } else {
    selectedContactMethods.value.push(method)
  }
}

const selectContactTime = (time: string) => {
  selectedContactTime.value = time
}

const toggleCrewVisibility = () => {
  isOpenToCrew.value = !isOpenToCrew.value
}

const handleSave = () => {
  // Validate inputs
  if (!email.value.trim()) {
    showToast('Please enter your email')
    return
  }

  if (!phone.value.trim()) {
    showToast('Please enter your phone number')
    return
  }

  if (selectedRoles.value.length === 0) {
    showToast('Please select at least one role')
    return
  }

  // Save data (in a real app, this would save to a backend)
  const experienceData = {
    roles: selectedRoles.value,
    email: email.value,
    phone: phone.value,
    contactMethods: selectedContactMethods.value,
    contactTime: selectedContactTime.value,
    openToCrew: isOpenToCrew.value
  }

  console.log('Saving experience data:', experienceData)
  
  showToast('Experience saved successfully')
  
  // Navigate back to crew finder
  router.push('/crew')
}

const handleCancel = () => {
  router.push('/crew')
}

const showToast = (message: string) => {
  // Simple toast implementation
  const toast = document.createElement('div')
  toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg z-50'
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast)
    }
  }, 3000)
}
</script>

<style scoped>
.crew-finder-container {
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

.crew-finder-header {
  background: #33414c;
  z-index: 5;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.back-button:active {
  transform: scale(0.98);
}

.back-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.header-text {
  flex: 1;
}

.header-title {
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}

.header-subtitle {
  color: #9ba1a6;
  font-size: 14px;
  margin: 2px 0 0 0;
  line-height: 1.2;
}

.add-experience-content {
  flex: 1;
  background: #f7f7f7;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 20px;
}

.intro-box {
  background: #e8e8e8;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
}

.intro-box p {
  margin: 0;
  color: #2a3e4a;
  font-size: 14px;
  line-height: 1.4;
}

.section {
  background: white;
  margin: 16px 0;
  padding: 20px 16px;
}

.section-title {
  color: #2a3e4a;
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 16px 0;
}

.section-description {
  color: #9ba1a6;
  font-size: 14px;
  margin: 16px 0 0 0;
  line-height: 1.4;
}

.role-category {
  margin-bottom: 24px;
}

.category-header {
  color: #2a3e4a;
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 12px 0;
}

.role-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}

/* Rigger grid */
.rigger-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.rigger-grid.subrow {
  margin-top: 12px;
}

/* Card-style from Sailor remains */
.role-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  min-width: 80px;
  padding: 16px 8px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #e8e8e8;
  color: #2a3e4a;
  text-align: center;
  gap: 8px;
}

.role-card.selected {
  background: #0099e7;
  color: white;
}

.role-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.role-card:active {
  transform: scale(0.98);
}

.role-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.role-text {
  font-size: 12px;
  line-height: 1.2;
  text-align: center;
}

/* NEW: tag-style buttons for Rigger */
.tag-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 64px;
  border: none;
  border-radius: 12px;
  background: #e8e8e8;
  color: #2a3e4a;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease, background .15s ease, color .15s ease;
}
.tag-btn:hover { transform: translateY(-1px); }
.tag-btn:active { transform: scale(0.98); }
.tag-btn.selected { background: #0099e7; color: #fff; }

.tag-icon { width: 28px; height: 28px; }

.material-dot { width: 18px; height: 18px; border-radius: 50%; }
.material-dot.wood { background: #8B4513; }
.material-dot.comp  { background: #6B7280; }
.material-dot.metal { background: #374151; }

.tag-text { line-height: 1; }

/* Enter/leave animation for bottom row */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity .18s ease, transform .18s ease, height .18s ease, margin .18s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.input-group {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  color: #2a3e4a;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  color: #2a3e4a;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: #0099e7;
}

.input-field::placeholder {
  color: #9ba1a6;
}

.helper-text {
  color: #9ba1a6;
  font-size: 12px;
  margin: 4px 0 0 0;
}

.action-buttons {
  padding: 0 16px;
  margin-top: 20px;
}

.save-button {
  width: 100%;
  padding: 16px;
  background: #0099e7;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 12px;
  min-height: 52px;
}

.save-button:hover {
  background: #0088cc;
}

.save-button:active {
  transform: scale(0.98);
}

.cancel-button {
  width: 100%;
  padding: 12px;
  background: transparent;
  color: #0099e7;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.cancel-button:hover {
  color: #0088cc;
}

.cancel-button:active {
  transform: scale(0.98);
}

.contact-methods {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.contact-method-button {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #e8e8e8;
  color: #2a3e4a;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-method-button.selected {
  background: #0099e7;
  color: white;
}

.contact-method-button:hover {
  transform: translateY(-1px);
}

.contact-method-button:active {
  transform: scale(0.98);
}

.contact-time-segment {
  display: flex;
  background: #e8e8e8;
  border-radius: 20px;
  padding: 2px;
  gap: 2px;
}

.contact-time-button {
  flex: 1;
  padding: 10px 12px;
  border: none;
  border-radius: 18px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
  color: #2a3e4a;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-time-button.selected {
  background: #0099e7;
  color: white;
}

.contact-time-button:hover {
  background: rgba(0, 153, 231, 0.1);
}

.contact-time-button.selected:hover {
  background: #0088cc;
}

.contact-time-button:active {
  transform: scale(0.98);
}

.toggle-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.toggle-text {
  flex: 1;
}

.toggle-label {
  color: #2a3e4a;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
}

.toggle-helper {
  color: #9ba1a6;
  font-size: 14px;
  margin: 4px 0 0 0;
  line-height: 1.4;
}

.toggle-switch {
  position: relative;
  width: 52px;
  height: 32px;
  background: #e8e8e8;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-switch.active .toggle-slider {
  transform: translateX(20px);
}

.toggle-switch:hover {
  transform: scale(1.02);
}

.toggle-switch:active {
  transform: scale(0.98);
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .crew-finder-container {
    border-radius: 0;
    border: none;
    max-width: 100vw;
    min-height: 100vh;
  }
}
</style>
