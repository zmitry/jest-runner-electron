import path from "path";
import { app, BrowserWindow } from "electron";

const { ELECTRON_RUNNER_DEBUG } = process.env;
function runTests(msg) {
  let runner = new BrowserWindow({
    title: "Jest",
    show: !!ELECTRON_RUNNER_DEBUG,
    webPreferences: {
      nodeIntegration: true
    },
    width: 1200,
    height: 800
  });
  function open() {
    runner.loadURL(`file://${path.join(__dirname, "..", "index.html")}`);
  }
  if (ELECTRON_RUNNER_DEBUG) {
    runner.webContents.toggleDevTools();
    runner.webContents.on("devtools-opened", () => {
      open();
    });
  } else {
    open();
  }

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
