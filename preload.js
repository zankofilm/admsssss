const { contextBridge } = require('electron');
contextBridge.exposeInMainWorld('JavanroodDesktop', { platform: process.platform, version: 'V57-Windows-Admin' });
