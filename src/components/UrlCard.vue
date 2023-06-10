<script setup>
import { useDatabaseStore } from "../stores/database";
import { useRouter } from 'vue-router'

import { DeleteOutlined, EditOutlined, QuestionCircleOutlined, } from '@ant-design/icons-vue';
import { message } from "ant-design-vue";

const databaseStore  = useDatabaseStore()
const router = useRouter()

const confirm = async (id) => {
      console.log(id);
      const error =  await databaseStore.deleteUrl(id)
    
      if (!error){
        return message.success('URL Deleted')
      }
        message.error(error)
    
    };


    const cancel = e => {
      console.log(e);
      message.error('I thougth so...');
    };

</script>

<template>

<a-space
    v-if="!databaseStore.loadingDocs" 
    direction="vertical"
    style="width: 100%"
    >
        <a-card
            v-for="item in databaseStore.documents"
            :key="item.id"
            :title="'URL - ' + item.short" 
            size="small"
            style="width: 100%"
        >
            <template #extra>
                <a-space>
                    <edit-outlined 
                        key="edit"
                        @click="router.push(`/edit/${item.id}`)"/>
                    
                        
                    <a-popconfirm 
                        title="Do you want to delete?"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="confirm(item.id)"
                        @cancel="cancel"
                    >                    
                        <template #icon><question-circle-outlined style="color: red" /></template>
                        <delete-outlined 
                            key="delete"
                        />
                    </a-popconfirm>
                </a-space>
            </template> 
            <p>Full Url: {{ item.name }}</p>
        </a-card>
    </a-space>


</template>