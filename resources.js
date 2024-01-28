let resources = [
	{
		name: "crop",
		value: 100
	},
	{
		name: "food",
		value: 150
	}

];
const cropText = document.querySelector("#cropText");
const foodText = document.querySelector("#foodText");

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
	//called in index.js
	cropText.innerText = resources[0].value.toFixed(2);
	foodText.innerText = resources[1].value.toFixed(2);
}

function calculateFood(delta_time) {
	let dfood = getBuildingEffect(1) * getBuildingValue(1) * delta_time;
	if(resources[0].value < dfood){
		dfood = resources[0].value;
		console.log(dfood);
	}
	resources[1].value += dfood;
	resources[0].value -= dfood;
}
