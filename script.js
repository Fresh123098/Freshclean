const items = [
  "Shirt","T-Shirt","Jeans","Trouser","Plated Shirt","Hijab",
  "Thobe","Abaya","Prayer Clothes",
  "Carpet","Blanket","Bedsheet","Pillow","Pillow Cover",
  "Duvet","Door Mat","School Bag","Travel Bag","Shoes"
];

// 💰 DEFAULT PRICES (EDITABLE)
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
let history = JSON.parse(localStorage.getItem("bills") || "[]");

const itemsDiv = document.getElementById("items");

/* BUILD ITEMS UI */
items.forEach(name => {

  let div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <h4>${name}</h4>

    <p>🧼 ${prices[name].wash} | 👕 ${prices[name].iron} | 🧴 ${prices[name].dry}</p>

    <button onclick="add('${name}')">+</button>
    <button onclick="remove('${name}')">-</button>
    <p id="qty-${name}">0</p>
  `;

  itemsDiv.appendChild(div);
});

/* ADD ITEM */
function add(name){
  bill[name] = (bill[name] || 0) + 1;
  updateUI(name);
  renderBill();
}

/* REMOVE ITEM */
function remove(name){
  if(bill[name]) bill[name]--;
  if(bill[name] <= 0) delete bill[name];
  updateUI(name);
  renderBill();
}

/* UPDATE UI */
function updateUI(name){
  document.getElementById("qty-" + name).innerText = bill[name] || 0;
}

/* BILL CALCULATION */
function renderBill(){

  let total = 0;
  let html = "";

  for(let i in bill){
    let qty = bill[i];

    let itemPrice = prices[i].wash; // default service = wash

    let itemTotal = qty * itemPrice;

    html += `<p>${i} x ${qty} = ${itemTotal}</p>`;
    total += itemTotal;
  }

  document.getElementById("bill").innerHTML = html;
  document.getElementById("total").innerText = "Total: " + total;
}

/* SAVE BILL */
function saveBill(){

  let data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    bill: bill,
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

  history.forEach((b,i)=>{
    h += `<p>${i+1}. ${b.name || "No Name"} - ${b.date}</p>`;
  });

  document.getElementById("history").innerHTML = h;
}

/* PRINT */
function printBill(){
  window.print();
}

/* DATE + DELIVERY */
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
