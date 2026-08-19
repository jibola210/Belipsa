/* =========================================
   BELIPSA — COMPLETE SHOPPING SYSTEM
   WITH SUPABASE ORDER EMAIL NOTIFICATION
========================================= */


/* =========================================
   PRODUCTS
========================================= */

const products = {

    "choco-gloss": {
        name: "Choco Gloss",
        price: 3000,
        image: "images/choco-gloss.jpg.jpeg",
        type: "LIP GLOSS",
        description:
            "A smooth and beautiful lip gloss created to give your lips a rich, glossy finish.",
        features: [
            "Smooth glossy finish",
            "Comfortable on the lips",
            "Perfect for everyday wear"
        ]
    },

    "lip-balm": {
        name: "Lip Balm",
        price: 1500,
        image: "images/lip-balm.jpg.jpeg",
        type: "LIP CARE",
        description:
            "A simple everyday lip care essential designed to help keep your lips soft and moisturized.",
        features: [
            "Helps keep lips moisturized",
            "Easy everyday lip care",
            "Perfect for dry lips"
        ]
    },

    "lipscrub": {
        name: "Lip Scrub",
        price: 1500,
        image: "images/lipscrub.jpg.jpg",
        type: "LIP CARE",
        description:
            "A gentle lip scrub designed to help remove dry skin and leave your lips feeling smoother.",
        features: [
            "Gentle exfoliation",
            "Helps remove dry skin",
            "Leaves lips feeling smooth"
        ]
    },

    "pink-nude": {
        name: "Pink Nude and Nude",
        price: 3000,
        image: "images/pink nude and nude.jpg.jpg",
        type: "LIP GLOSS",
        description:
            "Beautiful nude-inspired lip gloss shades for a soft and elegant everyday look.",
        features: [
            "Beautiful nude tones",
            "Glossy finish",
            "Easy everyday wear"
        ]
    },

    "wholesale-order": {
        name: "Wholesale Order",
        price: 25000,
        image: "images/wholesales order.jpg.jpg",
        type: "WHOLESALE",
        description:
            "A Belipsa wholesale package containing 12 pieces for customers purchasing in bulk.",
        features: [
            "12 pieces",
            "Great for resellers",
            "Wholesale pricing"
        ]
    },

    "barbie-tube": {
        name: "Barbie Tube",
        price: 3000,
        image: "images/barbie tube.jpg.jpg",
        type: "LIP GLOSS",
        description:
            "A beautiful Belipsa gloss with a fun and feminine Barbie-inspired look.",
        features: [
            "Glossy finish",
            "Stylish tube",
            "Perfect for everyday looks"
        ]
    },

    "wand-tube": {
        name: "Wand Tube",
        price: 2500,
        image: "images/wand tube gloss.jpg.jpg",
        type: "LIP GLOSS",
        description:
            "A classic lip gloss with an easy-to-use wand applicator for smooth application.",
        features: [
            "Easy wand application",
            "Glossy finish",
            "Suitable for everyday use"
        ]
    },

    "red-lip-gloss": {
        name: "Red Lip Gloss",
        price: 3000,
        image: "images/Red Lip Gloss.jpg.jpg",
        type: "LIP GLOSS",
        description:
            "A bold red lip gloss created for customers who want their lips to stand out.",
        features: [
            "Bold red appearance",
            "Glossy finish",
            "Great for statement looks"
        ]
    }

};


/* =========================================
   CART
========================================= */

let cart = [];


/* =========================================
   MONEY FORMAT
========================================= */

function formatMoney(amount) {

    return "₦" + Number(amount).toLocaleString("en-NG");

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId) {

    const product = products[productId];

    if (!product) {

        console.error(
            "Product not found:",
            productId
        );

        return;
    }

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            id: productId,
            quantity: 1
        });

    }

    updateCart();

}


/* =========================================
   BUY NOW
========================================= */

