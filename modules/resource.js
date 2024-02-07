class Resource {
	constructor(name, quantity, price) {
		this._name = name;
		this._quantity = quantity;
		this._price = price;
		this._elementId = this._name + "Text";
		this._element = document.getElementById(this._elementId);
	}

	//getter functions
	get name() { return this._name; }
	get quantity() { return this._quantity; }
	get price() { return this._price; }

	//setter
	set name(newName) { this._name = newName; }
	set quantity(newQuantity) { this._quantity = newQuantity; }
	set price(newPrice) { this._price = newPrice; }

	updateResourceText() {
		this._element.innerText = this._quantity.toFixed(2);
	}
}

export { Resource };
