import { GrupoAlimenticio, ComposicionNutricional, Localizacion } from "./tiposDefinidos"
import { GruposAlimentos } from "./gruposAlimentos"
import { IngredientesI } from "./interfazIngredientes"


/**
 * Clase Ingrediente. Permite instanciar objetos de tipo Ingrediente. Se extiende la clase
 * Grupos de Alimentos (GruposAlimentos) y se implementa la interfaz genérica Ingredientes (IngredientesI),
 * con los tipos definidos GrupoAlimenticio, composicionNutricional y Localizacion. Las propiedades que
 * tiene un ingrediente son: Nombre, grupo alimenticio al que pertenece, su composición nutricional,
 * la ciudad y el país de origen y el precio por 1kg de ese ingrediente.
 */
export class Ingrediente extends GruposAlimentos implements IngredientesI<GrupoAlimenticio, ComposicionNutricional, Localizacion>{

    private nombre: string;
    private composicionNutricional: ComposicionNutricional;
    private localizacion: Localizacion;
    private precio: number


    /**
     * Constructor de la clase Ingrediente.
     * @param nombre Nombre del ingrediente.
     * @param grupo Grupo alimenticio del ingrediente.
     * @param composicionNutricional Composición nutricional del ingrediente [Lípidos, Hidratos de Carbono, Proteínas, Kcal].
     * @param localizacion Origen del ingrediente [Ciudad, País].
     * @param precio Precio del ingrediente.
     */
    constructor(nombre: string, grupo: number, composicionNutricional: [number, number, number, number],
    localizacion: [string, string], precio: number){
        super(grupo)
        this.nombre = nombre;
        this.composicionNutricional = {lipidos: composicionNutricional[0], hCarbono: composicionNutricional[1], proteinas: composicionNutricional[2], kCal: composicionNutricional[3]};
        this.localizacion = {ciudad: localizacion[0], pais: localizacion[1]};
        this.precio = precio;
    }


    /**
     * Método getter para obtener el nombre del ingrediente.
     * @returns Se retorna el nombre del ingrediente en forma de string.
     */
    getNombre(){

        return this.nombre;
    }


    /**
     * Método getter para obtener el grupo alimenticio del ingrediente.
     * @returns Se retorna el grupo alimenticio del ingrediente en forma del tipo de dato GrupoAlimenticio.
     */
    getGrupoAlimenticio(){
        
        return this.getGrupo();
    }


    /**
     * Método getter para obtener la composición nutricional del ingrediente.
     * @returns Se retorna la composición nutricional del ingrediente en forma del tipo de dato composicionNutricional.
     */
    getComposicionNutricional(){
        
        return this.composicionNutricional;
    }


    /**
     * Método getter para obtener la localización del ingrediente.
     * @returns Se retorna la localización del ingrediente en forma del tipo de dato Localización.
     */
    getLocalizacion(){
        
        return this.localizacion;
    }


    /**
     * Método getter para obtener el precio del ingrediente.
     * @returns Se retorna el precio del ingrediente.
     */
    getPrecio(){
        
        return this.precio;
    }


    /**
     * Método setter para definir el nombre del ingrediente.
     * @param nombre Nombre del ingrediente.
     */
    setNombre(nombre: string){

        this.nombre = nombre;
    }


    /**
     * Método setter para definir el grupo alimenticio al que pertenece el ingrediente.
     * @param grupoAlimenticio Grupo alimenticio del ingrediente.
     */
    setGrupoAlimenticio(grupoAlimenticio: number){
        
        this.setGrupo(grupoAlimenticio);
        //this.grupoAlimenticio = this.getGrupo();
    }


    /**
     * Método setter para definir la composición nutricional del ingrediente.
     * @param composicionNutricional Composición nutricional del ingrediente [Lípidos, Hidratos de Carbono, Proteínas, Kcal].
     */
    setComposicionNutricional(composicionNutricional: [number, number, number, number]){
        
        this.composicionNutricional = {lipidos: composicionNutricional[0], hCarbono: composicionNutricional[1], proteinas: composicionNutricional[2], kCal: composicionNutricional[3]};
    }


    /**
     * Método setter para definir la localización de origen del ingrediente.
     * @param localizacion Origen del ingrediente [Ciudad, País].
     */
    setLocalizacion(localizacion: [string, string]){
        
        this.localizacion = {ciudad: localizacion[0], pais: localizacion[1]};
    }


    /**
     * Método setter para definir el precio del ingrediente.
     * @param precio Precio del ingrediente.
     */
    setPrecio(precio: number){
        
        this.precio = precio;
    }
}