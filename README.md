# jest electron runner

This is custom runner and custom environment for jest electron runner.
What features it includes ?

- Running tests in electron renderer environnement
- Parallel tests execution
- Running tests in headless environnement
- Debugging tests with built in awaiters.

# how to install

see example folders for working example.

1. install jest and this lib
2. add set the following properties in config

```
{
  globals: {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: false,
    ELECTRON_DISABLE_SECURITY_WARNINGS: false
  },
  runner: "<TBD>/runner.js",
  testEnvironment: "<TBD>/env.js"
}
```

3. Optionally you can set ELECTRON_RUNNER_DEBUG if you wish to open dev tools and electron view
