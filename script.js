const items = [
  "Shirt","T-Shirt","Jeans","Trouser","Plated Shirt","Hijab",
  "Thobe","Abaya","Prayer Clothes",
  "Carpet","Blanket","Bedsheet","Pillow","Pillow Cover",
  "Duvet","Door Mat","School Bag","Travel Bag","Shoes"
];

let prices = {
  "Shirt": {wash:5, iron:3, dry:8},
  "T-Shirt": {wash:4, iron:2, dry:7},
  "Jeans": {wash:6, iron:4, dry:10},
  "Trouser": {wash:5, iron:3, dry:9},
  "Plated Shirt": {wash:5, iron:3, dry:8},
  "Hijab": {wash:3, iron:2, dry:5},
  "Thobe": {wash:6, iron:4, dry:10},
  "Abaya": {wash:7, iron:5, dry:12},
  "Prayer Clothes": {wash:4, iron:2, dry:6},
  "Carpet": {wash:10, iron:0, dry:15},
  "Blanket": {wash:8, iron:0, dry:12},
  "Bedsheet": {wash:5, iron:2, dry:8},
  "Pillow": {wash:3, iron:0, dry:5},
  "Pillow Cover": {wash:2, iron:1, dry:4},
  "Duvet": {wash:12, iron:0, dry:18},
  "Door Mat": {wash:4, iron:0, dry:6},
  "School Bag": {wash:6, iron:0, dry:9},
  "Travel Bag": {wash:8, iron:0, dry:12},
  "Shoes": {wash:5, iron:0, dry:8}
};

let bill = {};
let serviceType = {};
let history = JSON.parse(localStorage.getItem("bills") || "[]");

let billNo = history.length + 1;

const itemsDiv = document.getElementById("items");

/* BUILD ITEMS */
items.forEach(name => {

  let div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <h4>${name}</h4>

    <p id="service-${name}">Service: Wash</p>

    <p>🧼 ${prices[name].wash} | 👕 ${prices[name].iron} | 🧴 ${prices[name].dry}</p>

    <button onclick="setService('${name}','wash')">Wash</button>
    <button onclick="setService('${name}','iron')">Iron</button>
    <button onclick="setService('${name}','dry')">Dry</button>

    <br><br>

    <button onclick="add('${name}')">+</button>
    <button onclick="remove('${name}')">-</button>

    <p id="qty-${name}">0</p>
  `;

  itemsDiv.appendChild(div);
});

/* SERVICE SELECT */
function setService(name, type){
  serviceType[name] = type;

  let label =
    type === "wash" ? "Wash & Iron" :
    type === "iron" ? "Iron Only" :
    "Dry Clean";

  document.getElementById("service-" + name).innerText =
    "Service: " + label;

  render();
}

/* ADD */
function add(name){
  bill[name] = (bill[name] || 0) + 1;
  updateQty(name);
  render();
}

/* REMOVE */
function remove(name){
  if(bill[name]) bill[name]--;
  if(bill[name] <= 0) delete bill[name];
  updateQty(name);
  render();
}

/* UPDATE QTY */
function updateQty(name){
  document.getElementById("qty-" + name).innerText =
    bill[name] || 0;
}

/* RENDER BILL */
function render(){

  let total = 0;
  let html = "";

  for(let i in bill){

    let qty = bill[i];
    let type = serviceType[i] || "wash";

    let price = prices[i][type];
    let itemTotal = qty * price;

    let serviceName =
      type === "wash" ? "Wash & Iron" :
      type === "iron" ? "Iron Only" :
      "Dry Clean";

    html += `
      <p>${i} (${serviceName}) x ${qty} = ${itemTotal}</p>
    `;

    total += itemTotal;
  }

  document.getElementById("bill").innerHTML = html;
  document.getElementById("total").innerText = "Total: " + total;
}

/* SAVE BILL */
function saveBill(){

  let data = {
    billNo: billNo++,
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    bill: bill,
    serviceType: serviceType,
    date: new Date().toLocaleString()
  };

  history.push(data);
  localStorage.setItem("bills", JSON.stringify(history));

  alert("Bill Saved!");
  showHistory();
}

/* HISTORY */
function showHistory(){

  let h = "";

  history.forEach(b=>{
    h += `<p>INV-${b.billNo} - ${b.name || "No Name"} - ${b.date}</p>`;
  });

  document.getElementById("history").innerHTML = h;
}

/* PRINT (THERMAL READY) */
function printBill(){
  window.print();
}

/* AUTO DATE */
setInterval(()=>{

  let now = new Date();
  document.getElementById("date").innerText =
    "Bill: " + now.toLocaleString();

  let d = new Date();
  d.setHours(d.getHours() + 24);

  document.getElementById("delivery").innerText =
    "Delivery: " + d.toLocaleString();

},1000);

showHistory();
