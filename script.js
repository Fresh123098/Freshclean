const items = [
"Shirt","Plated Shirt","T-Shirt","Trousers","Jeans",
"Thobe","Gutra","Shmagh","Abaya","Jalabiya",
"Dress","Skirt","Blouse",
"Blanket","Bedsheet","Curtain","Carpet","Table Cloth","Sofa Cover",
"Shoes","Bag"
];

const tbody = document.getElementById("items");

items.forEach(name => {
  let row = document.createElement("tr");

  row.innerHTML = `
    <td>${name}</td>
    <td><input class="p" type="number" value="0"></td>
    <td><input class="p" type="number" value="0"></td>
    <td><input class="p" type="number" value="0"></td>
    <td><input class="qty" type="number" value="0" oninput="calc()"></td>
    <td class="total">0</td>
  `;

  tbody.appendChild(row);
});

function calc() {
  let total = 0;
  let pieces = 0;

  document.querySelectorAll("tbody tr").forEach(row => {

    let prices = row.querySelectorAll(".p");
    let qty = row.querySelector(".qty").value;

    let maxPrice = Math.max(
      Number(prices[0].value),
      Number(prices[1].value),
      Number(prices[2].value)
    );

    let rowTotal = maxPrice * qty;

    row.querySelector(".total").innerText = rowTotal;

    total += rowTotal;
    pieces += Number(qty);
  });

  document.getElementById("summary").innerText =
    "Total Pieces: " + pieces + " | Grand Total: " + total;
}

function printBill() {
  window.print();
}
