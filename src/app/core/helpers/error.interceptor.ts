import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SwalService } from "../services/swal.service";

@Injectable({
    providedIn: 'root'
})

export class ErrorInterceptor implements HttpInterceptor {
    
    private router = inject(Router);
    private sweetService = inject(SwalService);
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.sweetService.getSwal({
                        title: 'Usuario no autenticado',
                        text: 'Solo se aceptan usuarios autenticados o con token validos',
                        icon: 'error',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    }).then(() => {
                        localStorage.removeItem('token');
                        this.router.navigate(['/auth']);
                    });
                }
                return throwError(() => error);
            })
        );
    }
}
