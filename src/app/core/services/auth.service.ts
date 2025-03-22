import { inject, Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({providedIn: 'root'})

export class AuthenticationService {
	
	private url: string = environment.url;
	private _usuario: any;
	private _token: string;
	private http: HttpClient = inject(HttpClient);
	
	public get user (): any {
		if (this._usuario != undefined) {
			return this._usuario;
		} else if (this._usuario === undefined && localStorage.getItem ("dashboard_user") != null) {
			this._usuario = JSON.parse (localStorage.getItem ("dashboard_user")) as any;
			return this._usuario;
		}
		return null;
	}
	
	public get token (): string {
		if (this._token != undefined) {
			return this._token;
		} else if (this._token === undefined && localStorage.getItem ("dashboard_token") != null) {
			this._token = localStorage.getItem ("dashboard_token");
			return this._token;
		}
		return null;
	}
	
	saveUser (user: any): void {
		this._usuario = user;
		localStorage.setItem ("dashboard_user", JSON.stringify (this._usuario));
	}
	
	saveToken (accessToken: string): void {
		this._token = accessToken;
		localStorage.setItem ("dashboard_token", accessToken);
	}
	
	getToken (accessToken: string): any {
		if (accessToken != null) {
			return JSON.parse (atob (accessToken.split (".")[1]));
		}
		return null;
	}
	
	isAuthenticated (): boolean {
		let payload = this.getToken (this.token);
		return payload != null && payload.user_name && payload.user_name.length > 0;
	}
	
	logout (): void {
		this._token = null;
		this._usuario = null;
		localStorage.removeItem ("dashboard_token");
		localStorage.removeItem ("dashboard_user");
	}
	
	login(params: any) {
		let headers = new HttpHeaders({
			"Authorization": `Bearer ${localStorage.getItem("dashboard_token")}`,
			"Accept-Language": 'es'
		});
		const formData: FormData = new FormData();
		for (let index in params) {
			if (params[index] !== '' && params[index] !== undefined && params[index] !== null) {
				if(index !== 'file'){
					formData.append(index, params[index]);
				}
			}
		}
		return this.http.post<any[]>(`${ this.url }login`, formData, {headers: headers});
		
	}
}

