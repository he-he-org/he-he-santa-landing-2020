exports.handler = async function(event, context) {
  const SECRET_KEY = process.env.STRIPE_SECRET_KEY;

  if (!SECRET_KEY) {
    throw new Error(`Unable to read secret key from env variable STRIPE_SECRET_KEY`)
  }

  const stripe = require('stripe')(SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: 'price_1I07m0Ijit1s7RiHMUeIwCl8',
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: 'https://secret-santa.he-he.org/success',
    cancel_url: 'https://secret-santa.he-he.org/cancel',
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ id: session.id })
  };
}
