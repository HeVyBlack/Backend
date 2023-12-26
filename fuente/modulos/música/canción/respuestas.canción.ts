import { StatusCodes } from 'http-status-codes';
import { Respuesta } from '../../../http/respuesta.http.ts';
import { CanciónDTO } from '@Dto/canción.dto.ts';

export class RespuestaObtenerCanción extends Respuesta {
  constructor(
    readonly canciones: CanciónDTO[],
    código: StatusCodes,
    estado: string,
    mensaje?: string
  ) {
    super(código, estado, mensaje);
  }
}
