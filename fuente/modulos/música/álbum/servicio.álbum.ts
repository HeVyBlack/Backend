import { ÁlbumRepositorio } from '@Repositorios/álbum.repositorio.ts';
import { ÁlbumDTO } from '@Dto/álbum.dto.ts';
import {
  ActualizarÁlbumQuery,
  CrearÁlbumBody,
  ActualizarÁlbumBody,
  EliminarÁlbumQuery,
  ObtenerÁlbumQuery,
} from './esquemas.álbum.ts';
import { Mapeador } from '../../../utilidades/mapeador.ts';
import { ÁlbumEntidad } from '../../../entidades/álbum.entidad.ts';
import { ÁlbumDTA } from '../../../dta/álbum.dta.ts';

export class ServicioÁlbum {
  constructor(
    private readonly álbum_repository: ÁlbumRepositorio,
    private readonly mapeador: Mapeador<ÁlbumEntidad, ÁlbumDTA, ÁlbumDTO>
  ) {}

  async crearÁlbum(esquema: CrearÁlbumBody): P<void> {
    const dto = new ÁlbumDTO(esquema.nombre, esquema.año_lanzamiento, esquema.nombre_banda);

    await this.álbum_repository.insertarÁlbum(dto);
  }

  async actualizarÁlbum(query: ActualizarÁlbumQuery, esquema: ActualizarÁlbumBody): P<void> {
    const dto = new ÁlbumDTO(esquema.nombre, esquema.año_lanzamiento, esquema.nombre_banda);

    if (query.año) {
      return await this.álbum_repository.actualizarÁlbumPorNombreAño(query.año, dto);
    }

    if (query.nombre) {
      return await this.álbum_repository.actualizarÁlbumPorNombre(query.nombre, dto);
    }

    if (query.nombre_banda) {
      return await this.álbum_repository.actualizarÁlbumPorNombreBanda(query.nombre_banda, dto);
    }
  }

  async eliminarÁlbum(query: EliminarÁlbumQuery) {
    if (query.año_lanzamiento) {
      return await this.álbum_repository.eliminarÁlbumPorAño(query.año_lanzamiento);
    }

    if (query.nombre) {
      return await this.álbum_repository.eliminarÁlbumPorNombre(query.nombre);
    }

    if (query.nombre_banda) {
      return await this.álbum_repository.eliminarÁlbumPorNombreBanda(query.nombre_banda);
    }

    return null;
  }

  async obtenerÁlbum(query: ObtenerÁlbumQuery) {
    if (query.año_lanzamiento) {
      const álbumes = await this.álbum_repository.obtenerÁlbumPorAño(query.año_lanzamiento);
      return this.mapeador.mapearDTAs(álbumes);
    }

    if (query.nombre) {
      const álbumes = await this.álbum_repository.obtenerÁlbumPorNombre(query.nombre);
      return this.mapeador.mapearDTAs(álbumes);
    }

    if (query.nombre_banda) {
      const álbumes = await this.álbum_repository.obtenerÁlbumPorNombreBanda(query.nombre_banda);
      return this.mapeador.mapearDTAs(álbumes);
    }

    return null;
  }
}
