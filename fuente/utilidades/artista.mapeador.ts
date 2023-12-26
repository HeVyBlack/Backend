import { ArtistaDTA } from '../dta/artista.dta.ts';
import { ÁlbumDTA } from '../dta/álbum.dta.ts';
import { ArtistaDTO } from '../dto/artista.dto.ts';
import { ÁlbumDTO } from '../dto/álbum.dto.ts';
import { ArtistaEntidad } from '../entidades/artista.entidad.ts';
import { ÁlbumEntidad } from '../entidades/álbum.entidad.ts';
import { Mapeador } from './mapeador.ts';

export class ArtistaMapeador implements Mapeador<ArtistaEntidad, ArtistaDTA, ArtistaDTO> {
  constructor(private readonly álbum_mapeador: Mapeador<ÁlbumEntidad, ÁlbumDTA, ÁlbumDTO>) {}

  mapearDTAs(dtas: ArtistaDTA[]): ArtistaDTO[] {
    const dtos: ArtistaDTO[] = [];

    for (const canción of dtas) {
      const dto = this.crearDTODesdeDTA(canción);
      dtos.push(dto);
    }

    return dtos;
  }

  crearDTODesdeDTA(dta: ArtistaDTA): ArtistaDTO {
    return new ArtistaDTO(dta.nombre, dta.año_fundación, dta.álbumes);
  }

  crearDTADesdeEntidad(entidad: ArtistaEntidad): ArtistaDTA {
    const álbumes: ÁlbumDTA[] = [];

    if (entidad.Álbumes)
      for (const album of entidad.Álbumes) {
        const entidad = this.álbum_mapeador.crearDTADesdeEntidad(album);
        álbumes.push(entidad);
      }

    return new ArtistaDTA(entidad.Nombre, entidad.AñoFormación, álbumes);
  }

  crearEntidadDesdeDTO(dto: ArtistaDTO): ArtistaEntidad {
    const álbumes: ÁlbumEntidad[] = [];

    if (dto.álbumes)
      for (const álbum of dto.álbumes) {
        álbumes.push(this.álbum_mapeador.crearEntidadDesdeDTO(álbum));
      }

    return new ArtistaEntidad(dto.nombre!, dto.año_fundación!, álbumes);
  }
}
