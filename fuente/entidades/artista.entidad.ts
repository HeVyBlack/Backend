import { ÁlbumEntidad } from './álbum.entidad.ts';

export class ArtistaEntidad {
  constructor(
    readonly Nombre: string,
    readonly AñoFormación: number,
    readonly Álbumes: ÁlbumEntidad[]
  ) {}
}
