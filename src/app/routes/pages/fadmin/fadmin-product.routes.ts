import { Routes } from '@angular/router';
import {
	FadminProductIndexComponent
} from "../../../components/page/fadmin/product/fadmin-product-index/fadmin-product-index.component";
import {
	FadminProductCreateComponent
} from "../../../components/page/fadmin/product/fadmin-product-create/fadmin-product-create.component";
import {
	FadminProductShowComponent
} from "../../../components/page/fadmin/product/fadmin-product-show/fadmin-product-show.component";


export const FAdminProductRoutes: Routes = [
	{
		path: '',
		component: FadminProductIndexComponent
	},
	{
		path: 'create',
		component: FadminProductCreateComponent
	},
	{
		path: 'show/:id',
		component: FadminProductShowComponent
	},
];
