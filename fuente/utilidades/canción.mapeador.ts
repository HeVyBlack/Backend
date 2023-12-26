import { CanciónEntidad } from '@Entidades/canción.entidad.ts';
import { CanciónDTA } from '@Dta/canción.dta.ts';
import { CanciónDTO } from '@Dto/canción.dto.ts';
import { Mapeador } from './mapeador.ts';

export class CanciónMapeador implements Mapeador<CanciónEntidad, CanciónDTA, CanciónDTO> {
  mapearDTAs(dtas: CanciónDTA[]): CanciónDTO[] {
    const dtos: CanciónDTO[] = [];

    for (const canción of dtas) {
      const dto = this.crearDTODesdeDTA(canción);
      dtos.push(dto);
    }

    return dtos;
  }

  crearDTODesdeDTA(dta: CanciónDTA): CanciónDTO {
    return new CanciónDTO(dta.nombre, dta.duración, dta.nombre_banda, dta.nombre_álbum);
  }

  crearDTADesdeEntidad(entidad: CanciónEntidad): CanciónDTA {
    return new CanciónDTA(
      entidad.Nombre,
      entidad.Duración,
      entidad.NombreBanda,
      entidad.NombreÁlbum
    );
  }

  crearEntidadDesdeDTO(dto: CanciónDTO): CanciónEntidad {
    return new CanciónEntidad(dto.nombre!, dto.duración!, dto.nombre_banda!, dto.nombre_álbum!);
  }
}
