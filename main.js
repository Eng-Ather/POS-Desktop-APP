import { app, BrowserWindow, ipcMain } from "electron";
import { usersCollection } from "./database/connect.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// signup user API 
ipcMain.on("signup-user", async (event, data) => {
  const existing = await usersCollection.findOne({ email: data.email });
  if (existing) {
    event.reply("signup-response", { success: false, msg: "Email exists" });
  } else {
    await usersCollection.insertOne(data);
    event.reply("signup-response", { success: true, msg: "User created" });
  }
});

// signin user API 
ipcMain.on("signin-user", async (event, data) => {
  const user = await usersCollection.findOne({ email: data.email });
  if (!user) {
    event.reply("signin-response", { success: false, msg: "Unauthorized exists" });
  } else {
    event.reply("signin-response", { success: true, msg: "Signin successfull", data: user });
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

function createAdminDashboardWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreenable: true
  });
  if (isDev) win.webContents.openDevTools()
  win.loadFile("./src/screens/dashboard/adminDashboard/index.html");
};

function createproduct() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreenable: true
  });
  if (isDev) win.webContents.openDevTools()
  win.loadFile("./src/screens/dashboard/adminDashboard/adminScreens/products/index.html");
};


function createreport() {
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
  if (isDev) win.webContents.openDevTools()
  win.loadFile("./src/screens/dashboard/adminDashboard/adminScreens/reports/index.html");
};


function createsales() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreenable: true
  });
  if (isDev) win.webContents.openDevTools()
  win.loadFile("./src/screens/dashboard/adminDashboard/adminScreens/sales/index.html");
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
