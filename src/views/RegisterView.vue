<script setup>
import { ref } from 'vue';
import {useUserStore} from '@/stores/user' 
import { useRouter } from 'vue-router';


const userStore = useUserStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const handleSubmit =  async () => {

    if (!email.value || !password.value) {
        return alert('llena todos los campos')
    }
    console.log('procesando formulario')
    console.log(email.value);
    console.log(password.value);

    await userStore.registerUser(email.value,password.value)
}

</script>

<template>
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit">
        <input 
        v-model.trim="email"
        type="email" placeholder="ingrese email">
        <input 
        v-model.trim="password"
        type="password" 
        placeholder="ingrese contraseña">
        <button 
        type="submit"
        :disabled="userStore.loagindUser"
        >Crear Usuario</button>
    </form>
</template>