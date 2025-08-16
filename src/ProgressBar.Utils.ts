import {Presets, SingleBar} from "cli-progress";
import chalk from "chalk";

export async function ShowProgress(task: string) {
    console.log(chalk.cyan(task));
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
        await new Promise((r) => setTimeout(r, 15));
    }

    bar.stop();
}