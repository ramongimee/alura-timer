const { app, BrowserWindow , ipcMain , Tray , Menu , globalShortcut } = require('electron');
const data = require('./data');
const templateGenerator = require('./template');
// let Toaster  = require('electron-toaster');
// let toaster = new Toaster(); // notificação
// const { BrowserWindow } = require('electron');

let mainWindow = null;
let tray = null;

// browserWindow.setMenu(null);

app.on('ready', () => {
  console.log("Aplicação Iniciada");
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
  });

  // toaster.init(mainWindow);//notificação
  // mainWindow.setMenu(null);

  tray = new Tray(__dirname + '/app/img/icon-tray.png');
  let template = templateGenerator.geraTrayTemplate(mainWindow);
  let trayMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(trayMenu);

  let templateMenu = templateGenerator.geraMenuPrincipalTemplate(app);
  let menuPrincipal = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menuPrincipal);

  globalShortcut.register('CmdOrCtrl+Shift+S',() => {
    mainWindow.send('atalho-iniciar-parar');
  });

  // mainWindow.openDevTools();
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);

});

  app.on('window-all-closed', () => {
      app.quit();
  });

  let sobreWindow = null;
  ipcMain.on('abrir-janela-sobre', () => {

    if (sobreWindow == null) {
          sobreWindow = new BrowserWindow({
          width: 300,
          height: 220,
          alwaysOnTop: true,
          frame: false
          // backgroundColor: '#2e2c29',
        });

        sobreWindow.on('closed' , () => {
            sobreWindow = null;
        });
    }

     sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);

  });

  ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close();
  });

  ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
    console.log(`O curso ${curso} foi estudado por ${tempoEstudado}`);
    data.salvaDados(curso,tempoEstudado);
  });

  ipcMain.on('curso-adicionado',(event,novoCurso) => {
    let novoTemplate = templateGenerator.adicionaCursoNoTray(novoCurso,mainWindow);
    let novotrayMenu = Menu.buildFromTemplate(novoTemplate);
    tray.setContextMenu(novotrayMenu);
  })

//   ipcMain.on('electron-toaster-reply', (event, isAuto) => {
//     console.log('Toaster just spoke to me', isAuto);
// })// notificação
