import { AuthentificationService } from 'src/app/services/authentification.service';
import { Role } from './../../guards/role.enum';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {SujetPFE} from '../models/sujet-pfe.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(
    private http: HttpClient,
    private authService: AuthentificationService
  ) { }

  userRoute="pfes/";

  ajouterSujet(sujet): Observable<any> {
    return this.http.post<SujetPFE>(environment.backendUrl+this.userRoute,sujet);
  }

  uploadRapport(rapport): Observable<any> {
    return this.http.put(environment.backendUrl+this.userRoute+'rapport',rapport)
  }

  getEnseignants():Observable<any> {
    return this.http.get(environment.backendUrl+"utilisateurs/"+Role.enseignant)
  }

  getSujetStatus():Observable<any> {
    return this.http.get(environment.backendUrl+this.userRoute+"check-ajouter-sujet/"+this.authService.getUserId());
  }

  getRapportStatus():Observable<any> {
    return this.http.get(environment.backendUrl+this.userRoute+"check-ajouter-rapport/"+this.authService.getUserId());
  }
}
