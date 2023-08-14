// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1BlGvcCqoH479i1j4OAl9bpKQWLlLDTE",
  authDomain: "fallen-foodstore.firebaseapp.com",
  projectId: "fallen-foodstore",
  storageBucket: "fallen-foodstore.appspot.com",
  messagingSenderId: "59058903756",
  appId: "1:59058903756:web:41fc9568ad0af06d2d0069"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


export{
    db,
    auth,
    storage,
    app,
    signInWithEmailAndPassword,
    getAuth,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    setDoc,
    getDoc,
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    createUserWithEmailAndPassword
    
}