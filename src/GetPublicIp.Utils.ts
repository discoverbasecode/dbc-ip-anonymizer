import {HttpsProxyAgent} from "https-proxy-agent";

export async function GetPublicIp(proxyUrl?: string): Promise<string> {
    try {
        const options: any = {};
        if (proxyUrl) {
            options.agent = new HttpsProxyAgent(proxyUrl);
        }
        const res = await fetch("https://api.ipify.org?format=json", options);
        const data = await res.json();
        return data.ip;
    } catch (err) {
        return "❌ Cannot fetch IP (check connection or proxy)";
    }
}
