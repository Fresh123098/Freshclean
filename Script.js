const items = [
"Shirt","Plated Shirt","T-Shirt","Trousers","Jeans",
"Thobe","Gutra","Shmagh","Abaya","Jalabiya",
"Dress","Skirt","Blouse",
"Blanket","Bedsheet","Curtain","Carpet","Table Cloth","Sofa Cover",
"Shoes","Bag"
];

const table = document.getElementById("priceTable");

items.forEach(item => {
    let row = table.insertRow();

    row.innerHTML = `
        <td>${item}</td>
        <td><input type="number" value="0" class="wi"></td>
        <td><input type="number" value="0" class="io"></td>
        <td><input type="number" value="0" class="dc"></td>
        <td><input type="number" value="0" class="qty" oninput="calculate()"></td>
        <td class="total">0</td>
    `;
});

function calculate() {
    let grandTotal = 0;
    let totalPieces = 0;

    document.querySelectorAll("#priceTable tr").forEach((row, i) => {
        if (i === 0) return;

        let wi = row.querySelector(".wi").value;
        let io = row.querySelector(".io").value;
        let dc = row.querySelector(".dc").value;
        let qty = row.querySelector(".qty").value;

        let price = Math.max(wi, io, dc);
        let total = price * qty;

        row.querySelector(".total").innerText = total;

        grandTotal += total;
        totalPieces += Number(qty);
    });

    document.getElementById("summary").innerText =
        "Total Pieces: " + totalPieces + " | Grand Total: " + grandTotal;
}

function printBill() {
    window.print();
}
