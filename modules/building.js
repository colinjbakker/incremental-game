class Building {
	constructor(name, buildResources, buildQuantities) {
		this._name = name;
		this._buildResources = buildResources;
		this._buildQuantities = buildQuantities;

		this._quantity = 0;
		this._maxWorkers = 0;
		this._actualWorkers = 0;
		this._desiredWorkers = 0;
		this._desiredNewBuildings = 0;
		
		//text elements
		this._textId = this._name + "Text";
		this._text = document.getElementById(this._textId);
		this._workerId = this._name + "Workers";
		this._workerText = document.getElementById(this._workerId);
		this._desiredWorkerId = this._name + "WorkersDesired";
		this._desiredWorkerText = document.getElementById(this._desiredWorkerId);
		
		//buttons
		this._buttonBuildId = this._name + "BuildButton";
		this._buttonBuild = document.getElementById(this._buttonBuildId);
		this._workerSliderId = this._name + "Slider";
		this._workerSlider = document.getElementById(this._workerSliderId);
		
		this._buttonBuild.addEventListener('click', this.handleBuildButton.bind(this));
		this._workerSlider.addEventListener('change', this.handleWorkerSlider.bind(this));	
	}
	
	//getter will clean out once done implementing features
	get name() { return this._name; }
	get quantity() { return this._quantity; }
	get maxWorkers() { return this._maxWorkers; }
	get actualWorkers() { return this._actualWorkers; }
	get desiredWorkers() { return this._desiredWorkers; }
	get desiredNewBuildings() { return this._desiredNewBuildings; }
	get buildResources() { return this._buildResources; }
	get buildQuantities() { return this._buildQuantities; }

	//setter
	set name(newName) { this._name = newName; }
	set quantity(newQuantity) { this._quantity = newQuantity; }
	set maxWorkers(newMaxWorkers) { this._maxWorkers = newMaxWorkers; }
	set actualWorkers(newActualWorkers) { this._actualWorkers = newActualWorkers; }
	set desiredWorkers(newDesiredWorkers) { this._desiredWorkers = newDesiredWorkers; }
	set desiredNewBuildings(newDesiredNewBuildings) { this._desiredNewBuildings = newDesiredNewBuildings; }
	set buildResources(newBuildResources) { this._buildResources = newBuildResources; }
	set buildQuantities(newBuildQuantities) { this._buildQuantities = newBuildQuantities; }

	handleBuildButton() {
		this._desiredNewBuildings++;
	}
 
	handleWorkerSlider() {
		this._desiredWorkers = Number(this._workerSlider.value);
	}

	build() {
		//currently just set to 0, will change to -- in future I presume
		for(let i = 0; i < this._buildResources.length; i++){
			if(this._buildResources[i].quantity < this._buildQuantities[i]){
				console.log("insufficient resources");
				this._desiredNewBuildings--;
				return;
			}
		}
		for(let i = 0; i < this._buildResources.length; i++){
			this._buildResources[i].quantity -= this._buildQuantities[i];
		}
		this._desiredNewBuildings--;
		this._quantity ++;
		this._maxWorkers += 100;
		this._workerSlider.setAttribute("max", this._maxWorkers);
	}

	updateBuildingText() {
		this._text.innerText = this._quantity;
		this._workerText.innerText = this._actualWorkers.toFixed(0);
		this._desiredWorkerText.innerText = this._maxWorkers.toFixed(0);
	}
}

export { Building }
