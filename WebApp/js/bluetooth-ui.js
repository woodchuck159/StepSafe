import { connectToHM10, sendCommand } from './bluetooth.js';
// add event listeners for button
document.getElementById('connect').addEventListener('click', ()=> connectToHM10());
document.getElementById('onBtn').addEventListener('click', ()=> sendCommand("ON"));
document.getElementById('offBtn').addEventListener('click', ()=> sendCommand('OFF'));