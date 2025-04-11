// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './core/navigation/app-routing.module';
import { AppComponent } from './app.component';
import { GalaxiaViewComponent } from './feature/Galaxias/presentation/pages/galaxia-view/galaxia-view.component';
import { GalaxiaFormComponent } from './feature/Galaxias/presentation/components/galaxia-form/galaxia-form.component';
import { GalaxiaListComponent } from './feature/Galaxias/presentation/components/galaxia-list/galaxia-list.component';
import { CreateGalaxiasUseCase } from './feature/Galaxias/domain/use-cases/create-galaxias.use-case';
import { DeleteGalaxiasUseCase } from './feature/Galaxias/domain/use-cases/delete-galaxias.use-case';
import { ListGalaxiasUseCase } from './feature/Galaxias/domain/use-cases/list-galaxias-.use-case';
import { UpdateGalaxiasUseCase } from './feature/Galaxias/domain/use-cases/update-galaxias.use-case';
import { GalaxiaService } from './feature/Galaxias/presentation/services/galaxia.service';

@NgModule({
  declarations: [
    AppComponent,
    GalaxiaViewComponent,
    GalaxiaFormComponent,
    GalaxiaListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    CreateGalaxiasUseCase,
    DeleteGalaxiasUseCase,
    ListGalaxiasUseCase,
    UpdateGalaxiasUseCase,
    GalaxiaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }