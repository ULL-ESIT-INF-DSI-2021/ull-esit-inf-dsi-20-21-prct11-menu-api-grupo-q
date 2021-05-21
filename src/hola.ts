import {MongoClient} from 'mongodb';
import {Ingrediente} from '../src/models/Ingredientes/ingredientes';
import * as fs from 'fs';
import {ComposicionNutricional, GrupoAlimenticio, Localizacion} from '../src/models/Ingredientes/tiposDefinidos';
import { PlatoJSON } from './models/Platos/tiposDefinidos';


const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'BBDD-Información-nutricional';


export type MenuJSON = {
    nombre: string;
    platos: PlatoJSON[];
    composicionNutricional: ComposicionNutricional;
    precio: number
}


MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const db = client.db(dbName);

  fs.readFile('public/menus/menus.json', (err, data) => {
    console.log(data.toString());
    const menus: MenuJSON[] = JSON.parse(data.toString());
    console.log(menus);

    return db.collection<MenuJSON>('menus').insertMany(menus);
  });
}).then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});