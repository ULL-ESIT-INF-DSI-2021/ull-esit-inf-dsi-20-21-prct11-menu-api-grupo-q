import {Ingrediente} from "./ingredientes";
import {Document, Schema, model} from 'mongoose';
import {GrupoAlimenticio, ComposicionNutricional, Localizacion} from './tiposDefinidos';


interface IngredienteInterface {
  nombre: string,
  grupo: GrupoAlimenticio,
  composicionNuticional: ComposicionNutricional,
  localizacion: Localizacion,
  precio: number,
}

export const IngredienteSchema = new Schema({
  grupo: {
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
  nombre: {
    type: String,
    required: true,
    unique: true,
    trim: true,
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
      trim: true,
      validate: (value: number) => {
        if (value < 0) {
          throw new Error('La cantidad de lipidos debe ser un numero positivo');
        }
      },
    },
    hCarbono: {
      type: Number,
      required: true,
      trim: true,
      validate: (value: number) => {
        if (value < 0) {
          throw new Error('La cantidad de hidratos de carbono debe ser un numero positivo');
        }
      },
    },
    proteinas: {
      type: Number,
      required: true,
      trim: true,
      validate: (value: number) => {
        if (value < 0) {
          throw new Error('La cantidad de proteinas debe ser un numero positivo');
        }
      },
    },
    kCal: {
      type: Number,
      required: true,
      trim: true,
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
      trim: true,
      validate: (value: string) => {
        if (!value.match(/^[A-Z]/)) {
          throw new Error('La ciudad debe empezar por letra mayuscula');
        }
      },
    },
    pais: {
      type: String,
      required: true,
      trim: true,
      validate: (value: string) => {
        if (!value.match(/^[A-Z]/)) {
          throw new Error('El pais debe empezar por letra mayuscula');
        }
      },
    },
  },
  precio: {
    type: Number,
    required: true,
    trim: true,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error('El precio del producto debe ser un numero positivo');
      }
    },
  },
});

export const ingredientSchema = model<Ingrediente>('Ingrediente', IngredienteSchema);

