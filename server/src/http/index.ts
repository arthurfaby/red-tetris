import { FastifyInstance } from 'fastify'

export const apiRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/', async () => {
        // TODO return index.html and bundle.js of the frontend here
        return { status: 'ok' }
    })
}
