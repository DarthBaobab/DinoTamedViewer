document.getElementById("loadBtn").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Bitte einen Benutzernamen eingeben!");
        return;
    }
    loadDinoData(username);
});

async function loadDinoData(username) {
    const output = document.getElementById("output");
    output.textContent = "Lade Daten...";

    try {
        const res = await fetch(`saves/${username}.json`);
        if (!res.ok) throw new Error("Keine Daten gefunden.");

        const data = await res.json();

        if (Object.keys(data).length === 0) {
            output.textContent = "Keine gezähmten Dinos gefunden.";
            return;
        }

        // Schöne Ausgabe der Dinos
        let text = "";
        for (const [dinoName, dinoInfo] of Object.entries(data)) {
            text += `${dinoName}:\n`;
            for (const [key, value] of Object.entries(dinoInfo)) {
                text += `  ${key}: ${value}\n`;
            }
            text += "\n";
        }
        output.textContent = text.trim();

    } catch (err) {
        output.textContent = "Fehler: " + err.message;
    }
}
