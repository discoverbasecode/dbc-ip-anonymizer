import chalk from "chalk";
import ora from "ora";
import figlet from "figlet";
import gradient from "gradient-string";
import {SingleBar, Presets} from "cli-progress";
import {GetLocalIp} from "./GetLocalIp.Utils.ts";
import {HashIp} from "./HashIp.Utils.ts";


console.log(
    gradient.pastel.multiline(figlet.textSync("IP Anonymizer", {horizontalLayout: "full"}))
);

(async () => {
    const spinner = ora("Fetching your IP...").start();
    await new Promise((r) => setTimeout(r, 2000));
    spinner.succeed(chalk.green("IP fetched successfully!"));

    const myIp = GetLocalIp();
    const hashed = HashIp(myIp);

    console.log(chalk.blueBright("🌐 Your IP:"), chalk.yellow(myIp));
    console.log(chalk.magenta("🔒 Hashed IP:"), chalk.cyan(hashed));

    const bar = new SingleBar(
        {
            format: chalk.cyan("Progress") + " |" + chalk.green("{bar}") + `| {percentage}%`,
            barCompleteChar: "\u2588",
            barIncompleteChar: "\u2591",
            hideCursor: true,
        },
        Presets.shades_classic
    );

    bar.start(100, 0);

    for (let i = 0; i <= 100; i++) {
        bar.update(i);
        await new Promise((r) => setTimeout(r, 30));
    }

    bar.stop();

    console.log(chalk.green.bold("\n✅ Process Completed Successfully!"));
    console.log(chalk.gray("Tip: Use a proxy or VPN for real IP hiding 🌍"));
})();