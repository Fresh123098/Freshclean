function printBill(){
  let name = document.getElementById("customer").value;
  let amount = document.getElementById("amount").value;

  if(name === "" || amount === ""){
    alert("Please fill all fields");
    return;
  }

  let bill =
`Fresh & Clean Laundry

Customer: ${name}
Total: ${amount} BD

Thank you for choosing us!`;

  let win = window.open('', '', 'width=400,height=500');
  win.document.write('<pre style="font-size:16px;">' + bill + '</pre>');
  win.print();
}