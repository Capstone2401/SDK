import os from "os";

function getHostIP() {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName of Object.keys(networkInterfaces)) {
    const interfaces = networkInterfaces[interfaceName];
    for (const info of interfaces) {
      if (
        info.family === "IPv4" &&
        !info.Internal &&
        info.address !== "127.0.0.1"
      ) {
        return info.address;
      }
    }
  }
}

export default getHostIP;
