import { app, BrowserWindow } from "electron";

const isDev = process.env.NODE_ENV !== "development"


function createMainWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreenable: true
  });
  if (isDev) win.webContents.openDevTools()
  win.loadFile("./src/index.html");
};


function createSalesmanDashboardWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreenable: true
  });
  if (isDev) win.webContents.openDevTools()
  win.loadFile("./src/screens/salesmanDashboard/index.html");
};


app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });

});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// console.log("Hello to Electron.js");