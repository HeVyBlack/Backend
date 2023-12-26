import { ÁlbumEntidad } from './álbum.entidad.ts';

export class ArtistaEntidad {
  constructor(public Nombre: string, public AñoFormación: number, public Álbumes: ÁlbumEntidad[]) {}
}
