export class CanciónDTO {
  constructor(
    readonly nombre?: string,
    readonly duración?: number,
    readonly nombre_banda?: string,
    readonly nombre_álbum?: string
  ) {}
}
