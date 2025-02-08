// Firebase Configuration (Replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyBG89eVwFomaS6_Uf78K6Wdin2H-ff3T6U",
    authDomain: "hersafeway-e0195.firebaseapp.com",
    projectId: "hersafeway-e0195",
    storageBucket: "hersafeway-e0195.firebasestorage.app",
    messagingSenderId: "900721749296",
    appId: "1:900721749296:web:f1264deef17bd158c36cf5"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Firestore
  const db = firebase.firestore();
  