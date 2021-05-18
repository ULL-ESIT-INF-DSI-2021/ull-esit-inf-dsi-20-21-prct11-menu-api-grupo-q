/**
 * Tipo composicionNutricional. Permite definir los lipidos, hidratos de carbono, proteínas 
 * y kcal/100gr que tendrá un ingrediente. 
 */
 export type ComposicionNutricional = {
    lipidos: number; // Lipidos
    hCarbono: number; // Hidratos de carbono
    proteinas: number; // Proteinas
    kCal: number; // kcal/100gr
}


/**
 * Tipo GrupoAlimenticio. Permite definir el grupo al que pertenece un ingrediente y los tipos de alimentos que engloba
 * ese grupo alimenticio en formato tupla [grupo, tipos de alimentos].
 */
export type GrupoAlimenticio = {

    numGrupo: number; // grupo alimenticio al que pertenece
    grupo: string[]; // tipos de alimentos de ese grupo
}


/**
 * Tipo Localización. Permite definir el origen del ingrdiente en formato tupla [Ciudad, País].
 */
export type Localizacion = {

    ciudad: string; // Ciudad
    pais: string; // País
}