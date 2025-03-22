import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
	selector: 'app-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
	standalone: true,
	imports: [CommonModule, TranslateModule, BsDropdownModule, SimplebarAngularModule],
})

export class TopbarComponent implements OnInit {
	theme: any;
	
	// Define layoutMode as a property
	
	constructor() {
	
	}
	
	@Output() settingsButtonClicked = new EventEmitter();
	@Output() mobileMenuButtonClicked = new EventEmitter();
	
	ngOnInit() {
	}
	
	toggleRightSidebar() {
		this.settingsButtonClicked.emit();
	}
	
	toggleMobileMenu(event: any) {
		event.preventDefault();
		this.mobileMenuButtonClicked.emit();
	}
	
	logout() {
	}
	
}
