# jest electron runner

```
yarn add jest-runner-electron
```

This is custom runner and custom environment for jest electron runner.
What features it includes ?

- Running tests in electron renderer environnement
- Parallel tests execution
- Running tests in headless environnement
- Debugging tests with built in awaiters.
  [link to debugging example](https://www.useloom.com/share/0b70eb13f12d4350b456ec5e3a0c9f06)

# how to setup

see example folder for working solution.

1. install jest and jest-runner-electron
2. add the following properties in the config

```
{
  runner: "jest-runner-electron/lib/runner.js",
  testEnvironment: "jest-runner-electron/lib/env.js"
}
```

3. Optionally you can set ELECTRON_RUNNER_DEBUG=true if you wish to open dev tools and have debug breakpoints working

# How to debug

This lib has builtin helpers for debugging tests.

1. set env variable ELECTRON_RUNNER_DEBUG=true
2. set stop point using `await jestUtil.debug()` yeah you have to await it.
3. run jest with --runInBand parameter

## notes

optionally you can set to your config to remove some warnings

```
  globals: {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: false,
    ELECTRON_DISABLE_SECURITY_WARNINGS: false
  },

```
