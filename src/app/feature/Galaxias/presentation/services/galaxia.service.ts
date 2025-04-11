import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Galaxias } from '../../data/models/galaxias.models';
import { CreateGalaxiasUseCase } from '../../domain/use-cases/create-galaxias.use-case';
import { DeleteGalaxiasUseCase } from '../../domain/use-cases/delete-galaxias.use-case';
import { ListGalaxiasUseCase } from '../../domain/use-cases/list-galaxias-.use-case';
import { UpdateGalaxiasUseCase } from '../../domain/use-cases/update-galaxias.use-case';
import { GalaxiasDTO } from '../../data/models/galaxias.models.dto';

@Injectable({
    providedIn: 'root'
  })

export class GalaxiaService {
  private nameSubject = new BehaviorSubject<string>('');
  name$ = this.nameSubject.asObservable();
  
  private numero_planetasSubject = new BehaviorSubject<number>(0);
  numero_planetas$ = this.numero_planetasSubject.asObservable();
  
  private cordenadasSubject = new BehaviorSubject<string>("");
  userId$ = this.cordenadasSubject.asObservable();
 
  private errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject.asObservable();
  constructor(
    private createGalaxiasUseCase: CreateGalaxiasUseCase,
    private deleteGalaxiasUseCase: DeleteGalaxiasUseCase,
    private listGalaxiasUseCase: ListGalaxiasUseCase,
    private updateGalaxiasUseCase: UpdateGalaxiasUseCase
  ) {}
  
  
  get name(): string {
    return this.nameSubject.value;
  }
  
  get numero_planetas(): number {
    return this.numero_planetasSubject.value;
  }
  
  get cordenadas(): string {
    return this.cordenadasSubject.value;
  }
  
  onChangeName(name: string): void {
    this.nameSubject.next(name);
    console.log('Nombre changed:', name);
  }
  
  onChangeNumero_planetas(numero_planetas: number): void {
    this.numero_planetasSubject.next(numero_planetas);
  }
  
  onChangeCordenadas(cordenadas: string): void {
    this.cordenadasSubject.next(cordenadas);
    console.log('Cordenadas changed:', cordenadas);
  }
  
  async createGalaxia(): Promise<void> {
    this.errorSubject.next(null);
    
    if (this.name !== '' && this.numero_planetas !== 0 && this.cordenadas !== '') {
      const galaxia = new Galaxias(this.name, this.numero_planetas, this.cordenadas);
      
      try {
        const response = await this.createGalaxiasUseCase.create(galaxia);
        console.log('Response:', response);
        if (response) {
          this.resetForm();
        } else {
          this.errorSubject.next('Error creating Galaxia');
        }
      } catch (error) {
        console.error('Error creating Galaxia:', error);
        this.errorSubject.next('Error creating Galaxia');
      }
    } else {
      this.errorSubject.next('Fields cannot be empty');
    }
  }
  private galaxiasSubject = new BehaviorSubject<GalaxiasDTO[]>([]);
galaxias$ = this.galaxiasSubject.asObservable();

async listGalaxias(): Promise<void> {
  try {
    const galaxias = await this.listGalaxiasUseCase.getAll();
    if (galaxias) {
      this.galaxiasSubject.next(galaxias); // Use the DTOs directly
    } else {
      this.errorSubject.next('No se pudieron cargar las galaxias');
    }
  } catch (error) {
    console.error('Error al listar galaxias:', error);
    this.errorSubject.next('Error al listar galaxias');
  }
}
async deleteGalaxia(id: number): Promise<void> {
  try {
    const deleted = await this.deleteGalaxiasUseCase.delete(id);
    if (deleted) {
      console.log(`Galaxia con id ${id} eliminada`);
      
      // Update the local list to reflect deletion immediately
      const currentGalaxias = this.galaxiasSubject.value;
      const updatedGalaxias = currentGalaxias.filter(g => g.id !== id);
      this.galaxiasSubject.next(updatedGalaxias);
      
      // Then refresh from the server
      this.listGalaxias();
    } else {
      this.errorSubject.next('Error al eliminar galaxia');
    }
  } catch (error) {
    console.error('Error al eliminar galaxia:', error);
    this.errorSubject.next('Error al eliminar galaxia');
  }
}

  async updateGalaxia(id: number): Promise<void> {
    this.errorSubject.next(null);
    
    if (this.name !== '' && this.numero_planetas !== 0 && this.cordenadas !== '') {
      const galaxia = new Galaxias(this.name, this.numero_planetas, this.cordenadas);
  
      try {
        const updated = await this.updateGalaxiasUseCase.update(id, galaxia);
        if (updated) {
          console.log(`Galaxia actualizada:`, updated);
          this.resetForm();
          this.listGalaxias(); // Refrescar la lista
        } else {
          this.errorSubject.next('Error al actualizar galaxia');
        }
      } catch (error) {
        console.error('Error al actualizar galaxia:', error);
        this.errorSubject.next('Error al actualizar galaxia');
      }
    } else {
      this.errorSubject.next('Todos los campos son requeridos para actualizar');
    }
  }
  

  resetForm(): void {
    this.nameSubject.next('');
    this.numero_planetasSubject.next(0);
    this.cordenadasSubject.next('');

  }
    
}