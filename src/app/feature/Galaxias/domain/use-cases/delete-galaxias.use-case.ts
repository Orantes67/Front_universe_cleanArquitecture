import { GalaxiasRepository } from '../../data/repository/galaxias.repository';

export class DeleteGalaxiasUseCase {

    galaxiaRepository: GalaxiasRepository;

    constructor() {
        this.galaxiaRepository = new GalaxiasRepository();
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.galaxiaRepository.deletegalaxias(id);
        console.log("Use Case - Delete:", result);
        return result;
    }

}
