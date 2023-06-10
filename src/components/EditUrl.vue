<script setup>
import { reactive, onMounted } from "vue";
import {useDatabaseStore} from '@/stores/database';
import { message } from "ant-design-vue";;
import { useRouter, useRoute } from 'vue-router';

const databaseStore = useDatabaseStore();
const route = useRoute();
const router = useRouter();

const formState = reactive({
    url: ''
});

const onFinish = async (value) => {
    console.log('Editing URL', value)

    const error = await databaseStore.updateUrl(route.params.id, formState.url)
    console.log(error)


    if(!error){
        formState.url=''
        router.push("/")
        return message.success('URL edited') 
    }

    switch (error) {    
        default:
            console.log('errores errores errores')
            message.error('Unexpected error, please try again later')
            break;
    }
};

onMounted( async () => {
    formState.url = await databaseStore.getUrl(route.params.id)
})

const back = () => router.push("/")

</script>

<template>
    <a-form
        name="editUrlForm"
        autocomplete="off"
        layout="vertical"
        :model="formState"
        @finish="onFinish"
    >
        <a-form-item
            name="url"
            label="Enter URL"
            :rules="[{
                required: true,
                whitespace: true,
                pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
                message: 'enter a valid URL',
            }]"
        >
            <a-input
            v-model:value="formState.url"
            >
            </a-input>
        </a-form-item>
        
        <a-form-item>
            <a-space>
                <a-button
                    type="primary"
                    html-type="submit"
                    :disabled="databaseStore.loading"
                    :loading="databaseStore.loading"
                    >Edit URL
                </a-button>
                <a-button
                    type="secondary"
                    @click="back"
                    :disabled="databaseStore.loading"
                    :loading="databaseStore.loading"
                    >Back
                </a-button>
            </a-space>
        </a-form-item>

    </a-form>
</template>