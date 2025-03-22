import { Component } from '@angular/core';
import { NgxSpinnerComponent } from "ngx-spinner";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout-frontend',
  standalone: true,
	imports: [
		NgxSpinnerComponent,
		RouterOutlet,
		RouterLinkActive,
		RouterLink
	],
  templateUrl: './layout-frontend.component.html',
  styleUrl: './layout-frontend.component.scss'
})
export class LayoutFrontendComponent {

}
