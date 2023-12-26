import { CanciónRepositorio } from '@Repositorios/canción.repositorio.ts';
import {
  ActualizarCanciónBody,
  ActualizarCanciónQuery,
  CrearCanciónBody,
  EliminarCanciónQuery,
  ObtenerCanciónQuery,
} from './esquemas.canción.ts';
import { CanciónDTO } from '@Dto/canción.dto.ts';
import { Mapeador } from '../../../utilidades/mapeador.ts';
import { CanciónEntidad } from '../../../entidades/canción.entidad.ts';
import { CanciónDTA } from '../../../dta/canción.dta.ts';

export class ServicioCanción {
  public constructor(
    private readonly canción_repositorio: CanciónRepositorio,
    private readonly mapeador: Mapeador<CanciónEntidad, CanciónDTA, CanciónDTO>
  ) {}

  async obtenerCanción(filtro: ObtenerCanciónQuery) {
    if (filtro.nombre) {
      const canciones = await this.canción_repositorio.obtenerCanciónPorNombre(filtro.nombre);
      return this.mapeador.mapearDTAs(canciones);
    }

    if (filtro.nombre_banda) {
      const canciones = await this.canción_repositorio.obtenerCanciónPorNombreBanda(
        filtro.nombre_banda
      );
      return this.mapeador.mapearDTAs(canciones);
    }

    if (filtro.nombre_álbum) {
      const canciones = await this.canción_repositorio.obtenerCanciónPorNombreÁlbum(
        filtro.nombre_álbum
      );

      return this.mapeador.mapearDTAs(canciones);
    }

    return null;
  }

  async crearCanción(esquema: CrearCanciónBody): P<void> {
    const canción_dto = new CanciónDTO(
      esquema.nombre,
      esquema.duración,
      esquema.nombre_banda,
      esquema.nombre_álbum
    );

    await this.canción_repositorio.insertarCanción(canción_dto);
  }

  async actualizarCancion(filtro: ActualizarCanciónQuery, esquema: ActualizarCanciónBody) {
    const canción_dto = new CanciónDTO(
      esquema.nombre,
      esquema.duración,
      esquema.nombre_banda,
      esquema.nombre_álbum
    );

    if (filtro.nombre) {
      return await this.canción_repositorio.actualizarCanciónPorNombre(filtro.nombre, canción_dto);
    }

    if (filtro.nombre_banda) {
      return await this.canción_repositorio.actualizarCanciónPorNombreBanda(
        filtro.nombre_banda,
        canción_dto
      );
    }

    if (filtro.duración) {
      return await this.canción_repositorio.actualizarCanciónPorDuracion(
        filtro.duración,
        canción_dto
      );
    }

    if (filtro.nombre_álbum) {
      return await this.canción_repositorio.actualizarCanciónPorNombreÁlbum(
        filtro.nombre_álbum,
        canción_dto
      );
    }
  }

  async eliminarCanción(filtro: EliminarCanciónQuery) {
    if (filtro.nombre) {
      return await this.canción_repositorio.eliminarCanciónPorNombre(filtro.nombre);
    }

    if (filtro.nombre_banda) {
      return await this.canción_repositorio.eliminarCanciónPorNombreArtista(filtro.nombre_banda);
    }

    if (filtro.nombre_álbum) {
      return await this.canción_repositorio.eliminarCanciónPorNombreÁlbum(filtro.nombre_álbum);
    }
  }
}
