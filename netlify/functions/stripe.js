const stripeLib = require('stripe');

exports.handler = async function(event, context) {
  try {
    const SECRET_KEY = process.env.STRIPE_SECRET_KEY;

    if (!SECRET_KEY) {
      throw new Error(`Unable to read secret key from env variable STRIPE_SECRET_KEY`)
    }

    const stripe = stripeLib(SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: 'price_1I07m0Ijit1s7RiHMUeIwCl8',
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://secret-santa.he-he.org/success',
      cancel_url: 'https://secret-santa.he-he.org/cancel',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id, env: process.env })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    }
  }
}
