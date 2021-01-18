import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from './session.model';
import { SessionService } from './session.service';
import Swal from 'sweetalert2';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AjouterSoutenanceComponent } from './gestion-soutenance/ajouter-soutenance/ajouter-soutenance.component';
import { Subject } from 'rxjs';
import { ModifySoutenanceComponent } from './gestion-soutenance/modify-soutenance/modify-soutenance.component';
import { SessionModifComponent } from './session-modif/session-modif.component';
import { SessionCreateComponent } from './session-create/session-create.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  elements: Session[] = [];
  selectedSession: Session;
  headElements = ['Filiere', 'Date', 'Actions'];
  searchText: any = {}
  refresh: Subject<boolean> = new Subject<boolean>();
  constructor(private sessionService: SessionService, private route: Router,private modalService: MDBModalService) { }

  ngOnInit(): void {
    this.sessionService.fetchSessions().subscribe(data => {
      data.map(session => {
        session.date = session.date.slice(0, 10);
      })
      this.sessionService.setSession(data);
      this.elements = this.sessionService.getSessions();
      this.onClickSession(this.elements[0]._id);
    });

    this.sessionService.sessionChanged.subscribe(data => {
      this.elements = this.sessionService.getSessions();
    })

  }


  onClickSession(index: string) {

    this.selectedSession = this.elements.find(element => element._id == index)

    this.route.navigate(['/Administrateur/session/soutenances/' + this.selectedSession._id])
  }

  modalRef: MDBModalRef;

  openAddModal() {
    this.modalRef = this.modalService.show(SessionCreateComponent, {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: 'modal-dialog cascading-modal',
        containerClass: 'largeModal',
        animated: true
    });
    this.modalRef.content.action.subscribe( (result: any) => { 
      if(result) this.refresh.next(true);
     });
  }


  openEditModal(data) {
    this.modalRef = this.modalService.show(SessionModifComponent, {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: 'modal-dialog cascading-modal',
        containerClass: 'largeModal',
        animated: true,
        data: {data:data}
    });
    this.modalRef.content.action.subscribe( (result: any) => { console.log(result); });
  }

  onDelete(index: string) {
    Swal.fire({
      title: 'Tu es sure?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprime la session!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sessionService.deleteSession(index);
        this.route.navigate(["/Administrateur/session"])
        Swal.fire(
          'Supprimée!',
          'La session est supprimé',
          'success'
        )
      }
    })
  }

}