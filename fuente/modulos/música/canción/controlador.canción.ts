import { Respuesta } from '../../../http/respuesta.http.ts';
import {
  ActualizarCanciónBody,
  ActualizarCanciónQuery,
  CrearCanciónBody,
  EliminarCanciónQuery,
  ObtenerCanciónQuery,
} from './esquemas.canción.ts';
import { RespuestaObtenerCanción } from './respuestas.canción.ts';
import { ServicioCanción } from './servicio.canción.ts';

type Body<T> = { body: T };
type Query<T> = { query: T };
type BodyAndQuery<T, V> = { body: T; query: V };

export class ControladorCanción {
  constructor(private readonly servicio_canción: ServicioCanción) {}

  readonly postCrearCanción = async ({ body }: Body<CrearCanciónBody>) => {
    await this.servicio_canción.crearCanción(body);

    return new Respuesta(201, 'CREADO', 'Canción creada');
  };

  readonly putActualizarCanción = async ({
    body,
    query,
  }: BodyAndQuery<ActualizarCanciónBody, ActualizarCanciónQuery>) => {
    try {
      await this.servicio_canción.actualizarCancion(query, body);

      return new Respuesta(200, 'ACTUALIZADA', 'Canción actualizada');
    } catch (e) {
      return new Respuesta(404, 'CANCIÓN_NO_ENCONTRADA');
    }
  };

  readonly deleteEliminarCanción = async ({ query }: Query<EliminarCanciónQuery>) => {
    try {
      await this.servicio_canción.eliminarCanción(query);

      return new Respuesta(200, 'ELIMINADA');
    } catch (e) {
      return new Respuesta(404, 'CANCIÓN_NO_ENCONTRADA');
    }
  };

  readonly getObtenerCanción = async ({ query }: Query<ObtenerCanciónQuery>) => {
    try {
      const canción_obtenida = await this.servicio_canción.obtenerCanción(query);
      if (canción_obtenida == null) return new Respuesta(404, 'CANCIÓN_NO_ENCONTRADA');

      return new RespuestaObtenerCanción(canción_obtenida, 200, 'ENCONTRADA');
    } catch (e) {
      return new Respuesta(404, 'CANCIÓN_NO_ENCONTRADA');
    }
  };
}
