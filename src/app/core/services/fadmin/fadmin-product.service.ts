import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({providedIn: 'root'})

export class FadminProductService {
	
	private url: string = environment.url;
	private http: HttpClient = inject(HttpClient);
	
	table() {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			"Authorization": `Bearer ${ localStorage.getItem("dashboard_token") }`,
			"Accept-Language": 'es'
		});
		return this.http.get<any[]>(`${ this.url }product`, {headers: headers});
	}
	
	store(params: any) {
		let headers = new HttpHeaders({
			"Authorization": `Bearer ${ localStorage.getItem("dashboard_token") }`,
			"Accept-Language": 'es'
		});
		const formData: FormData = new FormData();
		for (let index in params) {
			if (params[index] !== '' && params[index] !== undefined && params[index] !== null) {
				formData.append(index, params[index]);
			}
		}
		return this.http.post<any[]>(`${ this.url }product/store`, formData, {headers: headers});
	}
	
	show(id: any) {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			"Authorization": `Bearer ${ localStorage.getItem("dashboard_token") }`,
			"Accept-Language": 'es'
		});
		return this.http.get<any[]>(`${ this.url }product/show/${id}`, {headers: headers});
	}
	
	update(id: any, params: any) {
		let headers = new HttpHeaders({
			"Authorization": `Bearer ${ localStorage.getItem("dashboard_token") }`,
			"Accept-Language": 'es'
		});
		const formData: FormData = new FormData();
		for (let index in params) {
			if (params[index] !== '' && params[index] !== undefined && params[index] !== null) {
				formData.append(index, params[index]);
			}
		}
		return this.http.post<any[]>(`${ this.url }product/update/${id}`, formData, {headers: headers});
	}
	
	delete(id: any) {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			"Authorization": `Bearer ${ localStorage.getItem("dashboard_token") }`,
			"Accept-Language": 'es'
		});
		return this.http.get<any[]>(`${ this.url }product/delete/${id}`, {headers: headers});
	}
	
}

