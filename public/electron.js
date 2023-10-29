const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { LOG_OUT, SUCCESS_LOGOUT } = require("../src/utils/constants");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  win.on("close", async (e) => {
    e.preventDefault();

    win.webContents.send(LOG_OUT, "close");
  });
}

ipcMain.on(SUCCESS_LOGOUT, (event, arg) => {
  if (arg === "Success") {
    win.destroy();
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", (e) => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
