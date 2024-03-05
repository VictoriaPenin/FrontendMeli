import { Component } from '@angular/core';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemOpinionsComponent } from "./components/item-opinions/item-opinions.component";
import { ItemAtributosComponent } from "./components/item-atributos/item-atributos.component";

@Component({
    selector: 'app-item',
    standalone: true,
    templateUrl: './item.component.html',
    styleUrl: './item.component.scss',
    imports: [ItemCardComponent, ItemOpinionsComponent, ItemAtributosComponent]
})
export class ItemComponent {

}
