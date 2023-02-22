// Wait for the page to fully load
window.addEventListener("load", function () {
    if (isPlayerBatter(document)) {
        addNewColumnHeaders(document);
        addNewColumnRows(document);
    } else {
		addNewColumnHeadersPitching(document);
		addNewColumnRowsPitching(document);
	}
});

function isPlayerBatter(doc) {
    const menuItem = document.querySelector(".menu-mega__menu-item.highlight");
    const playerType = menuItem.firstChild.firstChild.textContent;
    return 'Batting' === playerType;
}

function addNewColumnHeadersPitching(doc) {
    const tableHeaderRow = doc.querySelector("#standard table thead tr");
    tableHeaderRow.appendChild(createRBCColumnHeaderPitching(doc));
    tableHeaderRow.appendChild(createRBCpgColumnHeaderPitching(doc));
    tableHeaderRow.appendChild(createRBCp180ColumnHeaderPitching(doc));
}

function createRBCColumnHeaderPitching(doc) {
    const newColumnHeader = doc.createElement("th", {
        'data-col': '23',
        'data-stat': 'RBC'
    });
    newColumnHeader.className = 'align-right ';
    const newColumnHeaderText = doc.createTextNode("RBC");
    newColumnHeader.appendChild(newColumnHeaderText);
    return newColumnHeader;
}

function createRBCpgColumnHeaderPitching(doc) {
    const newColumnHeader = doc.createElement("th", {
        'data-col': '24',
        'data-stat': 'RBC/g'
    });
    newColumnHeader.className = 'align-right ';
    const newColumnHeaderText = doc.createTextNode("RBC/g");
    newColumnHeader.appendChild(newColumnHeaderText);
    return newColumnHeader;
}

function createRBCp180ColumnHeaderPitching(doc) {
    const newColumnHeader = doc.createElement("th", {
        'data-col': '25',
        'data-stat': 'RBC/180'
    });
    newColumnHeader.className = 'align-right ';
    const newColumnHeaderText = doc.createTextNode("RBC/180");
    newColumnHeader.appendChild(newColumnHeaderText);
    return newColumnHeader;
}

function addNewColumnRowsPitching(doc) {
	const tableBody = doc.querySelector("#standard table tbody");
    const tableBodyRows = [...(tableBody.children)];
    tableBodyRows.forEach(row => addNewCellsWithValuePitching(row, doc));
}

function addNewCellsWithValuePitching(row, doc) {
    row.appendChild(createNewRBCCellPitching(row, doc));
    row.appendChild(createNewRBCpgCellPitching(row, doc));
    row.appendChild(createNewRBCp180CellPitching(row, doc));
}

function createNewRBCCellPitching(row, doc) {
    const newCell = doc.createElement("td", {
        'data-stat': 'RBC'
    });
    newCell.className = 'align-right ';
    const points = calculateRBCPointsPitching(row);
    const newCellText = doc.createTextNode(points);
    newCell.appendChild(newCellText);
    return newCell;
}

function createNewRBCpgCellPitching(row, doc) {
    const newCell = doc.createElement("td", {
        'data-stat': 'RBC/g'
    });
    newCell.className = 'align-right ';
    const points = calculateRBCPointsPerGamePitching(row);
    const newCellText = doc.createTextNode(points);
    newCell.appendChild(newCellText);
    return newCell;
}

function createNewRBCp180CellPitching(row, doc) {
    const newCell = doc.createElement("td", {
        'data-stat': 'RBC/180'
    });
    newCell.className = 'align-right ';
    const points = calculateRBCPointsPer180Pitching(row);
    const newCellText = doc.createTextNode(points);
    newCell.appendChild(newCellText);
    return newCell;
}

function addNewColumnRows(doc) {
    const tableBody = doc.querySelector("#standard table tbody");
    const tableBodyRows = [...(tableBody.children)];
    tableBodyRows.forEach(row => addNewCellsWithValue(row, doc));
}

function addNewCellsWithValue(row, doc) {
    row.appendChild(createNewRBCCellWithValue(row, doc));
    row.appendChild(createNewRBCpgCellWithValue(row, doc));
    row.appendChild(createNewRBCp155CellWithValue(row, doc));
}

function createNewRBCp155CellWithValue(row, doc) {
    const newCell = doc.createElement("td", {
        'data-stat': 'RBC/155'
    });
    newCell.className = 'align-right ';
    const points = calculateRBCPointsPer155(row);
    const newCellText = doc.createTextNode(points);
    newCell.appendChild(newCellText);
    return newCell;
}

function createNewRBCpgCellWithValue(row, doc) {
    const newCell = doc.createElement("td", {
        'data-stat': 'RBC/g'
    });
    newCell.className = 'align-right ';
    const points = calculateRBCPointsPerGame(row);
    const newCellText = doc.createTextNode(points);
    newCell.appendChild(newCellText);
    return newCell;
}

