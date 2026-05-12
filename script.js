const items = [
"Shirt","Plated Shirt","T-Shirt","Trousers","Jeans",
"Thobe","Gutra","Shmagh","Abaya","Jalabiya",
"Dress","Skirt","Blouse",
"Blanket","Bedsheet","Curtain","Carpet","Table Cloth","Sofa Cover",
"Shoes","Bag"
];

const bill = document.getElementById("bill");

let html = `
<table>
<tr>
<th>Item</th>
<th>Price</th>
<th>Qty</th>
<th>Total</th>
</tr>
`;

items.forEach(name => {
  html += `
  <tr>
    <td>${name}</td>
    <td><input type="number" class="price" value="0"></td>
    <td><input type="number" class="qty" value="0" oninput="calc()"></td>
    <td class="total">0</td>
  </tr>
  `;
});

html += `</table>`;
bill.innerHTML = html;

function calc() {
  let total = 0;
  let pieces = 0;

  document.querySelectorAll("tr").forEach(row => {

    let price = row.querySelector(".price");
    let qty = row.querySelector(".qty");
    let out = row.querySelector(".total");

    if (!price || !qty || !out) return;

    let t = price.value * qty.value;
    out.innerText = t;

    total += t;
    pieces += Number(qty.value);
  });

  document.getElementById("summary").innerText =
    "Total Pieces: " + pieces + " | Grand Total: " + total;
}

function printBill() {
  window.print();
}
