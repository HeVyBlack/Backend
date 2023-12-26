import { Constructor } from './aplicación.ts';
import { MóduloMúsica } from '@Modulos/música/modulo.música.ts';

declare global {
  type P<T> = Promise<T>;
  type Query<T> = { query: T };
  type BodyAndQuery<T, V> = { body: T; query: V };
}

async function principal() {
  const constructor = new Constructor();

  const app = await constructor.construir();

  const modulo_música = new MóduloMúsica();

  await app.register(modulo_música.complemento, { prefix: modulo_música.prefijo });

  await app.listen({ port: 3000 });

  console.log(app.printRoutes());
}

await principal();
