import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore/lite'
import {defineStore} from 'pinia'
import { ref } from 'vue'
import { auth, db } from '../firebaseConfig'
import { nanoid } from 'nanoid'


export const useDatabaseStore = defineStore('database', () => {
    //state
    const  documents = ref([])
    let loadingDocs = ref(false)
    let loading = ref(true)

    //methods
    async function getUrl(id) {
        loading.value = true

        try {
            const docRef = doc(db, 'urls', id)
            const docSnap = await getDoc(docRef)
            
            if (!docSnap.exists()) {
                throw new Error("el Doc no existe")
            }
            
            if (docSnap.data().user !== auth.currentUser.uid){
                throw new Error("Este usuario no tiene permitido hacer eso (¬¬)")
            }
        
            return docSnap.data().name
        } catch (error) {
            error.message
        }finally{
            loading.value = false
        }
    }

    async function getUrls() {

        if(documents.value.length !== 0){
            return
        }

        loadingDocs.value = true
        try {
            //creat query from collection
            const q = query(collection(db, 'urls'), where('user', '==', auth.currentUser.uid))

            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, " --> ", doc.data())
                documents.value.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
        } catch (error) {
            console.log(error.code)
            return error.code
        }finally{
            loadingDocs.value = false
        }
    }

    async function addUrl( name ){
        loading.value = true
        
        const urlObject = {
            name: name,
            short: nanoid(8),
            user: auth.currentUser.uid
        }

        try {
            const docRef = await addDoc(collection(db, 'urls'), urlObject)
            //console.log(docRef)
            documents.value.push({
                ...urlObject,
                id: docRef.id
            })
        } catch (error) {
            console.log('error...', error.code)
            return error.code
        }finally{
            loading.value = false
        }
    }

    async function updateUrl(id, name) {
        try {
            const docRef = doc(db, "urls", id)
            const docSnap = await getDoc(docRef)

            if (!docSnap.exists()) {
                throw new Error("el Doc no existe")
            }
            
            if (docSnap.data().user !== auth.currentUser.uid){
                throw new Error("Este usuario no tiene permitido hacer eso (¬¬)")
            }
            
            await updateDoc(docRef , {
                name: name
            })

            documents.value = documents.value.map(item => item.id  === id ? ({...item, name: name}) : item)

            console.log("intentado mdnat a home")


        } catch (error) {
            console.message
        }finally{

        }
    }

    async function deleteUrl( id ) {
        
        const docRef = doc(db, "urls", id)
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            throw new Error("el Doc no existe")
        }
        
        if (docSnap.data().user !== auth.currentUser.uid){
            throw new Error("Este usuario no tiene permitido hacer eso (¬¬)")
        }

        try {
            await deleteDoc(docRef)
            documents.value = documents.value.filter((item) => item.id !== id)
        } catch (error) {
            console.log(error.message)    
        }finally{

        }
    }

    function $reset() {
        documents.value = []
      }
    //getter setter

    return{
        getUrl,
        getUrls,
        documents,
        loadingDocs,
        addUrl,
        updateUrl,
        deleteUrl,
        $reset,
    }
})