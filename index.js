let iconCart = document.querySelector(".icon-cart");
let closeCart = document.querySelector(".close");
let body = document.querySelector("body");
let listProductHtml = document.querySelector(".card");
let listCart = document.querySelector(".listCart");
let cartQuantity = document.querySelector(".cartQuantity");
let listProduct = [];
let cart = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const addDataToHTML = () => {
  listProductHtml.innerHTML = "";
  if (listProduct.length > 0) {
    listProduct.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("crd");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = ` <img src="${product.image}" alt="" />
     
      <div class="crdText">
              <h2>${product.name}</h2>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star-half-stroke"></i><br />
              <h2>${"₹" + product.price}</h2>
              <button class="addCart">Add To Cart</button>
            </div>`;
      listProductHtml.appendChild(newProduct);
    });
  }
};

listProductHtml.addEventListener("click", (event) => {
  let postionClick = event.target;

  if (postionClick.classList.contains("addCart")) {
    let product_id = postionClick.parentElement.parentElement.dataset.id;
    addToCart(product_id);
  }
});

const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity =
      cart[positionThisProductInCart].quantity + 1;
  }

  // console.log(cart);
  addCartToHtml();
  addCartToMemory();
};

const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

 
const addCartToHtml = () => {
  listCart.innerHTML = "";
  let totalQuantity = 0;

  if (cart.length > 0) {
    cart.forEach((cartItem) => {
      totalQuantity += cartItem.quantity;

      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.dataset.id = cartItem.product_id;

      let positionProduct = listProduct.findIndex(
        (value) => value.id == cartItem.product_id
      );

      // Check if positionProduct is a valid index
      if (positionProduct !== -1) {
        let info = listProduct[positionProduct];

        newCart.innerHTML = `
          <div class="image">
            <img src="${info.image}" alt="x">
          </div>
          <div class="name">
            ${info.name}
          </div>
          <div class="totalPrice">
            ${info.price * cartItem.quantity}
          </div>
          <div class="quantity">
            <span class="minus"><</span>
            <span>${cartItem.quantity}</span>
            <span class="plus">></span>
          </div>
        `;
        listCart.appendChild(newCart);
      } else {
        console.error(`Product with id ${cartItem.product_id} not found.`);
      }
    });
  }

  cartQuantity.innerHTML = totalQuantity;
};

listCart.addEventListener("click", (event) => {
  let positionCLick = event.target;
  if (
    positionCLick.classList.contains("minus") ||
    positionCLick.classList.contains("plus")
  ) {
    let product_id = positionCLick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionCLick.classList.contains("plus")) {
      type = "plus";
    }
    changeQunatity(product_id, type);
  }
});
const changeQunatity = (product_id, type) => {
  let positionItemInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    switch (type) {
      case "plus":
        cart[positionItemInCart].quantity =
          cart[positionItemInCart].quantity + 1;
        break;

      default:
        let valueChange = cart[positionItemInCart].quantity - 1;
        if (valueChange > 0) {
          cart[positionItemInCart].quantity = valueChange;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToMemory();
  addCartToHtml();
};
const intiApp = () => {
  fetch("Data/men.json")
    .then((response) => response.json())
    .then((data) => {
      listProduct = data;
      console.log(listProduct);
      addDataToHTML();

      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        addCartToHtml();
      }
    });
};
intiApp();


let card=document.querySelector(".trend");
let mainPage=document.querySelector(".main");
let blog=document.querySelector(".trends")


function home(){
  mainPage.style.display="flex"
  card.style.display="block"
  blog.style.display="block"

  document.getElementById("home").style.color="rgb(2,173,173)"
  document.getElementById("shop").style.color="black"
  document.getElementById("blog").style.color="black"
  document.getElementById("about").style.color="black"
  document.getElementById("contact").style.color="black"
}
function shop(){
  mainPage.style.display="none"
  blog.style.display="none"
  card.style.display="block"

  document.getElementById("shop").style.color="rgb(2,173,173)"
  document.getElementById("home").style.color="black"
  document.getElementById("blog").style.color="black"
  document.getElementById("about").style.color="black"
  document.getElementById("contact").style.color="black"
}
function blogs(){
  mainPage.style.display="none"
  card.style.display="none"
  blog.style.display="block"

  document.getElementById("blog").style.color="rgb(2,173,173)"
  document.getElementById("home").style.color="black"
  document.getElementById("shop").style.color="black"
  document.getElementById("about").style.color="black"
  document.getElementById("contact").style.color="black"
  

}

function about(){
  
  document.getElementById("about").style.color="rgb(2,173,173)"
  document.getElementById("home").style.color="black"
  document.getElementById("shop").style.color="black"
  document.getElementById("blog").style.color="black"
  document.getElementById("contact").style.color="black"
}
function contact(){
  
  document.getElementById("contact").style.color="rgb(2,173,173)"
  document.getElementById("home").style.color="black"
  document.getElementById("shop").style.color="black"
  document.getElementById("blog").style.color="black"
  document.getElementById("about").style.color="black"
}