import { ComposicionNutricional, GrupoAlimenticio, IngredienteJSON } from "../Ingredientes/tiposDefinidos";

export type PlatoJSON = {
  nombre: string;
  ingredientes: [IngredienteJSON, number][];
  categoria: "Entrante" | "Primer plato" | "Segundo plato" | "Postre";
  composicionNutricional: ComposicionNutricional;
  grupoPredominante: GrupoAlimenticio;
  precio: number;
}