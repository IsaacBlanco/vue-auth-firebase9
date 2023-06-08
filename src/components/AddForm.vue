<script setup>
import { reactive } from "vue";
import {useDatabaseStore} from '@/stores/database'
import { message } from "ant-design-vue";

const databaseStore = useDatabaseStore()

const formState = reactive({
    url: ''
});

const onFinish = async (value) => {
    console.log('checking', value)
    const error = await databaseStore.addUrl(formState.url)
    console.log(error)
    if(!error){
        formState.url=''
        return message.success('URL added')
    }

    switch (error) {    
        default:
            console.log('errores errores errores')
            message.error('Unexpected error, please try again later')
            break;
    }

};

</script>

<template>
    <a-form
        name="addForm"
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
            <a-button
                type="primary"
                html-type="submit"
                :disabled="databaseStore.loading"
                :loading="databaseStore.loading"
                >Add URL
            </a-button>
        </a-form-item>

    </a-form>
</template>