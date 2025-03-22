import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NgxSpinnerComponent } from "ngx-spinner";

@Component({
  selector: 'app-layout',
  standalone: true,
	imports: [
		RouterOutlet,
		NgxSpinnerComponent
	],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
