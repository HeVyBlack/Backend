import { AplicaciónInstancia } from '@Fuente/aplicación.ts';

export abstract class Módulo {
  abstract readonly prefijo: string;

  abstract readonly complemento: (app: AplicaciónInstancia) => P<AplicaciónInstancia>;
}
