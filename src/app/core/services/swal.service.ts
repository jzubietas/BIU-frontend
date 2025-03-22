import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
	providedIn: 'root'
})
export class SwalService {
	
	constructor() {
	}
	
	getSwal(object: any): any {
		return Swal.fire(object);
	}
	
}
