<script setup>
import { useUserStore } from "@/stores/user";
import { useDatabaseStore } from "../stores/database";
import { useRouter } from 'vue-router'
import AddUrl from "../components/AddUrl.vue";
import AddForm from "../components/AddForm.vue";
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';


const userStore = useUserStore()
const databaseStore = useDatabaseStore()
const router = useRouter()

databaseStore.getUrls()
</script>

<template>
    <h1>Home</h1>
    <p>{{ userStore.userData?.email }}</p>

    <AddForm></AddForm>
    <p v-if="databaseStore.loadingDocs">
        loading documents...</p>
    
    <UrlCard></UrlCard>
 
</template>