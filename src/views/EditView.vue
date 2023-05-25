<script setup>
import {useRoute} from 'vue-router'
import { useDatabaseStore } from "../stores/database";
import { onMounted,ref } from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const databaseStore = useDatabaseStore()
const route = useRoute()

databaseStore.getUrl(route.params.id)
const url = ref('')


console.log(route.params)


const hanldeSubmit = () => {
    console.log("editar url")

    //validations for input

    databaseStore.updateUrl(route.params.id, url.value)
    router.push("/")

}

onMounted( async () => {
    url.value = await databaseStore.getUrl(route.params.id)
})


</script>


<template>

<h1>Edit : {{route.params.id}}</h1>

<form @submit.prevent="hanldeSubmit">
    <p>name: </p>
    <input 
    type="text"
    placeholder="url"
    v-model="url">
    <p>short</p>
    <input type="text"
    placeholder="shor-url">
    <button type="submit">Editar</button>


</form>

</template>