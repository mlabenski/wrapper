//  An endpoint that calculates the order total and creates a 
// PaymentIntent on Stripe 

require("dotenv").config();

// eslint-disable-next-line one-var
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY),
headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
}


exports.handler = async (event, context) => {
  // CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers
    };
  }

  const data = JSON.parse(event.body);
  console.log(data);

  // Stripe payment processing begins here
  try {
    // Always calculate the order amount on your server to prevent customers
    // from manipulating the order amount from the client
    // Here we will use a simple json file to represent inventory
    // but you could replace this with a DB lookup
    const storeDatabase = {id: 'd436e98-1dc9-4f21-9587-76d4c0255e33', name: 'Premium Subscription', price: 9.99 }

    const amount = storeDatabase.price * 100;

    // Create a PaymentIntent on Stripe
    // A PaymentIntent represents your customer's intent to pay
    // and needs to be confirmed on the client to finalize the payment
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount,
      description: "Order from store"
    });

    // Send the client_secret to the client
    // The client secret has a limited set of permissions that
    // let you finalize the payment and update some details from the client
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret
      })
    };
  } catch (err) {
    console.log(err);

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: err
      })
    };
  }
};