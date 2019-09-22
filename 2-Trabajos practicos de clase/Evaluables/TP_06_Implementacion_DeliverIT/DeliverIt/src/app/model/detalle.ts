export class Detalle {
    public nombre:string;
    public cantidad:number;
    public precio: number;

    constructor(nombre: string, cantidad:number, precio:number){
        this.nombre=nombre;
        this.cantidad=cantidad;
        this.precio=precio;
    }
}
