import os from "os";

export function GetLocalIp(): string {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        const net = interfaces[name];
        if (!net) continue;
        for (const iface of net) {
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address;
            }
        }
    }
    return "0.0.0.0";
}