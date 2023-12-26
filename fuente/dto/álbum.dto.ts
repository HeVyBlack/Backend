import { CanciónDTO } from './canción.dto.ts';

export class ÁlbumDTO {
  constructor(
    readonly nombre?: string,
    readonly año_lanzamiento?: number,
    readonly nombre_banda?: string,
    readonly canciones?: CanciónDTO[]
  ) {}
}