function buyNow(productId) {

    const product = products[productId];

    if (!product) {

        console.error(
            "Product not found:",
            productId
        );

        return;
    }

    cart = [
        {
            id: productId,
            quantity: 1
        }
    ];

    updateCart();

    openCheckout();

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    if (!cartItems) {
        return;
    }


    const totalQuantity = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <p>
                    Your cart is empty.
                </p>

                <p>
                    Add something beautiful.
                </p>

            </div>

        `;


        if (cartTotal) {

            cartTotal.textContent =
                "₦0";

        }

        return;
    }


    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach(item => {

        const product =
            products[item.id];

        if (!product) {
            return;
        }


        const itemTotal =
            product.price *
            item.quantity;


        total += itemTotal;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ${formatMoney(product.price)}
                </p>

                <div class="quantity-controls">

                    <button
                        type="button"
                        onclick="changeQuantity('${item.id}', -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        onclick="changeQuantity('${item.id}', 1)"
                    >
                        +
                    </button>

                </div>

            </div>

            <div class="cart-item-right">

                <strong>
                    ${formatMoney(itemTotal)}
                </strong>

                <button
                    type="button"
                    class="remove-button"
                    onclick="removeFromCart('${item.id}')"
                >
                    ×
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    if (cartTotal) {

        cartTotal.textContent =
            formatMoney(total);

    }

}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(
    productId,
    amount
) {

    const item = cart.find(
        item =>
            item.id === productId
    );


    if (!item) {
        return;
    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart = cart.filter(
            item =>
                item.id !== productId
        );

    }


    updateCart();

}


/* =========================================
   REMOVE FROM CART
========================================= */

function removeFromCart(productId) {

    cart = cart.filter(
        item =>
            item.id !== productId
    );

    updateCart();

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    const sidebar =
        document.getElementById(
            "cart-sidebar"
        );

    const overlay =
        document.getElementById(
            "overlay"
        );


    if (sidebar) {

        sidebar.classList.add(
            "active"
        );

    }


    if (overlay) {

        overlay.classList.add(
            "active"
        );

    }

}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    const sidebar =
        document.getElementById(
            "cart-sidebar"
        );

    const overlay =
        document.getElementById(
            "overlay"
        );


    if (sidebar) {

        sidebar.classList.remove(
            "active"
        );

    }


    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }

}


/* =========================================
   CLOSE EVERYTHING
========================================= */

function closeEverything() {

    closeCart();

    closeProduct();

    closeCheckout();

    closeSuccess();

}


/* =========================================
   PRODUCT DETAILS
========================================= */

function showProduct(productId) {

    const product =
        products[productId];


    if (!product) {

        console.error(
            "Product not found:",
            productId
        );

        return;
    }


    const modal =
        document.getElementById(
            "product-modal"
        );

    const modalImage =
        document.getElementById(
            "modal-image"
        );

    const modalName =
        document.getElementById(
            "modal-name"
        );

    const modalPrice =
        document.getElementById(
            "modal-price"
        );

    const modalDescription =
        document.getElementById(
            "modal-description"
        );

    const modalFeatures =
        document.getElementById(
            "modal-features"
        );


    if (
        !modal ||
        !modalImage ||
        !modalName ||
        !modalPrice ||
        !modalDescription ||
        !modalFeatures
    ) {
        return;
    }


    modalImage.src =
        product.image;

    modalImage.alt =
        product.name;

    modalName.textContent =
        product.name;

    modalPrice.textContent =
        formatMoney(product.price);

    modalDescription.textContent =
        product.description;


    modalFeatures.innerHTML = "";


    product.features.forEach(
        feature => {

            const li =
                document.createElement(
                    "li"
                );

            li.textContent =
                feature;

            modalFeatures.appendChild(
                li
            );

        }
    );


    const modalCartButton =
        document.getElementById(
            "modal-cart-button"
        );


    if (modalCartButton) {

        modalCartButton.onclick =
            function () {

                addToCart(productId);

                closeProduct();

            };

    }


    modal.classList.add(
        "active"
    );

}


/* =========================================
   CLOSE PRODUCT
========================================= */

function closeProduct() {

    const modal =
        document.getElementById(
            "product-modal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


/* =========================================
   OPEN CHECKOUT
========================================= */

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a product first."
        );

        return;
    }


    closeCart();

    renderCheckout();

    generateOrderReference();


    const modal =
        document.getElementById(
            "checkout-modal"
        );


    if (modal) {

        modal.classList.add(
            "active"
        );

    }

}


/* =========================================
   RENDER CHECKOUT
========================================= */

function renderCheckout() {

    const checkoutItems =
        document.getElementById(
            "checkout-items"
        );

    const checkoutTotal =
        document.getElementById(
            "checkout-total"
        );


    if (!checkoutItems) {
        return;
    }


    checkoutItems.innerHTML = "";

    let total = 0;


    cart.forEach(item => {

        const product =
            products[item.id];


        if (!product) {
            return;
        }


        const itemTotal =
            product.price *
            item.quantity;


        total += itemTotal;


        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <span>
                    ${product.name}
                    × ${item.quantity}
                </span>

                <strong>
                    ${formatMoney(itemTotal)}
                </strong>

            </div>

        `;

    });


    if (checkoutTotal) {

        checkoutTotal.textContent =
            formatMoney(total);

    }

}


