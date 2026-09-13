import { Pipe, PipeTransform } from '@angular/core';
import { ItemCarrito } from '../models/producto.model';

@Pipe({ name: 'total', standalone: true })
export class TotalPipe implements PipeTransform {
  transform(items: ItemCarrito[]): number {
    let total = 0;
    for (const item of items) {
      total += item.precio * item.cantidad;
    }
    return total;
  }
}

