export class Seguimiento {
    _id: string;
    peso: number;
    fecha: Date;
    paciente: Paciente;
    planificacion?: Planificacion;
    distribucion?: Distribucion;
    seleccionAlimentos?: SeleccionAlimentos[];
    recomendaciones?: Recomendacion[];
}

type Recomendacion = {
    titulo: string;
    descripcion: string;
};

type SeleccionAlimentos = {
    categoria: string;
    descripcion: string;
};

type Distribucion = {
    fecha: Date;
    tipoPlan: string;
    comidas: [{
        nombre: string,
        plato: {
            nombre: string;
            imagen: string;
            ingredientes: [{
                nombre: string;
                cantidad: string;
            }];
        };
        equivalencias: [{
            nombre: string;
            imagen: string;
            ingredientes: [{
                nombre: string;
                cantidad: string;
            }],
        }];
    }];
};

type Planificacion = {
    peso: number;
    actividadFisica: string;
    gastoEnergeticoTotal: number;
    formulaSintetica: {
        carbohidratos: {
            porcentaje: number;
            kcal: number;
            gramos: number;
            gramosKilosDia: number;
        },
        proteinas: {
            porcentaje: number;
            kcal: number;
            gramos: number;
            gramosKilosDia: number;
        },
        grasas: {
            porcentaje: number;
            kcal: number;
            gramos: number;
            gramosKilosDia: number;
        },
    },
    formulaDesarrollada: {
        alimentos: [{
            nombre: string;
            cantidad: number;
            carbohidratos: number;
            proteinas: number;
            grasas: number;
        }],
        kcalTotal: number;
    },
  };

type Paciente = {
    _id: string;
    nombre: string;
    apellido: string;
    documento: string;
    sexo: string;
    fechaNacimiento: Date;
};
