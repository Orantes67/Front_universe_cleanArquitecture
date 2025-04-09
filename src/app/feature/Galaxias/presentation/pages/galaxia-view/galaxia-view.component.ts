import { Component, OnInit } from '@angular/core';
import { Galaxias } from '../../../data/models/galaxias.models';
import { GalaxiaService } from '../../services/galaxia.service';
import { GalaxiasDTO } from '../../../data/models/galaxias.models.dto';

@Component({
    selector: 'app-galaxia-view',
    templateUrl: '../../components/galaxia-view/galaxia-view.component.html',
    styleUrls: ['./galaxia-view.component.css']
  })
  
  
export class GalaxiaViewComponent implements OnInit {
  galaxias: Galaxias[] = [];
  editMode = false;
  currentGalaxiaId: number | null = null;
  error: string | null = null;

  constructor(public galaxiaService: GalaxiaService) {}

  ngOnInit(): void {
    this.loadGalaxias();
    
    // Subscribe to error messages
    this.galaxiaService.error$.subscribe(error => {
      this.error = error;
    });
    
    // Subscribe to galaxias list updates
    this.galaxiaService.galaxias$.subscribe(galaxias => {
      this.galaxias = galaxias;
    });
  }

  loadGalaxias(): void {
    this.galaxiaService.listGalaxias();
  }

  onSubmit(): void {
    if (this.editMode && this.currentGalaxiaId !== null) {
      this.galaxiaService.updateGalaxia(this.currentGalaxiaId);
      this.exitEditMode();
    } else {
      this.galaxiaService.createGalaxia();
    }
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta galaxia?')) {
      this.galaxiaService.deleteGalaxia(id);
    }
  }

  onEdit(galaxia: GalaxiasDTO): void {
    this.editMode = true;
    this.currentGalaxiaId = galaxia.id;
  
    this.galaxiaService.onChangeName(galaxia.name);
    this.galaxiaService.onChangeNumero_planetas(galaxia.numero_planetas);
    this.galaxiaService.onChangeCordenadas(galaxia.cordenadas);
  }
  

  exitEditMode(): void {
    this.editMode = false;
    this.currentGalaxiaId = null;
    this.galaxiaService.resetForm();
  }
}