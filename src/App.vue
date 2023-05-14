<script setup>
import {useUserStore} from '@/stores/user'

const userStore = useUserStore()


</script>
<template>
  <h1>Hola - {{ userStore.userData?.email }}</h1>
  <nav v-if="!userStore.loadingSession">
    <RouterLink
    v-if="userStore.userData"
    to="/">Home</RouterLink>
    <RouterLink 
    v-if="!userStore.userData"
    to="/loggin">Loggin</RouterLink>
    <RouterLink 
    v-if="!userStore.userData"
    to="/register">Register</RouterLink>
    <button 
    v-if="userStore.userData"
    @click="userStore.logoutUser">Logout</button>
  </nav>
  <div
  v-else>
  Loagind User...
  </div>
  <RouterView></RouterView>
</template>