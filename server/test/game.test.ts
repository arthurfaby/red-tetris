import { buildApp } from '../src/app'
import { registerSocketHandlers } from '../src/socket'
import { GameManager } from '../src/socket/managers/GameManager'
import { io as Client, Socket as ClientSocket } from 'socket.io-client'
import { PlayerManager } from '../src/socket/managers/PlayerManager'
import { describe } from 'vitest'
import { FastifyInstance } from 'fastify'
import { AddressInfo } from 'node:net'
import { beforeAll, afterAll, test, expect } from 'vitest'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('Test game events', () => {
    let app: FastifyInstance
    let clientSocket: ClientSocket
    let playerManager: PlayerManager
    let gameManager: GameManager

    beforeAll(async () => {
        app = await buildApp()
        gameManager = new GameManager()
        playerManager = new PlayerManager()

        registerSocketHandlers(app, gameManager, playerManager)

        await app.listen({ port: 0, host: '127.0.0.1' })
        const port = (app.server.address() as AddressInfo).port

        clientSocket = Client(`http://127.0.0.1:${port}`)

        await new Promise<void>((resolve) => {
            clientSocket.on('connect', () => {
                resolve()
            })
        })
    })

    afterAll(async () => {
        clientSocket.close()
        await app.close()
    })

    test('start game', async () => {
        clientSocket.emit('join_game', { username: 'player1', gameId: 'test' })
        await sleep(10)
        clientSocket.emit('start_game', 'test')
        await sleep(10)
        const piece = gameManager.getPiece('test')
        const nbPiece = piece?.listPlayerNumber.get(clientSocket.id ?? '')

        expect(nbPiece).toBe(2)
    })

    test('next_piece', async () => {
        clientSocket.emit('join_game', { username: 'player1', gameId: 'test2' })
        await sleep(10)
        clientSocket.emit('start_game', 'test2')
        await sleep(10)
        clientSocket.emit('next_piece', 'test2')
        await sleep(10)
        const piece = gameManager.getPiece('test2')
        const nbPiece = piece?.listPlayerNumber.get(clientSocket.id ?? '')

        expect(nbPiece).toBe(3)
    })
})
