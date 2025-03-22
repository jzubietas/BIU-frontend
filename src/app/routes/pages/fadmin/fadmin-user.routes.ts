import { Routes } from '@angular/router';
import {
	FadminUserIndexComponent
} from "../../../components/page/fadmin/user/fadmin-user-index/fadmin-user-index.component";
import {
	FadminUserCreateComponent
} from "../../../components/page/fadmin/user/fadmin-user-create/fadmin-user-create.component";
import {
	FadminUserShowComponent
} from "../../../components/page/fadmin/user/fadmin-user-show/fadmin-user-show.component";


export const FAdminUserRoutes: Routes = [
	{
		path: '',
		component: FadminUserIndexComponent
	},
	{
		path: 'create',
		component: FadminUserCreateComponent
	},
	{
		path: 'show/:id',
		component: FadminUserShowComponent
	},
];
