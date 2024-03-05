import { Route } from "@angular/router";
import { HomeComponent } from "../pages/dashboard/pages/home/home.component";
import { MyStockComponent } from "../pages/dashboard/pages/my-stock/my-stock.component";
import { MypublicationsComponent } from "../pages/dashboard/pages/mypublications/mypublications.component";
import { SuppliersComponent } from "../pages/dashboard/pages/suppliers/suppliers.component";
import { CostComponent } from "../pages/dashboard/pages/cost/cost.component";
import { CompetenceComponent } from "../pages/dashboard/pages/competence/competence.component";
import { ProfileComponent } from "../pages/dashboard/pages/profile/profile.component";
import { ItemComponent } from "../pages/dashboard/pages/item/item.component";





export const EMPLOYEE_ROUTES: Route[] = [
    {path: 'home', component: HomeComponent},
    {path:'my-publications', component: MypublicationsComponent},
    {path:'my-stock', component: MyStockComponent},
    {path:'suppliers', component: SuppliersComponent},
    {path:'cost', component: CostComponent},
    {path:'my-stock', component: MyStockComponent},
    {path:'suppliers', component: SuppliersComponent},
    {path: 'competence', component: CompetenceComponent},
    {path: 'profile', component: ProfileComponent},
    {path:'item/:itemId', component: ItemComponent}   

]
