import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { Detalle } from '../model/detalle';
import { DetalleService } from '../services/detalle.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from '../message-modal/message-modal.component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  minPickerDate = new Date();
  total = 100;
  listaHoras: string[];

  ciudades = ['Cordoba', 'Villa del Rosario', 'Cosquin', 'Carlos Paz', 'Bialet Masse'];
  formGroup: FormGroup;
  detalles: Detalle[];
  constructor(private service: DetalleService,
    private formBuilder: FormBuilder,
    private modal: NgbModal) { }

  ngOnInit() {
    this.detalles = this.service.generateList();

    this.detalles.forEach(detalle => {
      this.total+=detalle.precio*detalle.cantidad;
    });
    this.total = Math.round(this.total*100)/100;
    this.listaHoras = this.service.generateHoursList();

    this.formGroup = this.formBuilder.group({
      ciudad: ['', Validators.required],
      numeroCalle: ['', [Validators.required, Validators.max(9999)]],
      calle: ['', [Validators.required]],
      referencia: ['', [Validators.maxLength(300)]],
      metodoPago: ['1'],
      titular: ['', [Validators.minLength(5)]],
      monto: ['', [Validators.required, Validators.min(this.total)]],
      numeroTarjeta: [''],
      fechaVencimiento: [''],
      ccv: [''],
      entregaRapida: [true],
      fechaEntrega: [''],
      horaEntrega: ['']

    });
  }


  volver(){
    location.reload(true);
  }

  eliminarProducto(detalle){
    const index = this.detalles.indexOf(detalle);
    if (index !== -1) {
        this.detalles.splice(index, 1);
    }
  }

  //Hookeamos cuando cambie el metodo de pago
  onMetodoPagoChange(){
    //Si el metodo de pago es efectivo
    if(this.metodoPago.value == "1"){
      
      //Limpiamos validadores no requeridos.
      this.numeroTarjeta.clearValidators();
      this.fechaVencimiento.clearValidators();
      this.ccv.clearValidators();
      this.titular.clearValidators();

      //Seteamos validadores 
      this.monto.setValidators(Validators.required);
      
    } else{
      //Limpiamos validadores no requeridos.
      this.monto.clearValidators();

      //Seteamos validadores
      this.numeroTarjeta.setValidators([Validators.required, CreditCardValidator.validateCCNumber, Validators.pattern(new RegExp('^4[0-9]{12}(?:[0-9]{3})?$'))]);
      this.fechaVencimiento.setValidators([Validators.required, CreditCardValidator.validateExpDate]);
      this.ccv.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(4)]);
      this.titular.setValidators([Validators.required, Validators.minLength(5)]);

    }
      //Actualizamos validadores
      this.monto.updateValueAndValidity();
      this.titular.updateValueAndValidity();
      this.numeroTarjeta.updateValueAndValidity();
      this.fechaVencimiento.updateValueAndValidity();
      this.ccv.updateValueAndValidity();
  }

  switchEntregaRapida(){
    this.entregaRapida.setValue(!this.entregaRapida.value);

    if(!this.entregaRapida.value){
      this.fechaEntrega.clearValidators();
      this.horaEntrega.clearValidators();

      this.fechaEntrega.setValidators(Validators.required);
      this.horaEntrega.setValidators(Validators.required);
    }else{
      this.fechaEntrega.clearValidators();
      this.horaEntrega.clearValidators();
    }
    this.fechaEntrega.updateValueAndValidity();
    this.horaEntrega.updateValueAndValidity();
  }

  openModal(){
    let modalReference = this.modal.open(MessageModalComponent, { size: 'lg', keyboard: true });
    modalReference.componentInstance.ciudad = this.ciudad.value;
    modalReference.componentInstance.numeroCalle = this.numeroCalle.value;
    modalReference.componentInstance.calle = this.calle.value;
    modalReference.componentInstance.referencia = this.referencia.value;
    modalReference.componentInstance.metodoPago = this.metodoPago.value;
    modalReference.componentInstance.monto = (Math.round(this.monto.value*100)/100);
    modalReference.componentInstance.vuelto = (Math.round((this.monto.value-this.total)*100)/100);
    modalReference.componentInstance.total = this.total;
    modalReference.componentInstance.entregaRapida = this.entregaRapida.value;
    modalReference.componentInstance.fechaEntrega = this.fechaEntrega.value;
    modalReference.componentInstance.horaEntrega = this.horaEntrega.value;
    modalReference.result.then((data)=>{
      setTimeout(()=>{location.reload(true)}, 2);
    });
  }


  get ciudad(){
    return this.formGroup.get("ciudad");
  }
  get numeroCalle(){
    return this.formGroup.get("numeroCalle");
  }
  get calle(){
    return this.formGroup.get("calle");
  }
  get referencia(){
    return this.formGroup.get("referencia");
  }
  get metodoPago(){
    return this.formGroup.get("metodoPago");
  }
  get monto(){
    return this.formGroup.get("monto");
  }
  get numeroTarjeta(){
    return this.formGroup.get("numeroTarjeta");
  }
  get fechaVencimiento(){
    return this.formGroup.get("fechaVencimiento");
  }
  get titular(){
    return this.formGroup.get("titular");
  }
  get ccv(){
    return this.formGroup.get("ccv");
  }
  get entregaRapida(){
    return this.formGroup.get("entregaRapida");
  }
  get fechaEntrega(){
    return this.formGroup.get("fechaEntrega");
  }
  get horaEntrega(){
    return this.formGroup.get("horaEntrega");
  }

}
