export class Plato {
    _id?: string;
    nombre: string;
    tipo: string;
    esColacion: boolean;
    imagen: string;
    ingredientes: [{
        nombre: string,
        tienePorcion: string,
    }];
    equivalencias?: [Plato];
  }
