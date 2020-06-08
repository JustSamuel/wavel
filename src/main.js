import path from "path";
import url from "url";
import env from "env";

import { devMenuTemplate } from "./menu/dev_menu_template";

import {app, BrowserWindow, Menu} from "electron";

let mainWindow;

// Electron 9 support
app.allowRendererProcessReuse = true;

// Save userData in different location if production or development.
if (env.name !== "production") {
    const userDataPath = app.getPath("userData");
    app.setPath("userData", `${userDataPath} (${env.name})`);
}

const setApplicationMenu = () => {
    const menus = [];
    if (env.name !== "production") {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

app.on('ready', () => {
    setApplicationMenu();

    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        frame: false,
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