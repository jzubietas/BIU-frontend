import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { NgxSpinnerService } from "ngx-spinner";
import { SwalService } from "../../../core/services/swal.service";
import { AuthenticationService } from "../../../core/services/auth.service";
import { AlfaNumericDirective } from "../../../core/directive/alfa-numeric.directive";
import { Router } from "@angular/router";

@Component({
	selector: 'app-auth',
	standalone: true,
	imports: [
		CommonModule, ReactiveFormsModule, SlickCarouselModule, AlfaNumericDirective
	],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
	form: FormGroup;
	year = new Date().getFullYear();
	private sweetService = inject(SwalService);
	private authService = inject(AuthenticationService);
	private spinner = inject(NgxSpinnerService);
	private formBuilder = inject(FormBuilder);
	private router = inject(Router);
	
	
	ngOnInit(): void {
		this.form = this.formBuilder.group({
			email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
			password: ['', [Validators.required, Validators.maxLength(100)]],
		});
	}
	
	get f() {
		return this.form.controls;
	}
	
	get submitted() {
		return this.form.valid;
	}
	
	onSubmit() {
		let items = this.form.value;
		this.sweetService.getSwal({
			title: 'Inicio de sesión',
			text: `¿Está seguro que iniciar sesión?`,
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
				this.authService.login(items).subscribe((params: any) => {
					this.spinner.hide();
					this.sweetService.getSwal({
						title: 'Ingreso existoso',
						text: `${ params.message }`,
						icon: 'success',
						confirmButtonColor: '#3085d6',
						allowOutsideClick: false,
						allowEscapeKey: false,
					}).then(() => {
						this.getRole(params);
					});
				}, (error: any) => {
					this.sweetService.getSwal({
						title: 'Error al ingresar',
						text: error.error.message ?? 'Ocurrió un error en el proceso',
						icon: 'error',
					});
					this.spinner.hide();
				});
			}
		});
	}
	
	private getRole(item: any) {
		this.authService.saveUser(item.user);
		this.authService.saveToken(item.token);
		this.router.navigate(['dashboard']);
	}
	
}
