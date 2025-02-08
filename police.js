document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map').setView([20, 77], 5); // Default center (India)
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    window.findPoliceStations = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;
                    
                    map.setView([lat, lon], 14); // Zoom in
                    
                    // Add user location marker
                    L.marker([lat, lon]).addTo(map)
                        .bindPopup("You are here").openPopup();

                    // Call an API (simulated here)
                    fetchPoliceStations(lat, lon);
                },
                function () {
                    alert("Geolocation failed. Please allow location access.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    function fetchPoliceStations(lat, lon) {
        // Simulated data (replace with API data if available)
        var policeStations = [
            { name: "Central Police Station", address: "123 Main St, City", phone: "+1234567890", hours: "24/7", lat: lat + 0.01, lon: lon + 0.01 },
            { name: "Eastside Police Dept", address: "45 East Rd, City", phone: "+1234567891", hours: "24/7", lat: lat - 0.01, lon: lon - 0.01 },
            { name: "West End Police Station", address: "789 West Blvd, City", phone: "+1234567892", hours: "8 AM - 10 PM", lat: lat + 0.015, lon: lon - 0.015 }
        ];

        var infoContainer = document.getElementById("police-info");
        infoContainer.innerHTML = ""; // Clear old data
        infoContainer.style.display = "block";

        policeStations.forEach(station => {
            L.marker([station.lat, station.lon]).addTo(map)
                .bindPopup(`<b>${station.name}</b><br>${station.address}<br>☎ ${station.phone}<br>🕒 ${station.hours}`);

            let stationCard = document.createElement("div");
            stationCard.className = "police-card";
            stationCard.innerHTML = `
                <h3>${station.name}</h3>
                <p><strong>Address:</strong> ${station.address}</p>
                <p><strong>Phone:</strong> <a href="tel:${station.phone}">${station.phone}</a></p>
                <p><strong>Hours:</strong> ${station.hours}</p>
                <p><a href="https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lon}" target="_blank">Get Directions</a></p>
            `;
            infoContainer.appendChild(stationCard);
        });
    }
});
