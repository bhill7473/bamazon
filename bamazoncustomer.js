var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.query("SELECT * FROM products", function(err, results){
		console.log(results);
	    showPrompt();
	    
});
function showPrompt(){
inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the ID of the item you would like to purchase?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many of that item would you like to purchase?"
      }
    ])
    .then(function(answer){
      var itemID = answer.item;
      var itemQuantity = answer.quantity;
      
    
connection.query("SELECT * FROM products WHERE id="+itemID, function (err,itemChose) {
    if (err) throw err;
   
    var quantity = itemChose[0].stock_quantity-itemQuantity;
    if(quantity >= 0){
        
    	console.log("Your order is a success!");
    	console.log("The total price is $" + itemChose[0].price*itemQuantity);
    	console.log("There are " + quantity +" "+ itemChose[0].product_name +"'s "+"left");
    }
    else{
     console.log("There is none or not enough of this product left!");
     
    }
    
});
});
};






