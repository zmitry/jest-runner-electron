"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electronProcess_1 = require("./electronProcess");
const promise_limit_1 = __importDefault(require("promise-limit"));
class ElectronTestRunner {
    constructor(globalConfig) {
        this._globalConfig = globalConfig;
    }
    runTests(tests, watcher, onStart, onResult, onFailure, options) {
        const isWatch = this._globalConfig.watch || this._globalConfig.watchAll;
        const concurrency = isWatch
            ? 1
            : Math.min(tests.length, this._globalConfig.maxWorkers);
        const limit = promise_limit_1.default(concurrency);
        const elProc = new electronProcess_1.ElectronProcess();
        return limit
            .map(tests, async (test) => {
            if (watcher.isInterrupted()) {
                throw new CancelRun();
            }
            onStart(test);
            return await elProc
                .runTest({
                file: test.path,
                globalConfig: this._globalConfig,
                config: test.context.config
            })
                .then(async (result) => {
                return await onResult(test, result);
            })
                .catch(error => {
                onFailure(test, error);
                throw error;
            });
        })
            .then(el => {
            elProc.kill();
        });
    }
}
exports.default = ElectronTestRunner;
class CancelRun extends Error {
}
//# sourceMappingURL=runnerJest.js.map