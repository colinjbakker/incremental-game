import { Resource } from './modules/resource.js';
import { Building } from './modules/building.js';


const crop = new Resource("crop", 1000.0, 1.0);
const food = new Resource("food", 1000.0, 6.0);
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
const ironOreProcessor = new Building("ironOreProcessingPlant");
const coalOreProcessor = new Building("coalOreProcessingPlant");
const steelMill = new Building("steelMill");

const buildings = [farm, foodFactory, lumberCamp, quarry, ironMine, coalMine, sawmill, stoneProcessor, ironOreProcessor, coalOreProcessor, steelMill];

const population = {
	totalPopulation: 100000000,
	totalUnemployed: 100000000,
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

//TODO
//market for resources. currently thinking that there will be a input for a desired stockpile to purchase or sell to reach. Will need a buy and sell
//button or two option checkbox type thing so that player can choose not to buy to reach a stockpile amount but to wait until they have produced it themselves and then
//sell once they reach that amount
//every game interval will sell and buy all or set amount of resources to approach the desired stockpile, similar to worker mechanic
//originally was thinking that buildings could be built with resources or money, but now think that they should only be built with resources
//and you buy them or produce them manually with this desired resource stockpile mechanic. 

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
	//because I want every action to be based on the game clock, instead of building immediately when the
	//player clicks the build button, I made a variable within the building class that keeps track of the amount of buildings requested
	//at the moment it should only flicker between 0 and 1, and will probably break if you click build too fast. Will change if I add
	//a delay between clicking the button and the building being built like a construction time or resource delivery delay
	for (let i = 0; i < buildings.length; i++) {
		if(buildings[i].desiredNewBuildings > 0) {
			//add removing resources from stockpile
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
	rProduce(farm, crop, 1, delta_time);
	rProduce(lumberCamp, wood, 1, delta_time);
	rProduce(quarry, stone, 1, delta_time);
	rProduce(ironMine, ironOre, 1, delta_time);
	rProduce(coalMine, coalOre, 1, delta_time);
	
	sProduce(foodFactory, food, [crop], 1, [5], delta_time);
	sProduce(sawmill, plank, [wood], 1, [5], delta_time);
	sProduce(stoneProcessor, gravel, [stone], 1, [5], delta_time);
	sProduce(ironOreProcessor, iron, [ironOre], 1, [5], delta_time);
	sProduce(coalOreProcessor, coal, [coalOre], 1, [5], delta_time);
	sProduce(steelMill, steel, [iron, coal], 1, [5, 5], delta_time);
}

function rProduce(b, rO, perS, delta_time){
	//raw resources require no input resources
	if(b.actualWorkers>0){
		rO.quantity += (b.actualWorkers/b.maxWorkers) * delta_time * b.quantity * (perS/1000);
	}
}

function sProduce(b, rO, rI, perS, conversionRates, delta_time){
	//secondary resources converted from other resources
	if(b.actualWorkers>0){
		//this is the ideal production amount
		let productionAmount = (b.actualWorkers/b.maxWorkers) * delta_time * b.quantity * (perS/1000);
		let maxDeficit = 0;
		for(let i = 0; i < rI.length; i++){
			//loop should be finding the largest difference between the ideal consumption and actual resource quantity
			if((conversionRates[i]*productionAmount)-rI[i].quantity > (conversionRates[maxDeficit]*productionAmount)-rI[maxDeficit].quantity){
				maxDeficit = i;
			}
		}

		//only change the production amount if the ideal production amount is greater than the resource supply
		//should only happen if a max deficit was found in the above for loop, but since I assigned maxdeficit to zero
		//and I use maxdeficit to change the production amount outside of the loop that finds the deficits
		//I have to check again that it is zero because there is actually a deficit and not beause it is just the default value
		//I could change max deficit to be equal to -1 and then just check if maxDeficit is not -1 here instead, might try that
		if(productionAmount > rI[maxDeficit].quantity / conversionRates[maxDeficit]){
			productionAmount = rI[maxDeficit].quantity / conversionRates[maxDeficit];
		}

		//update resource quantities
		rO.quantity += productionAmount;
		
		for(let i = 0; i < rI.length; i++){
			rI[i].quantity -= productionAmount * conversionRates[i];
		}
	}
}

function updateText() {
	//resource text
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

