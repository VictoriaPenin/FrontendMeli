import { Component, OnInit } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import { BodyopinionsComponent } from "../bodyopinions/bodyopinions.component";
import { ResposeOpniones } from '../../../../../../Interfaces/Opiniones';
import { MyPublicationsService } from '../../../../../../services/MyPublicationsService.service';
import { get } from 'http';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-item-opinions',
    standalone: true,
    templateUrl: './item-opinions.component.html',
    styleUrl: './item-opinions.component.scss',
    imports: [MatProgressBarModule,
        MatIconModule, BodyopinionsComponent,NgClass]
})
export class ItemOpinionsComponent  implements OnInit{
    data: ResposeOpniones = {
        reviews: [],
        paging: {
            total: 0,
            limit: 0,
            offset: 0,
            kvs_total: 0
        },
        rating_average: 0,
        rating_levels: {
            one_star: 0,
            two_star: 0,
            tree_star: 0,
            four_star: 0,
            five_star: 0
        }
    }
    Id = "" ;
       
    constructor(private dataService:MyPublicationsService,  private route: ActivatedRoute){}
    ngOnInit(): void {
        const url = this.route.snapshot.url.join('/');
        const segments = url.split('/');
        // Obtener el último segmento de la URL
        this.Id = segments[segments.length - 1];
        console.log(this.Id)
        this.getData(this.Id,5,0);
        console.log(this.data)
        
        
    }
    getData(IdItem:string,limit:number,offset:number){
        this.dataService.getOpinion(IdItem,limit,offset).subscribe(x =>{
            console.log(x)
            this.data = x
        })
    }
}
