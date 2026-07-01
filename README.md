# Red Tetris

A multiplayer, networked Tetris game built with React, Fastify and Socket.IO.
Players join a shared room from a URL and compete in real time — when a player
clears lines, penalty rows are sent to the opponents' grids.

> 42 school project. Full-stack TypeScript in a pnpm monorepo.

## Features

- **Real-time multiplayer** over WebSockets (Socket.IO)
- **Room-based games** — share a URL to invite others to play together
- **Spectrum view** of opponents' boards while you play
- **Ghost tetromino** preview of where the current piece will land
- **Game modes**:
  - `DEFAULT` — classic rules
  - `ACCELERATED_GRAVITY` — pieces fall faster as the game goes on
  - `SWAP_PIECES` — swap the current piece (hold mechanic)
- **Leaderboard** persisted in SQLite
- **Leader / host handover** and win detection

## Tech stack

| Layer    | Stack                                                        |
| -------- | ------------------------------------------------------------ |
| Client   | React 19, Vite, React Router, Tailwind CSS, Zustand, shadcn  |
| Server   | Fastify, Socket.IO, better-sqlite3                           |
| Shared   | TypeScript types & constants shared between client & server  |
| Tooling  | pnpm workspaces, Vitest, ESLint, Prettier, TypeScript        |

## Project structure

```
.
├── client/   # React + Vite frontend
├── server/   # Fastify + Socket.IO backend (serves the built client too)
├── shared/   # Types, constants, tetromino & socket-event definitions
├── Dockerfile
└── docker-compose.yml
```

## Getting started

### With Docker (recommended)

```bash
docker compose up
```

Then open **http://localhost:3000**.

The container installs dependencies, builds the client and runs the server,
which serves both the API/WebSocket and the built frontend on port `3000`.
The project is mounted as a volume, so source changes are picked up live.

## How to play

Open a game URL in the form:

```
http://localhost:3000/<roomName>/<username>
```

The first player to join a room becomes the **leader** and can configure the
game mode and start the match. Share the same `<roomName>` (with a different
`<username>`) to let friends join the same game.

## Testing

```bash
# Run the full test suite (Vitest)
pnpm test

# With coverage
pnpm coverage
```

Each workspace also exposes its own `test` / `test:coverage` scripts.

## Scripts reference

| Command                                    | Description                          |
| ------------------------------------------ | ------------------------------------ |
| `pnpm test`                                | Run all tests                        |
| `pnpm coverage`                            | Run tests with coverage report       |
| `pnpm --filter @red-tetris/client dev`     | Start the frontend dev server        |
| `pnpm --filter @red-tetris/client build`   | Build the frontend for production     |
| `pnpm --filter @red-tetris/server dev`     | Start the backend in watch mode      |
