/*
import {MongoClient} from 'mongodb';
import { Ingrediente } from '../../ingredientes/ingredientes';
import {ComposicionNutricional, GrupoAlimenticio, Localizacion} from '../../ingredientes/tiposDefinidos';

export type ResponseType = {
  type: 'add' | 'remove' | 'read' | 'list';
  success: boolean;
  ingredients?: Ingrediente[];
}

export const readIngredient = (nameIngredient: string,
  cb: (err: string | undefined, res: ResponseType | undefined) => void) => {
  const dbURL = 'mongodb://127.0.0.1:27017';
  const dbName = 'BBDD-Información-nutricional';

  MongoClient.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((client) => {
    const db = client.db(dbName);

    return db.collection<Ingrediente>('Ingredientes').findOne({
      nombre: nameIngredient
    });
  }).then((result) => {
    if (result != null) {
      let ingrediente = new Ingrediente(result.getNombre(), result.getGrupoAlimenticio().numGrupo, [result.getComposicionNutricional().lipidos, result.getComposicionNutricional().hCarbono, result.getComposicionNutricional().proteinas, result.getComposicionNutricional().kCal], [result.getLocalizacion().ciudad, result.getLocalizacion().pais], result.getPrecio());
      const response: ResponseType = {
        type: 'read',
        success: true,
        ingredients: [ingrediente],
      };
      cb(undefined, response);
    }
  }).catch((error) => {
    cb("No se ha encontrado el ingrediente buscado", undefined)
  });
}
*/