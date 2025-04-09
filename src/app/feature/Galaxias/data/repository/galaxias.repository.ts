import{ Galaxias } from '../models/galaxias.models';
import{ GalaxiasDTO } from '../models/galaxias.models.dto';
import { environment } from '../../../../../assets/enviroments/environment';


export class GalaxiasRepository {

    async create(galaxias: Galaxias): Promise<GalaxiasDTO | null> {
        const response = await fetch(`${environment.apiUrl}/Galaxia`, {
            method: 'POST',
            body: JSON.stringify({
                name: galaxias.name,
                numero_planetas: galaxias.numero_planetas,
                cordenadas: galaxias.cordenadas
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        if (!response.ok) return null;

        const data: GalaxiasDTO = await response.json();
        return data;
    }

    async getall(): Promise<GalaxiasDTO[] | null> {
        const response = await fetch(`${environment.apiUrl}/Galaxia`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        if (!response.ok) return null;

        const data: GalaxiasDTO[] = await response.json();
        return data;
    }

    async updategalaxias(id: number, galaxia: Galaxias): Promise<GalaxiasDTO | null> {
        const response = await fetch(`${environment.apiUrl}/Galaxia/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: galaxia.name,
                numero_planetas: galaxia.numero_planetas,
                cordenadas: galaxia.cordenadas
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        if (!response.ok) return null;

        const data: GalaxiasDTO = await response.json();
        return data;
    }

    async deletegalaxias(id: number): Promise<boolean> {
        const response = await fetch(`${environment.apiUrl}/Galaxia/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        return response.ok;
    }
}