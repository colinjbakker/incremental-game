import { Resource } from './modules/resource.js';
import { Building } from './modules/building.js';


const crop = new Resource("crop", 1000.0, 7.0);
const food = new Resource("food", 1000.0, 1.0);
const wood = new Resource("wood", 0.0, 2.0);
const stone = new Resource("stone", 0.0, 1.0);
const ironOre = new Resource("ironOre", 0.0, 5.0);
const coalOre = new Resource("coalOre", 0.0, 4.0);
const plank = new Resource("plank" , 0.0, 4.0);
const gravel = new Resource("gravel", 0.0, 2.0); 
const iron = new Resource("iron", 0.0, 10.0);
const coal = new Resource("coal", 0.0, 8.0);
const steel = new Resource("steel", 0.0, 40.0);

const resources = [crop, food, wood, stone, ironOre, coalOre, plank, gravel, iron, coal, steel];

const farm = new Building("farm");
const foodFactory = new Building("foodFactory");
const lumberCamp = new Building("lumberCamp");
const quarry = new Building("quarry");
const ironMine = new Building("ironMine");
const coalMine = new Building("coalMine");
const sawmill = new Building("sawmill");
const stoneProcessor = new Building("stoneProcessingPlant");
const oreProcessor = new Building("oreProcessingPlant");
const steelMill = new Building("steelMill");

const buildings = [farm, foodFactory, lumberCamp, quarry, ironMine, coalMine, sawmill, stoneProcessor, oreProcessor, steelMill];

const population = {
	totalPopulation: 1000,
	totalUnemployed: 1000,
	growth: 0,
}

const popText = document.querySelector("#popText");
const unemployedText = document.querySelector("#unemployedText");
const homelessText = document.querySelector("#homelessText");

let last_time = null;
let total_time = 0;

setInterval(function gameLoop() {
	const current_time = performance.now();
	if(last_time === null) {
		last_time = current_time;
	}
	const delta_time = current_time - last_time;
	total_time += delta_time;
	last_time = current_time;

	updateGame(delta_time, total_time);
}, 1000/10);

function updateGame(delta_time, total_time) {
	//update population
	//add or remove new buildings
	//assign workers
	//
	updatePopulation(delta_time);
	updateBuildings();
	assignWorkers();
	produceResources(delta_time);
	updateText();
}

function updatePopulation(delta_time) {
	//change population total based on whatever factors
	population.growth = population.totalPopulation * delta_time * 0.000001;
	if(food.quantity == 0){
		population.totalPopulation -= population.growth;
		population.totalUnemployed -= population.growth;
	} else{
		population.totalPopulation += population.growth;
		population.totalUnemployed += population.growth;
	}
}

function updateBuildings() {
	//add or remove buildings based on player actions
	for (let i = 0; i < buildings.length; i++) {
		if(buildings[i].desiredNewBuildings > 0) {
			//check for and remove resources
			buildings[i].build();
		}
	}
}

function assignWorkers() {
	for (let i = 0; i < buildings.length; i++) {
		let workerDiff = buildings[i].desiredWorkers - buildings[i].actualWorkers;

		if((population.totalUnemployed > 0) || (workerDiff < 0)) {
			if((population.totalUnemployed >= workerDiff) || (workerDiff < 0)) {
				buildings[i].actualWorkers += workerDiff;
				population.totalUnemployed -= workerDiff;
			} else {
				buildings[i].actualWorkers += population.totalUnemployed;
				population.totalUnemployed = 0;
			}
		}
	}
}

function produceResources(delta_time) {
	let productionAmount = 0;
	if(farm.actualWorkers > 0){
		productionAmount = (farm.actualWorkers/farm.maxWorkers) * delta_time * farm.quantity * (1/1000);
		crop.quantity += productionAmount;
	}

	if(foodFactory.actualWorkers > 0){
		productionAmount = (foodFactory.actualWorkers/foodFactory.maxWorkers) * delta_time * foodFactory.quantity * (5/1000);
		if(crop.quantity < 5*productionAmount){
			food.quantity += crop.quantity * 5;
			crop.quantity = 0;
		} else{
			food.quantity += productionAmount;
			crop.quantity -= 5*productionAmount;
		}
	}

}

function updateText() {
	//resource text
	//for (let x in resources) {
	//	x.updateResourceText();
	//}
	//
	for (let i = 0; i < resources.length; i++) {
		resources[i].updateResourceText();
	}
	
	//building text
	for (let i = 0; i < buildings.length; i++) {
		buildings[i].updateBuildingText();
	}

	//population text
	popText.innerText = population.totalPopulation.toFixed(0);
	unemployedText.innerText = population.totalUnemployed.toFixed(0);
}

