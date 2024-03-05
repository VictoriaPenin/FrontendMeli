import { Component, Input } from '@angular/core';
import { ItemCompetencia } from '../../../../../../Interfaces/Competencia';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-compe',
  standalone: true,
  imports: [MatButtonModule,MatListModule,NgClass, MatIconModule],
  templateUrl: './card-compe.component.html',
  styleUrl: './card-compe.component.scss'
})
export class CardCompeComponent {
@Input()
  item: ItemCompetencia | undefined
  isFlipped: boolean = false;


calculardescuento(precioOriginal:number, precioFinal:number):number{
  const descuentoPorcentaje = (100 * precioFinal) / precioOriginal;
  return ( 100 - Math.floor(descuentoPorcentaje));
}
normalizadorLogistica(tipoLogistica:string):string{
  let repuesta:string
  switch(tipoLogistica){
    case "xd_drop_off":
      repuesta = "Mercado Envíos Places"
      break;
    case "cross_docking":
      repuesta = "Mercado Envíos Coleta"
      break;
    case "self_service":
      repuesta = "Mercado Envíos Flex"
      break;
    case "fulfillment":
      repuesta = "Mercado Envíos Full"
      break;
    default:
      repuesta = "Sin logistica"
      break;
  }
  return repuesta
}

handleClick(): void {
  this.isFlipped = !this.isFlipped;
  console.log(this.isFlipped)
}
}
