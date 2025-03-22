import { Component, inject, OnInit } from '@angular/core';
import { AlfaNumericDirective } from "../../../../../core/directive/alfa-numeric.directive";
import { LoaderComponent } from "../../../../complements/ui/loader/loader.component";
import { PagetitleComponent } from "../../../../complements/ui/pagetitle/pagetitle.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UiSwitchModule } from "ngx-ui-switch";
import { SwalService } from "../../../../../core/services/swal.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, RouterLink } from "@angular/router";
import { FadminProductService } from "../../../../../core/services/fadmin/fadmin-product.service";
import { NgClass } from "@angular/common";
import { DecimalOnlyDirective } from "../../../../../core/directive/decimal-only.directive";
import { NumbersOnlyDirective } from "../../../../../core/directive/numbers-only.directive";

@Component({
  selector: 'app-fadmin-product-create',
  standalone: true,
	imports: [
		AlfaNumericDirective,
		LoaderComponent,
		PagetitleComponent,
		ReactiveFormsModule,
		UiSwitchModule,
		RouterLink,
		NgClass,
		DecimalOnlyDirective,
		NumbersOnlyDirective
	],
  templateUrl: './fadmin-product-create.component.html',
  styleUrl: './fadmin-product-create.component.scss'
})
export class FadminProductCreateComponent implements OnInit {
	
	form: FormGroup;
	title: string = "Crear producto";
	breadCrumbItems: any[] = [{
		label: "Dashboard",
		active: false,
		route: "/dashboard"
	}, {
		label: "Productos",
		active: false,
		route: "/dashboard/product"
	}, {
		label: "Crear producto",
		active: true,
		route: ""
	},];
	show = true;
	
	private sweetService = inject(SwalService);
	private productService = inject(FadminProductService);
	private spinner = inject(NgxSpinnerService);
	private formBuilder = inject(FormBuilder);
	private router = inject(Router);
	
	ngOnInit(): void {
		this.form = this.formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(191)]],
			code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(191)]],
			price: ['', [Validators.required]],
		});
	}
	
	save() {
		let items = this.form.value;
		this.sweetService.getSwal({
			title: 'Creación de nuevo producto',
			text: `¿Está seguro que desea crear un nuevo producto?`,
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
				this.productService.store(items).subscribe((params: any) => {
					this.spinner.hide();
					this.sweetService.getSwal({
						title: 'Creación de nuevo producto',
						text: `${ params.message }`,
						icon: 'success',
						allowOutsideClick: false,
						allowEscapeKey: false,
					}).then(() => {
						this.router.navigate(['/dashboard/product/show/'+params.product.id]);
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
