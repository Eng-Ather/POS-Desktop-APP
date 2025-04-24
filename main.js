import { app, BrowserWindow, ipcMain } from "electron";
import { usersCollection } from "./database/connect.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

ipcMain.on("signup-user", async (event, data) => {
  const existing = await usersCollection.findOne({ email: data.email });
  if (existing) {
    event.reply("signup-response", { success: false, msg: "Email exists" });
  } else {
    await usersCollection.insertOne(data);
    event.reply("signup-response", { success: true, msg: "User created" });
  }
});

const isDev = process.env.NODE_ENV !== "development";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createMainWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreenable: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
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
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
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
