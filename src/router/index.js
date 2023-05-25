import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useUserStore } from '../stores/user' 

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore()
  userStore.loadingSession = true
  
  const user = await userStore.currentUser()
  if(user){
    next()
  }else{
    next('/loggin')
  }
  userStore.loadingSession = false
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView, beforeEnter: requireAuth
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('@/views/EditView.vue'), beforeEnter:requireAuth
    },
    {
      path: '/loggin',
      name: 'loggin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/LogginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
  ]
})

export default router
