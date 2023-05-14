<script setup>
import {useUserStore} from '@/stores/user'
import { ref } from 'vue';


const userStore = useUserStore()
const email = ref('')
const password = ref('')

const handleSubmit = async () =>{

    if (!email.value || !password.value) {
        return alert('llene ambos campos')
    }
    console.log('logeando usuario')
    console.log(email.value);
    console.log(password.value);

    await userStore.loginUser(email.value, password.value)
}


</script>

<template>
    <h1>Loggin - {{ userStore.userData?.email }}</h1>
    <form @submit.prevent="handleSubmit" action="">
        <input 
        v-model.trim="email"
        type="email"
        placeholder="Ingrese Email">
        <input 
        v-model="password"
        type="password"
        placeholder="Ingrese Password">
        <button 
        type="submit"
        :disabled="userStore.loagindUser"
        >Login</button>
    </form>
</template>