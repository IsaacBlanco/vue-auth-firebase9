<script setup>
import {useUserStore} from '@/stores/user'
import { ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const userStore = useUserStore()
const route = useRoute()
const selectedKeys = ref([''])


watch(() => route.name, () => selectedKeys.value = [route.name])


</script>
<template>
  <a-layout>
    <a-layout-header v-if="!userStore.loadingSession">
      <a-menu
      theme="dark"
      mode="horizontal"
      :style="{ linearHeight: '64px'}"
      v-model:selectedKeys="selectedKeys">
        <a-menu-item v-if="userStore.userData"
        key="home">
          <RouterLink
          to="/">Home</RouterLink>        
        </a-menu-item>
        <a-menu-item v-if="userStore.userData"
        key="edit">
          <RouterLink
          to="/edit">Edit
          </RouterLink>      
        </a-menu-item>
        <a-menu-item v-if="!userStore.userData"
        key="loggin">
          <RouterLink 
          to="/loggin">Loggin</RouterLink>
          </a-menu-item>
        <a-menu-item v-if="!userStore.userData"
        key="register">
          <RouterLink 
          to="/register">Register</RouterLink>
        </a-menu-item>
        <a-menu-item
        v-if="userStore.userData"
        @click="userStore.logoutUser">Logout
        </a-menu-item>
      </a-menu>
      <nav >
      </nav>
    </a-layout-header>

    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <h1>Hola - {{ userStore.userData?.email }}</h1>
        <div
          v-if="userStore.loadingSession">
          Loagind User...
        </div>
        <RouterView></RouterView>
      </div>
    </a-layout-content>
  </a-layout>
</template>