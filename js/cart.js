// Open Cart 
function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

function init() {
    document.querySelector('.cartIcon').addEventListener("click", toggleMenu);
    document.querySelector('#bodyGrayOverlay').addEventListener("click", toggleMenu);
}

function toggleMenu() {
    var ele = document.getElementsByTagName('body')[0];
    if (!hasClass(ele, "menu-open")) {
        addClass(ele, "menu-open");
    } else {
        removeClass(ele, "menu-open");
    }
}
document.addEventListener('readystatechange', function() {
    if (document.readyState === "complete") {
        init();
    }
});



// Shopping Cart Logic - Adding Items to Cart  
const cartDOM = document.querySelector(".cart");
const cartContent = document.querySelector(".cart-content");
const cartItems = document.querySelector(".cart-items");
const clearCartBtn = document.querySelector(".clear-cart");
const cartTotal = document.querySelector(".cart-total");
const productsDOM = document.querySelector(".products-center");
let cart = [];
let buttonsDOM = [];


// Class Products 
class Products {
    async getProducts() {
        try {
            let result = await fetch("products.json");
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const { title, price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                return { title, price, id, image }
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

// Class UI 
class UI {
    displayProducts(products) {
        let result = "";
        products.forEach(product => {
            result += `
        <li class="listCartItem">
            <div class="imgProduct">
                <img src="images/product-1-cart.jpeg">
            </div>
            <div class="infoProduct">
                <div class="leftInfo">
                    <p class="productTittle">Marselha ring </p>
                    <div class="productSize">
                    <span class="label">Color: </span> <span class="value">Blue</span>
                    </div>
                </div>
                <div class="rightInfo">
                    <span class="productPrice">€138.00</span>
                    <a class="removeFromCart" href="#"> Remove </a>
                </div>
            </div>
        </li>               
            `
        })
    }
}


// Class Storage 
class Storage {}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();

    // get all products
    products
        .getProducts()
        .then(products => ui.displayProducts(products));
});