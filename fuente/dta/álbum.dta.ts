import { CanciónDTA } from './canción.dta.ts';

export class ÁlbumDTA {
  constructor(
    readonly nombre?: string,
    readonly año_lanzamiento?: number,
    readonly nombre_banda?: string,
    readonly canciones?: CanciónDTA[]
  ) {}
}
