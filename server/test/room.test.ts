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

describe('Test room events', () => {
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

    test('add one player in lobby', () => {
        expect(playerManager.sockets.size).toBe(1)
        expect(playerManager.getSocket(clientSocket.id ?? '')).toBeDefined()
    })

    test('update players from lobby', async () => {
        clientSocket.emit('join_game', { username: 'player1', gameId: 'test' })
        await sleep(10)

        const player = playerManager.getPlayerOrFail(clientSocket.id ?? '')
        const game = gameManager.getPlayerList('test')

        expect(player).toBeDefined()
        expect(player.id).toBe(clientSocket.id)
        expect(player.username).toBe('player1')
        expect(game.length).toBe(1)
        expect(game[0].username).toBe('player1')
    })

    test('leave game', async () => {
        clientSocket.emit('join_game', { username: 'player1', gameId: 'test' })
        await sleep(10)
        clientSocket.emit('leave_game', 'test')
        await sleep(10)

        const game = gameManager.getPlayerList('test')

        expect(game.length).toBe(0)
    })

    test('disconnecting', async () => {
        clientSocket.emit('join_game', { username: 'player1', gameId: 'test' })
        await sleep(10)
        clientSocket.disconnect()
        await sleep(10)

        const game = gameManager.getPlayerList('test')

        expect(game.length).toBe(0)
    })
})
