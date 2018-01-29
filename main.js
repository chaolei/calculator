'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

var mainWindow = null;
var settingsWindow = null;

app.on('ready', function() {

    mainWindow = new BrowserWindow({
        frame: true,
        height: 290,
        resizable: false,
        width: 228
    });

    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
    mainWindow.webContents.openDevTools();
});

ipc.on('close-main-window', function () {
    app.quit();
});

ipc.on('open-settings-window', function () {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 200,
        resizable: false,
        width: 200
    });

    settingsWindow.loadUrl('file://' + __dirname + '/app/settings.html');

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
});

ipc.on('close-settings-window', function () {
    if (settingsWindow) {
        settingsWindow.close();
    }
});
