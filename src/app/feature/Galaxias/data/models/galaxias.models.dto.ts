export class GalaxiasDTO {
        id: number;
        name: string;
        numero_planetas: number;
        cordenadas: string;


    constructor(id: number, name: string,numero_planetas: number, cordenadas: string,
      ) {
        this.id = id;
        this.name = name;
        this.numero_planetas = numero_planetas;
        this.cordenadas = cordenadas;
      }
}