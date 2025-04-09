import { Galaxias } from '../../data/models/galaxias.models';
import { GalaxiasDTO } from '../../data/models/galaxias.models.dto';
import { GalaxiasRepository } from '../../data/repository/galaxias.repository';

export class UpdateGalaxiasUseCase {

    galaxiaRepository: GalaxiasRepository;

    constructor() {
        this.galaxiaRepository = new GalaxiasRepository();
    }

    async update(id: number, galaxia: Galaxias): Promise<GalaxiasDTO | null> {
        const response: GalaxiasDTO | null = await this.galaxiaRepository.updategalaxias(id, galaxia);

        let data = null;
        if (response !== null) {
            data = new GalaxiasDTO(
                response.id,
                response.name,
                response.numero_planetas,
                response.cordenadas
            );
        }

        console.log("Use Case - Update:", JSON.stringify(data));
        return data;
    }

}
