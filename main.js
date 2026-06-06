const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 1000,
    minHeight: 650,
    title: 'سامانه سمن جوانرود',
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    backgroundColor: '#f4f7fb',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webSecurity: true
    }
  });

  Menu.setApplicationMenu(null);
  mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.executeJavaScript(`
      try { if (typeof openArea === 'function') openArea('admin'); } catch(e) { console.error(e); }
    `).catch(() => {});
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  mainWindow.webContents.session.on('will-download', (event, item) => {
    const downloadsDir = path.join(app.getPath('downloads'), 'JavanroodNGO');
    if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });
    const savePath = path.join(downloadsDir, item.getFilename());
    item.setSavePath(savePath);
    item.once('done', (e, state) => {
      if (state === 'completed') {
        dialog.showMessageBox(mainWindow, {
          type: 'info',
          title: 'دانلود انجام شد',
          message: 'فایل با موفقیت ذخیره شد.',
          detail: savePath,
          buttons: ['باشه']
        });
      }
    });
  });
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