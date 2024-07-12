import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from './config-service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class TrainService {

   config = inject(ConfigService);

   constructor(private http: HttpClient) { }

   getAllStations(): Observable<any> {
      return this.http.get(`${this.config.apiURL}/stations`);
   }

   getTickets(data: any): Observable<any> {
      return this.http.post(`${this.config.apiURL}/find-schedules`, data).pipe(
         catchError(this.handleError)
      );
   }


   private handleError(resp: HttpErrorResponse) {
      let errorMessages = {};

      if (resp.status === 422 && resp.error) {
         errorMessages = resp.error;
      } else {
         errorMessages = { general: 'An error occurred. Please try again later.' };
      }

      return throwError(errorMessages);
   }

}

