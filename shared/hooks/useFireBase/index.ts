// FireBase
import { initializeApp } from 'firebase/app'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDoys46p0hRHVjWXrvdPxsVBPDisHtkxlA',
  authDomain: 'forconspects.firebaseapp.com',
  databaseURL:
    'https://forconspects-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'forconspects',
  storageBucket: 'forconspects.appspot.com',
  messagingSenderId: '408158242550',
  appId: '1:408158242550:web:54a6c323294b8596840ed7',
}

const useFirebase = () => {
  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig)
  const storage = getStorage(firebase)

  return {
    storage,
    getDownloadURL,
    ref,
    uploadBytesResumable,
  }
}

export default useFirebase
