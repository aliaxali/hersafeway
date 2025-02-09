// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { readFileSync } from "fs"; // For reading JSON files
const firebaseConfig = {
    apiKey: "AIzaSyBG89eVwFomaS6_Uf78K6Wdin2H-ff3T6U",
    authDomain: "hersafeway-e0195.firebaseapp.com",
    projectId: "hersafeway-e0195",
    storageBucket: "hersafeway-e0195.firebasestorage.app",
    messagingSenderId: "900721749296",
    appId: "1:900721749296:web:f1264deef17bd158c36cf5",
    measurementId: "G-Q20CPYVE26"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load JSON file
const filePath = "./crime_dataset_india.json"; // Path to JSON file
const crimeData = JSON.parse(readFileSync(filePath, "utf-8")); // Read and parse JSON

// Function to upload JSON data to Firestore
async function uploadCrimeData() {
    const crimeCollectionRef = collection(db, "crime_reports"); // Collection name

    for (let crime of crimeData) {
        try {
            await addDoc(crimeCollectionRef, crime);
            console.log("Crime data added:", crime);
        } catch (error) {
            console.error("Error adding document:", error);
        }
    }
}

// Call the function to start uploading
uploadCrimeData();
