const products = {

    "choco-gloss": {
        name: "Choco Gloss",
        price: 3000,
        image: "images/choco-gloss.jpg.jpeg",
        description: "A beautiful chocolate-inspired lip gloss with a smooth, glossy finish.",
        features: [
            "Beautiful glossy finish",
            "Smooth application",
            "Lightweight feel",
            "Perfect for everyday wear"
        ]
    },

    "lip-balm": {
        name: "Lip Balm",
        price: 1500,
        image: "images/lip-balm.jpg.jpeg",
        description: "A nourishing lip balm that helps keep your lips soft, smooth, and moisturized. Perfect for everyday use.",
        features: [
            "Helps moisturize lips",
            "Keeps lips soft and smooth",
            "Comfortable everyday wear",
            "Perfect for dry lips"
        ]
    },

    "lipscrub": {
        name: "Lip Scrub",
        price: 1500,
        image: "images/lipscrub.jpg.jpg",
        description: "A gentle lip scrub designed to exfoliate away dry, flaky skin and leave your lips feeling soft, smooth, and refreshed.",
        features: [
            "Gently exfoliates lips",
            "Helps remove dry skin",
            "Leaves lips feeling smooth",
            "Perfect before applying lip gloss"
        ]
    },

    "pink-nude": {
        name: "Pink Nude and Nude",
        price: 3000,
        image: "images/pink nude and nude.jpg.jpg",
        description: "Pink Nude is a beautiful mixture of nude and pink, making it perfect for creating the perfect lip combo. Nude is a highly pigmented nude-shade lip gloss that adds a rich, beautiful finish to your lips.",
        features: [
            "Beautiful pink and nude combination",
            "Perfect for lip combos",
            "Highly pigmented nude shade",
            "Smooth glossy finish"
        ]
    },

    "wholesale-order": {
        name: "Wholesale Order",
        price: 25000,
        image: "images/wholesales order.jpg.jpg",
        description: "Our wholesale package includes 12 Belipsa products for ₦25,000. Perfect for resellers and beauty businesses looking to stock quality lip products at a wholesale price.",
        features: [
            "12 products per wholesale package",
            "₦25,000 per package",
            "Perfect for resellers",
            "Ideal for beauty businesses"
        ]
    },

    "barbie-tube": {
        name: "Barbie Tube",
        price: 3000,
        image: "images/barbie tube.jpg.jpg",
        description: "A gorgeous Barbie-inspired lip gloss with a beautiful glossy finish. Perfect for adding a fun and feminine touch to your everyday lip look.",
        features: [
            "Beautiful glossy finish",
            "Barbie-inspired look",
            "Smooth application",
            "Perfect for everyday wear"
        ]
    },

    "wand-tube": {
        name: "Wand Tube",
        price: 2500,
        image: "images/wand tube gloss.jpg.jpg",
        description: "A smooth and stylish lip gloss designed to give your lips a beautiful shine while keeping your look effortlessly polished.",
        features: [
            "Smooth application",
            "Glossy finish",
            "Lightweight feel",
            "Perfect for everyday looks"
        ]
    },

    "re-lip-gloss": {
    name: "Re Lip Gloss",
    price: 3000,
    image: "images/Red lip gloss.jpg.jpg",
    description: "A beautiful lip gloss created to give your lips a smooth, glossy finish and an effortlessly polished look.",
    features: [
        "Beautiful glossy shine",
        "Smooth application",
        "Lightweight feel",
        "Easy to wear"
    ]
},
        
}



// ================= CART =================

let cart = [];


// ================= ADD TO CART =================

function addToCart(productName) {

    console.log("Adding:", productName);

    const existingItem = cart.find(
        item => item.name === productName
    );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            name: productName,
            quantity: 1
        });

    }

    updateCart();

    // Show confirmation without disabling the button
    const buttons = document.querySelectorAll(".add-button");

    buttons.forEach(button => {

        if (
            button.getAttribute("onclick") &&
            button.getAttribute("onclick").includes(productName)
        ) {

            const oldText = button.innerText;

            button.innerText = "✓ Added";

            setTimeout(() => {
                button.innerText = oldText;
            }, 800);
        }

    });
}


// ================= BUY NOW =================

function buyNow(productName) {

    cart = [{
        name: productName,
        quantity: 1
    }];

    updateCart();

    openCheckout();
}


// ================= UPDATE CART =================

