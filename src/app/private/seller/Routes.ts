import { Route } from "@angular/router";
import { AuthorizationMlComponent } from "../pages/dashboard/pages/authorization-ml/authorization-ml.component";
import { EmployeeComponent } from "../pages/dashboard/pages/employee/employee.component";




export const SELLER_ROUTES: Route[] = [
    {path: 'employees', component: EmployeeComponent},
    {path: 'authorization-ml', component: AuthorizationMlComponent}
]
