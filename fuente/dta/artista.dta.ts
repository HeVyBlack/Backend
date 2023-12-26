import { ÁlbumDTA } from './álbum.dta.ts';

export class ArtistaDTA {
  constructor(
    readonly nombre: string,
    readonly año_fundación: number,
    readonly álbumes: ÁlbumDTA[]
  ) {}
}
