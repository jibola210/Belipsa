const publicKey = "pk_test_8e9e130faa96fc0f09334ea20bc9c20e22ee5d97"; // replace with your Paystack public key

function payWithPaystack(product, amount) {

  // generate a temporary email automatically
  const tempEmail =
    "customer" + Date.now() + "@belipsa.com";

  let handler = PaystackPop.setup({
    key: publicKey,

    email: tempEmail,

    amount: amount * 100, // Paystack uses kobo

    currency: "NGN",

    metadata: {
      custom_fields: [
        {
          display_name: "Product",
          variable_name: "product",
          value: product
        }
      ]
    },

    callback: function(response) {
      alert("Payment successful!");
      console.log("Reference:", response.reference);
    },

    onClose: function() {
      console.log("Transaction cancelled");
    }
  });

  handler.openIframe();
}