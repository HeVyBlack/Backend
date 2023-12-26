import { ArtistaRepositorio } from '@Repositorios/artista.repositorio.ts';
import {
  ActualizarArtistaBody,
  AcutalizarArtistaQuery,
  CrearArtistaBody,
  EliminarArtistaQuery,
  ObtenerArtistaQuery,
} from './esquemas.artista.ts';
import { ArtistaDTO } from '@Dto/artista.dto.ts';
import { Mapeador } from '../../../utilidades/mapeador.ts';
import { ArtistaDTA } from '../../../dta/artista.dta.ts';
import { ArtistaEntidad } from '../../../entidades/artista.entidad.ts';

export class ServicioArtista {
  public constructor(
    private readonly artista_repositorio: ArtistaRepositorio,
    private readonly mapeador: Mapeador<ArtistaEntidad, ArtistaDTA, ArtistaDTO>
  ) {}

  async crearArtista(esquema: CrearArtistaBody): P<void> {
    const artista_dto = new ArtistaDTO(esquema.nombre, esquema.año_fundación);

    await this.artista_repositorio.insertarArtista(artista_dto);
  }

  async actualizarArtista(query: AcutalizarArtistaQuery, esquema: ActualizarArtistaBody): P<void> {
    const artista_dto = new ArtistaDTO(esquema.nombre, esquema.año_fundación);

    if (query.año) {
      return await this.artista_repositorio.actualizarArtistaPorAño(query.año, artista_dto);
    }

    if (query.nombre) {
      return await this.artista_repositorio.actualizarArtistaPorNombre(query.nombre, artista_dto);
    }
  }

  async eliminarArtista(query: EliminarArtistaQuery) {
    if (query.año_fundación) {
      return await this.artista_repositorio.eliminarArtistaPorAño(query.año_fundación);
    }

    if (query.nombre) {
      await this.artista_repositorio.eliminarArtistaPorNombre(query.nombre);
    }
  }

  async obtenerArtista(query: ObtenerArtistaQuery) {
    if (query.año_fundación) {
      const artistas = await this.artista_repositorio.obtenerArtistaPorAño(query.año_fundación);
      return this.mapeador.mapearDTAs(artistas);
    }

    if (query.nombre) {
      const artistas = await this.artista_repositorio.obtenerArtistaPorNombre(query.nombre);
      return this.mapeador.mapearDTAs(artistas);
    }

    return null;
  }
}
