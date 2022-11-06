import './style.css';
import { setupDALL_E } from './davinci.js';

document.querySelector('#app').innerHTML = `
  <div>
    <div class="card dalle-card"></div>
  </div>
`;
setupDALL_E(document.querySelector('.dalle-card'));
