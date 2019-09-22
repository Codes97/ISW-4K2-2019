import { Injectable } from '@angular/core';
import { Detalle } from '../model/detalle';



@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  constructor() { }



  generateList(length:number){
    let list = []
    for (let index = 0; index < length; index++) {
      list.push(this.generateRandomDetail());
    }
    return list;
  }  

  generateRandomDetail() {
    const names = ['Cajita feliz','Coca-Cola Light','McNIFICA', 'Pepsi', 'Coca-Cola', 'Cuarto de libra', 'Doble cuarto de libra', 'Big Mac'];
    const detalle = new Detalle(names[this.getRandomInt(0,names.length-1)],this.getRandomInt(1,3), Math.round(Math.random()*1000)/10);
    return detalle;
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
}
