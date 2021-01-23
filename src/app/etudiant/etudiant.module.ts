import { FormsModule } from '@angular/forms';
import { EtudiantRoutingModule } from './etudiant-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjoutSujetComponent } from './ajout-sujet/ajout-sujet.component';
import { UploadRapportPfeComponent } from './upload-rapport-pfe/upload-rapport-pfe.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';




@NgModule({
  declarations: [AjoutSujetComponent, UploadRapportPfeComponent],
  imports: [
    CommonModule,
    FormsModule,
    EtudiantRoutingModule,
    PdfJsViewerModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class EtudiantModule { }
