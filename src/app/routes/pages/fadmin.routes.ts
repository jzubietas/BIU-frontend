import { Routes } from '@angular/router';
import { FadminHomeComponent } from "../../components/page/fadmin/home/fadmin-home/fadmin-home.component";


export const FAdminRoutes: Routes = [
	{
		path: '',
		component: FadminHomeComponent
	},
	{
		path: "user",
		loadChildren: () => import("./fadmin/fadmin-user.routes").then((m) => m.FAdminUserRoutes),
	},
	{
		path: "product",
		loadChildren: () => import("./fadmin/fadmin-product.routes").then((m) => m.FAdminProductRoutes),
	},
];
