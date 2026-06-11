import {FastifyPluginAsync} from "fastify";
import Database from "better-sqlite3";
import fp from 'fastify-plugin'

const sqlitePlugin: FastifyPluginAsync = async (fastify) => {
    const db = new Database('./app.db')

    db.exec(`
    CREATE TABLE IF NOT EXISTS leaderboard (
      id    INTEGER PRIMARY KEY AUTOINCREMENT,
      name  TEXT NOT NULL,
      score INTEGER NOT NULL
    )
  `)

    fastify.decorate('db', db)
    fastify.addHook('onClose', () => db.close())
}

export default fp(sqlitePlugin, { name: 'sqlite' })