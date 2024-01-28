let last_time = null;
let total_time = 0;

let stat = 0;
const dstat = 0.001;
let statBuildings = 0;

const statButton = document.querySelector("#statButton");
const statBuildingButton = document.querySelector("#statBuildingButton");
const statText = document.querySelector("#statText");
const statBuildingText = document.querySelector("#statBuildingText");

statButton.onclick = statButtonClick;
statBuildingButton.onclick = statBuildingButtonClick;
function statButtonClick() {
	stat++;
}

function statBuildingButtonClick() {
	if(stat >= 10){
		stat -= 10;
		statBuildings++;
	}
}


setInterval(function gameLoop() {
	const current_time = performance.now();
	if(last_time === null) {
		last_time = current_time;
	}
	const delta_time = current_time - last_time;
	total_time += delta_time;
	last_time = current_time;

	updateGame(delta_time, total_time);
}, 1000/60);

function updateGame(delta_time, total_time) {
	stat += (dstat * statBuildings) * delta_time;
	statText.innerText = stat.toFixed(2); //only shows 2 decimal places
	statBuildingText.innerText = statBuildings;
}
