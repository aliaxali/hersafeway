const reportsList = document.getElementById("reports-list");

db.collection("incidentReports").orderBy("timestamp", "desc").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let report = doc.data();
            let reportItem = document.createElement("div");
            reportItem.innerHTML = `
                <h3>${report.type}</h3>
                <p><strong>Location:</strong> ${report.location}</p>
                <p><strong>Date & Time:</strong> ${report.dateTime}</p>
                <p><strong>Description:</strong> ${report.description}</p>
                <hr>
            `;
            reportsList.appendChild(reportItem);
        });
    })
    .catch(error => {
        console.error("Error fetching reports: ", error);
    });
