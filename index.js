#!/usr/bin/env node

import { exec } from "child_process";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const isWindows = process.platform === "win32";

const killProcess = (port) => {
  return new Promise((resolve) => {
    const checkCommand = isWindows
      ? `powershell -Command "(Get-NetTCPConnection -LocalPort ${port} -ErrorAction SilentlyContinue).OwningProcess"`
      : `lsof -ti :${port}`;

    exec(checkCommand, (checkError, checkStdout) => {
      const pid = checkStdout.trim();
      if (checkError || !pid) {
        console.log(`⚠️ No process is running on port ${port}.`);
        return resolve();
      }

      const killCommand = isWindows
        ? `powershell -Command "Stop-Process -Id ${pid} -Force"`
        : `lsof -ti :${port} | xargs kill -9`;

      exec(killCommand, (error, _, stderr) => {
        if (error && !stderr.includes("No such process")) {
          console.error(
            `❌ Error killing port ${port}: ${stderr.trim() || error.message}`
          );
        } else {
          console.log(`✅ Port ${port} has been freed.`);
        }
        resolve();
      });
    });
  });
};

const killMultiplePorts = async (ports) => {
  for (const port of ports) {
    await killProcess(port);
  }
  exit();
};

const listPorts = () => {
  const listCommand = isWindows
    ? `powershell -Command "Get-NetTCPConnection | Where-Object { $_.State -eq 'Listen' } | Select-Object LocalPort, OwningProcess"`
    : `lsof -i -P -n | grep LISTEN`;

  exec(listCommand, (error, stdout) => {
    if (error || !stdout.trim()) {
      console.log("✅ No active ports found.");
      return exit();
    }

    console.log("🔍 Active ports:\n");
    console.log(stdout);
    askForPort();
  });
};

const askForPort = () => {
  rl.question("Enter a port to kill (or 'q' to exit): ", (port) => {
    if (port.toLowerCase() === "q") {
      exit();
    } else if (!port) {
      console.log("⚠️ No port entered. Try again.");
      askForPort();
    } else {
      killMultiplePorts([port]);
    }
  });
};

const exit = () => {
  console.log("👋 Exiting...");
  rl.close();
  process.exit(0);
};

const ports = process.argv.slice(2).map(Number).filter(Boolean);

if (ports.length === 0) {
  console.log("⚠️ No ports provided. Searching for running ports...");
  listPorts();
} else {
  killMultiplePorts(ports);
}
