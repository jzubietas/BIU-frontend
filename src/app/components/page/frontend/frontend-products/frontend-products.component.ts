import { Component, inject, OnInit } from '@angular/core';
import { FrontendProductService } from "../../../../core/services/frontend/frontend-product.service";
import { NgxSpinnerService } from "ngx-spinner";
import { SwalService } from "../../../../core/services/swal.service";

@Component({
	selector: 'app-frontend-products',
	standalone: true,
	imports: [],
	templateUrl: './frontend-products.component.html',
	styleUrl: './frontend-products.component.scss'
})
export class FrontendProductsComponent implements OnInit {
	products: any = [];
	show = true;
	private productService = inject(FrontendProductService);
	private spinner = inject(NgxSpinnerService);
	private sweetService = inject(SwalService);
	
	ngOnInit(): void {
		this.init();
	}
	
	init() {
		this.spinner.show();
		this.show = false;
		this.productService.index().subscribe((params: any) => {
			this.products = params.products;
			this.spinner.hide();
			this.show = true;
		}, () => {
			this.spinner.hide();
			this.products = [];
		});
	}
	
	addProduct(product: any) {
		this.sweetService.getSwal({
			title: product.name,
			text: `¿Está seguro que desea agregar el producto?`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: `Sí`,
			cancelButtonText: 'No',
			allowOutsideClick: false,
			allowEscapeKey: false,
		}).then((result: any) => {
			if (result.value) {
				console.log(product);
			}
		});
	}
	
}
