import {ShowProgress} from "./ProgressBar.Utils.ts";
import {GetPublicIp} from "./GetPublicIp.Utils.ts";


const proxyList = [
    "http://103.152.100.100:8080",
    "http://103.111.225.93:1080",
    "http://103.159.46.2:83",
    "http://116.202.165.119:3124",
    "socks5://91.121.49.7:1080",
    "socks5://51.83.140.70:1080",
    "socks5://62.210.209.223:1080",
];


export async function SelectWorkingProxy(): Promise<string | null> {
    for (const proxy of proxyList) {
        await ShowProgress(`Testing proxy ${proxy}...`);
        const ip = await GetPublicIp(proxy);
        if (!ip.startsWith("❌")) {
            return proxy;
        }
    }
    return null;
}
