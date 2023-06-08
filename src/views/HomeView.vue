<script setup>
import { useUserStore } from "@/stores/user";
import { useDatabaseStore } from "../stores/database";
import { useRouter } from 'vue-router'
import AddUrl from "../components/AddUrl.vue";
import AddForm from "../components/AddForm.vue";

const userStore = useUserStore()
const databaseStore = useDatabaseStore()
const router = useRouter()

databaseStore.getUrls()
</script>

<template>
    <h1>Home</h1>
    <p>{{ userStore.userData?.email }}</p>

    <AddForm></AddForm>

    <p>{{ databaseStore.loadingDocs }}</p>
    <p v-if="databaseStore.loadingDocs">
        loading documents...</p>
    <ul v-else>
        <li v-for="item in databaseStore.documents" key="item.id">
            {{item.id}} - {{ item.name }} - {{ item.short }}
            <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
            <button @click="router.push(`/edit/${item.id}`)">Editar</button>
        </li>
    </ul>
</template>