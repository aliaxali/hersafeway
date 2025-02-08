// Firebase Configuration (Replace with your actual config)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Firestore database reference

// Form Submission
document.getElementById("reportForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get Form Values
    const reportType = document.getElementById("reportType").value;
    const location = document.getElementById("location").value;
    const dateTime = document.getElementById("dateTime").value;
    const description = document.getElementById("description").value;

    // Store Data in Firestore
    db.collection("incidentReports").add({
        reportType: reportType,
        location: location,
        dateTime: dateTime,
        description: description,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Auto-generate timestamp
    })
    .then(() => {
        console.log("Report submitted successfully!");
        window.location.href = "success.html"; // Redirect to Success Page
    })
    .catch(error => {
        console.error("Error submitting report: ", error);
        alert("Error submitting report. Please try again.");
    });
});

// GPS Location Function
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                document.getElementById("location").value = `Lat: ${latitude}, Lng: ${longitude}`;
            },
            (error) => {
                alert("Location access denied. Please enable GPS.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

