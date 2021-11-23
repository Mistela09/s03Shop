// Exercise 11
// Move this variable to a json file and load the data in this js
var products = [
    {
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery'
    },
    {
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
        
    },
    {
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery'
    },
    {
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
var cartList = [];
var cart = [];
var subtotal = {
    grocery: {
        value: 0, 
        discount: 0
    },
    beauty: {
        value: 0, 
        discount: 0
    },
    clothes: {
        value: 0, 
        discount: 0
    },
};
var total = 0;

// Exercise 1
function addToCartList(id) {
    // 1. Loop for to the array products to get the item to add to cart
    
    products.forEach((producto, i) => {
        producto.proID = i+1;
    })

    function comprar(prod) {
    return prod.proID === id;
    }
    
    // 2. Add found product to the cartList array
    //cartList.push(element);
   cartList.push(products.find(comprar));
    calculateSubtotals();
    calculateTotal();
    applyPromotionsSubtotals();
    generateCart();
}



// Exercise 2
function cleanCart() {
    cartList = [];

}

// Exercise 3
function calculateSubtotals() {
    // 1. Create a for loop on the "cartList" array 
    subtotal.grocery.value = 0;
    subtotal.clothes.value = 0;
    subtotal.beauty.value = 0;

    console.log(cartList.length)
 for(i = 0; i < cartList.length; i++){
    // 2. Implement inside the loop an if...else or switch...case to add the quantities of each type of product, obtaining the subtotals: subtotalGrocery, subtotalBeauty and subtotalClothes

    if(cartList[i]["type"] === 'grocery'){
        subtotal.grocery.value += cartList[i].price;
        
         //console.log("subtotalGrocery", subtotal.grocery.value);

        }else if(cartList[i]["type"] === 'clothes'){
            subtotal.clothes.value += cartList[i].price;

        //console.log("subtotalClothes", subtotal.clothes.value);

        }else if(cartList[i]["type"] === 'beauty'){
        subtotal.beauty.value += cartList[i].price;

        //console.log("subtotalBeauty", subtotal.beauty.value);

    }else{
        return
    }
}
    //console.log("subtotalGrocery", subtotal.grocery.value);
    //console.log("subtotalClothes", subtotal.clothes.value);
    //console.log("subtotalBeauty", subtotal.beauty.value);
}

// Exercise 4
function calculateTotal() {
    // Calculate total price of the cart either using the "cartList" array
    //for(let producto in cartList) {
    total = 0;
    for(let producto in cartList){

        total = subtotal.beauty.value + subtotal.clothes.value + subtotal.grocery.value;
        //console.log("productValue; ", cartList[producto]);
        cart = cartList;

    }
    console.log("Total: ", total);
}

// Exercise 5
function applyPromotionsSubtotals() {
    subtotal.grocery.discount= 0;
    subtotal.clothes.discount = 0;
    subtotal.beauty.discount = 0;
    let oilProdNum = 0;
    let mixtureProdNum = 0;
    let oilDiscount = 0;
    let mixtureDiscount = 0;
    for(let i = 0; i < cartList.length; i++){
        if(cartList[i].name === 'cooking oil'){
            oilProdNum++;
        }else if(cartList[i].name === 'Instant cupcake mixture'){
            mixtureProdNum++;
        }
    }
    if(oilProdNum >= 4){
        oilDiscount = (products[0].price - 10) * oilProdNum;
    }
    if(mixtureProdNum >= 11){
        mixtureDiscount = (products[2].price - products[2].price * 2/3) * mixtureProdNum;
    }

    subtotal.grocery.value = subtotal.grocery.value - oilDiscount - mixtureDiscount;

    calculateTotal();
}

// Exercise 6
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    let preCart = cartList.map((obj) => obj);
    const quantityValue = {};
    for(let i = 0; i < preCart.length; i++){
    quantityValue[preCart[i].name] = quantityValue[preCart[i].name] == null ? 1 : quantityValue[preCart[i].name] + 1;
    }
    cart = Object.keys(quantityValue).map(productName => { return { ...preCart.find(obj => obj.name === productName), "quantity": quantityValue[productName]}})
    for(let i = 0; i < cart.length; i++){
        cart[i].subtotal = cart[i].quantity * cart[i].price;
}
 console.log("Cart: ", cart);
 applyPromotionsCart();
}
    
// Exercise 7
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
}

// Exercise 8
function addToCart(id) {
    // 1. Loop for to the array products to get the item to add to cart

    products.forEach((product, i) => {
        product.prodId = i + 1;    
    })

    for(i = 0; i < products.length; i++){
        if(products[i].prodId === id && cart.find(cartObj => {return cartObj.name === products[i].name}) !== products[i]){
    // 2. Add found product to the cartList array

            cart.push(products[i]);
            const cartQuantity = cart.find(cartObj => {return cartObj.name === products[i].name}).quantity = 1;
            const cartPrice = cart.find(cartObj => {return cartObj.name === products[i].name}).price
            cart.find(cartObj => {return cartObj.name === products[i].name}).subtotal = cartQuantity * cartPrice;
            
        }else if(products[i].prodId === id && cart.find(cartObj => {return cartObj.name === products[i].name}) === products[i]){
          
            const objCart = cart.find(cartObj => {return cartObj.name === products[i].name});
            let cartQuantity = cart.find(cartObj => {return cartObj.name === products[i].name}).quantity  += 1;
            cartQuantity = cart.find(cartObj => {return cartObj.name === products[i].name}).quantity  += 1;
            const cartPrice = cart.find(cartObj => {return cartObj.name === products[i].name}).price;
            const cartName = cart.find(cartObj => {return cartObj.name === products[i].name}).name;
     
            let cartSubttl = cart.find(cartObj => {return cartObj.name === products[i].name}).subtotal = cartQuantity * cartPrice;
            
            if(cartName === 'cooking oil' && cartQuantity > 3){
                objCart.subtotalWithDiscount = cartQuantity * 10;
            }else if(cartName === 'Instant cupcake mixture' && cartQuantity >= 10){
                objCart.subtotalWithDiscount = cartQuantity * cartPrice * 2 / 3;
            }else{
                objCart.subtotalWithDiscount = cartSubttl;
            }
        }
    }
    console.log("cart: ", cart);
    // 2. Add found product to the cartList array
    
}

// Exercise 9
function removeFromCart() {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    document.getElementsById("cartProduct").innerHTML = cart;
}



// Exercise 10
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    
}

        