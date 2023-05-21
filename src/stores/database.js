import { collection, getDocs, query, where } from 'firebase/firestore/lite'
import {defineStore} from 'pinia'
import { ref } from 'vue'
import { auth, db } from '../firebaseConfig'


export const useDatabaseStore = defineStore('database', () => {
    //state
    const  documents = ref([])
    let loadingDocs = ref(false)

    //methods
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
                console.log(doc.id, " --> ", doc.data())
                documents.value.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
        } catch (error) {
            console.log(error)
        }finally{
            loadingDocs.value = false
        }
    }

    function $reset() {
        documents.value = []
      }
    //getter setter

    return{
        getUrls,
        documents,
        loadingDocs,
        $reset,
    }
})