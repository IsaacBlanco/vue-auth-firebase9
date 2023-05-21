<script setup>
import { useUserStore } from "@/stores/user";
import { useDatabaseStore } from "../stores/database";

const userStore = useUserStore()
const databaseStore = useDatabaseStore()

databaseStore.getUrls()
</script>

<template>
    <h1>Home</h1>
    <p>{{ userStore.userData?.email }}</p>
    <p>{{ databaseStore.loadingDocs }}</p>
    <p v-if="databaseStore.loadingDocs">
        loading documents...</p>
    <ul v-else>
        <li v-for="item in databaseStore.documents" key="item.id">
            {{item.id}} - {{ item.name }} - {{ item.short }}
        </li>
    </ul>
</template>