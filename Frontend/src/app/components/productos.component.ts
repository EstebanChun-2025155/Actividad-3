import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../models/producto.model';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Productos disponibles</h2>
    <div class="productos">
      <article *ngFor="let producto of productos">
        <h3>{{ producto.nombre }}</h3>
        <p>{{ producto.precio | currency:'GTQ':'Q':'1.2-2' }}</p>
        <button type="button" (click)="carrito.agregar(producto)">
          Agregar al carrito
        </button>
      </article>
    </div>
  `
})
export class ProductosComponent {
  carrito = inject(CarritoService);
  productos: Producto[] = [
    { id: 1, nombre: 'Teclado', precio: 150 },
    { id: 2, nombre: 'Mouse', precio: 75 },
    { id: 3, nombre: 'Monitor', precio: 1200 },
    { id: 4, nombre: 'Audífonos', precio: 250 }
  ];
}