"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const electron_1 = require("electron");
const jest_runtime_1 = __importDefault(require("jest-runtime"));
const runTest_1 = __importDefault(require("jest-runner/build/runTest"));
window.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
    supportsFiber: true,
    inject: function () { },
    onCommitFiberRoot: function () { },
    onCommitFiberUnmount: function () { }
};
async function makeResolver(config, globalConfig) {
    const moduleMap = await jest_runtime_1.default.createHasteMap(config, {
        maxWorkers: os_1.default.cpus().length - 1,
        watchman: globalConfig.watchman
    }).readModuleMap();
    return jest_runtime_1.default.createResolver(config, moduleMap);
}
electron_1.ipcRenderer.on("run", async (_, { payload: { file, config, globalConfig }, workerID }) => {
    const resolver = await makeResolver(config, globalConfig);
    try {
        console.log(file, globalConfig, config);
        const results = await runTest_1.default(file, globalConfig, config, resolver);
        sendResults(results, workerID);
    }
    catch (e) {
        sendError(e.message + ":\n" + e.stack, workerID);
    }
    window.close();
});
function ResultAction(payload, workerID) {
    return { type: "test-results", payload, workerID };
}
function ErrorAction(error, workerID) {
    return { type: "error", error, workerID };
}
const proc = electron_1.remote.process;
function sendResults(results, workerID) {
    proc.send(ResultAction(results, workerID));
}
function sendError(results, workerID) {
    proc.send(ErrorAction(results, workerID));
}
//# sourceMappingURL=client.js.map