import{ Galaxias } from '../../data/models/galaxias.models';
import{ GalaxiasDTO } from '../../data/models/galaxias.models.dto';
import {GalaxiasRepository} from '../../data/repository/galaxias.repository';

export class CreateGalaxiasUseCase {

    galaxiaRepository: GalaxiasRepository

    constructor(){
        this.galaxiaRepository = new GalaxiasRepository
    }

    async create(galaxia: Galaxias) : Promise<GalaxiasDTO | null>{
        const response : GalaxiasDTO | null = await this.galaxiaRepository.create(galaxia)

        var data = null
        if (response != null){
            data = new GalaxiasDTO(
                response.id,
                response.name,
                response.numero_planetas,
                response.cordenadas
            )

        }
           console.log("Use Case" + JSON.stringify(data));
        
        return data;
    }


}