import { FastifyInstance } from 'fastify'
import {LeaderBoardBody} from '@red-tetris/shared/http'

export const apiRoutes = async (fastify: FastifyInstance) => {
    fastify.get('/', async () => {
        return { status: 'ok' }
    })

    fastify.get('/leaderboard', async () => {
        return fastify.db.prepare('SELECT * FROM leaderboard').all()
    })

    fastify.post<{Body: LeaderBoardBody}>('/leaderboard', {
            schema: {
                body: {
                    type: 'object',
                        required: ['name', 'score'],
                        properties: {
                        name:  { type: 'string'},
                        score: { type: 'number'}
                    }
                }
            }
        },
        async (req, reply) => {
            const { name, score } = req.body
            const result = fastify.db
                .prepare('INSERT INTO leaderBoard (name, score) VALUES (?, ?)')
                .run(name, score)

            return reply.code(201).send({ id: Number(result.lastInsertRowid) })
    })
}
