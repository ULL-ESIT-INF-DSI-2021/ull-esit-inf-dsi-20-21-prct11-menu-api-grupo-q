import {Platos} from "./Platos";
import {Document, Schema, model} from 'mongoose';


const PlatoSchema = new Schema({
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
  ingredientes: {   //REVISAR ESQUEMA PARA INGREDIENTES
    type: Array,
    ingrediente: {
      type: JSON,
      required: true,
      unique: true,
      trim: true,
      validate: (value: string) => {
        if (!value.match(/^[A-Z]/)) {
          throw new Error('El nombre del Plato debe empezar con mayuscula');
        }
      },
    },
    cantidad: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
  },
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

export const platoSchema = model<Platos>('Plato', PlatoSchema);
