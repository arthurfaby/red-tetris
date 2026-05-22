import { FastifyInstance } from 'fastify'

export const apiRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/', async () => {
        return { status: 'ok' }
    })
}
