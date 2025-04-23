import { app, BrowserWindow } from "electron";
import { MongoClient } from "mongodb"

const isDev = process.env.NODE_ENV !== "development";

function createMainWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreenable: true,
    webPreferences: {
      nodeIntegration: true, // Security recommendation
      contextIsolation: false,
    },
  });
  if (isDev) win.webContents.openDevTools();
  win.loadFile("./src/index.html");
}

function createSalesmanDashboardWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreenable: true,
    webPreferences: {
      nodeIntegration: true, // Security recommendation
      contextIsolation: false,
    },
  });
  if (isDev) win.webContents.openDevTools();
  win.loadFile("./src/screens/salesmanDashboard/index.html");
}

app.whenReady().then(() => {
  createMainWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
