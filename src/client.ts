import os from "os";
import { ipcRenderer, remote } from "electron";
import Runtime from "jest-runtime";
import runTest from "jest-runner/build/runTest";

declare const window: any;
window.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
  supportsFiber: true,
  inject: function() {},
  onCommitFiberRoot: function() {},
  onCommitFiberUnmount: function() {}
};

async function makeResolver(config, globalConfig) {
  const moduleMap = await Runtime.createHasteMap(config, {
    maxWorkers: os.cpus().length - 1,
    watchman: globalConfig.watchman
  }).readModuleMap();
  return Runtime.createResolver(config, moduleMap);
}

ipcRenderer.on(
  "run",
  async (_, { payload: { file, config, globalConfig }, workerID }) => {
    const resolver = await makeResolver(config, globalConfig);
    try {
      const results = await runTest(file, globalConfig, config, resolver);
      sendResults(results, workerID);
    } catch (e) {
      sendError(e.error, workerID);
    }
    window.close();
  }
);

function ResultAction(payload, workerID) {
  return { type: "test-results", payload, workerID };
}
function ErrorAction(error, workerID) {
  return { type: "error", error, workerID };
}

const proc: NodeJS.Process = remote.process;

function sendResults(results, workerID) {
  proc.send(ResultAction(results, workerID));
}
function sendError(results, workerID) {
  proc.send(ErrorAction(results, workerID));
}
