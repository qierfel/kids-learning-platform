import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// 从 Firebase 控制台获取这些配置
const firebaseConfig = {
  apiKey: "AIzaSyAFrGS8dbGQaVeNh29b6tMeFXOnBzPcnrE",
  authDomain: "kids-learning-platform-5ae4f.firebaseapp.com",
  projectId: "kids-learning-platform-5ae4f",
  storageBucket: "kids-learning-platform-5ae4f.firebasestorage.app",
  messagingSenderId: "999227224078",
  appId: "1:999227224078:web:8ed5ee67ad8d2680074c5f"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
