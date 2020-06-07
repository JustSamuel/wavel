import path from "path";
import url from "url";
import { app, BrowserWindow } from "electron";
let mainWindow;

// Electron 9 support
app.allowRendererProcessReuse = true;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(
        url.format({
                pathname: path.join(__dirname, "index.html"),
                protocol: "file:",
                slashes: true,
            }
        )
    )
});