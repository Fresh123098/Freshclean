const items = [
  "Shirt","T-Shirt","Jeans","Trouser","Plated Shirt","Hijab",
  "Thobe","Abaya","Prayer Clothes",
  "Carpet (per meter)","Blanket","Bedsheet","Pillow","Pillow Cover","Duvet","Door Mat",
  "School Bag","Travel Bag","Shoes"
];

let bill = {};
let history = JSON.parse(localStorage.getItem("bills") || "[]");

const itemsDiv = document.getElementById("items");

items.forEach(name => {

  let div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <h4>${name}</h4>
    <button onclick="add('${name}')">+</button>
    <button onclick="remove('${name}')">-</button>
  `;

  itemsDiv.appendChild(div);
});

function add(name){
  bill[name] = (bill[name] || 0) + 1;
  render();
}

function remove(name){
  if(bill[name]) bill[name]--;
  if(bill[name] <= 0) delete bill[name];
  render();
}

function render(){
  let total = 0;
  let html = "";

  for(let i in bill){
    let t = bill[i] * 10;
    html += `<p>${i} x ${bill[i]} = ${t}</p>`;
    total += t;
  }

  document.getElementById("bill").innerHTML = html;
  document.getElementById("total").innerText = "Total: " + total;
}

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

function showHistory(){
  let h = "";
  history.forEach((b,i)=>{
    h += `<p>${i+1}. ${b.name} - ${b.date}</p>`;
  });
  document.getElementById("history").innerHTML = h;
}

function printBill(){
  window.print();
}

setInterval(()=>{
  let now = new Date();
  document.getElementById("date").innerText = "Bill: " + now.toLocaleString();

  let d = new Date();
  d.setHours(d.getHours() + 24);
  document.getElementById("delivery").innerText = "Delivery: " + d.toLocaleString();
},1000);

showHistory();
