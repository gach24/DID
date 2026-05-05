const { contextBridge } = require('electron');

/**
 * Puente seguro entre el proceso main (Node) y el renderer (Chromium).
 * De momento solo exponemos metadatos; cuando necesites IPC a\u00f1ade
 * `ipcRenderer.invoke(...)` envuelto aqu\u00ed.
 */
contextBridge.exposeInMainWorld('app', {
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
});
