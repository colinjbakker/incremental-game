class Building {
	constructor(name, quantity = 0, maxWorkers = 0, actualWorkers = 0, desiredWorkers = 0) {
		this._name = name;
		this._quantity = quantity;
		this._maxWorkers = maxWorkers;
		this._actualWorkers = actualWorkers;
		this._desiredWorkers = desiredWorkers;
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
	
	//getter
	get name() { return this._name; }
	get quantity() { return this._quantity; }
	get maxWorkers() { return this._maxWorkers; }
	get actualWorkers() { return this._actualWorkers; }
	get desiredWorkers() { return this._desiredWorkers; }
	get desiredNewBuildings() { return this._desiredNewBuildings; }


	//setter
	set name(newName) { this._name = newName; }
	set quantity(newQuantity) { this._quantity = newQuantity; }
	set maxWorkers(newMaxWorkers) { this._maxWorkers = newMaxWorkers; }
	set actualWorkers(newActualWorkers) { this._actualWorkers = newActualWorkers; }
	set desiredWorkers(newDesiredWorkers) { this._desiredWorkers = newDesiredWorkers; }
	set desiredNewBuildings(newDesiredNewBuildings) { this._desiredNewBuildings = newDesiredNewBuildings; }
	
	handleBuildButton() {
		this._desiredNewBuildings = 1;
	}
 
	handleWorkerSlider() {
		this._desiredWorkers = this._buttonBuild.value;
	}

	build() {
		this._desiredNewBuildings = 0;
		this._quantity ++;
		this._maxWorkers += 100;
		this._workerSlider.setAttribute("max", this._maxWorkers);
	}

	updateBuildingText() {
		this._text.innerText = this._quantity;
		this._workerText.innerText = this._actualWorkers;
		this._desiredWorkerText.innerText = this._maxWorkers;
	}

}

export { Building }
