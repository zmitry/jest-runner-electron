import { ElectronProcess } from "./electronProcess";
import prlimit from "promise-limit";

export default class ElectronTestRunner {
  _globalConfig: any;
  constructor(globalConfig) {
    this._globalConfig = globalConfig;
  }

  runTests(tests, watcher, onStart, onResult, onFailure, options) {
    const isWatch = this._globalConfig.watch || this._globalConfig.watchAll;
    const concurrency = isWatch
      ? 1
      : Math.min(tests.length, this._globalConfig.maxWorkers);

    const limit = prlimit(concurrency);
    const elProc = new ElectronProcess();
    return limit
      .map(tests, async (test: any) => {
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
          .then(async result => {
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

class CancelRun extends Error {}
