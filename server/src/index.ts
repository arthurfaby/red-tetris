import { buildApp } from './app'
import { registerSocketHandlers } from './socket'
import { GameManager } from './socket/managers/GameManager'
import { PlayerManager } from './socket/managers/PlayerManager'

const start = async () => {
    try {
        const app = await buildApp()
        const gameManager = new GameManager()
        const playerManager = new PlayerManager()
        registerSocketHandlers(app, gameManager, playerManager)

        await app.listen({ port: 3000, host: '0.0.0.0' })
        app.log.level = 'error'

        app.log.info('server ready on http://localhost:3000')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

start()
