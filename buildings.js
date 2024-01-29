let buildings = [
	{
		name: "farm",
		value: 0,
		perMS: 0.001,
		workers: 0
	},
	{
		name: "food factory",
		value: 0,
		perMS: 0.01,
		workers: 0
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

farmWorkerInput.addEventListener("change", function() {
	buildings[0].workers = farmWorkerInput.value;
	console.log("farm: ", buildings[0].perMS);
});

foodFactoryWorkerInput.addEventListener("change", function() {
	buildings[1].workers = foodFactoryWorkerInput.value;
	console.log("ff: ", buildings[1].perMS);
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

function updateBuildings() {
	buildings[0].perMS = (buildings[0].value == 0) ? 0 : 0.001 * (buildings[0].workers / (buildings[0].value * 100));
	buildings[1].perMS = (buildings[1].value == 0) ? 0 : 0.01 * (buildings[1].workers / (buildings[1].value * 100));
	
	farmWorkerInput.setAttribute("max", buildings[0].value * 100);
	foodFactoryWorkerInput.setAttribute("max", buildings[1].value * 100);
}

function updateBuildingText() {
	farmText.innerText = buildings[0].value;
	ffText.innerText = buildings[1].value;
	farmWorkerText.innerText = buildings[0].workers;
	ffWorkerText.innerText = buildings[1].workers;
}


