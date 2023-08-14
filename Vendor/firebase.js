import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };