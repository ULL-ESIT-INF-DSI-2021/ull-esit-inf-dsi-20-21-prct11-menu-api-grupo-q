import { ComposicionNutricional, GrupoAlimenticio, IngredienteJSON } from "../Ingredientes/tiposDefinidos";

export type PlatoJSON = {
  name: string;
  ingredientes: [IngredienteJSON, number][];
  categoria: string;
  composicionNutricional: ComposicionNutricional;
  grupoPredominante: GrupoAlimenticio;
  precio: number;
}