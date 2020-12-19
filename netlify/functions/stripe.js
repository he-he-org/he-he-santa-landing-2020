const stripeLib = require('stripe');

function badRequest(message) {
  return {
    statusCode: 400,
    body: JSON.stringify({
      message,
    }),
  }
}

exports.handler = async function(event, context) {
  try {
    const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    const BASE_URL = process.env.URL;

    if (!SECRET_KEY) {
      throw new Error(`Unable to read secret key from env variable STRIPE_SECRET_KEY`)
    }
    if (!BASE_URL) {
      throw new Error(`Unable to site base url from env variable URL`)
    }

    const stripe = stripeLib(SECRET_KEY);

    const priceId = event.queryStringParameters.priceId;
    if (!priceId) {
      return badRequest(`Missing priceId query parameter`)
    }


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${BASE_URL}/success/`,
      cancel_url: `${BASE_URL}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id })
    };
  } catch (e) {
    console.error(e.message)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Unexpected error happened'
      }),
    }
  }
}
