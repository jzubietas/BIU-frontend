import { Component, inject, OnInit } from '@angular/core';
import { AlfaNumericDirective } from "../../../../../core/directive/alfa-numeric.directive";
import { LoaderComponent } from "../../../../complements/ui/loader/loader.component";
import { PagetitleComponent } from "../../../../complements/ui/pagetitle/pagetitle.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FadminUserService } from "../../../../../core/services/fadmin/fadmin-user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { NgClass } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { SwalService } from "../../../../../core/services/swal.service";

@Component({
	selector: 'app-fadmin-user-create',
	standalone: true,
	imports: [
		AlfaNumericDirective,
		LoaderComponent,
		PagetitleComponent,
		ReactiveFormsModule,
		NgClass,
		RouterLink
	],
	templateUrl: './fadmin-user-create.component.html',
	styleUrl: './fadmin-user-create.component.scss'
})
export class FadminUserCreateComponent implements OnInit {
	
	form: FormGroup;
	title: string = "Crear usuario";
	breadCrumbItems: any[] = [{
		label: "Dashboard",
		active: false,
		route: "/dashboard"
	}, {
		label: "Usuarios",
		active: false,
		route: "/dashboard/user"
	}, {
		label: "Crear usuario",
		active: true,
		route: ""
	},];
	show = true;
	
	private sweetService = inject(SwalService);
	private userService = inject(FadminUserService);
	private spinner = inject(NgxSpinnerService);
	private formBuilder = inject(FormBuilder);
	private router = inject(Router);
	
	ngOnInit(): void {
		this.form = this.formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(191)]],
			surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(191)]],
			password: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(12)]],
			email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(191), Validators.email]],
		});
	}
	
	save() {
		let items = this.form.value;
		this.sweetService.getSwal({
			title: 'Creación de nuevo usuario',
			text: `¿Está seguro que desea crear un nuevo usuario?`,
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
				this.userService.store(items).subscribe((params: any) => {
					this.spinner.hide();
					this.sweetService.getSwal({
						title: 'Creación de nuevo usuario',
						text: `${ params.message }`,
						icon: 'success',
						allowOutsideClick: false,
						allowEscapeKey: false,
					}).then(() => {
						this.router.navigate(['/dashboard/user/show/'+params.user.id]);
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
