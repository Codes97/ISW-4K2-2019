import { Injectable } from '@angular/core';
import { Detalle } from '../model/detalle';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';



@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  constructor() { }



  generateList(){
    let list = []
    for (let index = 0; index < this.getRandomInt(1,5); index++) {
      list.push(this.generateRandomDetail());
    }
    return list;
  }

  generateHoursList(){
    let list = [];
    let hora = new Date().getHours();
    console.log(hora);

    for (let i = hora; i < 24; i++) {
      for (let j = 0; j < 2; j++) {
        let minute = (i==23) ? ':00':(j*30) == 0 ? ':00':':30';
        let addCero = (i+1)<10 ? '0':'';
        list.push(addCero+(i+1).toString()+minute);
        if(i==23) break;
      }
    }
    return list
  }

  generateRandomDetail() {
    const names = ['Cajita feliz','Coca-Cola Light','McNIFICA', 'Pepsi', 'Coca-Cola', 'Cuarto de libra', 'Doble cuarto de libra', 'Big Mac'];
    const detalle = new Detalle(names[this.getRandomInt(0,names.length-1)],this.getRandomInt(1,3), Math.round(Math.random()*1000)/100);
    return detalle;
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
}
