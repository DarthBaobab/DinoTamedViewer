document.getElementById("loadBtn").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Bitte einen Benutzernamen eingeben!");
        return;
    }
    loadDinoData(username);
});

async function loadDinoData(username) {
    const status = document.getElementById("status");
    const tbody = document.querySelector("#dinoTable tbody");
    tbody.innerHTML = ""; // Tabelle leeren
    status.textContent = "Lade Daten...";

    try {
        const res = await fetch(`saves/${username}.json`);
        if (!res.ok) throw new Error("Keine Daten gefunden.");

        const data = await res.json();

        if (Object.keys(data).length === 0) {
            status.textContent = "Keine gezähmten Dinos gefunden.";
            return;
        }

        for (const [dinoName, dinoInfo] of Object.entries(data)) {
            const row = document.createElement("tr");

            const cellIcon = document.createElement("td");
            cellIcon.textContent = dinoInfo.icon || "❓";

            const cellName = document.createElement("td");
            cellName.textContent = dinoName;

            const cellDate = document.createElement("td");
            cellDate.textContent = dinoInfo.tame_date || "-";

            row.appendChild(cellIcon);
            row.appendChild(cellName);
            row.appendChild(cellDate);

            tbody.appendChild(row);
        }

        status.textContent = `Zeige gezähmte Dinos von ${username}`;

    } catch (err) {
        status.textContent = "Fehler: " + err.message;
    }
}

