import { Respuesta } from '../../../http/respuesta.http.ts';
import {
  ActualizarArtistaBody,
  AcutalizarArtistaQuery,
  CrearArtistaBody,
  EliminarArtistaQuery,
  ObtenerArtistaQuery,
} from './esquemas.artista.ts';
import { RespuestaObtenerArtista } from './respuestas.artista.ts';
import { ServicioArtista } from './servicio.artista.ts';

export class ControladorArtista {
  constructor(private readonly servicio: ServicioArtista) {}

  readonly postCrearArtista = async ({ body }: { body: CrearArtistaBody }) => {
    await this.servicio.crearArtista(body);

    return new Respuesta(201, 'ARTISTA_CREADO');
  };

  readonly getObtenerArtista = async ({ query }: Query<ObtenerArtistaQuery>) => {
    try {
      const artistas = await this.servicio.obtenerArtista(query);
      if (artistas == null) return new Respuesta(404, 'NO_ENCONTRADO');

      return new RespuestaObtenerArtista(artistas, 200, 'ENCTRADO');
    } catch {
      return new Respuesta(404, 'NO_ENCONTRADO');
    }
  };

  readonly putActualizarArtista = async ({
    body,
    query,
  }: BodyAndQuery<ActualizarArtistaBody, AcutalizarArtistaQuery>) => {
    try {
      await this.servicio.actualizarArtista(query, body);
      return new Respuesta(200, 'ACTUALIZADA');
    } catch {
      return new Respuesta(404, 'NO_ENCONTRADA');
    }
  };

  readonly deleteEliminarArtista = async ({ query }: Query<EliminarArtistaQuery>) => {
    try {
      await this.servicio.eliminarArtista(query);
      return new Respuesta(200, 'ELIMINADO');
    } catch {
      return new Respuesta(404, 'NO_ENCONTRADO');
    }
  };
}
