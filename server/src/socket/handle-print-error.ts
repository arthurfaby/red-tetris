export function handlePrintError(err: unknown) {
    if (err instanceof Error) {
        console.error('[ERROR] ' + err.message)
        return
    }
    console.error('[ERROR] ' + 'Unknown error')
}
