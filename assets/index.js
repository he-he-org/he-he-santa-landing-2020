
function $(selector) {
  const result = [];
  document.querySelectorAll(selector).forEach((element) => {
    result.push(element);
  });
  return result
}

const donateButtonEl = $('#donateButton')[0];

const allAmountsButtons = $('#amounts button');
const onClickAmount = (e) => {
  const amount = e.currentTarget.getAttribute("data-value")
  for (const el of allAmountsButtons) {
    el.classList.toggle("isActive", el === e.currentTarget);
  }
  for (const detailsEl of $('#details .amount-details')) {
    if (detailsEl.getAttribute("data-value") === amount) {
      detailsEl.classList.add("isVisible")
    } else {
      detailsEl.classList.remove("isVisible")
    }
  }
  donateButtonEl.classList.add('isVisible')
};
for (const element of allAmountsButtons) {
  element.addEventListener('click', onClickAmount)
}
