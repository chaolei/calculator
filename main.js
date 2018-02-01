'use strict';

let app = require('app');
let BrowserWindow = require('browser-window');

let mainWindow = null;
let aboutWindow = null;
let ipc = require('ipc');
app.on('ready', function() {

    mainWindow = new BrowserWindow({
        title: '计算器',
        frame: true,
        height: 298,
        resizable: false,
        width: 228
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

    mainWindow.on('closed', function () {
        aboutWindow = null;
        mainWindow = null;
    });
    //mainWindow.webContents.openDevTools();
});

ipc.on('open-about-window', function () {
    if (aboutWindow) {
        return;
    }

    aboutWindow = new BrowserWindow({
        frame: true,
        title: '关于计算器',
        height: 200,
        resizable: false,
        width: 300
    });

    aboutWindow.loadUrl('file://' + __dirname + '/app/about.html');

    aboutWindow.on('closed', function () {
        aboutWindow = null;
    });
});