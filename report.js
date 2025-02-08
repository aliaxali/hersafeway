// Function to get user's current location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                document.getElementById("location").value = `Latitude: ${lat}, Longitude: ${lon}`;
            },
            function (error) {
                alert("Unable to retrieve location. Please enter manually.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Form submission (Redirects to Success Page)
document.getElementById("reportForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    let reportData = {
        type: document.getElementById("reportType").value,
        location: document.getElementById("location").value,
        dateTime: document.getElementById("dateTime").value,
        description: document.getElementById("description").value,
    };

    console.log("Report Submitted:", reportData);
    
    // Redirect to success page
    window.location.href = "success.html";
});
