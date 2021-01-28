import { HttpClient  } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Session } from './session.model'
import { environment } from '../../../environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient
  ) { }

  fetchSessions() {
    return this.http.get<Session[]>(environment.backendUrl + "sessions");

  }
  fetchSessionById(id: string) {
    return this.http.get<Session>(`${environment.backendUrl}sessions/${id}`);

  }
 

  storeSession(session: Session) {
    return this.http.post(environment.backendUrl + "sessions", session)
  }


  deleteSession(index: string) {
    return this.http.delete(`${environment.backendUrl}sessions/${index}`);
  }

  UpdateSession(doc, index: string) {
    let update = {
      numero: doc.value.numero.toString(),
      filiere: doc.value.filiere,
      president: doc.value.president,
      date: doc.value.date
    }
    this.http.put(environment.backendUrl + index, update).subscribe((data: Session) => {
      data.date = data.date.slice(0, 10);
    })
  }

  downloadPDF(id: string){
    return this.http.get<Blob>(`${environment.backendUrl}sessions/pdf/${id}`);
}

}