function createNewRBCCellWithValue(row, doc) {
    const newCell = doc.createElement("td", {
        'data-stat': 'RBC'
    });
    newCell.className = 'align-right ';
    const points = '' + calculateRBCPoints(row);
    const newCellText = doc.createTextNode(points);
    newCell.appendChild(newCellText);
    return newCell;
}

function addNewColumnHeaders(doc) {
    const tableHeaderRow = doc.querySelector("#standard table thead tr");
    tableHeaderRow.appendChild(createRBCColumnHeader(doc));
    tableHeaderRow.appendChild(createRBCpgColumnHeader(doc));
    tableHeaderRow.appendChild(createRBCp155ColumnHeader(doc));
}

function createRBCColumnHeader(doc) {
    const newColumnHeader = doc.createElement("th", {
        'data-col': '23',
        'data-stat': 'RBC'
    });
    newColumnHeader.className = 'align-right ';
    const newColumnHeaderText = doc.createTextNode("RBC");
    newColumnHeader.appendChild(newColumnHeaderText);
    return newColumnHeader;
}

function createRBCpgColumnHeader(doc) {
    const newColumnHeader = doc.createElement("th", {
        'data-col': '24',
        'data-stat': 'RBC/g'
    });
    newColumnHeader.className = 'align-right ';
    const newColumnHeaderText = doc.createTextNode("RBC/g");
    newColumnHeader.appendChild(newColumnHeaderText);
    return newColumnHeader;
}

function createRBCp155ColumnHeader(doc) {
    const newColumnHeader = doc.createElement("th", {
        'data-col': '25',
        'data-stat': 'RBC/155'
    });
    newColumnHeader.className = 'align-right ';
    const newColumnHeaderText = doc.createTextNode("RBC/155");
    newColumnHeader.appendChild(newColumnHeaderText);
    return newColumnHeader;
}

function calculateRBCPointsPer155(tableRow) {
    const children = [...(tableRow.children)];
    const games = parseInt(children[3].textContent);
    const points = calculateRBCPoints(tableRow);
    return '' + Number(points * 155 / games).toFixed(0);
}

function calculateRBCPointsPerGame(tableRow) {
    const children = [...(tableRow.children)];
    const games = parseInt(children[3].textContent);
    const points = calculateRBCPoints(tableRow);
    return '' + Number(points / games).toFixed(1);
}

function calculateRBCPoints(tableRow) {
    const children = [...(tableRow.children)];
    const singles = parseInt(children[7].textContent);
    const doubles = parseInt(children[8].textContent);
    const triples = parseInt(children[9].textContent);
    const homeRuns = parseInt(children[10].textContent);
    const runs = parseInt(children[11].textContent);
    const rbis = parseInt(children[12].textContent);
    const walks = parseInt(children[13].textContent);
    const strikeouts = parseInt(children[15].textContent);
    const stolenBases = parseInt(children[20].textContent);
    return (singles + (2 * doubles) + (3 * triples) +
        (5 * homeRuns) + runs + rbis + walks - strikeouts + (2 * stolenBases));
}

function calculateRBCPointsPitching(tableRow) {
	const children = [...(tableRow.children)];
	const wins = parseInt(children[3].textContent);
	const completeGames = parseInt(children[8].textContent) || 0;
	const shutouts = parseInt(children[9].textContent) || 0;
	const saves = parseInt(children[10].textContent) || 0;
	const blownSaves = parseInt(children[12].textContent) || 0;
	const ipPoints = calculateInningsPitchedPoints(children[13].textContent);
	const hits = parseInt(children[15].textContent);
	const earnedRuns = parseInt(children[17].textContent);
	const walks = parseInt(children[19].textContent);
	const strikeouts = parseInt(children[24].textContent);
	return (2 * wins) + (3 * completeGames) + (5 * shutouts) + (5 * saves) -
		 (3 * blownSaves) + ipPoints - hits - (2 * earnedRuns) - walks + strikeouts;
}

function calculateInningsPitchedPoints(inningsPitched) {
	const parts = inningsPitched.split(".");
	return (3 * parseInt(parts[0])) + parseInt(parts[1]);
}

function calculateRBCPointsPerGamePitching(tableRow) {
	const children = [...(tableRow.children)];
	const games = parseInt(children[6].textContent);
	const points = calculateRBCPointsPitching(tableRow);
	return '' + Number(points / games).toFixed(1);
}

function calculateRBCPointsPer180Pitching(tableRow) {
	const children = [...(tableRow.children)];
	const games = parseInt(children[6].textContent);
	const points = calculateRBCPointsPitching(tableRow);
	return '' + Number(points * 32 / games).toFixed(0);
}