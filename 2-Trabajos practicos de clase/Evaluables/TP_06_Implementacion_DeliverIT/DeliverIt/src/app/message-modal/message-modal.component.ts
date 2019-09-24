import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {


  ciudad:string;
  numeroCalle:number;
  calle:string;
  referencia:string;
  metodoPago:string;
  monto:number;
  total:number;
  entregaRapida:boolean;
  fechaEntrega:Date;
  horaEntrega:string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }


}
