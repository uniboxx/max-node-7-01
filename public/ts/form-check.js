const formEl = document.querySelector('form');
const inputEls = document.querySelectorAll('input');
const textareaEls = document.querySelectorAll('textarea');
const btnEl = document.querySelector('form button');

const allInputs = Array.from([...inputEls, ...textareaEls]);

const ids = allInputs.map((input) => input.id);

function checkFieldValidity(inputEl, init = false) {
  const value = inputEl.value;
  let isValid = value && !value.match(/<\/?script>/);
  let style;
  if (init) {
    style = `${isValid ? '2px solid green' : '1px solid gray'}`;
  } else {
    style = `2px solid ${isValid ? 'green' : 'red'}`;
  }
  inputEl.style.borderBottom = style;

  if (isValid) {
    validItems[inputEl.id] = true;
  } else {
    validItems[inputEl.id] = false;
  }

  if (Object.values(validItems).every((item) => item === true)) {
    btnEl.removeAttribute('disabled');
  } else {
    btnEl.setAttribute('disabled', 'false');
  }
}

let validItems = {};
ids.forEach((id) => (validItems[id] = false));

allInputs.forEach((inputEl) => checkFieldValidity(inputEl, true));

allInputs.forEach((inputEl) => {
  inputEl.addEventListener('input', function () {
    checkFieldValidity(this);
  });
});

formEl?.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this));

  try {
    const params = new URLSearchParams(document.location.search);
    const edit = params.get('edit');
    const url = `/admin/${edit ? 'edit' : 'add'}-product`;
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    fetch(url, options).then((err) => {
      window.location.href = '/products';
    });
  } catch (err) {
    console.log(err.message);
  }
});
