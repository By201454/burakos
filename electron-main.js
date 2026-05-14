const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Burak-OS",
    show: false,
    fullscreen: true,
    frame: false,
    autoHideMenuBar: true,
    backgroundColor: "#1f2230",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "burak-os.html"));

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.setFullScreen(true);
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  // Çıkış: Ctrl+Shift+Q (tam ekran çerçevesiz modda güvenli çıkış)
  globalShortcut.register("CommandOrControl+Shift+Q", () => {
    app.quit();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
