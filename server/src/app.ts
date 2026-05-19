import Fastify, {FastifyInstance} from 'fastify';
import cors from '@fastify/cors';
import fastifySocketIO from 'fastify-socket.io';
import {apiRoutes} from "./http";

export const buildApp = async (): Promise<FastifyInstance> => {
    const app = Fastify({
        logger: {
            transport: {target: 'pino-pretty'}
        }
    });

    await app.register(cors, {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "OPTIONS"]
    });

    await app.register(fastifySocketIO, {
        cors: {origin: "http://localhost:5173", methods: ["GET", "POST"]}
    });

    await app.register(apiRoutes, {prefix: '/api'});

    return app;
};