let cached;

import path from "path";
import { spawn } from "child_process";

export function flatPromise<T>(): [
  Promise<T>,
  (a?: T) => void,
  (a?: any) => void
] {
  let resolve, reject;
  const res = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return [res, resolve, reject];
}

export async function spawnElectronProcess() {
  if (cached) {
    return await cached;
  }

  const electronProcess = await spawn(
    require("electron") as any,
    [path.join(__dirname, "server.js")],
    {
      stdio: ["ipc", "inherit", "inherit"],
      env: process.env,
      detached: true
    }
  );
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
