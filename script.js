// document.getElementById("loadBtn").addEventListener("click", () => {
    // const username = document.getElementById("username").value.trim();
    // if (!username) {
        // alert("Bitte einen Benutzernamen eingeben!");
        // return;
    // }
    // loadDinoData(username);
// });

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

        for (const [dinoID, dinoInfo] of Object.entries(data)) {
            const row = document.createElement("tr");

            const cellIcon = document.createElement("td");
			const img = document.createElement("img");
			img.src = `dino_icons/${dinoInfo.name}.png`;
			img.alt = "";
			img.style.width = "32px";
			img.style.height = "32px";
			cellIcon.appendChild(img);

            const cellID = document.createElement("td");
            cellID.textContent = dinoID;

            const cellName = document.createElement("td");
            cellName.textContent = dinoInfo.name;

            const cellDate = document.createElement("td");
            cellDate.textContent = dinoInfo.tame_date;
            
            const cellLevel = document.createElement("td");
            cellLevel.textContent = dinoInfo.level;

            const cellEff = document.createElement("td");
            cellEff.textContent = dinoInfo.effectiveness;

			const cellHP = document.createElement("td");
            cellHP.textContent = dinoInfo.health;
            
			const cellDMG = document.createElement("td");
            cellDMG.textContent = dinoInfo.damage;
			
			const cellKD = document.createElement("td");
			cellKD.textContent = `${dinoInfo.win} / ${dinoInfo.lose}`;


            row.appendChild(cellID);
			row.appendChild(cellIcon);
            row.appendChild(cellName);
            row.appendChild(cellLevel);
			row.appendChild(cellEff);
			row.appendChild(cellDate);
            row.appendChild(cellHP);
            row.appendChild(cellDMG);
            row.appendChild(cellKD);

            tbody.appendChild(row);
        }

        status.textContent = `Zeige gezähmte Dinos von ${username}`;

    } catch (err) {
        status.textContent = "Fehler: " + err.message;
    }
}

function getUserFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("username");
}

document.addEventListener("DOMContentLoaded", () => {
    const username = getUserFromURL();
    if (username) {
        loadDinoData(username).then(() => {
            // Sortierung nach dem Füllen der Tabelle aktivieren
            new Tablesort(document.getElementById("dinoTable"));

            // Filter nach dem Füllen der Tabelle aktivieren
            const tf = new TableFilter('dinoTable', {
                base_path: 'https://unpkg.com/tablefilter@1.0.0/dist/tablefilter/',
                auto_filter: true,
                rows_counter: true,
                btn_reset: true,
				filters_row_index: 1,
				col_0: 'number',
				col_1: 'none',      // Icon – kein Filter
				col_2: 'string',
				col_3: 'number',
				col_4: 'number',
				col_5: 'string',
				col_6: 'number',
				col_7: 'number',
				col_8: 'string'				
            });
            tf.init();
        });
    }
});
