"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let cached;
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
function flatPromise() {
    let resolve, reject;
    const res = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return [res, resolve, reject];
}
exports.flatPromise = flatPromise;
async function spawnElectronProcess() {
    if (cached) {
        return await cached;
    }
    const electronProcess = await child_process_1.spawn(require("electron"), [path_1.default.join(__dirname, "server.js")], {
        stdio: ["ipc", "inherit", "inherit"],
        env: process.env,
        detached: true
    });
    const [res, resolve, reject] = flatPromise();
    process.on("exit", e => {
        electronProcess.kill();
        reject(e);
    });
    electronProcess.on("message", message => {
        if (message.type === "ready") {
            resolve(electronProcess);
        }
    });
    cached = res;
    return res;
}
exports.spawnElectronProcess = spawnElectronProcess;
