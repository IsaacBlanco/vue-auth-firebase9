<script setup>
import {ref} from 'vue'
import {useDatabaseStore} from '@/stores/database'

const databaseStore = useDatabaseStore()

const url = ref("")


const handleSubmit = () => { 
    
    databaseStore.addUrl(url.value)
    console.log("formualiro....", url.value) 
}

</script>

<template>

<form @submit.prevent="handleSubmit">
    <input type="text" placeholder="Ingrese URL" v-model="url">
    <button type="submit">Agregar</button>
</form>

</template>