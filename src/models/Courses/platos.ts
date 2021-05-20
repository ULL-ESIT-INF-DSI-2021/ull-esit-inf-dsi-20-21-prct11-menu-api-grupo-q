import { Ingrediente } from "../Ingredients/ingredientes"
import { ComposicionNutricional, GrupoAlimenticio } from "../Ingredients/tiposDefinidos"
import { PlatosI } from "./interfazPlatos";

/**
 * Clase Platos. Permite instanciar objetos de tipo plato. Las propiedades que
 * tiene un ingrediente son: Nombre, ingredientes , su composición nutricional,
 * la ciudad y el país de origen y el precio.
 */
 export class Platos implements PlatosI<GrupoAlimenticio, ComposicionNutricional>{

  private composicionNutricional: ComposicionNutricional = { lipidos: 0, hCarbono: 0, proteinas: 0, kCal: 0};
  private grupoPredominante: GrupoAlimenticio = { numGrupo: 0, grupo: [""] };
  private precio: number = 0;

    /**
     * Constructor de la clase Ingrediente.
     * @param ingredientes Vector de pares que contiene los ingredientes de cada plato y su cantidad.
     * @param categoria Tipo de plato.
     * @param composicionNutricional Composición nutricional del ingrediente [Proteínas, Lípidos, Hidratos de Carbono].
     * @param precio Precio del ingrediente.
     */
    constructor(private name: string, private ingredientes: [Ingrediente, number][], private categoria: "Entrante" | "Primer plato" | "Segundo plato" | "Postre"){   
        this.name = name;
        this.ingredientes = ingredientes;
        this.categoria = categoria; 

        let cantporGrupo: [number, number, number, number, number] = [0,0,0,0,0];
        this.ingredientes.forEach((item) => {
          this.composicionNutricional.lipidos = this.composicionNutricional.lipidos + ((item[0].getComposicionNutricional().lipidos*item[1])/100);
          this.composicionNutricional.hCarbono = this.composicionNutricional.hCarbono + ((item[0].getComposicionNutricional().hCarbono*item[1])/100);
          this.composicionNutricional.proteinas = this.composicionNutricional.proteinas + ((item[0].getComposicionNutricional().proteinas*item[1])/100);
          this.composicionNutricional.kCal = this.composicionNutricional.kCal + ((item[0].getComposicionNutricional().kCal*item[1])/100);

          if (item[0].getGrupoAlimenticio().numGrupo == 1) cantporGrupo[0] += item[1];
          if (item[0].getGrupoAlimenticio().numGrupo == 2) cantporGrupo[1] += item[1];
          if (item[0].getGrupoAlimenticio().numGrupo == 3) cantporGrupo[2] += item[1];
          if (item[0].getGrupoAlimenticio().numGrupo == 4) cantporGrupo[3] += item[1];
          if (item[0].getGrupoAlimenticio().numGrupo == 5) cantporGrupo[4] += item[1];
          
          this.precio = this.precio + (item[0].getPrecio()*item[1] / 1000);
        });

        this.ingredientes[0][0].setGrupoAlimenticio(cantporGrupo.indexOf(Math.max.apply(null, cantporGrupo)) + 1)
        this.grupoPredominante = this.ingredientes[0][0].getGrupoAlimenticio();    
      }

    /**
     * Método getter para obtener el name.
     * @returns Se retorna la categoría del plato si es entrante, primer plato, segundo plato o postre
     */
    getNombre() {
      return this.name
    }
    
    /**
     * Método setter para establecer el nombre al plato.
     * @param name El nombre nuevo a introducir
     */
    setNombre(name: string) {
      this.name = name;
    }

    /**
     * Método getter para obtener los ingredientes.
     * @returns Se retorna los ingredientes del plato
     */
    getIngredientes() {
      return this.ingredientes;
    }

    /**
     * Método para añadir un Ingrediente nuevo.
     * @param ingrediente Ingrediente que queremos añadir.
     * @param cantidad Cantidad del tipo de Ingrediente que vamos a añadir.
     */
    addIngrediente(ingrediente: Ingrediente, cantidad: number) {
      this.ingredientes.push([ingrediente, cantidad]);

      this.setComposicionNutricional();
      this.setGrupoPredominante();
      this.setPrecio();
    }

    /**
     * Método para eliminar un ingrediente de nuestro vector.
     * @param ingrediente Ingrediente que queremos eliminar.
     */
    removeIngrediente(ingrediente: Ingrediente) {
      let i: number = 0;
      let indice: number = 0;
      this.ingredientes.forEach((item) => {
        if (item[0] == ingrediente) {
          indice = i;
        }
        i++;
      });

      this.ingredientes.splice(indice, 1);
      
      this.setComposicionNutricional();
      this.setGrupoPredominante();
      this.setPrecio();
    }

    /**
     * Método getter para obtener la composición nutricional.
     * @returns Se retorna composición nutricional en forma del tipo de dato composición nutricional
     */
    getComposicionNutricional() {
      return this.composicionNutricional;
    }

    /**
     * Método setter para obtener la composición nutricional.
     */
    setComposicionNutricional() {
      this.composicionNutricional.lipidos = 0;
      this.composicionNutricional.hCarbono = 0;
      this.composicionNutricional.proteinas = 0;
      this.composicionNutricional.kCal = 0;

      this.ingredientes.forEach((item) => {
        this.composicionNutricional.lipidos = this.composicionNutricional.lipidos + ((item[0].getComposicionNutricional().lipidos*item[1])/100);
        this.composicionNutricional.hCarbono = this.composicionNutricional.hCarbono + ((item[0].getComposicionNutricional().hCarbono*item[1])/100);
        this.composicionNutricional.proteinas = this.composicionNutricional.proteinas + ((item[0].getComposicionNutricional().proteinas*item[1])/100);
        this.composicionNutricional.kCal = this.composicionNutricional.kCal + ((item[0].getComposicionNutricional().kCal*item[1])/100);
      }); 
    }

    /**
     * Método getter para obtener el grupo alimenticio al que pertenece el plato.
     * @returns Se retorna el grupo alimentario en forma del tipo de dato grupo alimentario
     */
    getGrupoPredominante() {
      return this.grupoPredominante;
    }

    /**
     * Método setter para obtener el grupo predominante.
     */
    setGrupoPredominante() {
      let cantporGrupo: [number, number, number, number, number] = [0,0,0,0,0];
      this.ingredientes.forEach((item) => {
        if (item[0].getGrupoAlimenticio().numGrupo == 1) cantporGrupo[0] += item[1];
        if (item[0].getGrupoAlimenticio().numGrupo == 2) cantporGrupo[1] += item[1];
        if (item[0].getGrupoAlimenticio().numGrupo == 3) cantporGrupo[2] += item[1];
        if (item[0].getGrupoAlimenticio().numGrupo == 4) cantporGrupo[3] += item[1];
        if (item[0].getGrupoAlimenticio().numGrupo == 5) cantporGrupo[4] += item[1];
      }); 
      this.ingredientes[0][0].setGrupoAlimenticio(cantporGrupo.indexOf(Math.max.apply(null, cantporGrupo)) + 1)
      this.grupoPredominante = this.ingredientes[0][0].getGrupoAlimenticio();
    }
    /**
     * Método getter para obtener el precio del plato.
     * @returns Se retorna el precio total del plato en función de los ingredientes
     */
    getPrecio() {
      return this.precio;
    }

    /**
     * Método setter para establecer el precio del plato.
     */
    setPrecio() {
      this.precio = 0;

      this.ingredientes.forEach((item) => {
        this.precio = this.precio + (item[0].getPrecio()*item[1] / 1000);
      }); 
    }

    /**
     * Método getter para obtener la categoría.
     * @returns Se retorna la categoría dreturn 
     */
    getCategoria() {
      return this.categoria;
    }
    
    /**
     * Método setter para establecer la categoría.
     * @param categoria a introducir
     */
    setCategoria(categoria: "Entrante" | "Primer plato" | "Segundo plato" | "Postre") {
      this.categoria = categoria;
    }
}