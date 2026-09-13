import { Component } from '@angular/core';
import { ProductosComponent } from './components/productos.component';
import { CarritoComponent } from './components/carrito.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductosComponent, CarritoComponent],
  template: `
    <main>
      <h1>Tienda tecnológica</h1>
      <p>Selecciona tus productos y revisa tu compra.</p>
      <app-productos></app-productos>
      <app-carrito></app-carrito>
    </main>
  `
})
export class App {}