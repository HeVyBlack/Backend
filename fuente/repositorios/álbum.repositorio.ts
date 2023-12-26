import { Mongo } from './mongo.ts';
import { ÁlbumEntidad } from '@Entidades/álbum.entidad.ts';
import { Filter, FindCursor, UpdateFilter, WithId } from 'mongodb';
import { ÁlbumDTO } from '@Dto/álbum.dto.ts';
import { ÁlbumDTA } from '@Dta/álbum.dta.ts';
import { Mapeador } from '../utilidades/mapeador.ts';

export class ÁlbumRepositorio extends Mongo<ÁlbumEntidad> {
  private crearActualizarFiltro(dto: ÁlbumDTO): Filter<ÁlbumEntidad> {
    const actualizar: UpdateFilter<ÁlbumEntidad> = {};

    if (dto.nombre) actualizar['Nombre'] = { $set: dto.nombre };
    if (dto.nombre_banda) actualizar['NombreBanda'] = { $set: dto.nombre_banda };
    if (dto.año_lanzamiento) actualizar['AñoLanzamiento'] = { $set: dto.año_lanzamiento };

    return actualizar;
  }

  constructor(private readonly álbum_mapeador: Mapeador<ÁlbumEntidad, ÁlbumDTA, ÁlbumDTO>) {
    super('Álbumes');
  }

  public obtenerMapeador() {
    return this.álbum_mapeador;
  }

  async insertarÁlbum(dto: ÁlbumDTO): P<void> {
    const entidad = this.álbum_mapeador.crearEntidadDesdeDTO(dto);
    await this.collección.insertOne(entidad);
  }

  private async usarCursor(cursor: FindCursor<WithId<ÁlbumEntidad>>): P<ÁlbumDTA[]> {
    const álbumes_dto: ÁlbumDTA[] = [];

    while (await cursor.hasNext()) {
      const álbum = await cursor.next();
      if (álbum == null) continue;

      álbumes_dto.push(this.álbum_mapeador.crearDTADesdeEntidad(álbum));
    }

    return álbumes_dto;
  }

  async obtenerÁlbumPorNombre(nombre: string): P<ÁlbumDTA[]> {
    const cursor = this.collección.find({ Nombre: { $eq: nombre } });

    const álbumes_dto = await this.usarCursor(cursor);

    if (álbumes_dto.length == 0) throw new Error('ÁLBUMES_NO_ENCONTRADO_SEGUN_CRITERIO');

    return álbumes_dto;
  }

  async obtenerÁlbumPorNombreBanda(nombre: string): P<ÁlbumDTA[]> {
    const cursor = this.collección.find({
      NombreBanda: { $eq: nombre },
    });

    const álbumes_dto = await this.usarCursor(cursor);

    if (álbumes_dto.length == 0) throw new Error('ÁLBUMES_NO_ENCONTRADO_SEGUN_CRITERIO');

    return álbumes_dto;
  }

  async obtenerÁlbumPorAño(año: number): P<ÁlbumDTA[]> {
    const cursor = this.collección.find({
      AñoLanzamiento: { $eq: año },
    });

    const álbumes_dto = await this.usarCursor(cursor);

    if (álbumes_dto.length == 0) throw new Error('ÁLBUMES_NO_ENCONTRADO_SEGUN_CRITERIO');

    return álbumes_dto;
  }

  async actualizarÁlbumPorNombre(nombre: string, dto: ÁlbumDTO): P<void> {
    const filtro: Filter<ÁlbumEntidad> = { Nombre: { $eq: nombre } };
    const actualizar = this.crearActualizarFiltro(dto);
    const actualizado = await this.collección.updateMany(filtro, actualizar);

    if (actualizado.matchedCount === 0) throw new Error('ÁLBUMES_NO_ENCONTRADO_SEGUN_CRITERIO');
  }

  async actualizarÁlbumPorNombreBanda(nombre: string, dto: ÁlbumDTO): P<void> {
    const filtro: Filter<ÁlbumEntidad> = { Nombre: { $eq: nombre } };
    const actualizar = this.crearActualizarFiltro(dto);
    const actualizado = await this.collección.updateMany(filtro, actualizar);

    if (actualizado.matchedCount === 0) throw new Error('ÁLBUMES_NO_ENCONTRADO_SEGUN_CRITERIO');
  }

  async actualizarÁlbumPorNombreAño(año: number, dto: ÁlbumDTO): P<void> {
    const filtro: Filter<ÁlbumEntidad> = { AñoLanzamiento: { $eq: año } };
    const actualizar = this.crearActualizarFiltro(dto);
    const actualizado = await this.collección.updateMany(filtro, actualizar);

    if (actualizado.matchedCount === 0) throw new Error('ÁLBUMES_NO_ENCONTRADO_SEGUN_CRITERIO');
  }

  async eliminarÁlbumPorNombre(nombre: string) {
    const eliminados = await this.collección.deleteMany({
      Nombre: { $eq: nombre },
    });

    if (eliminados.deletedCount == 0) throw new Error('ÁLBUMES_NO_ENCONTRADO_SEGUN_CRITERIO');
  }

  async eliminarÁlbumPorNombreBanda(nombre: string) {
    const eliminados = await this.collección.deleteMany({
      NombreBanda: { $eq: nombre },
    });

    if (eliminados.deletedCount == 0) throw new Error('ÁLBUMES_NO_ENCONTRADO_SEGUN_CRITERIO');
  }

  async eliminarÁlbumPorAño(año: number) {
    const eliminados = await this.collección.deleteMany({
      AñoLanzamiento: { $eq: año },
    });

    if (eliminados.deletedCount == 0) throw new Error('ÁLBUMES_NO_ENCONTRADO_SEGUN_CRITERIO');
  }
}
