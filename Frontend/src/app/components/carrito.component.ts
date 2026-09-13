import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../services/carrito.service';
import { SubtotalPipe } from '../pipes/subtotal.pipe';
import { TotalPipe } from '../pipes/total.pipe';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, SubtotalPipe, TotalPipe],
  template: `
    <h2>Carrito de compras</h2>
    <section *ngIf="carrito.carrito$ | async as items">
      <p *ngIf="items.length === 0">Tu carrito está vacío.</p>
      <div class="tabla" *ngIf="items.length > 0">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of items">
              <td>{{ item.nombre }}</td>
              <td>{{ item.precio | currency:'GTQ':'Q':'1.2-2' }}</td>
              <td>
                <div class="cantidad">
                  <button type="button"
                    [attr.aria-label]="'Disminuir ' + item.nombre"
                    (click)="carrito.cambiarCantidad(item.id, item.cantidad - 1)">−</button>
                  <span>{{ item.cantidad }}</span>
                  <button type="button"
                    [attr.aria-label]="'Aumentar ' + item.nombre"
                    (click)="carrito.cambiarCantidad(item.id, item.cantidad + 1)">+</button>
                </div>
              </td>
              <td>{{ (item.precio | subtotal:item.cantidad) | currency:'GTQ':'Q':'1.2-2' }}</td>
              <td>
                <button type="button" class="eliminar" (click)="carrito.eliminar(item.id)">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 aria-live="polite">Total: {{ (items | total) | currency:'GTQ':'Q':'1.2-2' }}</h3>
      <button type="button" class="eliminar" *ngIf="items.length > 0" (click)="carrito.vaciar()">
        Vaciar carrito
      </button>
    </section>
  `
})
export class CarritoComponent {
  carrito = inject(CarritoService);
}