import { Component, OnInit } from '@angular/core';
import { Detalle } from '../model/detalle';
import { DetalleService } from '../services/detalle.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  formGroup: FormGroup;
  detalles: Detalle[];
  constructor(private detalleService: DetalleService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.detalles = this.detalleService.generateList(5);

    this.formGroup = this.formBuilder.group({
      ciudad: ['', Validators.required],
      numeroCalle: ['', [Validators.required, Validators.max(9999)]],
      calle: ['', [Validators.required]],
      referencia: ['', [Validators.required, Validators.maxLength(300)]],
      metodoPago: ['1'],
      monto: ['', [Validators.required, Validators.min(0)]],
      numeroTarjeta: ['', [CreditCardValidator.validateCCNumber]],
      fechaVencimiento: ['', [CreditCardValidator.validateExpDate]],
      ccv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]

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
  get ccv(){
    return this.formGroup.get("ccv");
  }

}
