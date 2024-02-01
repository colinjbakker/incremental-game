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
const farmButton = document.querySelector("#buildFarm");
const ffButton = document.querySelector("#buildFoodFactory");

const foodFactoryWorkerInput = document.getElementById("ffSlider");
const farmWorkerInput = document.getElementById("farmSlider");

const buildingText = [
	document.getElementById("farmText"),
	document.getElementById("ffText"),
];

const buildingWorkerText = [
	document.getElementById("farmWorkers"),
	document.getElementById("ffWorkers"),
];

const buildingDesiredWorkerText = [
	document.getElementById("desiredFarmWorkers"),
	document.getElementById("desiredFFWorkers"),
];


farmWorkerInput.addEventListener("change", function() {
	buildings[0].desiredWorkers = farmWorkerInput.value;
});

foodFactoryWorkerInput.addEventListener("change", function() {
	buildings[1].desiredWorkers = foodFactoryWorkerInput.value;
});

farmButton.addEventListener("click", function(){
	buildings[0].value++;
});
ffButton.addEventListener("click", function(){
	buildings[1].value++
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
	buildings[0].perMS = (buildings[0].value == 0) ? 0 : 0.001 * (buildings[0].workers / (buildings[0].value * 100));
	buildings[1].perMS = (buildings[1].value == 0) ? 0 : 0.01 * (buildings[1].workers / (buildings[1].value * 100));
	farmWorkerInput.setAttribute("max" , buildings[0].value * 100);
	foodFactoryWorkerInput.setAttribute("max", buildings[1].value * 100);
}

function updateWorkers() {

	//send new workers to open slots or to unemployed
	for(let i = 0; i < buildings.length; i++){
		if(buildings[i].workers < buildings[i].desiredWorkers){
			//try to give workers
			if(getPopulation().unemployed >= buildings[i].desiredWorkers - buildings[i].workers){
				//More unemployed than worker slots
				getPopulation().unemployed -= buildings[i].desiredWorkers - buildings[i].workers;
				buildings[i].workers = Number(buildings[i].desiredWorkers); 
			} else{
				//less unemployed than worker slots
				buildings[i].workers += Number(getPopulation().unemployed);
				getPopulation().unemployed = 0;
			}
		} else if (buildings[i].workers > buildings[i].desiredWorkers){
			//remove excess and add to unemployed
			getPopulation().unemployed += buildings[i].workers - buildings[i].desiredWorkers;
			buildings[i].workers = Number(buildings[i].desiredWorkers);
		}
	}
	updateBuildings();
}

function updateBuildingText() {
	buildingText.forEach((element, index) => {
		element.innerText = buildings[index].value;
	});
	buildingWorkerText.forEach((element, index) => {
		element.innerText = buildings[index].workers.toFixed(0);
	});
	buildingDesiredWorkerText.forEach((element, index) => {
		element.innerText = buildings[index].desiredWorkers;
	});
}

