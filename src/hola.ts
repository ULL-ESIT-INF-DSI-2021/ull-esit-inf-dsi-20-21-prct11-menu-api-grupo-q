import {MongoClient} from 'mongodb';
import {Ingrediente} from '../src/models/Ingredientes/ingredientes';
import * as fs from 'fs';
import {ComposicionNutricional, GrupoAlimenticio, Localizacion} from '../src/models/Ingredientes/tiposDefinidos';
import { PlatoJSON } from './models/Platos/tiposDefinidos';


const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'BBDD-Información-nutricional';


/*export type ingredientesJSON = {
    nombre: string;
    platos: PlatoJSON[];
    composicionNutricional: ComposicionNutricional;
    precio: number
}*/

export type IngredienteJSON = {
  nombre: string;
  grupo: GrupoAlimenticio;
  composicionNutricional: ComposicionNutricional;
  localizacion: Localizacion;
  precio: number
}


MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const db = client.db(dbName);

  fs.readFile('public/ingredientes/ingredientes.json', (err, data) => {
    console.log(data.toString());
    const ingredientes: IngredienteJSON[] = JSON.parse(data.toString());
    console.log(ingredientes);

    return db.collection<IngredienteJSON>('ingredients').insertMany(ingredientes);
  });
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});