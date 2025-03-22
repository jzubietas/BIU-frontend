import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
	
	private excludedUrls = ['/api/login', '/api/frontend'];
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage.getItem('dashboard_token');
		if (this.excludedUrls.some(url => req.url.includes(url))) {
			return next.handle(req);
		}
		if (token) {
			const clonedReq = req.clone({
				setHeaders: {Authorization: `Bearer ${ token }`}
			});
			return next.handle(clonedReq);
		}
		return next.handle(req);
	}
}