/* =========================================
   CLOSE CHECKOUT
========================================= */

function closeCheckout() {

    const modal =
        document.getElementById(
            "checkout-modal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


/* =========================================
   GENERATE ORDER REFERENCE
========================================= */

function generateOrderReference() {

    const reference =

        "BELIPSA-" +

        Math.floor(
            10000 +
            Math.random() * 90000
        );


    const element =
        document.getElementById(
            "order-reference"
        );


    if (element) {

        element.textContent =
            reference;

    }


    return reference;

}


/* =========================================
   COPY ACCOUNT NUMBER
========================================= */

function copyAccountNumber() {

    const accountNumber =
        "9073958997";


    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(accountNumber)

            .then(() => {

                alert(
                    "Account number copied."
                );

            })

            .catch(() => {

                alert(
                    "Account number: 9073958997"
                );

            });

    } else {

        alert(
            "Account number: 9073958997"
        );

    }

}


/* =========================================
   SAVE ORDER FOR TRACKING
========================================= */

function saveOrderForTracking(order) {

    let orders = [];


    try {

        orders =
            JSON.parse(
                localStorage.getItem(
                    "belipsaOrders"
                ) || "[]"
            );

    } catch (error) {

        console.error(
            "Could not read saved orders:",
            error
        );

        orders = [];

    }


    orders.push(order);


    localStorage.setItem(
        "belipsaOrders",
        JSON.stringify(orders)
    );

}


/* =========================================
   SEND ORDER EMAIL
========================================= */

async function sendOrderEmail(orderData) {

    if (
        !window.supabaseClient ||
        !window.supabaseClient.functions
    ) {

        console.error(
            "Supabase client is not available."
        );

        return {
            success: false,
            error: "Supabase client unavailable."
        };

    }


    try {

        const {
            data,
            error
        } =
            await window.supabaseClient.functions.invoke(
                "send-order-email",
                {
                    body: orderData
                }
            );


        if (error) {

            console.error(
                "Belipsa email error:",
                error
            );

            return {
                success: false,
                error: error
            };

        }


        console.log(
            "Belipsa order email sent:",
            data
        );


        return {
            success: true,
            data: data
        };

    } catch (error) {

        console.error(
            "Order email request failed:",
            error
        );

        return {
            success: false,
            error: error
        };

    }

}


/* =========================================
   SUBMIT ORDER
========================================= */

async function submitOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }


    const name =
        document.getElementById(
            "customer-name"
        ).value.trim();


    const phone =
        document.getElementById(
            "customer-phone"
        ).value.trim();


    const address =
        document.getElementById(
            "customer-address"
        ).value.trim();


    const reference =
        document.getElementById(
            "order-reference"
        ).textContent.trim();


    if (
        !name ||
        !phone ||
        !address
    ) {

        alert(
            "Please complete all your details."
        );

        return;
    }


    /* -----------------------------------------
       CALCULATE ORDER
    ----------------------------------------- */

    let total = 0;


    const orderItems =
        cart
            .map(item => {

                const product =
                    products[item.id];


                if (!product) {
                    return null;
                }


                const itemTotal =
                    product.price *
                    item.quantity;


                total += itemTotal;


                return {

                    productId:
                        item.id,

                    product:
                        product.name,

                    quantity:
                        item.quantity,

                    price:
                        product.price,

                    total:
                        itemTotal

                };

            })
            .filter(Boolean);


    /* -----------------------------------------
       CREATE ORDER
    ----------------------------------------- */

    const orderData = {

        reference:
            reference,

        customerName:
            name,

        phone:
            phone,

        address:
            address,

        total:
            total,

        items:
            orderItems,

        status:
            "Payment Pending",

        createdAt:
            new Date().toISOString()

    };


    console.log(
        "BELIPSA ORDER:",
        orderData
    );


    /* -----------------------------------------
       SAVE ORDER FOR TRACKING
    ----------------------------------------- */

    saveOrderForTracking(
        orderData
    );


    /* -----------------------------------------
       SEND EMAIL TO BELIPSA
    ----------------------------------------- */

    const emailResult =
        await sendOrderEmail(
            orderData
        );


    if (!emailResult.success) {

        console.warn(
            "Order saved, but email notification failed.",
            emailResult.error
        );

    }


    /* -----------------------------------------
       CLOSE CHECKOUT
    ----------------------------------------- */

    closeCheckout();


    /* -----------------------------------------
       SHOW SUCCESS
    ----------------------------------------- */

    showSuccess(
        reference,
        name
    );


    /* -----------------------------------------
       CLEAR CART
    ----------------------------------------- */

    cart = [];

    updateCart();


    /* -----------------------------------------
       RESET FORM
    ----------------------------------------- */

    const form =
        document.getElementById(
            "checkout-form"
        );


    if (form) {

        form.reset();

    }

}


