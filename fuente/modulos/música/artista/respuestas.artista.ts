import { StatusCodes } from 'http-status-codes';
import { ArtistaDTO } from '../../../dto/artista.dto.ts';
import { Respuesta } from '../../../http/respuesta.http.ts';

export class RespuestaObtenerArtista extends Respuesta {
  constructor(
    readonly artistas: ArtistaDTO[],
    código: StatusCodes,
    estado: string,
    mensaje?: string
  ) {
    super(código, estado, mensaje);
  }
}
