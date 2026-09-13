import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subtotal',
  standalone: true
})
export class SubtotalPipe implements PipeTransform {
  transform(precio: number, cantidad: number): number {
    const precioEnCentavos = Math.round(precio * 100);

    return (precioEnCentavos * cantidad) / 100;
  }
}
