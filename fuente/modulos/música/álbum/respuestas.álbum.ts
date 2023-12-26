import { StatusCodes } from 'http-status-codes';
import { Respuesta } from '../../../http/respuesta.http.ts';
import { ÁlbumDTO } from '../../../dto/álbum.dto.ts';

export class RespuestaObtenerÁlbum extends Respuesta {
  constructor(readonly album: ÁlbumDTO[], código: StatusCodes, estado: string, mensaje?: string) {
    super(código, estado, mensaje);
  }
}
