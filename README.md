[![npm](https://img.shields.io/npm/v/kill-my-port?color=blue&label=npm)](https://www.npmjs.com/package/kill-my-port)
[![npm downloads](https://img.shields.io/npm/dt/kill-my-port?color=orange&label=downloads)](https://www.npmjs.com/package/kill-my-port)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/kill-my-port?label=size)
[![GitHub last commit](https://img.shields.io/github/last-commit/TenEplaysOfficial/kill-my-port)](https://github.com/TenEplaysOfficial/kill-my-port)
![Maintenance](https://img.shields.io/maintenance/active/2025)
![GitHub license](https://img.shields.io/github/license/TenEplaysOfficial/kill-my-port)
[![GitHub issues](https://img.shields.io/github/issues/TenEplaysOfficial/kill-my-port)](https://github.com/TenEplaysOfficial/kill-my-port/issues)
[![Contribute](https://img.shields.io/badge/Contribute-Open%20PRs-orange)](https://github.com/TenEplaysOfficial/kill-my-port/pulls)
[![GitHub stars](https://img.shields.io/github/stars/TenEplaysOfficial/kill-my-port?style=social)](https://github.com/TenEplaysOfficial/kill-my-port)
![GitHub forks](https://img.shields.io/github/forks/TenEplaysOfficial/kill-my-port?style=social)
[![platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)](#)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D16-green?logo=node.js)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/TenEplaysOfficial/kill-my-port/publish.yml)  

# `kill-my-port` – Kill Processes Running on a Port Instantly 🚀

`kill-my-port` is a simple and efficient CLI tool that helps developers **quickly free up ports** by terminating processes running on them. It works across **Windows, macOS, and Linux** and provides an **interactive mode** if no port is specified.

## 📦 Installation

### **Option 1: Run Without Installation (NPX)**

You can use `kill-my-port` instantly without installing it:

```sh
npx kill-my-port 3000
```

### **Option 2: Install Globally (for Persistent Use)**

To use `kill-my-port` as a command without `npx`:

```sh
npm install -g kill-my-port
```

Now, you can run it like this:

```sh
kill-my-port 3000
```

---

## 🛠️ Usage

### **1️⃣ Kill a Process on One or More Ports**

```sh
kill-my-port 3000 5000 8080
```

This will **find and terminate** processes running on ports `3000`, `5000`, and `8080`.

### **2️⃣ Auto-Detect Running Ports and Choose One to Kill**

If you run the command **without specifying a port**, it will **list active ports** and let you pick one:

```sh
kill-my-port
```

Example output:

```
🔍 Active ports:

COMMAND    PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node      1234  user    22u  IPv4 0x1234  0t0  TCP 127.0.0.1:3000 (LISTEN)
python    5678  user    23u  IPv4 0x5678  0t0  TCP 127.0.0.1:5000 (LISTEN)

Enter a port to kill: 3000
❗ Kill process running on port 3000? (y/n): y
✅ Port 3000 has been freed.
```

### **3️⃣ Handling a Port Not in Use**

If you try to kill a port that has no active process, it will inform you:

```sh
kill-my-port 8000
```

```
⚠️ No process is running on port 8000.
```

---

## 🔥 Features

✔ **Kill multiple ports at once** (e.g., `kill-my-port 3000 5000 8080`)  
✔ **Cross-platform:** Works on **Windows, macOS, and Linux**  
✔ **Zero setup required:** Use instantly with `npx`  
✔ **Auto-detect active ports** if no port is provided  
✔ **Confirmation prompt** before killing a process  
✔ **Safe & efficient**

---

## ⚙️ How It Works

Internally, `kill-my-port` executes OS-specific commands to find and terminate processes:

| **OS**          | **Command Used**                                            |
| --------------- | ----------------------------------------------------------- |
| **Windows**     | `Get-NetTCPConnection` + `Stop-Process -Id <PID> -Force`    |
| **macOS/Linux** | `lsof -ti :PORT  \| xargs kill -9`                          |

This ensures proper compatibility across different operating systems.

---

## 🚑 Troubleshooting

### **1️⃣ Command Not Found (`kill-my-port: command not found`)**

- If using `kill-my-port` without `npx`, ensure it’s installed globally:
  ```sh
  npm install -g kill-my-port
  ```
- If installed but still not found, try:
  ```sh
  npx kill-my-port 3000
  ```

### **2️⃣ Permission Denied on macOS/Linux**

If you see a permission error, try:

```sh
sudo kill-my-port 3000
```

### **3️⃣ Port Not Found (`No process is running on port X`)**

- Ensure the process is actually running by using:
  ```sh
  netstat -ano | findstr :3000  # Windows
  lsof -i :3000                 # macOS/Linux
  ```
- Try running `kill-my-port` **without a port number** to list all active ports.

---

## 💡 Contributing

If you’d like to improve this tool, feel free to **contribute on GitHub**!

🔗 **GitHub Repository:** https://github.com/TenEplaysOfficial/kill-my-port

---

## ❤️ Support & Funding

If you find `kill-my-port` useful, consider supporting its development:

**Patreon:** https://www.patreon.com/teneplays

---

## 📜 License

`kill-my-port` is **open-source** and released under the **[MIT License](LICENSE)**.
