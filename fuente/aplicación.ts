import fastify, {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
} from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Server } from 'http';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { Respuesta } from './http/respuesta.http.ts';

export type AplicaciónInstancia = FastifyInstance<
  Server,
  RawRequestDefaultExpression<Server>,
  RawReplyDefaultExpression<Server>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>;

export class Constructor {
  private async añadirComplementos(app: FastifyInstance): P<FastifyInstance> {
    await app.register(cors);
    await app.register(multipart);
    return app;
  }

  async construir(): P<AplicaciónInstancia> {
    const app = fastify({
      logger: {
        transport: {
          target: 'pino-pretty',
        },
      },
      disableRequestLogging: true,
    });

    await this.añadirComplementos(app);

    app.addHook('preParsing', async (_req, rep, payload) => {
      if (payload instanceof Respuesta) {
        rep.code(payload.código);
      }
    });

    return app.withTypeProvider<TypeBoxTypeProvider>();
  }
}
