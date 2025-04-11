import{ Galaxias } from '../models/galaxias.models';
import{ GalaxiasDTO } from '../models/galaxias.models.dto';
import { environment } from '../../../../../assets/enviroments/environment';

export class GalaxiasRepository {

    async create(galaxias: Galaxias): Promise<GalaxiasDTO | null> {
       
        const response = await fetch(`${environment.apiUrl}/Galaxia/`, {
            method: 'POST',
            body: JSON.stringify({
                Nombre: galaxias.name,
                Numero_planetas: galaxias.numero_planetas,
                Coordenadas: galaxias.cordenadas
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        if (!response.ok) return null;

        const data = await response.json();
        return this.mapApiResponseToDTO(data);
    }

    async getall(): Promise<GalaxiasDTO[] | null> {
        const response = await fetch(`${environment.apiUrl}/Galaxia/`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        if (!response.ok) return null;

        const data = await response.json();
        return Array.isArray(data) ? data.map(item => this.mapApiResponseToDTO(item)) : null;
    }

    async updategalaxias(id: number, galaxia: Galaxias): Promise<GalaxiasDTO | null> {
        // Updated to use the expected field names
        const response = await fetch(`${environment.apiUrl}/Galaxia/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                Nombre: galaxia.name,
                Numero_planetas: galaxia.numero_planetas,
                Coordenadas: galaxia.cordenadas
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        if (!response.ok) return null;

        const data = await response.json();
        return this.mapApiResponseToDTO(data);
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
    
    // Helper method to map API response to our DTO format
    private mapApiResponseToDTO(item: any): GalaxiasDTO {
        return new GalaxiasDTO(
            item.ID || item.id || 0,
            item.Name || item.Nombre || item.name || '',
            item.Num_planets || item.Numero_planetas || item.numero_planetas || 0,
            item.Coordinates || item.Coordenadas || item.cordenadas || ''
        );
    }
}