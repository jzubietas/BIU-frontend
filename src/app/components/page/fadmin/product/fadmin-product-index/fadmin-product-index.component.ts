import { Component, inject, OnInit } from '@angular/core';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { DataTablesModule } from "angular-datatables";
import { LoaderComponent } from "../../../../complements/ui/loader/loader.component";
import { NgIf } from "@angular/common";
import { PagetitleComponent } from "../../../../complements/ui/pagetitle/pagetitle.component";
import { SwalService } from "../../../../../core/services/swal.service";
import { NgxSpinnerService } from "ngx-spinner";
import { FadminProductService } from "../../../../../core/services/fadmin/fadmin-product.service";
import { RouterLink } from "@angular/router";

@Component({
	selector: 'app-fadmin-product-index',
	standalone: true,
	imports: [
		BsDropdownModule,
		DataTablesModule,
		LoaderComponent,
		NgIf,
		PagetitleComponent,
		RouterLink
	],
	templateUrl: './fadmin-product-index.component.html',
	styleUrl: './fadmin-product-index.component.scss'
})
export class FadminProductIndexComponent implements OnInit {
	
	title: string = "Productos";
	items: any[] = [];
	dtOptions: any = {};
	show = true;
	breadCrumbItems: any[] = [{
		label: "Dashboard",
		active: false,
		route: "/dashboard"
	}, {
		label: "Productos",
		active: true,
		route: ""
	},];
	
	private sweetService = inject(SwalService);
	private productService = inject(FadminProductService);
	private spinner = inject(NgxSpinnerService);
	
	ngOnInit(): void {
		this.items = [];
		this.dtOptions = {
			order: [[0, 'asc']],
			aLengthMenu: [
				[10, 20, 30, -1],
				[10, 20, 30, 'Todos'],
			],
			autoWidth: false,
			columnDefs: [
				{width: '10%', targets: 0},
				{width: '25%', targets: 1},
				{width: '25%', targets: 2},
				{width: '30%', targets: 3},
				{width: '10%', targets: 4},
			],
			pagingType: 'simple_numbers',
			language: {
				sSearch: 'Buscar ',
				aria: {
					sortAscending: ': Activar para ordenar la columna de manera ascendente',
					sortDescending: ': Activar para ordenar la columna de manera descendente',
				},
				infoFiltered: '(filtrado de un total de _MAX_ registros)',
				lengthMenu: `<span class="seperator"></span>Mostrar _MENU_ registros`,
				info: `<span class="seperator"></span>Mostrando registros del _START_ al _END_ de un total de _TOTAL_`,
				infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0',
				emptyTable: 'Ningún dato disponible en esta tabla',
				paginate: {
					firstLast: false,
					previous: `<i class="fa fa-angle-left"></i>`,
					next: `<i class="fa fa-angle-right"></i>`,
				},
				zeroRecords: 'No se encontraron resultados',
			},
			dom: 'flrtip',
			responsive: true,
		};
		this.init();
	}
	
	init() {
		this.spinner.show();
		this.show = false;
		this.productService.table().subscribe((request: any) => {
			this.items = request.products;
			this.spinner.hide();
			this.show = true;
		}, () => {
			this.items = [];
			this.spinner.hide();
			this.show = true;
		});
	}
	
	reload() {
		this.init();
	}
	
	delete(id: number) {
		this.sweetService.getSwal({
			title: 'Eliminación de producto',
			text: `¿Está seguro que desea eliminar el producto?`,
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
				this.productService.delete(id).subscribe((params: any) => {
					this.spinner.hide();
					this.sweetService.getSwal({
						title: 'Eliminación de producto',
						text: `${ params.message }`,
						icon: 'success',
						allowOutsideClick: false,
						allowEscapeKey: false,
					}).then(() => {
						this.init();
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
