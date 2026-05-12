const itemsData = [
  "Shirt","Plated Shirt","T-Shirt","Trousers","Jeans",
  "Thobe","Gutra","Shmagh","Abaya","Jalabiya",
  "Dress","Skirt","Blouse",
  "Blanket","Bedsheet","Curtain","Carpet","Table Cloth","Sofa Cover",
  "Shoes","Bag"
];

let bill = {};
let prices = {};

const itemsDiv = document.getElementById("items");

itemsData.forEach(name => {

  prices[name] = 10; // default price (editable later upgrade)

  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <h4>${name}</h4>
    <p>Price: ${prices[name]}</p>
    <button onclick="addItem('${name}')">+</button>
    <button onclick="removeItem('${name}')">-</button>
  `;

  itemsDiv.appendChild(div);
});

function addItem(name) {
  bill[name] = (bill[name] || 0) + 1;
  render();
}

function removeItem(name) {
  if (bill[name]) bill[name]--;
  if (bill[name] <= 0) delete bill[name];
  render();
}

function render() {

  let list = "";
  let total = 0;
  let pieces = 0;

  for (let key in bill) {
    let itemTotal = bill[key] * prices[key];

    list += `<p>${key} x ${bill[key]} = ${itemTotal}</p>`;

    total += itemTotal;
    pieces += bill[key];
  }

  document.getElementById("billList").innerHTML = list;
  document.getElementById("total").innerText = "Total: " + total;
  document.getElementById("pieces").innerText = "Pieces: " + pieces;
}

function printBill() {
  window.print();
}
