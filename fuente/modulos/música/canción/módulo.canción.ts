import { Módulo } from '@Fuente/modulos/modulo/módulo.ts';
import { AplicaciónInstancia } from '@Fuente/aplicación.ts';
import { RutasCanción } from './rutas.canción.ts';
import { ServicioCanción } from './servicio.canción.ts';
import { CanciónRepositorio } from '@Repositorios/canción.repositorio.ts';
import { ControladorCanción } from './controlador.canción.ts';

export class MóduloCanción extends Módulo {
  constructor(private readonly repositorio: CanciónRepositorio) {
    super();
  }

  readonly prefijo: string = '/canción';

  readonly complemento: (app: AplicaciónInstancia) => P<AplicaciónInstancia> = async (app) => {
    const servicio = new ServicioCanción(this.repositorio, this.repositorio.obtenerMapeador());
    const controlador = new ControladorCanción(servicio);
    const rutas = new RutasCanción(controlador);

    await app.register(rutas.complemento, { prefix: rutas.prefijo });

    return app;
  };
}
