import * as mongoose from 'mongoose';
import validator from 'validator';
import {Platos} from "../src/models/Courses/platos";
import { IngredienteSchema } from '../src/models/Ingredients/IngredientSchema';


mongoose.connect('mongodb://127.0.0.1:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});


const PlatoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('El nombre del Plato debe empezar con mayuscula');
      }
    },
  },
  ingredientes: [IngredienteSchema],
  categoria: {
    type: String,
    required: true,
    trim: true,
    enum: ["Entrante", "Primer plato", "Segundo plato", "Postre"],
  },
  grupoPredominante: {
    numGrupo: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
      trim: true,
    },
    grupo: {
      type: Array,
      required: true,
      trim: true,
    },
  },
  precio: {
    type: Number,
    required: true,
    trim: true,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error('El precio del plato debe ser un numero positivo');
      }
    },
  },
});

const platoSchema = mongoose.model<Platos>('Plato', PlatoSchema);

const note = new platoSchema({
  name: 'Pan con ajo',
  categoria: 'Entrante',
  composicionNutricional: {
    lipidos: 51.065999999999995,
    hCarbono: 59,
    proteinas: 8.866,
    kCal: 737.76,
  },
  grupoPredominante: {
    numGrupo: 4,
    grupo: [
      "Cereales"
    ]
  },
  precio: 0.6968
});

note.save().then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});
