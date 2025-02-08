import { firebaseConfig } from './firebase_credentials.js';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to get user's current location
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

// Form submission: Save report to Firestore
document.getElementById("reportForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let reportData = {
        type: document.getElementById("reportType").value, // Incident type
        location: document.getElementById("location").value, // User-reported location
        dateTime: document.getElementById("dateTime").value, // Incident date & time
        description: document.getElementById("description").value, // Incident details
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Auto-generated submission time
    };

    // Store data in Firestore
    db.collection("incidentReports").add(reportData)
        .then(() => {
            console.log("Report stored successfully!");
            alert("Incident report submitted successfully.");
            window.location.href = "success.html"; // Redirect to success page
        })
        .catch(error => {
            console.error("Error saving report: ", error);
            alert("Error saving report. Please try again.");
        });
});
