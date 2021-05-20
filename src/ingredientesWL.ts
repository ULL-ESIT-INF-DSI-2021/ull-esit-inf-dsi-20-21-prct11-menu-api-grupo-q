/*import * as fs from 'fs';
import { ComposicionNutricional, GrupoAlimenticio, Localizacion } from './ingredientes/tiposDefinidos';
import { Ingrediente } from './ingredientes/ingredientes';

export type ResponseType = {
    type: 'add' | 'remove' | 'read' | 'list';
    success: boolean;
    ingredientes?: Ingrediente[];
}


export type IngredienteJSON = {
    nombre: string;
    grupo: GrupoAlimenticio;
    composicionNutricional: ComposicionNutricional;
    localizacion: Localizacion;
    precio: number
}

export const readIngrediente = (title: string,
    cb: (err: string | undefined, res: ResponseType | undefined) => void) => {
  loadIngrediente((err, data) => {
    if (err) {
      cb(err, undefined);
    } else if (data) {
        const ingredientes: IngredienteJSON[] = JSON.parse(data);
        const foundNote = ingredientes.find((ingrediente) => ingrediente.nombre === title);
        if (foundNote != undefined) {
            const ingredienteRespuesta: Ingrediente = new Ingrediente(foundNote.nombre, foundNote.grupo.numGrupo, [foundNote.composicionNutricional.lipidos, foundNote.composicionNutricional.hCarbono, foundNote.composicionNutricional.proteinas, foundNote.composicionNutricional.kCal], [foundNote.localizacion.ciudad, foundNote.localizacion.pais], foundNote.precio)
            const response: ResponseType = {
                type: 'read',
                success: foundNote?true:false,
                ingredientes: foundNote?[ingredienteRespuesta]:undefined,
            };
						cb(undefined, response);
        }   
        else{
					const response: ResponseType = {
						type: 'read',
						success: foundNote?true:false,
						ingredientes: foundNote?[foundNote]:undefined,
					};
					cb(undefined, response);
        }
    }
  });
};

const loadIngrediente = (
    cb: (err: string | undefined, data: string | undefined) => void) => {
  fs.readFile('public/ingredientes/ingredientes.json', (err, data) => {
    if (err) {
      cb(`Error reading ingredients file: ${err.message}`, undefined);
    } else {
      cb(undefined, data.toString());
    }
  });
};*/