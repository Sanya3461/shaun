<template>
  <div class="filter-bar">
    <!-- Search Input -->
    <div class="search-container">
      <div class="search-input-wrapper">
        <SearchIcon class="search-icon" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name (if you know)"
          class="search-input"
        />
      </div>
    </div>

    <!-- Filter Categories -->
    <div class="filter-categories">
      <!-- Positions Category -->
      <div class="filter-category">
        <h3 class="category-label">Positions</h3>
        <div class="filter-chips-scroll">
          <div class="filter-chips-container">
            <button
              v-for="position in positionOptions"
              :key="position"
              :class="['filter-chip', { active: selectedFilters.positions.includes(position) }]"
              @click="toggleFilter('positions', position)"
            >
              {{ position }}
            </button>
          </div>
        </div>
      </div>



      <!-- Availability Category -->
      <div class="filter-category">
        <h3 class="category-label">Availability</h3>
        <div class="filter-chips-scroll">
          <div class="filter-chips-container">
            <button
              v-for="availability in availabilityOptions"
              :key="availability"
              :class="['filter-chip', { active: selectedFilters.availability.includes(availability) }]"
              @click="toggleFilter('availability', availability)"
            >
              {{ availability }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search as SearchIcon } from 'lucide-vue-next'

const searchQuery = defineModel('searchQuery', { type: String, default: '' })
const selectedFilters = defineModel('selectedFilters', {
  type: Object,
  default: () => ({
    positions: [],
    availability: []
  })
})

const positionOptions = [
  'Bowman',
  'Pit',
  'Grinder',
  'Trimmer(Main/Head)',
  'Tactician',
  'Meteorologist',
  'Navigator',
  'Coach',
  'Rigger – Sail',
  'Rigger – Rope',
  'Rigger – Hull(Wood)',
  'Rigger – Hull(Composite)',
  'Rigger – Hull(Metal)'
]



const availabilityOptions = [
  'Anytime',
  'Weekdays only',
  'Business hours'
]

const toggleFilter = (category: string, value: string) => {
  const filters = { ...selectedFilters.value }
  const categoryFilters = filters[category as keyof typeof filters]
  
  if (categoryFilters.includes(value)) {
    filters[category as keyof typeof filters] = categoryFilters.filter((item: string) => item !== value)
  } else {
    filters[category as keyof typeof filters] = [...categoryFilters, value]
  }
  
  selectedFilters.value = filters
}
</script>

<style scoped>
.filter-bar {
  background: white;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.search-container {
  margin-bottom: 20px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  width: 20px;
  height: 20px;
  color: #9ba1a6;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 44px;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  font-size: 16px;
  background: #f8f9fa;
  color: #2a3e4a;
  outline: none;
  transition: all 0.2s ease;
}

.search-input:focus {
  border-color: #0099e7;
  background: white;
}

.search-input::placeholder {
  color: #9ba1a6;
}

.filter-categories {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-category {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-label {
  font-size: 14px;
  font-weight: 600;
  color: #2a3e4a;
  margin: 0;
  padding-left: 4px;
}

.filter-chips-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.filter-chips-scroll::-webkit-scrollbar {
  display: none;
}

.filter-chips-container {
  display: flex;
  gap: 8px;
  padding: 4px 0;
  min-width: min-content;
}

.filter-chip {
  flex-shrink: 0;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  background: #f8f9fa;
  color: #6a6a6a;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-height: 36px;
  display: flex;
  align-items: center;
}

.filter-chip:hover:not(.active) {
  background: #e9ecef;
  border-color: #0099e7;
}

.filter-chip.active {
  background: #0099e7;
  color: white;
  border-color: #0099e7;
}

.filter-chip:active {
  transform: scale(0.98);
}
</style>