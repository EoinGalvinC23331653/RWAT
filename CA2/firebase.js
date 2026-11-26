import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDCk09xW1SwnjNoctRWUqhuoanuFesaqm4",
    authDomain: "rwat-ca2-memory-game-f7a27.firebaseapp.com",
    projectId: "rwat-ca2-memory-game-f7a27",
    storageBucket: "rwat-ca2-memory-game-f7a27.firebasestorage.app",
    messagingSenderId: "455129735337",
    appId: "1:455129735337:web:c719abbc458132298689b8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);