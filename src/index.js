// SCSS
import './scss/main.scss';
import axios from 'axios';
import html from './js/html-gen';

const BASE_URI = 'http://localhost:4000';
const wrapEl = document.querySelector('#content');

window.addEventListener('message', function (event) {
  const { data } = event;

  if (data.show) {
    const index = html.processJson(JSON.parse(data.json));
    wrapEl.innerHTML = '';
    wrapEl.appendChild(index);
  }

  if (data.hide) {
    wrapEl.innerHTML = '';
  }
});

function initDebug() {
  wrapEl.innerHTML = '';

  axios
    .get(`${BASE_URI}/db`)
    .then((res) => {
      const event = new CustomEvent('message');
      event.data = { show: true, json: JSON.stringify(res.data) };
      window.dispatchEvent(event);
    })
    .catch((err) => {
      console.log(err);
    });
}

initDebug();
