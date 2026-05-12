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
  "Hijab": {wash:3, iron:2, dry:5},
  "Carpet": {wash:10, iron:0, dry:15},
  "Blanket": {wash:8, iron:0, dry:12}
};

let bill = {};
let service = {};
let history = JSON.parse(localStorage.getItem("bills") || "[]");
let invoice = history.length + 1;

const itemsDiv = document.getElementById("items");

/* BUILD ITEMS */
items.forEach(name => {

  let div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <h4>${name}</h4>

    <p id="svc-${name}">Wash</p>

    <p>🧼 ${prices[name].wash || 0} | 👕 ${prices[name].iron || 0} | 🧴 ${prices[name].dry || 0}</p>

    <button onclick="setService('${name}','wash')">Wash</button>
    <button onclick="setService('${name}','iron')">Iron</button>
    <button onclick="setService('${name}','dry')">Dry</button>

    <button onclick="add('${name}')">+</button>
    <button onclick="remove('${name}')">-</button>

    <p id="qty-${name}">0</p>
  `;

  itemsDiv.appendChild(div);
});

/* SERVICE */
function setService(name,type){
  service[name] = type;
  document.getElementById("svc-" + name).innerText =
    type === "wash" ? "Wash & Iron" :
    type === "iron" ? "Iron Only" : "Dry Clean";
  render();
}

/* ADD */
function add(name){
  bill[name] = (bill[name] || 0) + 1;
  update(name);
  render();
}

/* REMOVE */
function remove(name){
  if(bill[name]) bill[name]--;
  if(bill[name] <= 0) delete bill[name];
  update(name);
  render();
}

function update(name){
  document.getElementById("qty-" + name).innerText = bill[name] || 0;
}

/* BILL */
function render(){

  let total = 0;
  let html = "";

  for(let i in bill){

    let qty = bill[i];
    let type = service[i] || "wash";

    let price = prices[i]?.[type] || 0;
    let sum = qty * price;

    html += `<p>${i} x ${qty} = ${sum}</p>`;
    total += sum;
  }

  document.getElementById("bill").innerHTML = html;
  document.getElementById("total").innerText = "Total: " + total;
}

/* SAVE */
function saveBill(){

  let data = {
    invoice: "INV-" + invoice++,
    name: name.value,
    phone: phone.value,
    address: address.value,
    bill,
    service,
    date: new Date().toLocaleString()
  };

  history.push(data);
  localStorage.setItem("bills", JSON.stringify(history));

  alert("Saved " + data.invoice);
  showHistory();
}

/* HISTORY */
function showHistory(list = history){

  let h = "";

  list.forEach(b=>{
    h += `<p>${b.invoice} - ${b.name || "No Name"} - ${b.date}</p>`;
  });

  document.getElementById("history").innerHTML = h;
}

/* SEARCH */
function searchBills(q){
  let filtered = history.filter(b =>
    (b.name || "").toLowerCase().includes(q.toLowerCase()) ||
    (b.invoice || "").toLowerCase().includes(q.toLowerCase())
  );

  showHistory(filtered);
}

/* WHATSAPP */
function sendWhatsApp(){

  let phone = document.getElementById("phone").value;

  let text = `🧺 Laundry Bill
Invoice: INV-${invoice-1}
Total: ${document.getElementById("total").innerText}
Delivery: ${document.getElementById("delivery").innerText}`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`);
}

/* PRINT */
function printBill(){
  window.print();
}

/* DATE */
setInterval(()=>{

  let now = new Date();
  date.innerText = "Bill: " + now.toLocaleString();

  let d = new Date();
  d.setHours(d.getHours() + 24);

  delivery.innerText = "Delivery: " + d.toLocaleString();

},1000);

showHistory();
