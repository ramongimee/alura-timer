const { ipcRenderer , shell } = require('electron');
const process = require('process');

let linkFechar = document.querySelector("#link-fechar");
let linkSite = document.querySelector("#link-site");
let versaoElectron = document.querySelector('#versao-electron');

window.onload = function(){
    versaoElectron.textContent = process.versions.electron;
}

linkFechar.addEventListener('click', function () {
    ipcRenderer.send('fechar-janela-sobre');
});

linkSite.addEventListener('click', function () {
  shell.openExternal("http://www.ramongimenes.com.br");
});
