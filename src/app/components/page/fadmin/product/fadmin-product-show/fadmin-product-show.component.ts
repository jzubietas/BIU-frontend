import { Component, inject, OnInit } from '@angular/core';
import { AlfaNumericDirective } from "../../../../../core/directive/alfa-numeric.directive";
import { DecimalOnlyDirective } from "../../../../../core/directive/decimal-only.directive";
import { LoaderComponent } from "../../../../complements/ui/loader/loader.component";
import { PagetitleComponent } from "../../../../complements/ui/pagetitle/pagetitle.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UiSwitchModule } from "ngx-ui-switch";
import { SwalService } from "../../../../../core/services/swal.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NumbersOnlyDirective } from "../../../../../core/directive/numbers-only.directive";
import { NgClass } from "@angular/common";
import { FadminProductService } from "../../../../../core/services/fadmin/fadmin-product.service";

@Component({
  selector: 'app-fadmin-product-show',
  standalone: true,
	imports: [
		AlfaNumericDirective,
		DecimalOnlyDirective,
		LoaderComponent,
		PagetitleComponent,
		ReactiveFormsModule,
		UiSwitchModule,
		NumbersOnlyDirective,
		NgClass,
		RouterLink
	],
  templateUrl: './fadmin-product-show.component.html',
  styleUrl: './fadmin-product-show.component.scss'
})
export class FadminProductShowComponent implements OnInit {
	
	form: FormGroup;
	title: string = "Editar producto";
	breadCrumbItems: any[] = [{
		label: "Dashboard",
		active: false,
		route: "/dashboard"
	}, {
		label: "Productos",
		active: false,
		route: "/dashboard/product"
	}, {
		label: "Editar producto",
		active: true,
		route: ""
	},];
	show = true;
	id: number;
	product: any = null;
	
	private sweetService = inject(SwalService);
	private productService = inject(FadminProductService);
	private spinner = inject(NgxSpinnerService);
	private formBuilder = inject(FormBuilder);
	private activatedRoute = inject(ActivatedRoute);
	private router = inject(Router);
	
	ngOnInit(): void {
		this.form = this.formBuilder.group({
			id: [{
				value: '',
				disabled: true
			}, [Validators.nullValidator]],
			name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(191)]],
			code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(191)]],
			price: ['', [Validators.required]],
		});
		this.id = +this.activatedRoute.snapshot.paramMap.get('id');
		if (this.id > 0) {
			this.init();
		} else {
			this.sweetService.getSwal({
				title: 'Error al enviar el parámetro',
				text: 'Solo se aceptan parámetros numéricos',
				icon: 'error',
				allowOutsideClick: false,
				allowEscapeKey: false,
			}).then(() => {
				this.router.navigate(['/dashboard/product']);
			});
		}
	}
	
	init() {
		this.spinner.show();
		this.show = false;
		this.productService.show(this.id).subscribe((params: any) => {
			this.product = params.product;
			this.form.get('name').setValue(this.product.name);
			this.form.get('code').setValue(this.product.code);
			this.form.get('price').setValue(this.product.price);
			this.spinner.hide();
			this.show = true;
		}, (error: any) => {
			this.spinner.hide();
			this.sweetService.getSwal({
				title: 'Error al encontrar al producto',
				text: error.error.message ?? 'Ocurrió un error en el proceso',
				icon: 'error',
				allowOutsideClick: false,
				allowEscapeKey: false,
			}).then(() => {
				this.router.navigate(['/dashboard/product']);
			});
		});
	}
	
	update() {
		let items = this.form.getRawValue();
		this.sweetService.getSwal({
			title: 'Edición de producto',
			text: `¿Está seguro que desea editar el producto?`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: `Sí`,
			cancelButtonText: 'No',
			allowOutsideClick: false,
			allowEscapeKey: false,
		}).then((result: any) => {
			if (result.value) {
				this.spinner.show();
				this.productService.update(this.id, items).subscribe((params: any) => {
					this.spinner.hide();
					this.sweetService.getSwal({
						title: 'Edición de producto',
						text: `${ params.message }`,
						icon: 'success',
						allowOutsideClick: false,
						allowEscapeKey: false,
					}).then(() => {
						window.location.reload();
					});
				}, (error: any) => {
					this.sweetService.getSwal({
						title: 'Error al ',
						text: error.error.message ?? 'Ocurrió un error en el proceso',
						icon: 'error',
					});
					this.spinner.hide();
				});
			}
		});
	}
	
}
