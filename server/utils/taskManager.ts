import { useScheduler } from "#scheduler"
import chalk from 'chalk'

const scheduler = useScheduler()

type Scheduler = ReturnType<typeof scheduler.run>
type SetTaskCallbackOptions = {
    addMessage: (message: string) => void
}

const capitalizeFirst = (name: string) => name
.charAt(0)
.toUpperCase()
.concat(name.slice(1))

export class TaskManager {
    public static logger: (...data: any[]) => void = console.log

    private static startMessage(name: string) {
        return `⏳ ${chalk.blue(`Starting ${name.toLowerCase()} task!`)}`
    }

    private static successMessage(name: string, message: string = '') {
        const styledMessage = chalk.redBright.underline.bold(message)
        const info = chalk.greenBright(`${capitalizeFirst(name)} task completed successfully!`)
        
        return `✅ ${info} ${styledMessage}`
    }

    private static errorMessage(name: string, message: string = '') {
        const styledMessage = chalk.redBright.underline(message)
        const info = chalk.white.bgRed(`${capitalizeFirst(name)} task failed!`)

        return `❌ ${info} ${styledMessage}`
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