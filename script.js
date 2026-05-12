const items = [
  "Shirt","T-Shirt","Jeans","Trouser","Plated Shirt","Hijab",
  "Thobe","Abaya","Prayer Clothes",
  "Carpet","Blanket","Bedsheet","Pillow","Pillow Cover",
  "Duvet","Door Mat","School Bag","Travel Bag","Shoes"
];

let bill = {};
let history = JSON.parse(localStorage.getItem("bills") || "[]");

const itemsDiv = document.getElementById("items");

/* BUILD ITEMS UI */
items.forEach(name => {
  let div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <h4>${name}</h4>
    <button onclick="addItem('${name}')">+</button>
    <button onclick="removeItem('${name}')">-</button>
    <p id="qty-${name}">0</p>
  `;

  itemsDiv.appendChild(div);
});

/* ADD */
function addItem(name){
  if(!bill[name]) bill[name] = 0;
  bill[name]++;
  updateUI(name);
  renderBill();
}

/* REMOVE */
function removeItem(name){
  if(bill[name] && bill[name] > 0){
    bill[name]--;
  }
  updateUI(name);
  renderBill();
}

/* UPDATE QTY ON SCREEN */
function updateUI(name){
  let el = document.getElementById("qty-" + name);
  if(el){
    el.innerText = bill[name] || 0;
  }
}

/* RENDER BILL */
function renderBill(){

  let total = 0;
  let html = "";

  for(let item in bill){
    let qty = bill[item];
    if(qty > 0){
      let itemTotal = qty * 10; // default price
      html += `<p>${item} x ${qty} = ${itemTotal}</p>`;
      total += itemTotal;
    }
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

/* AUTO DATE + DELIVERY */
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
