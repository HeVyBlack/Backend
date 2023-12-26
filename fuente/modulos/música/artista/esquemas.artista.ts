import { Type, Static } from '@sinclair/typebox';

export type CrearArtistaBody = Static<typeof CrearArtistaBody>;
export const CrearArtistaBody = Type.Object({
  nombre: Type.String(),
  año_fundación: Type.Number(),
});

export type AcutalizarArtistaQuery = Static<typeof AcutalizarArtistaQuery>;
export const AcutalizarArtistaQuery = Type.Object({
  año: Type.Optional(Type.Number()),
  nombre: Type.Optional(Type.String()),
});

export type ActualizarArtistaBody = Static<typeof ActualizarArtistaBody>;
export const ActualizarArtistaBody = Type.Object({
  nombre: Type.Optional(Type.String()),
  año_fundación: Type.Optional(Type.Number()),
});

export type EliminarArtistaQuery = Static<typeof EliminarArtistaQuery>;
export const EliminarArtistaQuery = Type.Object({
  nombre: Type.Optional(Type.String()),
  año_fundación: Type.Optional(Type.Number()),
});

export type ObtenerArtistaQuery = Static<typeof ObtenerArtistaQuery>;
export const ObtenerArtistaQuery = Type.Object({
  nombre: Type.Optional(Type.String()),
  año_fundación: Type.Optional(Type.Number()),
});
