import { Routes } from '@angular/router';
import { LayoutComponent } from "./components/layout/layout.component";
import { FadminLayoutComponent } from "./components/page/fadmin/layout/fadmin-layout/fadmin-layout.component";
import { LayoutFrontendComponent } from "./components/page/frontend/layout-frontend/layout-frontend.component";

export const routes: Routes = [
	{
		path: "",
		component: LayoutFrontendComponent,
		loadChildren: () => import("./routes/pages/frontend/frontend.routes").then((m) => m.FrontendRoutes),
	},
	{
		path: "auth",
		component: LayoutComponent,
		loadChildren: () => import("./routes/pages/auth.routes").then((m) => m.AuthRoutes),
	},
	{
		path: "dashboard",
		component: FadminLayoutComponent,
		loadChildren: () => import("./routes/pages/fadmin.routes").then((m) => m.FAdminRoutes),
	},
	{path: "**",   redirectTo: '/', pathMatch: 'full'},
];
