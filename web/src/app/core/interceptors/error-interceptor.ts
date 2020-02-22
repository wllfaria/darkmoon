import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request)
			.pipe(catchError((error: HttpErrorResponse) => {
				if (error instanceof HttpErrorResponse) {
					return throwError(error);
				} else {
					return throwError(error);
				}
			})
		);
	}
}
