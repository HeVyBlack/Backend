import { CanciónDTA } from '../dta/canción.dta.ts';
import { ÁlbumDTA } from '../dta/álbum.dta.ts';
import { CanciónDTO } from '../dto/canción.dto.ts';
import { ÁlbumDTO } from '../dto/álbum.dto.ts';
import { CanciónEntidad } from '../entidades/canción.entidad.ts';
import { ÁlbumEntidad } from '../entidades/álbum.entidad.ts';
import { Mapeador } from './mapeador.ts';

export class ÁlbumMapeador implements Mapeador<ÁlbumEntidad, ÁlbumDTA, ÁlbumDTO> {
  constructor(
    private readonly canción_utilidad: Mapeador<CanciónEntidad, CanciónDTA, CanciónDTO>
  ) {}

  mapearDTAs(dtas: ÁlbumDTA[]): ÁlbumDTO[] {
    const dtos: ÁlbumDTO[] = [];

    for (const canción of dtas) {
      const dto = this.crearDTODesdeDTA(canción);
      dtos.push(dto);
    }

    return dtos;
  }

  crearDTODesdeDTA(dta: ÁlbumDTA): ÁlbumDTO {
    return new ÁlbumDTO(dta.nombre, dta.año_lanzamiento, dta.nombre_banda, dta.canciones);
  }

  crearDTADesdeEntidad(entidad: ÁlbumEntidad): ÁlbumDTA {
    const canciones: CanciónDTA[] = [];

    if (entidad.Canciones) {
      for (const cancion of entidad.Canciones) {
        canciones.push(this.canción_utilidad.crearDTADesdeEntidad(cancion));
      }
    }

    return new ÁlbumDTA(entidad.Nombre, entidad.AñoLanzamiento, entidad.NombreBanda, canciones);
  }

  crearEntidadDesdeDTO(dto: ÁlbumDTO): ÁlbumEntidad {
    const canciones: CanciónEntidad[] = [];

    if (dto.canciones) {
      for (const cancion of dto.canciones) {
        const entidad = this.canción_utilidad.crearEntidadDesdeDTO(cancion);
        canciones.push(entidad);
      }
    }

    return new ÁlbumEntidad(dto.nombre!, dto.año_lanzamiento!, dto.nombre_banda!, canciones);
  }
}
