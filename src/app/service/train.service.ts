import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfigService } from './config-service';

@Injectable({
   providedIn: 'root'
})
export class TrainService {

   config = inject(ConfigService);

   constructor(private http: HttpClient) { }


   getAllStations() {
      return this.http.get(`${this.config.apiURL}/get-stations`);
   }

   getTickets(data: any) {
      return this.http.post(`${this.config.apiURL}/search`, data);
   }

}

