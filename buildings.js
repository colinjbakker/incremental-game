let buildings = [
	{
		name: "farm",
		value: 0,
		perMS: 0,
		workers: 0,
		desiredWorkers: 0
	},
	{
		name: "food factory",
		value: 0,
		perMS: 0,
		workers: 0,
		desiredWorkers: 0
	}
];
//calculate change in resource amount
//build new buildings
//update display
//return values
const farmButton = document.querySelector("#buildFarm");
const ffButton = document.querySelector("#buildFoodFactory");

const farmText = document.querySelector("#farmText");
const foodFactoryText = document.querySelector("#ffText");

const foodFactoryWorkerInput = document.getElementById("ffSlider");
const ffWorkerText = document.getElementById("ffWorkers");
const farmWorkerInput = document.getElementById("farmSlider");
const farmWorkerText = document.getElementById("farmWorkers");
const desiredFarmWorkerText = document.getElementById("desiredFarmWorkers");
const desiredFFWorkerText = document.getElementById("desiredFFWorkers");

farmWorkerInput.addEventListener("change", function() {
	buildings[0].desiredWorkers = farmWorkerInput.value;
	updateBuildings();
});

foodFactoryWorkerInput.addEventListener("change", function() {
	buildings[1].desiredWorkers = foodFactoryWorkerInput.value;
	updateBuildings();
});

farmButton.addEventListener("click", function(){
	buildings[0].value++;
	updateBuildings();
});
ffButton.addEventListener("click", function(){
	buildings[1].value++
	updateBuildings();
});

function getBuildingValue(index) {
	return buildings[index].value;
}

function getBuildingEffect(index) {
	return buildings[index].perMS;
}
function getBuildingWorkers(index) {
	return buildings[index].workers;
}

function updateBuildings() {
	console.log("update buildings");
	buildings[0].perMS = (buildings[0].value == 0) ? 0 : 0.001 * (buildings[0].workers / (buildings[0].value * 100));
	buildings[1].perMS = (buildings[1].value == 0) ? 0 : 0.01 * (buildings[1].workers / (buildings[1].value * 100));
	console.log("farm: ", buildings[0].perMS, " ff: ",buildings[1].perMS);
	farmWorkerInput.setAttribute("max" , buildings[0].value * 100);
	foodFactoryWorkerInput.setAttribute("max", buildings[1].value * 100);
}

function updateWorkers() {
	let availablePop = Number(getPopulation().total);
	for(let i = 0; i < buildings.length; i++){
		if(availablePop > buildings[i].desiredWorkers){
			buildings[i].workers = buildings[i].desiredWorkers;
			availablePop -= buildings[i].desiredWorkers;
		}
		else {
			buildings[i].workers = availablePop;
			availablePop = 0;
			break;
		}
	}
	getPopulation().unemployed = availablePop;
}

function updateBuildingText() {
	farmText.innerText = buildings[0].value;
	ffText.innerText = buildings[1].value;
	farmWorkerText.innerText = Number(buildings[0].workers).toFixed(0);
	ffWorkerText.innerText = Number(buildings[1].workers).toFixed(0);
	desiredFarmWorkerText.innerText = buildings[0].desiredWorkers;
	desiredFFWorkerText.innerText = buildings[1].desiredWorkers;
}


