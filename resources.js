let resources = [
	{name: "money", value: 1000},
	{name: "crop", value: 1000, price: 5},
	{name: "food", value: 1000, price: 50},
	{name: "wood", value: 0, price: 4},
	{name: "stone", value: 0, price: 1},
	{name: "iron ore", value: 0, price: 10},
	{name: "copper ore", value: 0, price: 10},
	{name: "coal", value: 0, price: 8},
	{name: "crude oil", value: 0, price: 20},
	{name: "iron", value: 0, price: 15},
	{name: "processed wood", value: 0, price: 8},
	{name: "copper", value: 0, price: 15},
	{name: "steel", value: 0, price: 400},
	{name: "processed stone", value: 0, price: 2},
	{name: "masonry", value: 0, price: 4},
	{name: "glass", value: 0, price: 10},
	{name: "cement", value: 0, price: 15},
	{name: "concrete", value: 0, price: 20},
	{name: "textile", value: 0, price: 15},
	{name: "clothing", value: 0, price: 50},
	{name: "furniture", value: 0, price: 50},
	{name: "chemicals", value: 0, price: 25},
	{name: "plastic", value: 0, price: 40},
	{name: "semiconductor", value: 0, price: 60},
	{name: "electronics", value: 0, price: 200}
];
//TODO
//Buy and sell resources, autobuy deficit or set target amount to buy/sell to reach
//more resources

const food_consumption_rate = 0.000005;

const resourceText = [
	document.getElementById("moneyText"),
	document.getElementById("cropText"),
	document.getElementById("foodText"),
];

function getResourceValue(index) {
	return resources[index].value;
}

function updateResourceValues(delta_time, total_time) {
	resources[1].value += (getBuildingEffect(0) * getBuildingValue(0)) * delta_time;
	calculateFood(delta_time);
}

function updateResourceText() {
	resourceText.forEach((element, index) => {
		element.innerText = resources[index].value.toFixed(2);
	});
}

function calculateFood(delta_time) {
	let dfood = getBuildingEffect(1) * getBuildingValue(1) * delta_time;

	if(resources[1].value < dfood){
		dfood = resources[1].value;
		console.log(dfood);
	}
	resources[1].value -= dfood;

	dfood -= getPopulation().total * delta_time * food_consumption_rate;
	if(resources[2].value + dfood < 0){
		resources[2].value = 0;
	} else {
		resources[2].value += dfood;
	}
}

