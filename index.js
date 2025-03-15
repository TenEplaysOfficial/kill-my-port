#!/usr/bin/env node

import { exec } from "child_process";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const isWindows = process.platform === "win32";

const killProcess = (port) => {
  const checkCommand = isWindows
    ? `netstat -ano | findstr :${port}`
    : `lsof -ti :${port}`;

  exec(checkCommand, (checkError, checkStdout) => {
    if (checkError) {
      console.error(`❌ Error checking port ${port}: ${checkError.message}`);
      return askForPort();
    }

    if (!checkStdout) {
      console.log(`⚠️ No process is running on port ${port}.`);
      return askForPort();
    }

    rl.question(
      `❗ Kill process running on port ${port}? (y/n): `,
      (answer) => {
        answer = answer.trim().toLowerCase() || "y";
        if (answer === "y") {
          const killCommand = isWindows
            ? `for /f "tokens=5" %a in ('netstat -ano ^| findstr :${port}') do taskkill /PID %a /F`
            : `lsof -ti :${port} | xargs kill -9`;

          exec(killCommand, (error, stdout, stderr) => {
            if (error) {
              console.error(`❌ Error: ${stderr.trim() || error.message}`);
            } else {
              console.log(`✅ Port ${port} has been freed.`);
            }
            askForPort();
          });
        } else {
          console.log("❌ Operation canceled.");
          askForPort();
        }
      }
    );
  });
};

const listPorts = () => {
  const listCommand = isWindows
    ? `netstat -ano | findstr LISTEN`
    : `lsof -i -P -n | grep LISTEN`;

  exec(listCommand, (error, stdout) => {
    if (error) {
      console.error(`❌ Error listing ports: ${error.message}`);
      return askForPort();
    }

    if (!stdout) {
      console.log("✅ No active ports found.");
      return askForPort();
    }

    console.log("🔍 Active ports:\n");
    console.log(stdout);

    askForPort();
  });
};

const askForPort = () => {
  rl.question("Enter a port to kill (or 'q' to exit): ", (port) => {
    if (port.toLowerCase() === "q") {
      console.log("👋 Exiting...");
      rl.close();
      process.exit(0);
    } else if (!port) {
      console.log("⚠️ No port entered. Try again.");
      askForPort();
    } else {
      killProcess(port);
    }
  });
};

const port = process.argv[2];

if (!port) {
  console.log("⚠️ No port provided. Searching for running ports...");
  listPorts();
} else {
  killProcess(port);
}
