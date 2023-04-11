// Run after loading function

window.addEventListener("load", ready);

// ready() function body - Needed to be called after DOM loading

function ready() {
  loadProductsToCart();
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
let cartProducts = [];
const storedProducts = localStorage.getItem("cartProducts");

//                                                      VARIABLES FOR SEARCH BAR

let inputTest = document.getElementById("searchInput").value;
let searchRes = document.getElementsByClassName("searchResults")[0];
console.log(inputTest);
let listContainer = document.getElementById("theList");
let noResults = true;
//                                                  LOADS LIST OF PRODUCTS FROM JSON

function loadData() {
  let produseArr = [];
  fetch("/listaProduseNew.json")
    .then((resp) => resp.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        var obj = data[i];

        produseArr.push(obj);
      }

      produseArr.forEach((product) => {
        let list = document.getElementById("theList");
        let a = document.createElement("a");
        let refer = product.location;
        a.classList.add("listItem");
        a.classList.add("ps-2");
        // TESTING....
        a.innerText = product.name;
        if (product.name.includes("Royal")) {
          a.setAttribute("src", refer);
        }

        list.appendChild(a);
      });
    });
}

//                                                    SEARCH FUNCTION

function search() {
  let listItems = document.getElementsByClassName("listItem");
  let input = document.getElementById("searchInput").value;
  input = input.toLowerCase();
  console.log(input);

  for (let i = 0; i < listItems.length; i++) {
    if (!listItems[i].innerText.toLowerCase().includes(input) || input === "") {
      listItems[i].style.display = "none";
    } else {
      listItems[i].style.display = "flex";
      noResults = false;
      searchRes.style.display = noResults ? "none" : "block";
      console.log(listItems[i]);
    }
  }
}
//                                             FUNCTION TO HIDE LIST RESULTS IF INPUT IS EMPTY

function hideResults() {
  let results = document.getElementsByClassName("searchResults")[0];
  let input = document.getElementById("searchInput");
  input.value = "";
  results.style.display = "none";
}
function hideResultsEmpty() {
  let results = document.getElementsByClassName("searchResults")[0];
  let input = document.getElementById("searchInput").value;

  results.style.display = "none";
}
//                                                         TOGGLE CART

function toggleCart() {
  var x = document.getElementById("cartCard");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//                                       REMOVE ITEM FROM CART AFTER BUTTON REMOVE IS CLICKED

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
    buttonRed.addEventListener("click", getProdutsForStoring);
  }
}
//                                                   GO TO CUMPARA
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
  deleteLocalStorage();
}

//                    ADD AN EVENT LISTENER FOR EVERY BUTTON WITH BTN-PRIMARY CLASS IN DOCUMENT

var addToCartButtons = document.getElementsByClassName("btn-primary");
for (let i = 0; i < addToCartButtons.length; i++) {
  var buttons = addToCartButtons[i];
  buttons.addEventListener("click", addToCartClicked);
}
//                                      FUNCTION WICH EXTRACTS PARAMETRES FOR ADDTOCART() AND CALLS IT

function addToCartClicked(evnt) {
  var button = evnt.target;

  var cardProduct = button.parentElement;

  var description =
    cardProduct.getElementsByClassName("card-text")[0].innerText;

  var price = getPrice(cardProduct);
  rowTotal = price;

  //TESTING ALSO...
  var produseCreeate = cart.getElementsByClassName("createdDiv");

  // if (produseCreeate.length == 0) {
  // addToCart(description, price, qty);
  /// } else {
  // productsName = cart.getElementsByClassName("productTitle");

  //for (let i = 0; i < productsName.length; i++) {
  //var product = productsName[i];

  // var text = product.innerText;
  // if (text == description) {
  //  var qtyInput = cardProduct.getElementsByClassName(
  // "cart-quantity-input"
  //  )[0];
  //qtyInput.value = Number(qtyInput.value) + 1;
  // var randTotal = cardProduct.getElementsByClassName("productTotal")[0];
  // var total = Math.floor(price * qtyInput.value * 100) / 100;
  // randTotal.innerText = `${total} lei`;
  //} else {
  addToCart(description, price, qty);
  // }
  //}
  //}

  updateRowTotal();
}
//                     CONVERT SRTING VALUES FROM SPAN AND SUP TO NUMBER,ALSO REMOVING ',' AND 'lei' WITH REPLACE()

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

//                                                       THE CART

var cart = document.getElementById("cartContent");
let cartCount = 0;

//                                                        UPDATE CART ICON

