<script setup>
import {useUserStore} from '@/stores/user'
import { message } from 'ant-design-vue';
import { reactive, ref } from 'vue';

const userStore = useUserStore()

const formState = reactive({
    email: '',
    password: '',
    remember: true,
})

//const email = ref('')
//const password = ref('')

const handleSubmit = async () =>{
}

const onFinish = async (values) => {
    console.log('Success:', values);
    const error = await userStore.loginUser(formState.email, formState.password)

    // if error is undefined then return put the function else get the error code
    if(!error){
        return
    }

    switch (error) {
        case 'auth/wrong-password':
            message.error('This is an error message');        
            break;
        case 'auth/user-not-found':
            message.error('User not found', 2)
    
        default:
            break;
    }



    };

const onFinishFailed = () => {
    console.log('Failed:', 'errorInfo');
    return alert("Datos incorrectos")
};


</script>

<template>
    <a-row >
        <a-col :xs="{span: 23, offset: 1}"  :sm="{span: 12, offset: 6}">
            <h1>Loggin - {{ userStore.userData?.email }}</h1>
            <a-form 
                action=""
                name="basicLogin"
                autocomplete="off"
                layout="vertical"
                :model="formState"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
            >
                <a-form-item
                    label="Ingrese Email"
                    name="email"
                    :rules="[{ 
                        required: true,
                        whitespace: true,
                        type: 'email',
                        message: 'Please input your email!' 
                        }]"
                >
                    <a-input 
                        v-model:value="formState.email"
                        type="email"
                        placeholder="Ingrese Email"/>
                </a-form-item>
                <a-form-item
                    label="Ingrese Contraseña"
                    name="password"
                    :rules="[{ 
                        required: true, 
                        min: 6,
                        whitespace: true,
                        message: 'Please input your password!' }]"
                >
                    <a-input-password 
                    v-model:value="formState.password"
                    type="password"
                    placeholder="Ingrese Password"/>
                </a-form-item>

                <a-form-item 
                    name="remember" 
                    >
                    <a-checkbox 
                    v-model:checked="formState.remember"
                    >Remember me</a-checkbox>
                </a-form-item>
                <a-form-item 
                >
                    <a-button 
                    type="primary"
                    html-type="submit"
                    :disabled="userStore.loagindUser"
                    :loading="userStore.loagindUser"
                    >Login</a-button>
                </a-form-item>

            </a-form>
        </a-col>
    </a-row>
</template>