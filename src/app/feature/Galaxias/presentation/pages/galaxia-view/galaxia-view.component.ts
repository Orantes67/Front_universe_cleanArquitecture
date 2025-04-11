// src/app/feature/Galaxias/presentation/pages/galaxia-view/galaxia-view.component.ts
import { Component, OnInit } from '@angular/core';
import { GalaxiaService } from '../../services/galaxia.service';
import { GalaxiasDTO } from '../../../data/models/galaxias.models.dto';

@Component({
  selector: 'app-galaxia-view',
  templateUrl: '../../components/galaxia-view/galaxia-view.component.html',
  styleUrls: ['./galaxia-view.component.css']
})
export class GalaxiaViewComponent implements OnInit {
  galaxias: GalaxiasDTO[] = [];
  editMode = false;
  currentGalaxiaId: number | null = null;
  galaxiaToEdit: GalaxiasDTO | null = null;

  constructor(private galaxiaService: GalaxiaService) {}

  ngOnInit(): void {
    this.loadGalaxias();
    
    // Subscribe to galaxias list updates
    this.galaxiaService.galaxias$.subscribe(galaxias => {
      this.galaxias = galaxias;
    });
  }

  loadGalaxias(): void {
    this.galaxiaService.listGalaxias();
  }

  handleFormSubmit(): void {
    if (this.editMode && this.currentGalaxiaId !== null) {
      this.galaxiaService.updateGalaxia(this.currentGalaxiaId);
      this.exitEditMode();
    } else {
      this.galaxiaService.createGalaxia();
    }
  }

  handleDeleteGalaxia(id: number): void {
    this.galaxiaService.deleteGalaxia(id);
  }

  handleEditGalaxia(galaxia: GalaxiasDTO): void {
    this.editMode = true;
    this.currentGalaxiaId = galaxia.id;
    this.galaxiaToEdit = galaxia;
  }

  exitEditMode(): void {
    this.editMode = false;
    this.currentGalaxiaId = null;
    this.galaxiaToEdit = null;
    this.galaxiaService.resetForm();
  }
}