
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GalaxiasDTO } from '../../../data/models/galaxias.models.dto';

@Component({
  selector: 'app-galaxia-list',
  templateUrl: './galaxia-list.component.html',
  styleUrls: ['./galaxia-list.component.css']
})
export class GalaxiaListComponent {
  @Input() galaxias: GalaxiasDTO[] = [];
  @Output() editGalaxia = new EventEmitter<GalaxiasDTO>();
  @Output() deleteGalaxia = new EventEmitter<number>();
  @Output() refreshList = new EventEmitter<void>();
  
  onEdit(galaxia: GalaxiasDTO): void {
    this.editGalaxia.emit(galaxia);
  }
  
  onDelete(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta galaxia?')) {
      this.deleteGalaxia.emit(id);
    }
  }
  
  onRefresh(): void {
    this.refreshList.emit();
  }
}