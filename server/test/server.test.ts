import { buildApp } from '../src/app'
import { describe, test, expect, beforeAll } from 'vitest'

describe("Routage de base de l'application", () => {
    let app: Awaited<ReturnType<typeof buildApp>>

    beforeAll(async () => {
        app = await buildApp()
    })

    test('get url root', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/',
        })
        expect(response.statusCode).toBe(200)
    })

    test('get bad api url', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/bad-api',
        })
        expect(response.statusCode).toBe(404)
    })

    test('get bad path url', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/bad-path',
        })
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('text/html')
    })
})
