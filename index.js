const JSON_ADDRESS = "127.0.0.1";
const JSON_PORT = 7190;
const POLLING_RATE = 333;

const JSON_ENDPOINT = `http://${JSON_ADDRESS}:${JSON_PORT}/`;

window.onload = function () {
	getData();
	setInterval(getData, POLLING_RATE);
};

var Asc = function (a, b) {
	if (a > b) return +1;
	if (a < b) return -1;
	return 0;
};

var Desc = function (a, b) {
	if (a > b) return -1;
	if (a < b) return +1;
	return 0;
};

function getData() {
	fetch(JSON_ENDPOINT)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			appendData(data);
		})
		.catch(function (err) {
			console.log("Error: " + err);
		});
}

function SetItemPlayer1(item) {
	let mainContainer = document.getElementById("srtPlayer1");
	if (item.StackSize < item.MaxSize) {
		mainContainer.innerHTML += `
		<div id="slot${item.SlotNo}">
			<img id="${item.ItemName}">
				<div class="quantity">
					<font color="#FFFFFF">
						${item.StackSize}
					</font>
				</div>
				
			</img>
		</div>`;
	} else {
		mainContainer.innerHTML += `
		<div id="slot${item.SlotNo}">
			<img id="${item.ItemName}">
				<div class="quantity">
					<font color="#00FF00">
						${item.StackSize}
					</font>
				</div>
			</img>
		</div>`;
	}

	if (item.EquippedState == 1) {
		mainContainer.innerHTML += `
		<div id="slot${item.SlotNo}">
			<div class="equipped">
				<font color="orange">
					E
				</font>
			</div>
		</div>`;
	}

}

function SetItemPlayer2(item) {
	let mainContainer = document.getElementById("srtPlayer2");
	if (item.StackSize < item.MaxSize) {
		mainContainer.innerHTML += `
		<div id="slotNext${item.SlotNo}">
			<img id="${item.ItemName}">
				<div class="quantity">
					<font color="#FFFFFF">
						${item.StackSize}
					</font>
				</div>
			</img>
		</div>`;
	} else {
		mainContainer.innerHTML += `
		<div  id="slotNext${item.SlotNo}">
			<img id="${item.ItemName}">
				<div class="quantity">
					<font color="#00FF00">
						${item.StackSize}
					</font>
				</div>
			</img>
		</div>`;
	}
}

function appendData(data) {
	//console.log(data);
	let mainContainer = document.getElementById("srtPlayer1");
	let mainContainer2 = document.getElementById("srtPlayer2");
	mainContainer.innerHTML = "";
	mainContainer2.innerHTML = "";

	var filteredItems = data.PlayerInventory.filter((item) => {
		return (item.IsItem && item.SlotNo < 9);
	});

	filteredItems.sort(function (a, b) {
		return Asc(a.SlotNo, b.SlotNo) || Desc(a.SlotNo, b.SlotNo);
	}).map(item => {
		SetItemPlayer1(item);
	});

	var filteredItems2 = data.Player2Inventory.filter((item) => {
		return (item.IsItem && item.SlotNo < 9);
	});

	filteredItems2.sort(function (a, b) {
		return Asc(a.SlotNo, b.SlotNo) || Desc(a.SlotNo, b.SlotNo);
	}).map(item => {
		SetItemPlayer2(item);
	});
}