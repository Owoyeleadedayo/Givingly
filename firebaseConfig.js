import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import {  getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBs9Zs5Ie7SpjUJE1tpLJhsXI2CQeEWexA",
  authDomain: "givingly-93cd3.firebaseapp.com",
  projectId: "givingly-93cd3",
  storageBucket: "givingly-93cd3.appspot.com",
  messagingSenderId: "605356177452",
  appId: "1:605356177452:web:63d86298d8d7e4002bf989"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);