import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto, ItemCarrito } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private carrito = new BehaviorSubject<ItemCarrito[]>([]);
  carrito$ = this.carrito.asObservable();

  agregar(producto: Producto): void {
    const items = this.carrito.value;
    const existe = items.find(item => item.id === producto.id);

    if (existe) {
      this.cambiarCantidad(producto.id, existe.cantidad + 1);
    } else {
      this.carrito.next([...items, { ...producto, cantidad: 1 }]);
    }
  }

  cambiarCantidad(id: number, cantidad: number): void {
    if (cantidad <= 0) {
      this.eliminar(id);
      return;
    }
    this.carrito.next(this.carrito.value.map(item =>
      item.id === id ? { ...item, cantidad } : item
    ));
  }

  eliminar(id: number): void {
    this.carrito.next(this.carrito.value.filter(item => item.id !== id));
  }

  vaciar(): void {
    this.carrito.next([]);
  }
}