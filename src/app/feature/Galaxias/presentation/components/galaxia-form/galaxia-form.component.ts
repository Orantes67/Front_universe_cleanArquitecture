// src/app/feature/Galaxias/presentation/components/galaxia-form/galaxia-form.component.ts
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Galaxias } from '../../../data/models/galaxias.models';
import { GalaxiasDTO } from '../../../data/models/galaxias.models.dto';
import { GalaxiaService } from '../../services/galaxia.service';

@Component({
  selector: 'app-galaxia-form',
  templateUrl: './galaxia-form.component.html',
  styleUrls: ['./galaxia-form.component.css']
})
export class GalaxiaFormComponent implements OnInit, OnChanges {
  @Input() editMode = false;
  @Input() galaxiaToEdit: GalaxiasDTO | null = null;
  @Output() formSubmit = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();
  
  error: string | null = null;

  constructor(public galaxiaService: GalaxiaService) {}

  ngOnInit(): void {
    // Subscribe to error messages from the service
    this.galaxiaService.error$.subscribe(error => {
      this.error = error;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  
    if (changes['galaxiaToEdit'] && this.galaxiaToEdit) {
      this.galaxiaService.onChangeName(this.galaxiaToEdit.name);
      this.galaxiaService.onChangeNumero_planetas(this.galaxiaToEdit.numero_planetas);
      this.galaxiaService.onChangeCordenadas(this.galaxiaToEdit.cordenadas);
    }
  }

  onSubmit(): void {
    this.formSubmit.emit();
  }

  onCancel(): void {
    this.cancelEdit.emit();
  }
}