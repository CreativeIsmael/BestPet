// Run after loading function

window.addEventListener("load", ready);

// ready() function body - Needed to be called after DOM loading

function ready() {
  //Add removeProduct function to red buttons on DOM load
  /*var removeCartItemsButtons = document.getElementsByClassName("btn-danger");
                for(let i = 0;i < removeCartItemsButtons.length; i++){
                  var button = removeCartItemsButtons[i];
                  input.addEventListener('click', removeProduct);
                }*/
}
// Global variables
var productTotalPrice = document.getElementById("total");
var total = 0;
var qty = 1;
var rowTotal = 0;
//Does not seem to DO ANYTHING :)
/*function setInputUpdate() {
  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
}
function quantityChanged(event) {
  var input = event.target;
  if (isNan(input.value) || input.value <= 0) {
    input.value = 1;
  } else {
    var inputLocation = event.target;
    var row = inputLocation.parentElement.parentElement;
    console.log(row);
    var divsInRow = row.getElementsByTagName("div");
    var productPrice = divsInRow[1].innerText;
    var productQuantity = row.getElementsByClassName("cart-quantity-input")[0];
    var price = parseFloat(productPrice.replace("lei", ""));
    var quantity = productQuantity.value;
    var total = (quantity * Math.round(price * 100)) / 100;
    divsInRow[3].innerText = `${total} lei`;
  }
}*/
// Remove Item from cart after buuton REMOVE is clicked
function removeProduct() {
  var removeProduct = document.getElementsByClassName("btn-danger");

  for (let i = 0; i < removeProduct.length; i++) {
    var buttonRed = removeProduct[i];

    buttonRed.addEventListener("click", function (event) {
      var buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.remove();
      //alert(`Removed`);
    });
    buttonRed.addEventListener("click", updateCartTotal);
  }
}
/*function myFunction() {
                           document.getElementById("myDropdown").classList.toggle("show");
                          }*/

// Close the dropdown if the user clicks outside of it
/*window.onclick = function (event) {
                            if (!event.target.matches(".dropbtn")) {
                              var dropdowns = document.getElementsByClassName("dropdown-content");
                              var i;
                              for (i = 0; i < dropdowns.length; i++) {
                                var openDropdown = dropdowns[i];
                                if (openDropdown.classList.contains("show")) {
                                  openDropdown.classList.remove("show");
                                }
                              }
                            }
                          };*/
//Open/Close Cart
function toggleCart() {
  var x = document.getElementById("cartBG");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
// Go to Cumpara
function cumpara() {
  var products = document.getElementsByClassName("createdDiv");
  let i = products.length - 1; // we count from 0 :)
  while (i >= 0) {
    products[i].remove();
    i--;
  }
  productTotalPrice.innerText = "Total: 0";
  total = 0;
  alert(`Tocmai ai cumparat ceva!`);
}
// Cart JavaScript
var cart = document.getElementById("cartContent");
//Add eventListener for every button with BTN-PRIMARY class in document
var addToCartButtons = document.getElementsByClassName("btn-primary");
for (let i = 0; i < addToCartButtons.length; i++) {
  var buttons = addToCartButtons[i];
  buttons.addEventListener("click", addToCartClicked);
}

function addToCartClicked(evnt) {
  var button = evnt.target;

  var cardProduct = button.parentElement;

  var description =
    cardProduct.getElementsByClassName("card-text")[0].innerText;

  var price = getPrice(cardProduct);
  rowTotal = price;
  addToCart(description, price);
  updateRowTotal();
}
// Convert string values from SPAN and SUP to NUMBER also removing ',' and 'lei' with replace()

function getPrice(productCard) {
  var spanElem = productCard.getElementsByClassName("pret")[0].innerText;

  var wholeNumber = parseFloat(spanElem);

  var decimString = productCard.getElementsByTagName("sup")[0].innerText;

  var decim = decimString.replace(/[,_lei]/g, "");
  decim.replace("lei", "");

  var priceString = wholeNumber + "." + decim;
  var price = parseFloat(priceString);

  return price;
}
// A function that inserts the product in the cart
function addToCart(descript, price) {
  const product = document.createElement("div");
  product.classList.add("row");
  product.classList.add("p-2");
  product.classList.add("createdDiv");
  var cartProductContent = `<div class="col-5">${descript}</div>

                          <div class="col-2">${price} lei</div>
                          <div class="col-1"><input class="cart-quantity-input" type="number" value= 1 ></input></div>
                          <div class="col-2">${rowTotal} lei</div>
                          <div class="col-2">
                                        <button class="btn btn-danger btn-sm" onclick="removeProduct()">
                                          Remove
                                        </button>
                                      </div>`;
  product.innerHTML = cartProductContent;
  cart.append(product);
  updateCartTotal();
}
// a function wich update the TOTAL
function updateCartTotal() {
  total = 0;
  var cartProductBody = document.getElementById("cartContent");

  var cartRows = cartProductBody.getElementsByClassName("createdDiv");

  var totalPrice = document.getElementById("total");
  if (cartRows.length > 0) {
    for (let i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var divInsideRow = cartRow.getElementsByTagName("div");
      var productPrice = divInsideRow[1].innerText;
      console.log(productPrice);
      var productQuantity = cartRow.getElementsByClassName(
        "cart-quantity-input"
      )[0];

      var price = parseFloat(productPrice);
      console.log(price);
      var quantity = productQuantity.value;
      total = total + price * quantity;
      console.log(total);
      var newTotalRow = (quantity * Math.round(price * 100)) / 100;
      divInsideRow[3].innerText = `${newTotalRow} lei`;
      var newTotalFinal = Math.round(total * 100) / 100;
      totalPrice.innerText = `Total: ${newTotalFinal} lei`;
    }
  } else {
    totalPrice.innerText = "Total: 0";
  }
}
// Update the QUANTITY each time the input is changed
function updateRowTotal() {
  var input = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("change", rowTotalSum);
    input[i].addEventListener("change", updateCartTotal);
  }
}
//Function that calculate the total for each product
function rowTotalSum(event) {
  var inputLocation = event.target;
  var row = inputLocation.parentElement.parentElement;
  console.log(row);
  var divsInRow = row.getElementsByTagName("div");
  var productPrice = divsInRow[1].innerText;
  var productQuantity = row.getElementsByClassName("cart-quantity-input")[0];
  var price = parseFloat(productPrice.replace("lei", ""));
  var quantity = productQuantity.value;
  var total = (quantity * Math.round(price * 100)) / 100;
  divsInRow[3].innerText = `${total} lei`;
}
