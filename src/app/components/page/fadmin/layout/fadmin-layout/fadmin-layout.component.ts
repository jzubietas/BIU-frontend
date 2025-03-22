import { Component, OnInit } from '@angular/core';
import { NgxSpinnerComponent } from "ngx-spinner";
import { VerticalComponent } from "../../../../complements/vertical/vertical.component";
import { LAYOUT_MODE_TYPES, LAYOUT_WIDTH_TYPES, SIDEBAR_TYPE, TOPBAR_MODE_TYPES } from "../../../../../store/layout";

@Component({
  selector: 'app-fadmin-layout',
  standalone: true,
	imports: [
		NgxSpinnerComponent,
		VerticalComponent
	],
  templateUrl: './fadmin-layout.component.html',
  styleUrl: './fadmin-layout.component.scss'
})
export class FadminLayoutComponent implements OnInit {
	
	constructor() {
	}
	
	ngOnInit() {
		// default settings
		document.body.setAttribute('data-bs-theme', LAYOUT_MODE_TYPES.LIGHTMODE);
		document.body.setAttribute('data-layout-size', LAYOUT_WIDTH_TYPES.FLUID);
		document.body.setAttribute('data-sidebar', SIDEBAR_TYPE.DARK);
		document.body.setAttribute('data-topbar', TOPBAR_MODE_TYPES.LIGHT);
		
		document.body.setAttribute('data-sidebar', 'dark');
		document.body.removeAttribute('data-topbar');
		document.body.removeAttribute('data-layout-size');
		document.body.removeAttribute('data-keep-enlarged');
		document.body.removeAttribute('data-sidebar-size');
		document.body.classList.remove('sidebar-enable');
		document.body.classList.remove('vertical-collpsed');
		document.body.removeAttribute('data-layout-scrollable');
		
		document.body.setAttribute("data-layout-size", "fluid");
		document.body.classList.remove("vertical-collpsed");
		document.body.removeAttribute("data-layout-scrollable");
	}
	
}
