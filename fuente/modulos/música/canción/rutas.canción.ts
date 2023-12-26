import { AplicaciónInstancia } from '../../../aplicación.ts';
import { Módulo } from '../../modulo/módulo.ts';
import { ControladorCanción } from './controlador.canción.ts';
import {
  ActualizarCanciónBody,
  ActualizarCanciónQuery,
  CrearCanciónBody,
  EliminarCanciónQuery,
  ObtenerCanciónQuery,
} from './esquemas.canción.ts';

export class RutasCanción extends Módulo {
  constructor(private readonly controlador_canción: ControladorCanción) {
    super();
  }
  override prefijo: string = '/';

  override complemento: (app: AplicaciónInstancia) => P<AplicaciónInstancia> = async (app) => {
    app.route({
      method: 'POST',
      url: '/crear-canción',
      schema: { body: CrearCanciónBody },
      handler: this.controlador_canción.postCrearCanción,
    });

    app.route({
      method: 'PUT',
      url: '/actualizar-canción',
      schema: { body: ActualizarCanciónBody, querystring: ActualizarCanciónQuery },
      handler: this.controlador_canción.putActualizarCanción,
    });

    app.route({
      method: 'DELETE',
      url: '/eliminar-canción',
      schema: { querystring: EliminarCanciónQuery },
      handler: this.controlador_canción.deleteEliminarCanción,
    });

    app.route({
      method: 'GET',
      url: 'obtener-canción',
      schema: { querystring: ObtenerCanciónQuery },
      handler: this.controlador_canción.getObtenerCanción,
    });

    return app;
  };
}
