import { StatusCodes } from 'http-status-codes';

export class Respuesta {
  constructor(readonly código: StatusCodes, readonly estado: string, readonly mensaje?: string) {}
}
