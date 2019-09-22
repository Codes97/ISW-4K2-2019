import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleService } from './services/detalle.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'DeliverIt';

  constructor(private modal:NgbModal,
              private detalleService:DetalleService){
  
  }


}
