/* eslint-disable max-len */
import {MongoClient} from 'mongodb';
import {ComposicionNutricional, GrupoAlimenticio, Localizacion} from '../../ingredientes/tiposDefinidos';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'ingredientes';

interface IngredienteInterface {
  nombre: string,
  grupo: GrupoAlimenticio,
  composicionNuticional: ComposicionNutricional,
  localizacion: Localizacion,
  precio: number,
}

MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const db = client.db(dbName);
  return db.collection<IngredienteInterface>('ingredientes').updateOne({
    nombre: 'Pasta',
  }, /* {
    runValidators: true,
  },*/
  {
    $set: {
      nombre: 'Pedro',
    },
  });
}).then((result) => {
  console.log(result.modifiedCount);
}).catch((error) => {
  console.log(error);
});
