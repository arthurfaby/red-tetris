import {buildApp} from "./app";
import {registerSocketHandlers} from "./socket";

const start = async () => {
    try {
        const app = await buildApp()
        registerSocketHandlers(app)

        // TODO return index.html and bundle.js of the frontend here

        await app.listen({ port: 3000, host: '0.0.0.0' })

        app.log.info('server ready on http://localhost:3000')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

start()
