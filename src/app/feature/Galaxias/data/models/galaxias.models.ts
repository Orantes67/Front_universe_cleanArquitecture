
export class Galaxias {
    id?: number; 
    name: string;
    numero_planetas: number;
    cordenadas: string;

    constructor(name: string, numero_planetas: number, cordenadas: string, id?: number) {
        this.name = name;
        this.numero_planetas = numero_planetas;
        this.cordenadas = cordenadas;
        if (id !== undefined) this.id = id;
    }
}
