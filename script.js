let stat = 0;

const button1 = document.querySelector("#button1");

const statText = document.querySelector("#stat1Text");

button1.onclick = button1click;

function button1click() {
	stat += 1;
	console.log(stat);
	statText.innerText = stat;
}
