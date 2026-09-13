export interface Producto {
  readonly id: number;
  readonly nombre: string;
  readonly precio: number;
}

export interface ItemCarrito extends Producto {
  readonly cantidad: number;
}   
