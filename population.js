let population = {total: 1000, unemployed: 1000, growthRate: 0.0001};
//TODO
//Housing and other needs, better calculation for pop change
const popText = document.querySelector("#popText");
const unemployedText = document.querySelector("#unemployedText");
const homelessText = document.querySelector("#homelessText");
function getPopulation() {
	return population;
}

function updatePopulation(delta_time) {
	calculateRates();
	//console.log(population.growthRate * population.total * delta_time);
	let pplGrowth = population.growthRate * population.total * delta_time;
	population.total += pplGrowth;
	population.unemployed += pplGrowth;

}

function updatePopText() {
	popText.innerText = population.total.toFixed(0);
	unemployedText.innerText = population.unemployed.toFixed(0);
}

function calculateRates() {
	population.growthRate = (getResourceValue(2) > 0) ? 0.000001 : -0.000001;
}
