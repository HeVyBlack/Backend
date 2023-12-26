import { Type, Static } from '@sinclair/typebox';

export type CrearCanciónBody = Static<typeof CrearCanciónBody>;
export const CrearCanciónBody = Type.Object({
  nombre: Type.String(),
  duración: Type.Number(),
  nombre_banda: Type.String(),
  nombre_álbum: Type.String(),
});

export type ObtenerCanciónQuery = Static<typeof ObtenerCanciónQuery>;
export const ObtenerCanciónQuery = Type.Object({
  nombre: Type.Optional(Type.String()),
  nombre_banda: Type.Optional(Type.String()),
  nombre_álbum: Type.Optional(Type.String()),
});

export type ActualizarCanciónQuery = Static<typeof ActualizarCanciónQuery>;
export const ActualizarCanciónQuery = Type.Object({
  nombre: Type.Optional(Type.String()),
  duración: Type.Optional(Type.Number()),
  nombre_banda: Type.Optional(Type.String()),
  nombre_álbum: Type.Optional(Type.String()),
});

export type ActualizarCanciónBody = Static<typeof ActualizarCanciónBody>;
export const ActualizarCanciónBody = Type.Object({
  nombre: Type.Optional(Type.String()),
  duración: Type.Optional(Type.Number()),
  nombre_banda: Type.Optional(Type.String()),
  nombre_álbum: Type.Optional(Type.String()),
});

export type EliminarCanciónQuery = Static<typeof EliminarCanciónQuery>;
export const EliminarCanciónQuery = Type.Object({
  nombre: Type.Optional(Type.String()),
  nombre_banda: Type.Optional(Type.String()),
  nombre_álbum: Type.Optional(Type.String()),
});
