// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  signinUser: (data) => ipcRenderer.send("signin-user", data),
  receiveSigninResponse: (callback) =>
    ipcRenderer.on("signin-response", (event, data) => callback(data)),

  signoutUser: () => ipcRenderer.send("signout-user"),
  receiveSignoutResponse: (callback) =>
    ipcRenderer.on("signout-response", (event, data) => callback(data)),

  addProduct: (data) => ipcRenderer.send("add-product", data),
  receiveproductResponse: (callback) =>
    ipcRenderer.on("add-product-response", (event, data) => callback(data)),

  addUser: (data) => ipcRenderer.send("add-user", data),
  receiveaddUserResponse: (callback) =>
    ipcRenderer.on("add-user-response", (event, data) => callback(data)),

  getProducts: () => ipcRenderer.invoke("get-products"),

});
