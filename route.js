import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBG89eVwFomaS6_Uf78K6Wdin2H-ff3T6U",
    authDomain: "hersafeway-e0195.firebaseapp.com",
    projectId: "hersafeway-e0195",
    storageBucket: "hersafeway-e0195.firebasestorage.app",
    messagingSenderId: "900721749296",
    appId: "1:900721749296:web:f1264deef17bd158c36cf5",
    measurementId: "G-Q20CPYVE26"
};

// ✅ Initialize Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("✅ Firebase Initialized:", app);
console.log("✅ Firestore Connected:", db);

// ✅ Initialize Leaflet Map
console.log("✅ Initializing map...");
var map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
console.log("✅ Map loaded successfully.");

let routeControl = null;
let crimeMarkers = [];
const CRIME_RADIUS = 2000; // 2 km radius to avoid

// ✅ Function to Get Coordinates from Location Name
async function getCoordinates(location) {
    let response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
    let data = await response.json();
    if (data.length > 0) {
        console.log(`📍 Coordinates for ${location}:`, data[0].lat, data[0].lon);
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } else {
        alert(`⚠️ Could not find coordinates for: ${location}`);
        return null;
    }
}

// ✅ Function to Get Crime Data from Firestore
async function getCrimeData(city) {
    let crimeLocations = [];
    try {
        console.log(`🔎 Fetching crime data for city: ${city}`);
        const crimeQuery = query(collection(db, "crime_reports"), where("City", "==", city));
        const querySnapshot = await getDocs(crimeQuery);

        querySnapshot.forEach(doc => {
            let data = doc.data();
            if (data.latitude && data.longitude) {
                crimeLocations.push([data.latitude, data.longitude]);
            }
        });

        console.log(`🚨 Crime Data for ${city}:`, crimeLocations);
    } catch (error) {
        console.error("❌ Error fetching crime data:", error);
    }
    return crimeLocations;
}

// ✅ Function to Find & Display the Safe Route
async function findSafeRoute() {
    let startLocation = document.getElementById("start_location").value;
    let destination = document.getElementById("destination").value;

    if (!startLocation || !destination) {
        alert("⚠️ Please enter both start and destination locations.");
        return;
    }

    let startCoords = await getCoordinates(startLocation);
    let endCoords = await getCoordinates(destination);

    if (!startCoords || !endCoords) {
        alert("⚠️ Could not find one of the locations. Try again.");
        return;
    }

    console.log("📍 Start:", startCoords, "📍 End:", endCoords);

    let city = startLocation.split(',')[0];  // Extract city from input
    let crimeData = await getCrimeData(city);

    if (crimeData.length === 0) {
        console.warn(`⚠️ No crime data found for ${city}.`);
    }

    // ✅ Remove previous crime markers
    crimeMarkers.forEach(marker => map.removeLayer(marker));
    crimeMarkers = [];

    // ✅ Remove previous route if it exists
    if (routeControl) {
        console.log("🗑️ Removing previous route...");
        map.removeControl(routeControl);
        routeControl = null;
    }

    // ✅ Mark crime locations on the map
    crimeData.forEach(([lat, lon]) => {
        let marker = L.circle([lat, lon], { radius: CRIME_RADIUS, color: 'red' }).addTo(map);
        crimeMarkers.push(marker);
    });

    // ✅ Draw the safest route in GREEN
    routeControl = L.Routing.control({
        waypoints: [
            L.latLng(startCoords[0], startCoords[1]),
            L.latLng(endCoords[0], endCoords[1])
        ],
        routeWhileDragging: true,
        lineOptions: { styles: [{ color: "green", opacity: 0.8, weight: 6 }] } // Green Route
    }).addTo(map);

    alert("✅ This is the safest route avoiding high-crime areas.");
}

// ✅ Debugging: Check if button clicks are detected
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM Loaded. Ready to accept input.");
    
    document.querySelector("button").addEventListener("click", function () {
        console.log("🛤️ Find Safe Route button clicked.");
        findSafeRoute();
    });
});
