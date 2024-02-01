let resources = [
	{
		name: "crop",
		value: 1000
	},
	{
		name: "food",
		value: 1000
	}

];
const food_consumption_rate = 0.000005;

const resourceText = [
	document.getElementById("cropText"),
	document.getElementById("foodText"),
];

function getResourceValue(index) {
	return resources[index].value;
}

function updateResourceValues(delta_time, total_time) {
	//will get info from buildings and other things that affect resource count
	//and then will calculate new values for each resource
	//called in index.js
	//console.log(getBuildingEffect[0], getBuildingValue[0], delta_time);
	resources[0].value += (getBuildingEffect(0) * getBuildingValue(0)) * delta_time;
	calculateFood(delta_time);
}

function updateResourceText() {
	resourceText.forEach((element, index) => {
		element.innerText = resources[index].value.toFixed(2);
	});
}

function calculateFood(delta_time) {
	let dfood = getBuildingEffect(1) * getBuildingValue(1) * delta_time;

	if(resources[0].value < dfood){
		dfood = resources[0].value;
		console.log(dfood);
	}
	resources[0].value -= dfood;

	dfood -= getPopulation().total * delta_time * food_consumption_rate;
	if(resources[1].value + dfood < 0){
		resources[1].value = 0;
	} else {
		resources[1].value += dfood;
	}
}

