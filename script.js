
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

	updateResourceValues(delta_time, total_time);
	updatePopulation(delta_time);
	updateResourceText();
	updateBuildingText();
	updatePopText();
	updateWorkers();
}

