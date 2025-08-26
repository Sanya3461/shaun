// User types
export interface UserData {
  id: string
  name: string
  email: string
  profileImage: string
  location: string
  bio: string
  following: number
  followers: number
  totalDistance: number
  totalTime: number
}

// Sailing types
export interface SailingResult {
  id: string
  place: string
  date: string
  event: string
  boatClass: string
  boats: string
  races: string
  icon: string
}

export interface SailingSession {
  id: string
  title: string
  time: string
  distance: string
  avgSpeed: string
  maxSpeed: string
  date: string
}

export interface CrewMember {
  id: string
  name: string
  avatar: string
  role?: string
}

// Post types
export interface RecentPost {
  author: string
  timeAgo: string
  title: string
  content: string
  kudos: number
  comments: number
  lookingForCrew: boolean
  hasSessionData: boolean
  hasAchievements: boolean
  hasImages: boolean
}

// Feed Post types
export interface FeedPostData {
  id: string
  author: {
    name: string
    avatar: string
    isFollowing: boolean
  }
  timeAgo: string
  title: string
  content: string
  sessionData?: {
    time: string
    distance: string
    avgSpeed: string
    maxSpeed: string
  }
  achievement?: {
    text: string
    icon: string
  }
  images?: string[]
  kudos: number
  comments: number
  lookingForCrew: boolean
  crewType?: string
}

// Navigation types
export interface NavigationItem {
  id: string
  label: string
}

export interface Tab {
  id: string
  label: string
}

// Event types
export interface Event {
  id: string
  title: string
  location: string
  day: string
  month: string
  participants: number
  type: string
}

// Tracking types
export interface TrackingSession {
  duration: number // in seconds
  distance: number
  currentSpeed: number
  maxSpeed: number
}

export interface Track {
  id: string
  name: string
  date: string
  distance: number
  duration: string
}

// Social stats
export interface SocialStat {
  label: string
  count: string
}