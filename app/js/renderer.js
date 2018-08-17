const { ipcRenderer } =  require('electron');
const timer = require('./timer');
const data = require('../../data');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay =  document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');
let botaoAdicionar = document.querySelector('.botao-adicionar');
let campoAdicionar = document.querySelector('.campo-adicionar');

window.onload = () =>{
  data.pegaDados(curso.textContent)
    .then((dados) => {
      console.log(dados);
      tempo.textContent = dados.tempo;
    });
}

linkSobre.addEventListener('click' , function (){
  ipcRenderer.send('abrir-janela-sobre');
});

let play = false;
let imgs = ['img/play-button.svg','img/stop-button.svg'];
botaoPlay.addEventListener('click' , function (){
  if (play) {
    timer.parar(curso.textContent);
    play = false;
    new Notification('Alura Timer',{
      body: `O curso ${curso.textContent} parado!!`,
      icon: 'img/stop-button.png'
    });
  } else {
    timer.iniciar(tempo);
    play = true;
    new Notification('Alura Timer',{
      body: `O curso ${curso.textContent} iniciado!!`,
      icon: 'img/play-button.png'
    });
  }
  imgs = imgs.reverse();
  botaoPlay.src = imgs[0];
});

ipcRenderer.on('curso-trocado',(event,nomeCurso) => {
  timer.parar(curso.textContent);
  data.pegaDados(nomeCurso)
      .then((dados) => {
        tempo.textContent = dados.tempo;
      }).catch((error) => {
        console.log('O curso ainda nao possui um JSON');
        tempo.textContent = "00:00:00";
      })
  curso.textContent = nomeCurso;
});

botaoAdicionar.addEventListener('click', function() {
    if(campoAdicionar.value == ''){
        console.log('Não posso adicionar um curso com nome vazio');
        return;
    }
      let novoCurso = campoAdicionar.value;
      curso.textContent = novoCurso;
      tempo.textContent = '00:00:00';
      campoAdicionar.value = '';
      ipcRenderer.send('curso-adicionado', novoCurso);
});

ipcRenderer.on('atalho-iniciar-parar',() => {
    let click = new MouseEvent('click');
    botaoPlay.dispatchEvent(click);
});
// let message = {
//   title:'Ramon',
//   message: 'Iniciou<br>',
//   detail: 'Iniciiiou<br>',
//   width: 440,
//   timeout: 6000,
//   focus: true
// };
//
// ipcRenderer.send('electron-toaster-message',message); // Notificação
