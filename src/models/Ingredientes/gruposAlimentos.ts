import {GrupoAlimenticio} from "./tiposDefinidos"


/**
 * Clase abstracta para definir los grupos de alimentos. Se utilizará como recurso para completar el grupo
 * alimenticio al que pertenece un ingrediente. Se trata de una clase abstracta, por lo que no se podrán 
 * realizar instancias de la clase.
 */
export abstract class GruposAlimentos {

    /**
     * Propiedad grupo de tipo GrupoAlimenticio.
     */
    private grupo: GrupoAlimenticio = { numGrupo: 0, grupo: [""] };


    /**
     * Constructor de la clase GruposAlimentos.
     * @param grupo Grupo alimenticio del ingrediente.
     */
    constructor(grupo: number){

        this.setGrupo(grupo);
    }


    /**
     * Método getter para obtener el grupo al que pertenece el ingrediente.
     * @returns Retorna el grupo del ingrdiente de tipo GrupoAlimenticio.
     */
    protected getGrupo(){

        return this.grupo;
    }


    /**
     * Método setter para establecer el grupo al que pertence el ingrediente, así como para indicar los ingredientes
     * del grupo.
     * @param grupo Grupo al que pertence el ingrediente.
     */
    protected setGrupo(grupo: number){

        switch (grupo) {

            case 1:

                this.grupo = {numGrupo: grupo, grupo: ["Carnes", "Pescados", "Huevos", "Tofu", "Frutos Secos", "Legumbres"]};

            break;

            case 2:

                this.grupo = {numGrupo: grupo, grupo: ["Verduras", "Hortalizas"]};

            break;

            case 3:

                this.grupo = {numGrupo: grupo, grupo: ["Leche", "Derivados Lacteos"]};

            break;

            case 4:

                this.grupo = {numGrupo: grupo, grupo: ["Cereales"]};

            break;

            case 5:

                this.grupo = {numGrupo: grupo, grupo: ["Frutas"]};

            break;
        }
    }
}