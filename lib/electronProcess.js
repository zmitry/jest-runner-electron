"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spawnWorker_1 = require("./spawnWorker");
class ElectronProcess {
    constructor() {
        this.kill = async () => {
            const p = await this.process;
            p.disconnect();
        };
        this.process = spawnWorker_1.spawnElectronProcess();
    }
    async runTest(test) {
        const pr = await this.process;
        const workerID = Date.now();
        pr.send({
            type: "run-test",
            payload: test,
            workerID
        });
        const [result, resolve, reject] = spawnWorker_1.flatPromise();
        pr.on("message", msg => {
            if (msg.workerID !== workerID) {
                return;
            }
            if (msg.type === "test-results") {
                resolve(msg.payload);
            }
            else if (msg.type === "error") {
                reject(msg.error);
            }
        });
        return result;
    }
}
exports.ElectronProcess = ElectronProcess;
