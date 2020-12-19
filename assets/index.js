import * as params from '@params';

function $(selector) {
  const result = [];
  document.querySelectorAll(selector).forEach((element) => {
    result.push(element);
  });
  return result
}

let STRIPE_PRICE_ID = null;

const donateButtonEl = $('#donateButton')[0];

const allAmountsButtons = $('#amounts button');
const onClickAmount = (e) => {
  const amount = e.currentTarget.getAttribute('data-value')
  STRIPE_PRICE_ID = e.currentTarget.getAttribute('data-stripe-price')
  for (const el of allAmountsButtons) {
    el.classList.toggle('isActive', el === e.currentTarget);
  }
  for (const detailsEl of $('#details .amount-details')) {
    if (detailsEl.getAttribute('data-value') === amount) {
      detailsEl.classList.add('isVisible')
    } else {
      detailsEl.classList.remove('isVisible')
    }
  }
  donateButtonEl.classList.add('isVisible')
};
for (const element of allAmountsButtons) {
  element.addEventListener('click', onClickAmount)
}

/**
 Stripe
 */
const STRIPE_PUBLISHABLE_KEY = params.STRIPE_PUBLISHABLE_KEY;

// initialize Stripe using your publishable key
const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

// find the button and error message elements
const checkoutButton = document.getElementById('donateButton');
const errorMessage = document.getElementById('errorMessage');

// on click, send the user to Stripe Checkout to process the donation
checkoutButton.addEventListener('click', () => {
  if (STRIPE_PRICE_ID == null) {
    console.error(`Price is not selected, unable to make a payment`)
    return;
  }
  stripe
    .redirectToCheckout({
      lineItems: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      mode: 'payment',
      successUrl: `${window.location.origin}/success/`,
      cancelUrl: window.location.origin,
    })
    .then(function (result) {
      if (result.error) {
        errorMessage.textContent = result.error.message;
      }
    })
    .catch((e) => {
      errorMessage.textContent = 'Извините, что-то пошло не так :('
      throw e;
    });
});