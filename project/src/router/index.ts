import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
import ProfileOverview from '../components/ProfileOverview.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileOverview
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('../views/events/Events.vue')
  },
  {
    path: '/tracking',
    name: 'Tracking',
    component: () => import('../views/tracking/Tracking.vue')
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('../views/posts/PostShare.vue')
  },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: () => import('../views/profile/UserProfile.vue'),
    props: true
  },
  {
    path: '/comparison',
    name: 'Comparison',
    component: () => import('../views/profile/Comparison.vue')
  },
  {
    path: '/comparison/:leftUserId/:rightUserId',
    name: 'ComparisonWithUsers',
    component: () => import('../views/profile/Comparison.vue'),
    props: true
  },
  {
    path: '/comparison',
    name: 'Comparison',
    component: () => import('../views/profile/Comparison.vue')
  },
  {
    path: '/comments/:postId?',
    name: 'Comments',
    component: () => import('../views/comments/Comments.vue'),
    props: true
  },
  {
    path: '/crew',
    name: 'CrewFinder',
    component: () => import('../views/crew/CrewFinder.vue')
  },
  {
    path: '/crew/experience',
    name: 'AddExperience',
    component: () => import('../views/crew/AddExperience.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router