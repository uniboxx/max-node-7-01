const quantityEls = document.querySelectorAll('.quantity');
const subtractBtns = document.querySelectorAll('.subtract');
const addBtns = document.querySelectorAll('.add');
const totalPriceEl = document.getElementById('totalPrice');
const totalPartialEls = document.querySelectorAll('.totalPartial');

let totalPrice = +totalPriceEl.textContent;

const quantities = Array.from(quantityEls).map(
  (item) => +item.dataset.quantity
);
const partials = Array.from(totalPartialEls).map((item) => +item.textContent);

async function updateCart(idx, operand) {
  const productId = quantityEls[idx].dataset.id;
  const productPrice = +quantityEls[idx].dataset.productPrice;
  let url;
  if (operand === '-') {
    quantities[idx]--;
    url = `/cart-${quantities[idx] > 0 ? 'subtract' : 'delete-product'}`;
    totalPrice -= productPrice;
  } else {
    quantities[idx]++;
    url = '/cart-addition';
    totalPrice += productPrice;
  }

  const data = { productId, productPrice };
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(url, options);
  if (operand === '-' && quantities[idx] === 0) {
    window.location.href = '/cart';
  } else {
    quantityEls[idx].textContent = quantities[idx];
    partials[idx] = Number(quantities[idx] * productPrice).toFixed(2);
    totalPartialEls[idx].textContent = partials[idx];
    totalPriceEl.textContent = Number(totalPrice).toFixed(2);
  }
}

subtractBtns.forEach((btn, idx) => {
  btn.addEventListener('click', function (e) {
    updateCart(idx, '-');
  });
});

addBtns.forEach((btn, idx) => {
  btn.addEventListener('click', function (e) {
    updateCart(idx, '+');
  });
});
