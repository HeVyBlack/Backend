import { CanciónEntidad } from './canción.entidad.ts';

export class ÁlbumEntidad {
  constructor(
    public Nombre: string,
    public AñoLanzamiento: number,
    public NombreBanda: string,
    public Canciones: CanciónEntidad[]
  ) {}
}
