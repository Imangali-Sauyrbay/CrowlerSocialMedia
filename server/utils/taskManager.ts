import { useScheduler } from "#scheduler"
import chalk from 'chalk'

const scheduler = useScheduler()
type Scheduler = ReturnType<typeof scheduler.run>

export class TaskManager {
    public static logger: (...data: any[]) => void = console.log

    private static startMessage(name: string) {
        return `⏳ ${chalk.blue(`Starting ${name.toLowerCase()} task!`)}`
    }

    private static successMessage(name: string, message: string = '') {
        return `✅ ${chalk.greenBright(`${name.charAt(0).toUpperCase() + name.slice(1)} task completed successfully!`)} ${chalk.redBright.underline.bold(message)}`
    }

    private static errorMessage(name: string, message: string = '') {
        return `❌ ${chalk.white.bgRed(`${name.charAt(0).toUpperCase() + name.slice(1)} task failed!`)} ${chalk.redBright.underline(message)}`
    }

    public static setTask(taskName: string, fn: () => string | Promise<string> | void): Scheduler {
        return scheduler.run(async () => {
            try {
                this.logger(this.startMessage(taskName))
                const message = await fn() || ''
                this.logger(this.successMessage(taskName, message))
            } catch (error) {
                this.logger(this.errorMessage(taskName, (error as Error).message))
            }
        })
    }
}