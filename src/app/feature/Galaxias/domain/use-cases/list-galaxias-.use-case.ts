import { GalaxiasDTO } from '../../data/models/galaxias.models.dto';
import { GalaxiasRepository } from '../../data/repository/galaxias.repository';

export class ListGalaxiasUseCase {

    galaxiaRepository: GalaxiasRepository;

    constructor() {
        this.galaxiaRepository = new GalaxiasRepository();
    }

    async getAll(): Promise<GalaxiasDTO[] | null> {
        const response: GalaxiasDTO[] | null = await this.galaxiaRepository.getall();

        if (response) {
            console.log("Use Case - List:", JSON.stringify(response));
        }

        return response;
    }

}
