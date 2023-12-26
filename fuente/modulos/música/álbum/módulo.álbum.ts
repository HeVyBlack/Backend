import { Módulo } from '@Fuente/modulos/modulo/módulo.ts';
import { AplicaciónInstancia } from '@Fuente/aplicación.ts';
import { ControladorÁlbum } from './controlador.álbum.ts';
import { ServicioÁlbum } from './servicio.álbum.ts';
import { ÁlbumRepositorio } from '../../../repositorios/álbum.repositorio.ts';
import { RutasÁlbum } from './rutas.álbum.ts';

export class MóduloÁlbum extends Módulo {
  constructor(private readonly repositorio: ÁlbumRepositorio) {
    super();
  }

  override readonly prefijo: string = '/álbum';

  override readonly complemento: (app: AplicaciónInstancia) => P<AplicaciónInstancia> = async (
    app
  ) => {
    const servicio = new ServicioÁlbum(this.repositorio);
    const controlador = new ControladorÁlbum(servicio);

    const rutas = new RutasÁlbum(controlador);

    await app.register(rutas.complemento, { prefix: rutas.prefijo });

    return app;
  };
}
