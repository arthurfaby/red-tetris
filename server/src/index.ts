import Fastify, {FastifyReply, FastifyRequest} from 'fastify'

const fastify = new Fastify({ logger: {
        transport: {
            target: 'pino-pretty',
            options: { colorize: true }
        }
    } });

// TODO return index.html and bundle.js of the frontend here
fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    request.log.error("Should return index.html and bundle.js")
    reply.status(200)
    return { hello: 'world' };
});

const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log("🚀 Serveur prêt sur http://localhost:3000");
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();