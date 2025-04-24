// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  signUpUser: (data) => ipcRenderer.send("signup-user", data),
  receiveSignupResponse: (callback) =>
    ipcRenderer.on("signup-response", (event, data) => callback(data)),
});
