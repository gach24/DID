const { app, BrowserWindow } = require('electron');
const path = require('node:path');

/**
 * Detectamos el entorno: en desarrollo `app.isPackaged` es false porque
 * estamos ejecutando `electron .` directamente; en producci\u00f3n el c\u00f3digo
 * vive dentro del .asar generado por electron-builder.
 */
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 720,
    minWidth: 480,
    minHeight: 480,
    title: 'Task App',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
