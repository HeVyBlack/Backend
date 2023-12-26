export interface Mapeador<TEntidad, TDTA, TDTO> {
  crearDTADesdeEntidad(entidad: TEntidad): TDTA;

  crearDTODesdeDTA(dta: TDTA): TDTO;

  crearEntidadDesdeDTO(dto: TDTO): TEntidad;

  mapearDTAs(dtas: TDTA[]): TDTO[];
}
