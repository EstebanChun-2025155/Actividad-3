import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ItemCarrito, Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private readonly carritoSubject =
    new BehaviorSubject<readonly ItemCarrito[]>([]);

  readonly carrito$ = this.carritoSubject.asObservable();

  readonly cantidadProductos$ = this.carrito$.pipe(
    map(items =>
      items.reduce((cantidad, item) => cantidad + item.cantidad, 0)
    )
  );

  agregarProducto(producto: Producto): void {
    const carrito = this.carritoSubject.value;

    const existe = carrito.some(item => item.id === producto.id);

    const nuevoCarrito = existe
      ? carrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      : [...carrito, { ...producto, cantidad: 1 }];

    this.carritoSubject.next(nuevoCarrito);
  }

  actualizarCantidad(id: number, cantidad: number): void {
    if (!Number.isSafeInteger(cantidad) || cantidad < 0) {
      return;
    }

    if (cantidad === 0) {
      this.eliminarProducto(id);
      return;
    }

    const nuevoCarrito = this.carritoSubject.value.map(item =>
      item.id === id
        ? { ...item, cantidad }
        : item
    );

    this.carritoSubject.next(nuevoCarrito);
  }

  eliminarProducto(id: number): void {
    const nuevoCarrito = this.carritoSubject.value.filter(
      item => item.id !== id
    );

    this.carritoSubject.next(nuevoCarrito);
  }

  vaciarCarrito(): void {
    this.carritoSubject.next([]);
  }
}