import path from "path";
import { app, BrowserWindow } from "electron";

function runTests(msg) {
  let runner = new BrowserWindow({
    title: "Jest",
    show: true,
    webPreferences: {
      nodeIntegration: true
    },
    width: 1200,
    height: 800
  });
  runner.webContents.toggleDevTools();
  runner.loadURL(`file://${path.resolve("./index.html")}`);

  runner.webContents.on("did-finish-load", () => {
    runner.webContents.send("run", msg);
  });
}

function run() {
  new BrowserWindow({
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
  app.quit();
});

app.on("ready", run);
app.on("window-all-closed", function() {
  app.quit();
  process.send({ type: "error", data: "closed" });
});

process.on("disconnect", () => {
  app.quit();
  process.exit(0);
});
