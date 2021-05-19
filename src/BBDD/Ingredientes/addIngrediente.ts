/* eslint-disable max-len */
import * as mongoose from 'mongoose';
// import validator from 'validator';
import {ComposicionNutricional, GrupoAlimenticio, Localizacion} from '../../ingredientes/tiposDefinidos';

mongoose.connect('mongodb://127.0.0.1:27017/Practica11', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});

interface IngredienteInterface {
  nombre: string,
  grupo: GrupoAlimenticio,
  composicionNuticional: ComposicionNutricional,
  localizacion: Localizacion,
  precio: number,
}

const IngredienteSchema = new mongoose.Schema({
  grupo: {
    numGrupo: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    grupo: {
      type: Array,
      required: true,
    },
  },
  nombre: {
    type: String,
    required: true,
    unique: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('El nombre del ingrediente debe empezar con mayuscula');
      }
    },
  },
  composicionNutricional: {
    lipidos: {
      type: Number,
      required: true,
      validate: (value: number) => {
        if (value < 0) {
          throw new Error('La cantidad de lipidos debe ser un numero positivo');
        }
      },
    },
    hCarbono: {
      type: Number,
      required: true,
      validate: (value: number) => {
        if (value < 0) {
          throw new Error('La cantidad de hidratos de carbono debe ser un numero positivo');
        }
      },
    },
    proteinas: {
      type: Number,
      required: true,
      validate: (value: number) => {
        if (value < 0) {
          throw new Error('La cantidad de proteinas debe ser un numero positivo');
        }
      },
    },
    kCal: {
      type: Number,
      required: true,
      validate: (value: number) => {
        if (value < 0) {
          throw new Error('La cantidad de kilocalorias debe ser un numero positivo');
        }
      },
    },
  },
  localizacion: {
    ciudad: {
      type: String,
      required: true,
      validate: (value: string) => {
        if (!value.match(/^[A-Z]/)) {
          throw new Error('La ciudad debe empezar por letra mayuscula');
        }
      },
    },
    pais: {
      type: String,
      required: true,
      validate: (value: string) => {
        if (!value.match(/^[A-Z]/)) {
          throw new Error('El pais debe empezar por letra mayuscula');
        }
      },
    },
  },
  precio: {
    type: String,
    required: true,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error('El precio del producto debe ser un numero positivo');
      }
    },
  },
});

const Ingrediente = mongoose.model<IngredienteInterface>('Ingredientes', IngredienteSchema);

const note = new Ingrediente({
  grupo: {
    numGrupo: 4,
    grupo: [
      "Cereales",
    ],
  },
  nombre: "Pasta",
  composicionNutricional: {
    lipidos: 6.7,
    hCarbono: 7.4,
    proteinas: 43.9,
    kCal: 273,
  },
  localizacion: {
    ciudad: "Roma",
    pais: "Italia",
  },
  precio: 2.5,
});

note.save().then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});
