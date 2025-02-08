document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map').setView([20, 77], 5); // Default center (India)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    window.findPoliceStations = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    var userLat = position.coords.latitude;
                    var userLon = position.coords.longitude;

                    map.setView([userLat, userLon], 14); // Zoom in

                    // Add user location marker
                    L.marker([userLat, userLon]).addTo(map)
                        .bindPopup("📍 You are here").openPopup();

                    // Fetch police stations from OpenStreetMap Overpass API
                    fetchPoliceStations(userLat, userLon);
                },
                function () {
                    alert("Geolocation failed. Please allow location access.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    async function fetchPoliceStations(userLat, userLon) {
        const overpassQuery = `
            [out:json];
            node["amenity"="police"](around:5000, ${userLat}, ${userLon});
            out;
        `;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

        try {
            let response = await fetch(url);
            let data = await response.json();

            if (data.elements.length === 0) {
                alert("No nearby police stations found.");
                return;
            }

            let policeStations = data.elements.map(station => ({
                name: station.tags.name || "Unnamed Police Station",
                lat: station.lat,
                lon: station.lon,
                address: station.tags["addr:street"] || "Unknown Address",
                phone: station.tags.phone || "N/A",
                distance: getDistance(userLat, userLon, station.lat, station.lon) // Calculate distance
            }));

            // Sort police stations by distance (closest first)
            policeStations.sort((a, b) => a.distance - b.distance);

            displayPoliceStations(policeStations);
        } catch (error) {
            console.error("Error fetching police stations:", error);
        }
    }

    function displayPoliceStations(policeStations) {
        var infoContainer = document.getElementById("police-info");
        infoContainer.innerHTML = ""; // Clear old data
        infoContainer.style.display = "block";

        policeStations.forEach(station => {
            L.marker([station.lat, station.lon]).addTo(map)
                .bindPopup(`<b>${station.name}</b><br>${station.address}<br>☎ ${station.phone}<br>📏 ${station.distance.toFixed(2)} km`);

            let stationCard = document.createElement("div");
            stationCard.className = "police-card";
            stationCard.innerHTML = `
                <h3>${station.name}</h3>
                <p><strong>Address:</strong> ${station.address}</p>
                <p><strong>Phone:</strong> <a href="tel:${station.phone}">${station.phone}</a></p>
                <p><strong>Distance:</strong> ${station.distance.toFixed(2)} km</p>
                <p><a href="https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lon}" target="_blank">🗺 Get Directions</a></p>
            `;
            infoContainer.appendChild(stationCard);
        });
    }

    // Function to calculate the distance between two coordinates (Haversine formula)
    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }
});
