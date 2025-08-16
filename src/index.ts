import chalk from "chalk";

import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import {GetPublicIp} from "./GetPublicIp.Utils.ts";
import {HashIp} from "./HashIp.Utils.ts";


// نمایش متن گرافیکی اول برنامه
console.log(
    gradient.pastel.multiline(figlet.textSync("IP Anonymizer", {horizontalLayout: "full"}))
);

let proxyActive = false;
let proxyUrl = "http://127.0.0.1:8080"; // میشه بعدا عوضش کرد

async function mainMenu() {
    while (true) {
        const {choice} = await inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: chalk.cyan("Choose an option:"),
                choices: [
                    "🌐 Show my Real IP",
                    "🛡️ Activate Proxy & Show Masked IP",
                    "↩️ Back to Real IP",
                    "❌ Exit",
                ],
            },
        ]);

        if (choice === "🌐 Show my Real IP") {
            const ip = await GetPublicIp();
            console.log(chalk.green("\nReal IP:"), chalk.yellow(ip));
            console.log(chalk.magenta("Hashed:"), chalk.cyan(HashIp(ip)), "\n");
        }

        if (choice === "🛡️ Activate Proxy & Show Masked IP") {
            const ip = await GetPublicIp(proxyUrl);
            proxyActive = true;
            console.log(chalk.blue("\nProxy Active! 🚀"));
            console.log(chalk.green("Masked IP:"), chalk.yellow(ip));
            console.log(chalk.magenta("Hashed:"), chalk.cyan(HashIp(ip)), "\n");
            console.log(chalk.gray("App is running... Your IP is masked.\n"));
        }

        if (choice === "↩️ Back to Real IP") {
            proxyActive = false;
            const ip = await GetPublicIp();
            console.log(chalk.red("\nProxy Disabled!"));
            console.log(chalk.green("Real IP:"), chalk.yellow(ip));
            console.log(chalk.magenta("Hashed:"), chalk.cyan(HashIp(ip)), "\n");
        }

        if (choice === "❌ Exit") {
            console.log(chalk.redBright("\n👋 Goodbye!\n"));
            process.exit(0);
        }

        if (proxyActive) {
            console.log(chalk.yellow("🚀 IP Masking is active... (App is running)\n"));
        }
    }
}

mainMenu();