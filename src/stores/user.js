import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut  } from 'firebase/auth'
import {defineStore} from 'pinia'
import { auth } from '../firebaseConfig'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useDatabaseStore } from './database'



export const useUserStore = defineStore('user', () => {

    let userData = ref(null)
    const loagindUser = ref(false)
    const loadingSession = ref(false)

    const router = useRouter()

    async function registerUser(email, password) {
        loagindUser.value = true
        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            userData.value = {email: user.email, uid: user.uid}
            router.push("/")
            console.log(user)
            console.log(userData.value)
        } catch (error) {
            console.log(error.code)
            return error.code
        } finally{
            loagindUser.value = false
        }
    }
    
    async function loginUser(email, password) {
        loagindUser.value = true
        try {
             const {user} = await signInWithEmailAndPassword(auth, email, password)
             userData.value = {email: user.email, uid: user.uid}
             router.push("/")
        } catch (error) {
            console.log(error.code) 
            return error.code   
        }finally{
            loagindUser.value = false
        }
        
    }

    async function logoutUser(){
        //accede a otro store para poder usar sus methodeos
        const databaseStore = useDatabaseStore()
        databaseStore.$reset()
        try {
            await signOut(auth)
            userData.value  = null
            router.push('/loggin')
        } catch (error) {
            console.log(error)
        }
    }

    function currentUser() {
        return new Promise((resolve, reject) => {
            const unsiscribe = onAuthStateChanged(auth , (user) => { 
                if (user) {
                    userData.value = {email: user.email, uid: user.uid}
                }else{
                    userData.value  = {email:'', uid:''}
                }
                resolve(user)
             }, e => reject(e))
             unsiscribe()
        })
    }
    

    return{
        userData,
        registerUser,
        loginUser,
        logoutUser,
        loagindUser,
        loadingSession,
        currentUser,
    }
})