document.addEventListener("DOMContentLoaded", function () {
    // Redirect users when they click buttons
    let getStartedBtn = document.getElementById("getStarted");
    if (getStartedBtn) {
        getStartedBtn.addEventListener("click", function () {
            window.location.href = "login.html"; // Redirect to Login page
        });
    }

    let reportIncidentBtn = document.getElementById("reportIncident");
    if (reportIncidentBtn) {
        reportIncidentBtn.addEventListener("click", function () {
            window.location.href = "report.html";
        });
    }

    let nearbyPoliceBtn = document.getElementById("nearbyPolice");
    if (nearbyPoliceBtn) {
        nearbyPoliceBtn.addEventListener("click", function () {
            window.location.href = "police.html";
        });
    }

    let securityguideBtn = document.getElementById("securityguide");
    if (securityguideBtn) {
        securityguideBtn.addEventListener("click", function () {
            window.location.href = "security.html";
        });
    }
});
