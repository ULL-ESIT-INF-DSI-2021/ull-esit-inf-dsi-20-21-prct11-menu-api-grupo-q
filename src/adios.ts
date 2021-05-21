import * as mongoose from 'mongoose';
import validator from 'validator';
import {Platos} from "../src/models/Courses/platos";
import {PlatoSchema} from './models/Courses/platoSchema';
import {Menu} from './models/Menu/menus';

mongoose.connect('mongodb://127.0.0.1:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});


const MenuSchema = new mongoose.Schema({
  nombre: {
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
  platos: [PlatoSchema],
  precio: {
    type: Number,
    required: true,
    trim: true,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error('El precio del menu debe ser un numero positivo');
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
});

const menuSchema = mongoose.model<Menu>('Menu', MenuSchema);

const note = new menuSchema({
  nombre: 'Italiano',
  platos: [{
      name: 'Pan con ajo',
      ingredientes: 
        [{
          ingrediente: {
            grupo: {
              numGrupo: 1,
              grupo: [
                "Carnes",
                "Pescados",
                "Huevos",
                "Tofu",
                "Frutos Secos",
                "Legumbres"
              ]
            },
            nombre: "Jamon cocido",
            composicionNutricional: {
              lipidos: 10.8,
              hCarbono: 1,
              proteinas: 18.4,
              kCal: 175
            },
            localizacion: {
              ciudad: "La Rioja",
              pais: "España"
            },
            precio: 7.25
          },
          cantidad: 10
        },
        {
          ingrediente: {
            grupo: {
              numGrupo: 1,
              grupo: [
                "Carnes",
                "Pescados",
                "Huevos",
                "Tofu",
                "Frutos Secos",
                "Legumbres"
              ]
            },
            nombre: "Jamon cocido",
            composicionNutricional: {
              lipidos: 10.8,
              hCarbono: 1,
              proteinas: 18.4,
              kCal: 175
            },
            localizacion: {
              ciudad: "La Rioja",
              pais: "España"
            },
            precio: 7.25
          },
          cantidad: 20
        },
        {
          ingrediente: {
            grupo: {
              numGrupo: 1,
              grupo: [
                "Carnes",
                "Pescados",
                "Huevos",
                "Tofu",
                "Frutos Secos",
                "Legumbres"
              ]
            },
            nombre: "Jamon cocido",
            composicionNutricional: {
              lipidos: 10.8,
              hCarbono: 1,
              proteinas: 18.4,
              kCal: 175
            },
            localizacion: {
              ciudad: "La Rioja",
              pais: "España"
            },
            precio: 7.25
          },
          cantidad: 30
        }],
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
      precio: 0.6968,
  },
  {
    name: 'Lechuga',
    ingredientes: 
      [{
        ingrediente: {
          grupo: {
            numGrupo: 1,
            grupo: [
              "Carnes",
              "Pescados",
              "Huevos",
              "Tofu",
              "Frutos Secos",
              "Legumbres"
            ]
          },
          nombre: "Jamon cocido",
          composicionNutricional: {
            lipidos: 10.8,
            hCarbono: 1,
            proteinas: 18.4,
            kCal: 175
          },
          localizacion: {
            ciudad: "La Rioja",
            pais: "España"
          },
          precio: 7.25
        },
        cantidad: 10
      },
      {
        ingrediente: {
          grupo: {
            numGrupo: 1,
            grupo: [
              "Carnes",
              "Pescados",
              "Huevos",
              "Tofu",
              "Frutos Secos",
              "Legumbres"
            ]
          },
          nombre: "Jamon cocido",
          composicionNutricional: {
            lipidos: 10.8,
            hCarbono: 1,
            proteinas: 18.4,
            kCal: 175
          },
          localizacion: {
            ciudad: "La Rioja",
            pais: "España"
          },
          precio: 7.25
        },
        cantidad: 20
      },
      {
        ingrediente: {
          grupo: {
            numGrupo: 1,
            grupo: [
              "Carnes",
              "Pescados",
              "Huevos",
              "Tofu",
              "Frutos Secos",
              "Legumbres"
            ]
          },
          nombre: "Jamon cocido",
          composicionNutricional: {
            lipidos: 10.8,
            hCarbono: 1,
            proteinas: 18.4,
            kCal: 175
          },
          localizacion: {
            ciudad: "La Rioja",
            pais: "España"
          },
          precio: 7.25
        },
        cantidad: 30
      }],
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
    precio: 0.6968,
}],
  precio: 3.1361499999999998,
  composicionNutricional: {
    lipidos: 79.001,
    hCarbono: 125.79999999999998,
    proteinas: 38.726,
    kCal: 1384.9099999999999
  },
});

note.save().then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});
