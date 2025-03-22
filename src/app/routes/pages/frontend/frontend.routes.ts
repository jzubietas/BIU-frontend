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
import { HomeComponent } from "../../../components/page/frontend/home/home.component";
import {
	FrontendProductsComponent
} from "../../../components/page/frontend/frontend-products/frontend-products.component";


export const FrontendRoutes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'products',
		component: FrontendProductsComponent
	},
];
