import { AplicaciónInstancia } from '../../../aplicación.ts';
import { Módulo } from '../../modulo/módulo.ts';
import { ControladorÁlbum } from './controlador.álbum.ts';
import {
  ActualizarÁlbumBody,
  ActualizarÁlbumQuery,
  CrearÁlbumBody,
  EliminarÁlbumQuery,
  ObtenerÁlbumQuery,
} from './esquemas.álbum.ts';

export class RutasÁlbum extends Módulo {
  constructor(public readonly controlador: ControladorÁlbum) {
    super();
  }

  override prefijo: string = '/';

  override complemento: (app: AplicaciónInstancia) => P<AplicaciónInstancia> = async (app) => {
    app.route({
      method: 'GET',
      url: '/obtener-álbum',
      schema: { querystring: ObtenerÁlbumQuery },
      handler: this.controlador.getObtenerÁlbum,
    });

    app.route({
      method: 'POST',
      url: '/crear-álbum',
      schema: { body: CrearÁlbumBody },
      handler: this.controlador.postCrearAlbum,
    });

    app.route({
      method: 'PUT',
      url: '/actualizar-álbum',
      schema: { body: ActualizarÁlbumBody, querystring: ActualizarÁlbumQuery },
      handler: this.controlador.putActualizarÁlbum,
    });

    app.route({
      method: 'DELETE',
      url: '/eliminar-álbum',
      schema: { querystring: EliminarÁlbumQuery },
      handler: this.controlador.deleteEliminarÁlbum,
    });

    return app;
  };
}
