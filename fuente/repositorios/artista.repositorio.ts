import { Filter, FindCursor, UpdateFilter, WithId } from 'mongodb';
import { ArtistaDTO } from '../dto/artista.dto.ts';
import { ArtistaEntidad } from '../entidades/artista.entidad.ts';
import { Mongo } from './mongo.ts';
import { ArtistaDTA } from '../dta/artista.dta.ts';
import { Mapeador } from '../utilidades/mapeador.ts';

export class ArtistaRepositorio extends Mongo<ArtistaEntidad> {
  private crearActualizarFiltro(dto: ArtistaDTO): UpdateFilter<ArtistaEntidad> {
    const actualizar: Partial<ArtistaEntidad> = {};

    if (dto.nombre) actualizar.Nombre = dto.nombre;
    if (dto.año_fundación) actualizar.AñoFormación = dto.año_fundación;

    return actualizar;
  }

  constructor(private readonly artista_mapeador: Mapeador<ArtistaEntidad, ArtistaDTA, ArtistaDTO>) {
    super('Artistas');
  }

  public obtenerMapeador() {
    return this.artista_mapeador;
  }

  async insertarArtista(dto: ArtistaDTO): P<void> {
    const entidad = this.artista_mapeador.crearEntidadDesdeDTO(dto);
    await this.collección.insertOne(entidad);
  }

  private async usarCursor(cursor: FindCursor<WithId<ArtistaEntidad>>): P<ArtistaDTA[]> {
    const artistas_dto: ArtistaDTA[] = [];

    while (await cursor.hasNext()) {
      const álbum = await cursor.next();
      if (álbum == null) continue;

      artistas_dto.push(this.artista_mapeador.crearDTADesdeEntidad(álbum));
    }

    return artistas_dto;
  }

  async obtenerArtistaPorNombre(nombre: string): P<ArtistaDTA[]> {
    const cursor = this.collección.find({ Nombre: { $eq: nombre } });

    const artistas_dto = await this.usarCursor(cursor);

    if (artistas_dto.length == 0) throw new Error('ARTISTAS_NO_ENCONTRADO_SEGUN_CRITERIO');

    return artistas_dto;
  }

  async obtenerArtistaPorAño(año: number): P<ArtistaDTA[]> {
    const cursor = this.collección.find({ AñoFormación: { $eq: año } });

    const artistas_dto = await this.usarCursor(cursor);

    if (artistas_dto.length == 0) throw new Error('ARTISTAS_NO_ENCONTRADO_SEGUN_CRITERIO');

    return artistas_dto;
  }

  async actualizarArtistaPorNombre(nombre: string, dto: ArtistaDTO): P<void> {
    const filtro: Filter<ArtistaEntidad> = { Nombre: { $eq: nombre } };
    const actualizar = this.crearActualizarFiltro(dto);
    const actualizado = await this.collección.updateMany(filtro, actualizar);

    if (actualizado.matchedCount === 0) throw new Error('ARTISTAS_NO_ENCONTRADO_SEGUN_CRITERIO');
  }

  async actualizarArtistaPorAño(año: number, dto: ArtistaDTO): P<void> {
    const filtro: Filter<ArtistaEntidad> = { AñoFormación: { $eq: año } };
    const actualizar = this.crearActualizarFiltro(dto);
    const actualizado = await this.collección.updateMany(filtro, actualizar);

    if (actualizado.matchedCount === 0) throw new Error('ARTISTAS_NO_ENCONTRADO_SEGUN_CRITERIO');
  }

  async eliminarArtistaPorNombre(nombre: string) {
    const filtro: Filter<ArtistaEntidad> = { Nombre: { $eq: nombre } };
    const eliminado = await this.collección.deleteMany(filtro);

    if (eliminado.deletedCount == 0) throw new Error('ARTISTAS_NO_ENCONTRADO_SEGUN_CRITERIO');
  }

  async eliminarArtistaPorAño(año: number) {
    const filtro: Filter<ArtistaEntidad> = { AñoFormación: { $eq: año } };
    const eliminado = await this.collección.deleteMany(filtro);

    if (eliminado.deletedCount == 0) throw new Error('ARTISTAS_NO_ENCONTRADO_SEGUN_CRITERIO');
  }
}
