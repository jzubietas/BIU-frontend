import { Component, inject, OnInit } from '@angular/core';
import { PagetitleComponent } from "../../../../complements/ui/pagetitle/pagetitle.component";
import { LoaderComponent } from "../../../../complements/ui/loader/loader.component";
import { AuthenticationService } from "../../../../../core/services/auth.service";

@Component({
	selector: 'app-fadmin-home',
	standalone: true,
	imports: [
		PagetitleComponent,
		LoaderComponent
	],
	templateUrl: './fadmin-home.component.html',
	styleUrl: './fadmin-home.component.scss'
})
export class FadminHomeComponent implements OnInit {
	title: string = "Dashboard";
	breadCrumbItems: any[] = [{
		label: "Dashboard",
		active: true,
		route: "/dashboards/default"
	},];
	
	private authService = inject(AuthenticationService);
	
	ngOnInit(): void {
	}
	
}
