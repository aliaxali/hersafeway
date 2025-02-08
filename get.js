document.addEventListener("DOMContentLoaded", function () {
    // Redirect users when they click buttons
    document.getElementById("getStarted").addEventListener("click", function () {
        window.location.href = "report.html"; // Redirect to Report Incident page
    });

    document.getElementById("reportIncident").addEventListener("click", function () {
        window.location.href = "report.html";
    });

    document.getElementById("nearbyPolice").addEventListener("click", function () {
        window.location.href = "police.html";
    });
});
