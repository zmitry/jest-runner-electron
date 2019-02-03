"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
function runTests(msg) {
    let runner = new electron_1.BrowserWindow({
        title: "Jest",
        show: true,
        webPreferences: {
            nodeIntegration: true
        },
        width: 1200,
        height: 800
    });
    runner.webContents.toggleDevTools();
    runner.loadURL(`file://${path_1.default.resolve("./index.html")}`);
    runner.webContents.on("did-finish-load", () => {
        runner.webContents.send("run", msg);
    });
}
function run() {
    new electron_1.BrowserWindow({
        title: "Jest",
        show: false,
        webPreferences: {
            nodeIntegration: true
        },
        width: 1200,
        height: 800
    });
    process.on("message", msg => {
        if (msg.type === "run-test") {
            runTests(msg);
        }
    });
    process.send({ type: "ready" });
}
process.on("exit", () => {
    electron_1.app.quit();
});
electron_1.app.on("ready", run);
electron_1.app.on("window-all-closed", function () {
    electron_1.app.quit();
    process.send({ type: "error", data: "closed" });
});
process.on("disconnect", () => {
    electron_1.app.quit();
    process.exit(0);
});
