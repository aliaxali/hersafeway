import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { firebaseConfig } from './firebase_credentials.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Attach location function globally
window.getLocation = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                document.getElementById("location").value = `Lat: ${latitude}, Lng: ${longitude}`;
            },
            () => {
                alert("Location access denied. Please enable GPS.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};

// Form submission
document.getElementById("reportForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let reportData = {
        type: document.getElementById("reportType").value,
        location: document.getElementById("location").value,
        dateTime: document.getElementById("dateTime").value,
        description: document.getElementById("description").value,
        timestamp: serverTimestamp()
    };

    try {
        await addDoc(collection(db, "reportedincident"), reportData);
        alert("Incident report submitted successfully.");
        window.location.href = "success.html";
    } catch (error) {
        console.error("Error saving report:", error);
        alert("Error saving report. Please try again.");
    }
});
