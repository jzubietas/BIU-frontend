import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({providedIn: 'root'})

export class FrontendProductService {
	
	private url: string = environment.url;
	private http: HttpClient = inject(HttpClient);
	
	index() {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			"Accept-Language": 'es'
		});
		return this.http.get<any[]>(`${ this.url }frontend/products`, {headers: headers});
	}
	
}