function updateCart() {

    const cartCount =
        document.getElementById("cart-count");

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    let totalItems = 0;
    let totalPrice = 0;


    cart.forEach(item => {

        const product = products[item.name];

        totalItems += item.quantity;

        totalPrice +=
            product.price * item.quantity;

    });


    cartCount.innerText = totalItems;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty.</p>
            </div>
        `;

        cartTotal.innerText = "₦0";

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const product = products[item.name];

        const itemTotal =
            product.price * item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${product.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>
                        ₦${product.price.toLocaleString()}
                    </p>

                    <div class="quantity-controls">

                        <button
                            onclick="changeQuantity(${index}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>

                <div>

                    <strong>
                        ₦${itemTotal.toLocaleString()}
                    </strong>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(${index})"
                    >
                        ×
                    </button>

                </div>

            </div>
        `;
    });


    cartTotal.innerText =
        "₦" + totalPrice.toLocaleString();
}


// ================= QUANTITY =================

function changeQuantity(index, amount) {

    if (!cart[index]) return;

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();
}


// ================= REMOVE =================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// ================= OPEN CART =================

function openCart() {

    document
        .getElementById("cart-sidebar")
        .classList.add("active");

    document
        .getElementById("overlay")
        .classList.add("active");
}


// ================= CLOSE CART =================

function closeCart() {

    document
        .getElementById("cart-sidebar")
        .classList.remove("active");

    document
        .getElementById("overlay")
        .classList.remove("active");
}


// ================= PRODUCT DETAILS =================

function showProduct(productName) {

    const product = products[productName];


    document.getElementById("modal-name").innerText =
        productName;

    document.getElementById("modal-price").innerText =
        "₦" + product.price.toLocaleString();

    document.getElementById("modal-description").innerText =
        product.description;

    document.getElementById("modal-image").src =
        product.image;


    const features =
        document.getElementById("modal-features");

    features.innerHTML = "";


    product.features.forEach(feature => {

        features.innerHTML += `
            <li>${feature}</li>
        `;

    });


    document.getElementById("modal-cart-button").onclick =
        function () {

            addToCart(productName);

            closeProduct();

        };


    document
        .getElementById("product-modal")
        .classList.add("active");

    document
        .getElementById("overlay")
        .classList.add("active");
}


// ================= CLOSE PRODUCT =================

function closeProduct() {

    document
        .getElementById("product-modal")
        .classList.remove("active");

    document
        .getElementById("overlay")
        .classList.remove("active");
}


// ================= CHECKOUT =================

function openCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    closeCart();

    displayCheckoutItems();

    generateOrderReference();


    document
        .getElementById("checkout-modal")
        .classList.add("active");
}


function closeCheckout() {

    document
        .getElementById("checkout-modal")
        .classList.remove("active");
}


// ================= CHECKOUT ITEMS =================

function displayCheckoutItems() {

    const container =
        document.getElementById("checkout-items");

    const totalElement =
        document.getElementById("checkout-total");


    container.innerHTML = "";


    let total = 0;


    cart.forEach(item => {

        const product = products[item.name];

        const itemTotal =
            product.price * item.quantity;


        total += itemTotal;


        container.innerHTML += `
            <div class="checkout-item">

                <span>
                    ${item.name} × ${item.quantity}
                </span>

                <strong>
                    ₦${itemTotal.toLocaleString()}
                </strong>

            </div>
        `;

    });


    totalElement.innerText =
        "₦" + total.toLocaleString();
}


// ================= ORDER REFERENCE =================

function generateOrderReference() {

    const number =
        Math.floor(10000 + Math.random() * 90000);

    document.getElementById("order-reference").innerText =
        "BELIPSA-" + number;
}


// ================= COPY ACCOUNT =================

function copyAccountNumber() {

    const account =
        document.getElementById("account-number").innerText;

    navigator.clipboard.writeText(account);

    alert("Account number copied.");
}


// ================= SUBMIT ORDER =================

function submitOrder(event) {

    event.preventDefault();


    const name =
        document.getElementById("customer-name").value.trim();

    const phone =
        document.getElementById("customer-phone").value.trim();

    const address =
        document.getElementById("customer-address").value.trim();

    const reference =
        document.getElementById("order-reference").innerText;

    const total =
        document.getElementById("checkout-total").innerText;


    if (!name || !phone || !address) {

        alert("Please fill in all your details.");

        return;
    }


    document.getElementById("success-message").innerHTML = `
        Thank you, <strong>${name}</strong>.<br><br>

        Order Reference:
        <strong>${reference}</strong><br><br>

        Total:
        <strong>${total}</strong><br><br>

        Your order will be processed after
        payment has been verified.
    `;


    closeCheckout();


    document
        .getElementById("success-modal")
        .classList.add("active");
}


// ================= SUCCESS =================

function closeSuccess() {

    document
        .getElementById("success-modal")
        .classList.remove("active");

    document
        .getElementById("checkout-form")
        .reset();

    cart = [];

    updateCart();
}


// ================= CLOSE EVERYTHING =================

function closeEverything() {

    closeCart();

    closeProduct();
}


// ================= INITIALIZE =================

updateCart();