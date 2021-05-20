import { Ingrediente } from "../ingredients/ingredientes"
/**
 * Interfaz Plato. Permite definir los métodos que tendrá la clase Plato.
 */
 export interface PlatosI<G, K>{

  getIngredientes(): [Ingrediente, number][];
  getNombre(): string;
  getGrupoPredominante(): G;
  getComposicionNutricional(): K;
  getCategoria(): string;
  getPrecio(): number;
  addIngrediente(ingrediente: Ingrediente, cantidad: number): void;
  removeIngrediente(ingrediente: Ingrediente): void;
  setNombre(nombre: string): void;
  setGrupoPredominante(): void;
  setComposicionNutricional(): void;
  setCategoria(categoria: "Entrante" | "Primer plato" | "Segundo plato" | "Postre"): void;
  setPrecio(precio: number): void;
}