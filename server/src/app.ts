import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import fastifySocketIO from 'fastify-socket.io'
import { apiRoutes } from './http'
import fastifyStatic from '@fastify/static'
import path from 'node:path'

export const buildApp = async (): Promise<FastifyInstance> => {
    const app = Fastify({
        logger: {
            transport: { target: 'pino-pretty' },
        },
    })

    app.register(fastifyStatic, {
        root: path.join(__dirname, '../../client/dist'),
        prefix: '/',
    })

    app.setNotFoundHandler((request, reply) => {
        if (request.raw.url?.startsWith('/api')) {
            reply.status(404).send({ error: 'Route API introuvable' })
        } else {
            reply.sendFile('index.html')
        }
    })

    await app.register(cors, {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'OPTIONS'],
    })

    await app.register(fastifySocketIO, {
        cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] },
    })

    await app.register(apiRoutes, { prefix: '/api' })

    return app
}
