import { deleteExpiredRefreshTokens } from "~/server/database/refreshTokens"
import { TaskManager } from "../utils/taskManager"

export default defineNitroPlugin(() => {
    TaskManager.setTask('expired refresh tokens cleanup', async () => {
        const { count } = await deleteExpiredRefreshTokens()
        return `Deleted ${count} records`
    }).hourlyAt(0)
})