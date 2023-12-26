import { Type, Static } from '@sinclair/typebox';

export type CrearÁlbumBody = Static<typeof CrearÁlbumBody>;
export const CrearÁlbumBody = Type.Object({
  nombre: Type.String(),
  año_lanzamiento: Type.Number(),
  nombre_banda: Type.String(),
});

export type ActualizarÁlbumQuery = Static<typeof ActualizarÁlbumQuery>;
export const ActualizarÁlbumQuery = Type.Object({
  año: Type.Optional(Type.Number()),
  nombre: Type.Optional(Type.String()),
  nombre_banda: Type.Optional(Type.String()),
});

export type ActualizarÁlbumBody = Static<typeof ActualizarÁlbumBody>;
export const ActualizarÁlbumBody = Type.Object({
  nombre: Type.Optional(Type.String()),
  año_lanzamiento: Type.Optional(Type.Number()),
  nombre_banda: Type.Optional(Type.String()),
});

export type EliminarÁlbumQuery = Static<typeof EliminarÁlbumQuery>;
export const EliminarÁlbumQuery = Type.Object({
  nombre: Type.Optional(Type.String()),
  año_lanzamiento: Type.Optional(Type.Number()),
  nombre_banda: Type.Optional(Type.String()),
});

export type ObtenerÁlbumQuery = Static<typeof ObtenerÁlbumQuery>;
export const ObtenerÁlbumQuery = Type.Object({
  nombre: Type.Optional(Type.String()),
  año_lanzamiento: Type.Optional(Type.Number()),
  nombre_banda: Type.Optional(Type.String()),
});
