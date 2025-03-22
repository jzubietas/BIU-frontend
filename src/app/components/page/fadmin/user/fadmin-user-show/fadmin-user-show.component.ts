import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SwalService } from "../../../../../core/services/swal.service";
import { FadminUserService } from "../../../../../core/services/fadmin/fadmin-user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AlfaNumericDirective } from "../../../../../core/directive/alfa-numeric.directive";
import { LoaderComponent } from "../../../../complements/ui/loader/loader.component";
import { PagetitleComponent } from "../../../../complements/ui/pagetitle/pagetitle.component";
import { DatePipe, NgClass } from "@angular/common";
import { DataTablesModule } from "angular-datatables";

@Component({
	selector: 'app-fadmin-user-show',
	standalone: true,
	imports: [
		AlfaNumericDirective,
		LoaderComponent,
		PagetitleComponent,
		ReactiveFormsModule,
		NgClass,
		RouterLink,
		DataTablesModule,
	],
	providers: [DatePipe],
	templateUrl: './fadmin-user-show.component.html',
	styleUrl: './fadmin-user-show.component.scss'
})
export class FadminUserShowComponent implements OnInit {
	
	form: FormGroup;
	title: string = "Editar usuario";
	breadCrumbItems: any[] = [{
		label: "Dashboard",
		active: false,
		route: "/dashboard"
	}, {
		label: "Usuarios",
		active: false,
		route: "/dashboard/user"
	}, {
		label: "Editar usuario",
		active: true,
		route: ""
	},];
	show = true;
	id: number;
	user: any = null;
	
	private sweetService = inject(SwalService);
	private userService = inject(FadminUserService);
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
			surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(191)]],
			password: ['', [Validators.nullValidator, Validators.minLength(1), Validators.maxLength(12)]],
			email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(191), Validators.email]],
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
				this.router.navigate(['/dashboard/user']);
			});
		}
	}
	
	init() {
		this.spinner.show();
		this.show = false;
		this.userService.show(this.id).subscribe((params: any) => {
			this.user = params.user;
			this.form.get('name').setValue(this.user.name);
			this.form.get('surname').setValue(this.user.surname);
			this.form.get('email').setValue(this.user.email);
			this.spinner.hide();
			this.show = true;
		}, (error: any) => {
			this.spinner.hide();
			this.sweetService.getSwal({
				title: 'Error al encontrar al usuario',
				text: error.error.message ?? 'Ocurrió un error en el proceso',
				icon: 'error',
				allowOutsideClick: false,
				allowEscapeKey: false,
			}).then(() => {
				this.router.navigate(['/dashboard/user']);
			});
		});
	}
	
	update() {
		let items = this.form.getRawValue();
		this.sweetService.getSwal({
			title: 'Edición de usuario',
			text: `¿Está seguro que desea editar el usuario?`,
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
				this.userService.update(this.id, items).subscribe((params: any) => {
					this.spinner.hide();
					this.sweetService.getSwal({
						title: 'Edición de usuario',
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
