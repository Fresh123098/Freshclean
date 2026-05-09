function printBill(){
  var name = document.getElementById("customer").value;
  var amount = document.getElementById("amount").value;

  var bill = "Fresh & Clean Laundry\n";
  bill += "Customer: " + name + "\n";
  bill += "Total: BD " + amount + "\n";
  bill += "Thank you!";

  var win = window.open('', '', 'height=400,width=300');
  win.document.write('<pre>' + bill + '</pre>');
  win.print();
}