function updateCartIcon() {
  var items = document.getElementsByClassName("createdDiv");
  var count = items.length;
  var icon = document.getElementById("cartCount");
  icon.innerText = `Cos(${count})`;
  if (count == 0) {
    deleteLocalStorage();
  }
}

//                       FUNCTION THAT INSERTS PRODUCTS IN CART-NEEDS PARAMETRES FROM ADDTOCARTCLICKED()

function addToCart(descript, price, quantite) {
  const product = document.createElement("div");
  product.classList.add("row");
  product.classList.add("p-2");
  product.classList.add("createdDiv");
  var cartProductContent = `<div class="col-5 productTitle">${descript}</div>

                          <div class="col-2 productPrice">${price} lei</div>
                          <div class="col-1"><input class="cart-quantity-input" type="number" value= ${quantite} ></input></div>
                          <div class="col-2 productTotal">${rowTotal} lei</div>
                          <div class="col-2">
                                        <button class="btn btn-danger btn-sm" onclick="removeProduct()" onmousedown="updateCartIcon()">
                                          Remove
                                        </button>
                                      </div>`;
  product.innerHTML = cartProductContent;
  cart.append(product);
  updateCartTotal();
  updateCartIcon();
  getProdutsForStoring();
}
//                                     FUNCTION WICH UPDATES THE TOTAL

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
  updateCartIcon();
}
//                          FUNCTION FOR STORING PRODUCTS IN CART
function getProdutsForStoring() {
  var cartProductBody = document.getElementById("cartContent");
  var cartRows = cartProductBody.getElementsByClassName("createdDiv");
  if (cartRows.length > 0) {
    cartProducts = [];
    for (let i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var divInsideRow = cartRow.getElementsByTagName("div");
      var descript = divInsideRow[0].innerText;
      var productPrice = divInsideRow[1].innerText;
      console.log(productPrice);
      var productQuantity = cartRow.getElementsByClassName(
        "cart-quantity-input"
      )[0];

      var price = parseFloat(productPrice);

      var quantity = productQuantity.value;

      var productToBeStored = {
        descriere: descript,
        pret: price,
        cantitate: quantity,
      };
      cartProducts.push(productToBeStored);
    }
  }
  localStorage.setItem("cartOrders", JSON.stringify(cartProducts));
  console.log(localStorage);
}
//                            CLEAR LOCAL STORAGE FUNCTION
function deleteLocalStorage() {
  localStorage.clear();
  cartProducts = [];
  storedOrders = [];
}
//                               LOAD PRODUCTS FROM LOCAL STORAGE TO CART

function loadProductsToCart() {
  if (localStorage.getItem("cartOrders")) {
    var storedOrders = localStorage.getItem("cartOrders");
    cartProducts = JSON.parse(storedOrders);
    console.log(cartProducts);
    for (let i = 0; i < cartProducts.length; i++) {
      var item = cartProducts[i];

      var descriptStorage = item.descriere;
      var price = item.pret;
      var qty = item.cantitate;
      addToCartFromStorage(descriptStorage, price, qty);
    }
  }
}

//     NEW FUNCTION FOR ADD TO CART FOR LOCAL STORAGE PRODUCTS

function addToCartFromStorage(descript, price, quantite) {
  const product = document.createElement("div");
  product.classList.add("row");
  product.classList.add("p-2");
  product.classList.add("createdDiv");
  var cartProductContent = `<div class="col-5">${descript}</div>

                          <div class="col-2">${price} lei</div>
                          <div class="col-1"><input class="cart-quantity-input" type="number" value= ${quantite} ></input></div>
                          <div class="col-2">${rowTotal} lei</div>
                          <div class="col-2">
                                        <button class="btn btn-danger btn-sm" onclick="removeProduct()" onmousedown="updateCartIcon()">
                                          Remove
                                        </button>
                                      </div>`;
  product.innerHTML = cartProductContent;
  cart.append(product);
  updateCartTotal();
  updateCartIcon();
}

//                          UPDATE THE QUANTITY EACH TIME THE INPUT IS CHANGHED

function checkInput(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
}