/* =========================================
   SUCCESS MESSAGE
========================================= */

function showSuccess(
    reference,
    name
) {

    const modal =
        document.getElementById(
            "success-modal"
        );


    const message =
        document.getElementById(
            "success-message"
        );


    if (!modal || !message) {
        return;
    }


    message.innerHTML = `

        <p>
            Thank you,
            <strong>${name}</strong>.
        </p>

        <p style="margin-top:10px;">
            Your order has been received.
        </p>

        <p style="margin-top:15px;">

            <strong>
                Order Reference
            </strong>

            <br>

            <span>
                ${reference}
            </span>

        </p>

        <p style="margin-top:15px;">

            Keep this reference number
            to track your order.

        </p>

    `;


    modal.classList.add(
        "active"
    );

}


/* =========================================
   CLOSE SUCCESS
========================================= */

function closeSuccess() {

    const modal =
        document.getElementById(
            "success-modal"
        );


    if (modal) {

        modal.classList.remove(
            "active"
        );

    }

}


/* =========================================
   TRACK ORDER
========================================= */

function trackOrder(event) {

    event.preventDefault();


    const input =
        document.getElementById(
            "tracking-reference"
        );


    const result =
        document.getElementById(
            "tracking-result"
        );


    if (!input || !result) {
        return;
    }


    const reference =
        input.value
            .trim()
            .toUpperCase();


    if (!reference) {

        result.innerHTML = `

            <div class="tracking-error">

                <strong>
                    Enter your order reference.
                </strong>

            </div>

        `;

        return;
    }


    let orders = [];


    try {

        orders =
            JSON.parse(
                localStorage.getItem(
                    "belipsaOrders"
                ) || "[]"
            );

    } catch (error) {

        console.error(
            "Could not read orders:",
            error
        );

        orders = [];

    }


    const order =
        orders.find(
            item =>
                String(
                    item.reference
                )
                    .toUpperCase()
                === reference
        );


    if (!order) {

        result.innerHTML = `

            <div class="tracking-error">

                <strong>
                    Order not found
                </strong>

                <p>
                    We couldn't find an order
                    with reference
                    <strong>${reference}</strong>.
                </p>

                <p>
                    Please check your reference
                    and try again.
                </p>

            </div>

        `;

        return;
    }


    result.innerHTML = `

        <div class="tracking-success">

            <h3>
                Order Found
            </h3>

            <p class="tracking-reference">

                ${order.reference}

            </p>

            <div class="order-status">

                <span class="status-dot"></span>

                ${order.status}

            </div>

            <div class="tracking-details">

                <p>

                    <strong>
                        Customer
                    </strong>

                    <br>

                    ${order.customerName}

                </p>

                <p>

                    <strong>
                        Order Total
                    </strong>

                    <br>

                    ${formatMoney(order.total)}

                </p>

                <p>

                    <strong>
                        Order Date
                    </strong>

                    <br>

                    ${new Date(
                        order.createdAt
                    ).toLocaleDateString(
                        "en-NG"
                    )}

                </p>

            </div>

        </div>

    `;

}


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeEverything();

        }

    }
);


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCart();

        console.log(
            "Belipsa shopping system loaded."
        );

    }
);