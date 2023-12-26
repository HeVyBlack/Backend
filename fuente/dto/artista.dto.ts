import { ÁlbumDTO } from './álbum.dto.ts';

export class ArtistaDTO {
  constructor(
    readonly nombre?: string,
    readonly año_fundación?: number,
    readonly álbumes?: ÁlbumDTO[]
  ) {}
}
