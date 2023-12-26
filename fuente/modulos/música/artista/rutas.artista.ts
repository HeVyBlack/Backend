import { AplicaciónInstancia } from '@Fuente/aplicación.ts';
import { Módulo } from '../../modulo/módulo.ts';
import { ControladorArtista } from './controlador.artista.ts';
import {
  ActualizarArtistaBody,
  AcutalizarArtistaQuery,
  CrearArtistaBody,
  EliminarArtistaQuery,
  ObtenerArtistaQuery,
} from './esquemas.artista.ts';

export class RutasArtista extends Módulo {
  constructor(public readonly controlador: ControladorArtista) {
    super();
  }

  override prefijo: string = '/';

  override complemento: (app: AplicaciónInstancia) => P<AplicaciónInstancia> = async (app) => {
    app.route({
      method: 'GET',
      url: '/obtener-artista',
      schema: { querystring: ObtenerArtistaQuery },
      handler: this.controlador.getObtenerArtista,
    });

    app.route({
      method: 'POST',
      url: '/crear-artista',
      schema: { body: CrearArtistaBody },
      handler: this.controlador.postCrearArtista,
    });

    app.route({
      method: 'PUT',
      url: '/actualizar-artista',
      schema: { querystring: AcutalizarArtistaQuery, body: ActualizarArtistaBody },
      handler: this.controlador.putActualizarArtista,
    });

    app.route({
      method: 'DELETE',
      url: '/eliminar-artista',
      schema: { querystring: EliminarArtistaQuery },
      handler: this.controlador.deleteEliminarArtista,
    });

    return app;
  };
}
