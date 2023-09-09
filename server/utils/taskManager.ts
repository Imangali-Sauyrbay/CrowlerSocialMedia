import { useScheduler } from "#scheduler"
import chalk from 'chalk'

const scheduler = useScheduler()
type Scheduler = ReturnType<typeof scheduler.run>
type SetTaskCallbackOptions = {
    addMessage: (message: string) => void
}

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

    public static setTask(taskName: string, fn: (message: SetTaskCallbackOptions) => string | Promise<string> | void): Scheduler {
        return scheduler.run(async () => {
            try {
                this.logger(this.startMessage(taskName))
                const messages: string[] = []

                const addMessage = (message: string) => {
                    messages.push(message)
                }

                messages.push(await fn({addMessage}) || '')

                this.logger(this.successMessage(taskName, messages.join('\n')))
            } catch (error) {
                this.logger(this.errorMessage(taskName, (error as Error).message))
            }
        })
    }
}