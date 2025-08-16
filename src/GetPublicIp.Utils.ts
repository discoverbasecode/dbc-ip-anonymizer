import {HttpsProxyAgent} from "https-proxy-agent";

interface IpResponse {
    ip: string;
}

export async function GetPublicIp(proxyUrl?: string): Promise<string> {
    try {
        const options: any = {};
        if (proxyUrl) {
            options.agent = new HttpsProxyAgent(proxyUrl);
        }
        const res = await fetch("https://api.ipify.org?format=json", options);
        const data = await res.json() as IpResponse;
        if (data && data.ip) {
            return data.ip;
        } else {
            throw new Error("Invalid IP response");
        }
    } catch (err) {
        return "❌ Cannot fetch IP (check connection or proxy)";
    }
}