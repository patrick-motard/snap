var Promise = require('bluebird');
import { app, BrowserWindow } from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) enableLiveReload();

const createWindow = async () => {

    var sr = require('screenres'),
        screenHeight = sr.get()[1],
        screenWidth = sr.get()[0],
        appHeight = Math.round(screenHeight / 11),
        appWidth = screenWidth,
        yOffset = screenHeight - appHeight;
    console.log(appHeight);
    console.log(yOffset);

    // Create the browser window.
    mainWindow = new BrowserWindow({
        x: 0,
        y: yOffset,
        height: appHeight,
        width: appWidth,
        border: false,
        transparent: true,
        frame: false,
        toolbar: false
    });

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    // Open the DevTools.
    if (isDevMode) {
        await installExtension(VUEJS_DEVTOOLS);
        // mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    await Promise.delay(10); // transparency workaround
    await createWindow();
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});


app.on('web-contents-created', (event, wc) => {
    wc.on('before-input-event', (event, input) => {
        console.log(input);
    })
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
