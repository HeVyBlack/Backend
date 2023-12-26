import { AplicaciónInstancia } from '@Fuente/aplicación.ts';
import { Módulo } from '@Fuente/modulos/modulo/módulo.ts';

import { MóduloÁlbum } from './álbum/módulo.álbum.ts';
import { MóduloCanción } from './canción/módulo.canción.ts';
import { MóduloArtista } from './artista/módulo.artista.ts';
import { CanciónRepositorio } from '@Repositorios/canción.repositorio.ts';
import { CanciónMapeador } from '@Utilidades/canción.mapeador.ts';
import { ÁlbumMapeador } from '@Utilidades/álbum.mapeador.ts';
import { ÁlbumRepositorio } from '../../repositorios/álbum.repositorio.ts';
import { ArtistaMapeador } from '../../utilidades/artista.mapeador.ts';
import { ArtistaRepositorio } from '../../repositorios/artista.repositorio.ts';

export class MóduloMúsica extends Módulo {
  readonly prefijo: string = '/música';

  private async agregarModulos(app: AplicaciónInstancia, modulo: Módulo): P<AplicaciónInstancia> {
    await app.register(modulo.complemento, { prefix: modulo.prefijo });
    return app;
  }

  override readonly complemento: (app: AplicaciónInstancia) => P<AplicaciónInstancia> = async (
    app
  ) => {
    const canción_mapeador = new CanciónMapeador();
    const canción_repositorio = new CanciónRepositorio(canción_mapeador);

    const modulo_canción = new MóduloCanción(canción_repositorio);
    await this.agregarModulos(app, modulo_canción);

    const álbum_mapeador = new ÁlbumMapeador(canción_mapeador);
    const álbum_repositorio = new ÁlbumRepositorio(álbum_mapeador);

    const módulo_álbum = new MóduloÁlbum(álbum_repositorio);
    await this.agregarModulos(app, módulo_álbum);

    const artista_mapeador = new ArtistaMapeador(álbum_mapeador);
    const arista_repositorio = new ArtistaRepositorio(artista_mapeador);

    const módulo_artista = new MóduloArtista(arista_repositorio);
    await this.agregarModulos(app, módulo_artista);

    return app;
  };
}
