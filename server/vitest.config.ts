import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            include: ['**/*.ts'],
            provider: 'v8',
        },
    },
})
