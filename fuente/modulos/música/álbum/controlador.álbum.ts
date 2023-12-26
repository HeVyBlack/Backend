import { Respuesta } from '../../../http/respuesta.http.ts';
import {
  ActualizarÁlbumBody,
  ActualizarÁlbumQuery,
  CrearÁlbumBody,
  EliminarÁlbumQuery,
  ObtenerÁlbumQuery,
} from './esquemas.álbum.ts';
import { RespuestaObtenerÁlbum } from './respuestas.álbum.ts';
import { ServicioÁlbum } from './servicio.álbum.ts';

export class ControladorÁlbum {
  constructor(public readonly servicio: ServicioÁlbum) {}

  readonly getObtenerÁlbum = async ({ query }: Query<ObtenerÁlbumQuery>) => {
    try {
      const álbum = await this.servicio.obtenerÁlbum(query);
      if (álbum == null) return new Respuesta(404, 'NO_ENCONTRADO');

      return new RespuestaObtenerÁlbum(álbum, 200, 'ENCONTRADO');
    } catch {
      return new Respuesta(404, 'NO_ENCONTRADO');
    }
  };

  readonly deleteEliminarÁlbum = async ({ query }: Query<EliminarÁlbumQuery>) => {
    try {
      const álbum = await this.servicio.eliminarÁlbum(query);
      if (álbum == null) return new Respuesta(404, 'NO_ENCONTRADO');

      return new RespuestaObtenerÁlbum(álbum, 200, 'ENCONTRADO');
    } catch {
      return new Respuesta(404, 'NO_ENCONTRADO');
    }
  };

  readonly postCrearAlbum = async ({ body }: { body: CrearÁlbumBody }) => {
    await this.servicio.crearÁlbum(body);

    return new Respuesta(201, 'CREADO');
  };

  readonly putActualizarÁlbum = async ({
    body,
    query,
  }: BodyAndQuery<ActualizarÁlbumBody, ActualizarÁlbumQuery>) => {
    try {
      await this.servicio.actualizarÁlbum(query, body);

      return new Respuesta(200, 'ACTUALIZADO');
    } catch {
      return new Respuesta(404, 'NO_ENCONTRADO');
    }
  };
}
