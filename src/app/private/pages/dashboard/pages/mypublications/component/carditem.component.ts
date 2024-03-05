import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import {MatButtonModule} from '@angular/material/button';
import { Router } from "@angular/router";



@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatGridListModule, MatTooltipModule,MatButtonModule],
  templateUrl: './carditem.component.html',
  styleUrl: './carditem.component.css',
})
export class carditem implements OnInit{

  itemCostVisible = false;

  popContent: any;
  irCatalogo: any;

  @Input() products:any[] = [];
  public mostrarDetalles = false;

  constructor(private router: Router){}
  ngOnInit(): void {}
 

  showDetails = false;

  toggleDetails() {
    this.itemCostVisible = !this.itemCostVisible;
    this.mostrarDetalles = !this.mostrarDetalles;
  }

  goToItemView(IdItem: any) {
    this.router.navigate(['/dashboard/item', IdItem]);
}
}
