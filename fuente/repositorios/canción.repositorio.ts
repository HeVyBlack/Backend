import { CanciónEntidad } from '@Entidades/canción.entidad.ts';
import { Mongo } from './mongo.ts';
import { CanciónDTA } from '@Dta/canción.dta.ts';
import { Filter, FindCursor, UpdateFilter, WithId } from 'mongodb';
import { CanciónDTO } from '@Dto/canción.dto.ts';
import { Mapeador } from '../utilidades/mapeador.ts';

export class CanciónRepositorio extends Mongo<CanciónEntidad> {
  private crearActualizarFiltro(dto: CanciónDTO): Filter<CanciónEntidad> {
    const actualizar: UpdateFilter<CanciónEntidad> = {};

    if (dto.nombre) actualizar['Nombre'] = { $set: dto.nombre };
    if (dto.duración) actualizar['Duración'] = { $set: dto.duración };
    if (dto.nombre_banda) actualizar['NombreBanda'] = { $set: dto.nombre_banda };
    if (dto.nombre_álbum) actualizar['NombreÁlbum'] = { $set: dto.nombre_álbum };

    return actualizar;
  }

  public constructor(
    private readonly canción_mapeador: Mapeador<CanciónEntidad, CanciónDTA, CanciónDTO>
  ) {
    super('Canciones');
  }

  async insertarCanción(dto: CanciónDTO): P<void> {
    const entidad = this.canción_mapeador.crearEntidadDesdeDTO(dto);
    await this.collección.insertOne(entidad);
  }

  private async usarCursor(cursor: FindCursor<WithId<CanciónEntidad>>): P<CanciónDTA[]> {
    const canciones_dto: CanciónDTA[] = [];

    while (await cursor.hasNext()) {
      const álbum = await cursor.next();
      if (álbum == null) continue;

      canciones_dto.push(this.canción_mapeador.crearDTADesdeEntidad(álbum));
    }

    return canciones_dto;
  }

  async obtenerCanciónPorNombre(nombre: string): P<CanciónDTA[]> {
    const cursor = this.collección.find({ Nombre: { $eq: nombre } });

    const canciones_dto = await this.usarCursor(cursor);

    if (canciones_dto.length == 0) throw new Error('CANCIONES_NO_ENCONTRADAS_SEGUN_CRITERIO');

    return canciones_dto;
  }

  async obtenerCanciónPorNombreBanda(nombre: string): P<CanciónDTA[]> {
    const cursor = this.collección.find({ NombreBanda: { $eq: nombre } });

    const canciones_dto = await this.usarCursor(cursor);

    if (canciones_dto.length == 0) throw new Error('CANCIONES_NO_ENCONTRADAS_SEGUN_CRITERIO');

    return canciones_dto;
  }

  async obtenerCanciónPorNombreÁlbum(nombre: string): P<CanciónDTA[]> {
    const cursor = this.collección.find({ NombreÁlbum: { $eq: nombre } });

    const canciones_dto = await this.usarCursor(cursor);

    if (canciones_dto.length == 0) throw new Error('CANCIONES_NO_ENCONTRADAS_SEGUN_CRITERIO');

    return canciones_dto;
  }

  async actualizarCanciónPorNombre(nombre: string, dto: CanciónDTO): P<void> {
    const filtro: Filter<CanciónEntidad> = { Nombre: { $eq: nombre } };
    const actualizar = this.crearActualizarFiltro(dto);
    const actualizado = await this.collección.updateMany(filtro, actualizar);

    if (actualizado.matchedCount === 0) throw new Error('CANCIONES_NO_ENCONTRADO_SEGUN_CRITERIO');
  }

  async actualizarCanciónPorNombreBanda(nombre: string, dto: CanciónDTO): P<void> {
    const filtro: Filter<CanciónEntidad> = { Nombre: { $eq: nombre } };
    const actualizar = this.crearActualizarFiltro(dto);
    const actualizado = await this.collección.updateMany(filtro, actualizar);

    if (actualizado.matchedCount === 0) throw new Error('CANCIONES_NO_ENCONTRADO_SEGUN_CRITERIO');
  }

  async actualizarCanciónPorDuracion(duración: number, dto: CanciónDTO): P<void> {
    const filtro: Filter<CanciónEntidad> = { Duración: { $eq: duración } };
    const actualizar = this.crearActualizarFiltro(dto);
    const actualizado = await this.collección.updateMany(filtro, actualizar);

    if (actualizado.matchedCount === 0) throw new Error('CANCIONES_NO_ENCONTRADO_SEGUN_CRITERIO');
  }

  async actualizarCanciónPorNombreÁlbum(nombre: string, dto: CanciónDTO): P<void> {
    const filtro: Filter<CanciónEntidad> = { Nombre: { $eq: nombre } };
    const actualizar = this.crearActualizarFiltro(dto);
    const actualizado = await this.collección.updateMany(filtro, actualizar);

    if (actualizado.matchedCount === 0) throw new Error('CANCIONES_NO_ENCONTRADO_SEGUN_CRITERIO');
  }

  async eliminarCanciónPorNombre(nombre: string) {
    const resultado = await this.collección.deleteMany({
      Nombre: { $eq: nombre },
    });

    if (resultado.deletedCount === 0) throw new Error('CANCIONES_NO_ENCONTRADO_SEGUN_CRITERIO');
  }

  async eliminarCanciónPorNombreÁlbum(nombre: string) {
    const resultado = await this.collección.deleteMany({
      NombreÁlbum: { $eq: nombre },
    });

    if (resultado.deletedCount === 0) throw new Error('CANCIONES_NO_ENCONTRADO_SEGUN_CRITERIO');
  }

  async eliminarCanciónPorNombreArtista(nombre: string) {
    const resultado = await this.collección.deleteMany({
      NombreBanda: { $eq: nombre },
    });

    if (resultado.deletedCount === 0) throw new Error('CANCIONES_NO_ENCONTRADO_SEGUN_CRITERIO');
  }
}
