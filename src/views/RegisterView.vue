<script setup>
import { reactive,ref } from 'vue';
import {useUserStore} from '@/stores/user' 
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';


const userStore = useUserStore()
const router = useRouter()
const email = ref('')
const password = ref('')

const formState = reactive({
    email: '',
    password: '',
    repassword:'',
})


const handleSubmit =  async () => {

    if (!email.value || !password.value) {
        return alert('llena todos los campos')
    }
    console.log('procesando formulario')
    console.log(email.value);
    console.log(password.value);

   
}

const validatePass = async (_rule, value) => {
    if (value === '') {
        return Promise.reject('Please input the password');
      }  
    if (value !== formState.password ) {
        return Promise.reject('Password does not match')
    }
    return Promise.resolve();
      
}


const onFinish = async (values) => {

    if (!formState.email || !formState.password) {
        return alert('llena todos los campos')
    }
    console.log('procesando formulario', values)

   const error = await userStore.registerUser(formState.email,formState.password)

    if (!error){
        return
    }

    switch (error) {
        case 'auth/email-already-in-use':
            message.error('Email Already in use', 2)
            break;

        default:
            message.error('something unexpected happend, please try again')
            break;
    }

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

                <a-form-item
                label="Confirme Contraseña"
                name="repassword"
                :rules="[{ 
                        validator: validatePass,
                    }]"
                >
                    <a-input-password 
                    v-model:value="formState.repassword"
                    type="password"
                    placeholder="Ingrese Password"/>
                </a-form-item>
                
                <a-form-item>
                    <a-button 
                        type="primary"
                        html-type="submit"
                        :disabled="userStore.loagindUser"
                        :loading="userStore.loagindUser"
                    >
                        Crear Usuario
                    </a-button>    
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>