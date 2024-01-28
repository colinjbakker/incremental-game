let buildings = [
	{
		name: "farm",
		value: 0,
		perMS: 0.001
	},
	{
		name: "food factory",
		value: 0,
		perMS: 0.001
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

farmButton.addEventListener("click", function(){buildings[0].value++});
ffButton.addEventListener("click", function(){buildings[1].value++});

function getBuildingValue(index) {
	return buildings[index].value;
}

function getBuildingEffect(index) {
	return buildings[index].perMS;
}

function updateBuildingText() {
	farmText.innerText = buildings[0].value;
	ffText.innerText = buildings[1].value;
}


