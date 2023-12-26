import { CanciónEntidad } from './canción.entidad.ts';

export class ÁlbumEntidad {
  constructor(
    readonly Nombre: string,
    readonly AñoLanzamiento: number,
    readonly NombreBanda: string,
    readonly Canciones: CanciónEntidad[]
  ) {}
}
