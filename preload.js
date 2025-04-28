// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  signUpUser: (data) => ipcRenderer.send("signup-user", data),
  receiveSignupResponse: (callback) =>
    ipcRenderer.on("signup-response", (event, data) => callback(data)),

  signinUser: (data) => ipcRenderer.send("signin-user", data),
  receiveSigninResponse: (callback) =>
    ipcRenderer.on("signin-response", (event, data) => callback(data)),


  signoutUser: () => ipcRenderer.send("signout-user"),
  receiveSignoutResponse: (callback) =>
    ipcRenderer.on("signout-response", (event, data) => callback(data)),
});
