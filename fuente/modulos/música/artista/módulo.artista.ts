import { Módulo } from '@Fuente/modulos/modulo/módulo.ts';
import { AplicaciónInstancia } from '@Fuente/aplicación.ts';
import { RutasArtista } from './rutas.artista.ts';
import { ControladorArtista } from './controlador.artista.ts';
import { ServicioArtista } from './servicio.artista.ts';
import { ArtistaRepositorio } from '../../../repositorios/artista.repositorio.ts';

export class MóduloArtista extends Módulo {
  constructor(private readonly repositorio: ArtistaRepositorio) {
    super();
  }

  readonly prefijo: string = '/artista';

  readonly complemento: (app: AplicaciónInstancia) => P<AplicaciónInstancia> = async (app) => {
    const servicio = new ServicioArtista(this.repositorio);
    const controlador = new ControladorArtista(servicio);
    const rutas = new RutasArtista(controlador);

    await app.register(rutas.complemento, { prefix: rutas.prefijo });

    return app;
  };
}
