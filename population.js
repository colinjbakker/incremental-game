let population = {total: 10000, unemployed: 10000, growthRate: 0.0001};
//calculate new population
//return values
//calculate growth and shrink rate
//display values
const popText = document.querySelector("#popText");

function getPopulation() {
	return population;
}

function updatePopulation(delta_time) {
	calculateRates();
	//console.log(population.growthRate * population.total * delta_time);
	population.total += (population.growthRate * population.total * delta_time);

}

function updatePopText() {
	popText.innerText = population.total.toFixed(0);
}

function calculateRates() {
	population.growthRate = (getResourceValue(1) > 0) ? 0.000001 : -0.000001;
}
