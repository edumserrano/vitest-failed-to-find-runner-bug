# vitest-bug-failed-to-find-runner

- [Intro](#intro)
- [Bug Description](#bug-description)
- [Environment](#environment)
- [Steps to Reproduce](#steps-to-reproduce)
- [Expected Behavior](#expected-behavior)
- [Actual Behavior](#actual-behavior)

## Intro

Minimal reproduction repository for a Vitest bug that occurs when debugging tests using the [Vitest VS Code extension](https://marketplace.visualstudio.com/items?itemName=vitest.explorer).

Opened bug report [Vitest failed to find the runner #9144](https://github.com/vitest-dev/vitest/issues/9144).

## Bug Description

When attempting to debug a test using the Vitest VS Code extension, the following error is thrown:

> Error: Vitest failed to find the runner. This is a bug in Vitest. Please, open an issue with reproduction.

## Environment

- **Vitest**: v4.0.14
- **Vitest VS Code Extension**: v1.34.0
- **Node.js**: v24.11.1
- **Visual Studio Code**
  ```text
  Version: 1.106.3 (user setup)
  Commit: bf9252a2fb45be6893dd8870c0bf37e2e1766d61
  Date: 2025-11-25T22:28:18.024Z
  Electron: 37.7.0
  ElectronBuildId: 12781156
  Chromium: 138.0.7204.251
  Node.js: 22.20.0
  V8: 13.8.258.32-electron.0
  OS: Windows_NT x64 10.0.26200
  ```

## Steps to Reproduce

1. Clone this repository
2. Install dependencies: `npm install`
3. Open the project in VS Code with the Vitest extension installed
4. Try to **debug** the test using the Vitest extension
5. Observe the error in the Vitest extension output

## Expected Behavior

The test should run successfully in debug mode.

## Actual Behavior

The test fails with:

```text
Error: Vitest failed to find the runner. This is a bug in Vitest. Please, open an issue with reproduction.
    at assert (file:///Z:/repos/github-personal/vitest-failed-to-find-runner-bug/node_modules/@vitest/runner/dist/index.js:683:9)
    at getRunner (file:///Z:/repos/github-personal/vitest-failed-to-find-runner-bug/node_modules/@vitest/runner/dist/index.js:691:2)
    ...
```

Full vitest VSCode output log:

```text
[INFO 5:39:51 PM] [v0.0.0] Vitest extension is activated because Vitest is installed or there is a Vite/Vitest config file in the workspace.
[INFO 5:39:51 PM] [API] Resolving configs: vitest-failed-to-find-runner-bug/vitest.config.ts
[INFO 5:39:52 PM] [API] Running Vitest v4.0.14 (vitest-failed-to-find-runner-bug/vitest.config.ts) with "C:\Program Files\nodejs\node.EXE C:/Users/eduar/.vscode/extensions/vitest.explorer-1.34.0/dist/worker.js"
[INFO 5:39:52 PM] [API] Watching vitest.config.ts
[INFO 5:39:52 PM] [VSCODE] Watching vitest-failed-to-find-runner-bug with pattern **/*
[5:39:54 PM] [VSCODE] Ignoring file: .git\FETCH_HEAD
[5:39:55 PM] [VSCODE] Ignoring file: .git\FETCH_HEAD
[5:39:55 PM] [VSCODE] Ignoring file: .git\logs\refs\remotes\origin\HEAD
[5:39:55 PM] [VSCODE] Ignoring file: .git\refs\remotes\origin\HEAD
[INFO 5:39:57 PM] [API] Collecting tests: tests/auth-command-cli.test.ts
[INFO 5:39:58 PM] [DEBUG] Starting debugging session C:\Program Files\nodejs\node.EXE
[INFO 5:39:59 PM] [DEBUG] Debugging started
[INFO 5:39:59 PM] Running 1 file(s) with name pattern: ^\s?auth command help text \(useOptionAlias: .+?\)$
[5:39:59 PM] Starting a test run because tests/auth-command-cli.test.ts triggered a watch rerun event
[INFO 5:39:59 PM] [Worker] Debugger attached.
[Error 5:40:00 PM] Error in Z:/repos/github-personal/vitest-failed-to-find-runner-bug/tests/auth-command-cli.test.ts Error: Vitest failed to find the runner. This is a bug in Vitest. Please, open an issue with reproduction.
    at assert (file:///Z:/repos/github-personal/vitest-failed-to-find-runner-bug/node_modules/@vitest/runner/dist/index.js:683:9)
    at getRunner (file:///Z:/repos/github-personal/vitest-failed-to-find-runner-bug/node_modules/@vitest/runner/dist/index.js:691:2)
    at afterEach (file:///Z:/repos/github-personal/vitest-failed-to-find-runner-bug/node_modules/@vitest/runner/dist/index.js:488:17)
    at Z:/repos/github-personal/vitest-failed-to-find-runner-bug/tests/auth-command-cli.test.ts:5:1
    at processTicksAndRejections (node:internal/process/task_queues:103:5)
    at VitestModuleEvaluator._runInlinedModule (file:///z:/repos/github-personal/vitest-failed-to-find-runner-bug/node_modules/vitest/dist/module-evaluator.js:190:4)
    at VitestModuleRunner.directRequest (file:///z:/repos/github-personal/vitest-failed-to-find-runner-bug/node_modules/vite/dist/node/module-runner.js:1146:59)
    at VitestModuleRunner.cachedRequest (file:///z:/repos/github-personal/vitest-failed-to-find-runner-bug/node_modules/vite/dist/node/module-runner.js:1053:73)
    at VitestModuleRunner.import (file:///z:/repos/github-personal/vitest-failed-to-find-runner-bug/node_modules/vite/dist/node/module-runner.js:1014:10)
    at file:///z:/repos/github-personal/vitest-failed-to-find-runner-bug/node_modules/@vitest/runner/dist/index.js:1386:5
[5:40:00 PM] Marking "auth-command-cli.test.ts" as failed with 1 errors
[5:40:00 PM] Marking "auth-command-cli.test.ts" as failed with 1 errors
[INFO 5:40:00 PM] [Worker] Waiting for the debugger to disconnect...
[5:40:00 PM] Ending test run tests/auth-command-cli.test.ts
[5:40:00 PM] Test run promise is finished, the queue is 0
[5:40:00 PM] [API] Vitest WebSocket connection closed, cannot call RPC anymore.
[5:40:00 PM] Ending test run <none>
[5:40:00 PM] Disposing test runner
[5:40:00 PM] Ending test run <none>
```

Error in VSCode:

![error-vs-code](bug-image.png)