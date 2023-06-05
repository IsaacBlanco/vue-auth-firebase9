<script setup>
import { reactive,ref } from 'vue';
import {useUserStore} from '@/stores/user' 
import { useRouter } from 'vue-router';


const userStore = useUserStore()
const router = useRouter()
const email = ref('')
const password = ref('')

const formState = reactive({
    email: '',
    password: '',
})


const handleSubmit =  async () => {

    if (!email.value || !password.value) {
        return alert('llena todos los campos')
    }
    console.log('procesando formulario')
    console.log(email.value);
    console.log(password.value);

    await userStore.registerUser(email.value,password.value)
}


const onFinish = async () => {

    if (!formState.email || !formState.password) {
        return alert('llena todos los campos')
    }
    console.log('procesando formulario')
    console.log(email.value);
    console.log(password.value);

    await userStore.registerUser(email.value,password.value)
}

const onFinishFailed = () => {
    console.log('Failed:', 'errorInfo');
    return alert("Datos incorrectos")
};

</script>

<template>
    <a-row>
        <a-col :xs="{span: 23, offset: 1}"  :sm="{span: 12, offset: 6}">
            <h1>Register</h1>
            <a-form
            action=""
            name="basicRegister"
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
            placeholder="Ingrese Email"
            />
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
                    
                    <a-form-item>
                        <a-button 
                        type="primary"
                        html-type="submit"
                        :disabled="userStore.loagindUser"
                        >Crear Usuario</a-button>    
                    </a-form-item>
                </a-form>
        </a-col>
    </a-row>
</template>