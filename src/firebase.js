import { initializeApp } from "firebase/app";

import {
  getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6SmWi50zgGGI1ca6WLP9LsSm2f6koT8M",
  authDomain: "plant-monitor-1483e.firebaseapp.com",
  projectId: "plant-monitor-1483e",
  storageBucket: "plant-monitor-1483e.firebasestorage.app",
  messagingSenderId: "944151195593",
  appId: "1:944151195593:web:52b1ab442f5904544dc218"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
