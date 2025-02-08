document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map
    var map = L.map('map').setView([20, 77], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    function searchRoute() {
        var location = document.getElementById("location").value;
        console.log("Searching safest routes for:", location);
        // API integration can be added here
    }

    // Logout Function
    window.logout = function () {
        alert("You have successfully logged out.");
        window.location.href = "/login/login.html"; // Redirect to login page
    };
});
