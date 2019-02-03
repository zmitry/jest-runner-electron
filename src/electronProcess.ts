import { spawnElectronProcess, flatPromise } from "./spawnWorker";
import { ChildProcess } from "child_process";

export class ElectronProcess {
  process: Promise<ChildProcess>;
  constructor() {
    this.process = spawnElectronProcess();
  }
  async runTest(test) {
    const pr = await this.process;
    const workerID = Date.now();

    pr.send({
      type: "run-test",
      payload: test,
      workerID
    });
    const [result, resolve, reject] = flatPromise();

    pr.on("message", msg => {
      if (msg.workerID !== workerID) {
        return;
      }
      if (msg.type === "test-results") {
        resolve(msg.payload);
      } else if (msg.type === "error") {
        reject(msg.error);
      }
    });
    return result;
  }

  kill = async () => {
    const p = await this.process;
    p.disconnect();
  };
}