function updateRowTotal() {
  var input = document.getElementsByClassName("cart-quantity-input");

  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("change", checkInput);
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

// Array products ..
let allProducts = [
  {
    name: "New World Cusca Metalica 122 cm B48",
    price: 149.99,
    location: "index.CainiAccesorii.html",
    image: "images/20585067_5-1-1-247x205.jpg",
  },
  {
    name: "Ferplast Cusca Transport Atlas 20 + Pernita",
    price: 98.99,
    location: "index.CainiAccesorii.html",
    image: "images/413-3-247x200.jpg",
  },
  {
    name: "Ferplast Botnita Safe L",
    price: 49.99,
    location: "index.CainiAccesorii.html",
    image: "images/dingo-nr-3-10-247x237 (1).jpg",
  },
  {
    name: "Botnita Nylon 4",
    price: 26.99,
    location: "index.CainiAccesorii.html",
    image: "images/657-1-247x229.jpg",
  },
  {
    name: "Carabiniera 12 x 60 mm",
    price: 9.99,
    location: "index.CainiAccesorii.html",
    image: "images/63-4-247x247.jpg",
  },
  {
    name: "Botnita Piele 5137 Shar-Pei",
    price: 39.99,
    location: "index.CainiAccesorii.html",
    image: "images/658-3-247x219.jpg",
  },
  {
    name: "Ferplast Lesa Silon Club G25/120 Verde",
    price: 19.99,
    location: "index.CainiAccesorii.html",
    image: "images/lesa_silon_club_g10_120_verde_2-1-247x247.jpg",
  },
  {
    name: "Ferplast Vesta Verde L",
    price: 91.99,
    location: "index.CainiAccesorii.html",
    image: "images/Pet-Expert-Haina-Caine-Green-BO-W19040-247x247.jpg",
  },
  {
    name: "Beaphar Oftalm Remover 50 ml",
    price: 21.19,
    location: "index.CainiIngrijire.html",
    image: "images/oftal-remover-1-247x247.jpg",
  },
  {
    name: "Periuta de Dinti Dubla",
    price: 19.19,
    location: "index.CainiIngrijire.html",
    image: "images/arm-hammer-periuta-dinti-caini-360-3-247x247.jpg",
  },
  {
    name: "ECTO MAX Zgarda Antiparazitara Bio Dog Large 75 cm",
    price: 19.99,
    location: "index.CainiIngrijire.html",
    image: "images/zgarda-antiparazitara-caini-ecto-max-l-696-247x247.jpg",
  },
  {
    name: "ECTO MAX Zgarda Antiparazitara Bio Dog Small 38 cm",
    price: 19.99,
    location: "index.CainiIngrijire.html",
    image:
      "images/res_4cfc6939e2edeb312c688fbdc98a2add_450x450_v12j-247x247.jpg",
  },
  {
    name: "Pasta de Diniti Caini 150 ML",
    price: 25.3,
    location: "index.CainiIngrijire.html",
    image: "images/944-1-247x247.jpg",
  },
  {
    name: "Covorase Absorbante Caini 15 BUC",
    price: 18.19,
    location: "index.CainiIngrijire.html",
    image: "images/20583686-1-247x247.jpg",
  },
  {
    name: "Bosch Adult Lamb/Rice 15 kg",
    price: 159.29,
    location: "index.CainiHrana.html",
    image: "images/bosch-adult-miel-orez-1-247x247.jpg",
  },
  {
    name: "Bosch Junior Medium 15 kg",
    price: 182.29,
    location: "index.CainiHrana.html",
    image: "images/bosch-junior-mediu-1-247x247.jpg",
  },
  {
    name: "Brit Care Dog Sustainable Adult Large Breed",
    price: 32.29,
    location: "index.CainiHrana.html",
    image: "images/brit-premium-247x247.jpg",
  },
  {
    name: "Dog Concept Plic Adult Curcan 100 g 24 buc/bax",
    price: 20.49,
    location: "index.CainiHrana.html",
    image: "images/dog_concept_plic_curcan_100_g-247x247.jpg",
  },
  {
    name: "Nutraline Dog Conserva Adult Monoprotein Pui Ulei de Floarea-Soarelui 400 g",
    price: 11.29,
    location: "index.CainiHrana.html",
    image:
      "images/NUTRALINE-DOG-CONSERVA-ADULT-MONOPROTEIN-MIEL-ULEI-DE-SOFRANEL-1-247x247.jpg",
  },
  {
    name: "Pedigree Adult Vita/Legume 3 Kg",
    price: 39.19,
    location: "index.CainiHrana.html",
    image: "images/res_9ab5dd2f7d3bb9143666f9cc11255452-247x247.jpg",
  },
  {
    name: "Pedigree Adult Pui/Legume 3 Kg",
    price: 39.19,
    location: "index.CainiHrana.html",
    image: "images/pedigree_plic_junior_pui_in_aspic_100_g-1-247x247.jpg",
  },
  {
    name: "Pedigree Dentastix Mediu Mono 7 buc 180 g",
    price: 15.72,
    location: "index.CainiRecompense.html",
    image: "images/600_600-3-247x247.jpg",
  },
  {
    name: "Pedigree Dentastix Small Mono 7 buc 110 g",
    price: 9.19,
    location: "index.CainiRecompense.html",
    image: "images/55_1-1-247x247.jpg",
  },
  {
    name: "Pedigree Biscuiti Biscrok Multimix 500 g",
    price: 18.19,
    location: "index.CainiRecompense.html",
    image:
      "images/PEDIGREE-Markies-recompense-caini-biscuiti-aroma-de-maduva-1.5kg-15619-247x247.jpg",
  },
  {
    name: "Advance Dog Dental Stick 180g",
    price: 14.99,
    location: "index.CainiRecompense.html",
    image:
      "images/advance-articular-snack-hrana-complementara-pentru-caini-adulti-care-sustine-imbunatatirea-mobilitatii-510x510-1-247x247.jpg",
  },
  {
    name: "Proline Boxby Grain Free Miel 100 g",
    price: 19.19,
    location: "index.CainiRecompense.html",
    image: "images/proline_boxby_grain_free_rata_100_g_1-1-247x247.jpg",
  },
  {
    name: "8 in1 Recompense Delights Triple Flavor S",
    price: 19.19,
    location: "index.CainiRecompense.html",
    image: "images/DelightsBeefS_main-247x247.jpg",
  },
  {
    name: "Pedigree Biscuiti Markies Mini 500 g",
    price: 11.59,
    location: "index.CainiRecompense.html",
    image:
      "images/63616__pla_pedigree_biscrok_3_koestliche_geschmacksrichtungen_3-247x247.jpg",
  },
  {
    name: "8 in1 Oase Delights 7 BUC",
    price: 19.19,
    location: "index.CainiRecompense.html",
    image: "images/DelightsBeefS_main-247x247.jpg",
  },
  {
    name: "Royal Canin Felin Digestive",
    price: 21.99,
    location: "index.PisiciHrana.html",
    image: "images/1102-2-247x247.jpg",
  },
  {
    name: "Nuevo Cat Cons Pui/Creveti 400 g",
    price: 26.99,
    location: "index.PisiciHrana.html",
    image: "images/1326-1-247x247.jpg",
  },
  {
    name: "Applaws Natural Care Food",
    price: 15.99,
    location: "index.PisiciHrana.html",
    image: "images/1337-1-247x247.jpg",
  },
  {
    name: "Royal Canin Care Hairball",
    price: 30.99,
    location: "index.PisiciHrana.html",
    image: "images/1600_1600-2-1-247x247.jpg",
  },
  {
    name: "Royal Canin Adult British",
    price: 26.99,
    location: "index.PisiciHrana.html",
    image: "images/2-9-247x247.jpg",
  },
  {
    name: "Royal Canin Sensory Smell",
    price: 26.99,
    location: "index.PisiciHrana.html",
    image: "images/600_600-5-247x247.jpg",
  },
  {
    name: "Schesir Cons Pisica Ton/Creveti 85 g",
    price: 16.99,
    location: "index.PisiciHrana.html",
    image: "images/schesir-conserva-ton-creveti-1-247x247.jpg",
  },
  {
    name: "Nuevo Cat Conserva Somon",
    price: 27.49,
    location: "index.PisiciHrana.html",
    image: "images/somon-247x247.jpg",
  },
  {
    name: "Beaphar Recompense Pisica Catnip Bits 35 G",
    price: 14.99,
    location: "index.PisiciRecompense.html",
    image: "images/10_malt_bits-1-247x247.jpg",
  },
  {
    name: "Beaphar Recompense Urinary Tract Support 35g",
    price: 8.99,
    location: "index.PisiciRecompense.html",
    image:
      "images/beaphar-recompense-pisica-urinary-tract-support-35-g3166-247x245.jpg",
  },
  {
    name: "Vitakraft Baton Pisica Mini Curcan/Miel 3 Buc",
    price: 26.99,
    location: "index.PisiciRecompense.html",
    image: "images/dyu-247x245.jpg",
  },
  {
    name: "Felix Party Mix Mixed Grill 60 g",
    price: 7.99,
    location: "index.PisiciRecompense.html",
    image: "images/felix_party_mix_mixed_grill_60_g-1-247x247.jpg",
  },
  {
    name: "Catit Rezerva Pad Play N Scratch",
    price: 13.99,
    location: "index.PisiciAccesorii.html",
    image: "images/catit_pad_play_n_scratch-247x247.jpg",
  },
  {
    name: "Coa Hranitor Interactiv Pisica Catch",
    price: 93.99,
    location: "index.PisiciAccesorii.html",
    image:
      "images/hranitor-interactiv-pentru-pisici-coa-slow-feeders-pisica-catch_8363255-247x247.jpg",
  },
  {
    name: "Ferplast Geanta Transport Holiday 2",
    price: 312.99,
    location: "index.PisiciAccesorii.html",
    image: "images/1_3_55-1-247x226.jpg",
  },
  {
    name: "Ferplast Cusca Transport Atlas 10",
    price: 136.99,
    location: "index.PisiciAccesorii.html",
    image: "images/413-2-247x200.jpg",
  },
  {
    name: "Hagen Cat Grass 85 g",
    price: 13.99,
    location: "index.PisiciIngrijire.html",
    image: "images/83-247x247.jpg",
  },
  {
    name: "Vitakraft Iarba Pisicii 120 g",
    price: 18.99,
    location: "index.PisiciIngrijire.html",
    image: "images/84-247x247.jpg",
  },
  {
    name: "Beaphar Cat Supliment Top",
    price: 20,
    location: "index.PisiciIngrijire.html",
    image: "images/beaphar-cat-supliment-top-10-180-tbl2015-247x247.jpg",
  },
  {
    name: "Ferplast Lopetica KP3 FPI 5352",
    price: 34.99,
    location: "index.PisiciIngrijire.html",
    image: "images/ferplast-lopetica-kp4-fpi-5354-500x500-1-247x247.jpg",
  },
  {
    name: "Omax Servetele Umede",
    price: 6.99,
    location: "index.PisiciIngrijire.html",
    image: "images/OMAX-mosc-alb-247x247.jpg",
  },
  {
    name: "Tetra Meniu 100 ml",
    price: 13.99,
    location: "index.PestiHrana.html",
    image: "images/379-2-247x247.jpg",
  },
  {
    name: "Tetrawafer Mix Plic 15 g",
    price: 17.99,
    location: "index.PestiHrana.html",
    image: "images/859-1-247x247.jpg",
  },
  {
    name: "Jbl Novogranocolor Refill 250 ml",
    price: 9.99,
    location: "index.PestiHrana.html",
    image: "images/859-1-247x247.jpg",
  },
  {
    name: "Aquael Acvariu Leddy 60 Day&Night",
    price: 299.99,
    location: "index.PestiAcvarii.html",
    image: "images/Untitled-2-2-247x247.jpg",
  },
  {
    name: "Aquael Acvariu Clasic Rectangular 60 L",
    price: 599.99,
    location: "index.PestiAcvarii.html",
    image: "images/day-247x247.jpg",
  },
  {
    name: "Aquael Acvariu Shrimp Smart Day & Night 30 L",
    price: 13.99,
    location: "index.PestiAcvarii.html",
    image:
      "images/acvariu-aquael-shrimp-smart-day-night-30-l-negru_8375878-2-247x247.jpg",
  },
  {
    name: "Vitakraft Meniu Canari 1 KG",
    price: 23.99,
    location: "index.PasariHrana.html",
    image: "images/SF-247x247.jpg",
  },
  {
    name: "Belcuore Grit Scoici Macinate 280 g",
    price: 13.99,
    location: "index.PasariHrana.html",
    image: "images/belcuore-grit-280g-247x247.jpg",
  },
  {
    name: "Vitakraft Vita Nature Mei 100 g",
    price: 9.99,
    location: "index.PasariHrana.html",
    image: "images/810-1-247x247.jpg",
  },
  {
    name: "Kiri Kiri Rulada Canari 65 g",
    price: 4.99,
    location: "index.PasariHrana.html",
    image:
      "images/43-58_catalog-pasari_si_rozatori_page16_image85_copy-1-247x245.jpg",
  },
  {
    name: "Pet Expert Hranitor Pasari",
    price: 9.99,
    location: "index.PasariAltele.html",
    image: "images/ad-247x244.jpg",
  },
  {
    name: "Colivie Nr.412",
    price: 62.99,
    location: "index.PasariAltele.html",
    image: "images/20579236-1-247x247.jpg",
  },
  {
    name: "Colivie Nr 904",
    price: 71.99,
    location: "index.PasariAltele.html",
    image: "images/1272-1-247x246.jpg",
  },
  {
    name: "Colivie Nr A 309",
    price: 65.99,
    location: "index.PasariAltele.html",
    image: "images/177db999-2aa8-4714-88de-167348032383-247x248.jpg",
  },
];
