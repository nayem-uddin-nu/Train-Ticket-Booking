import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  apiURL: string = 'http://127.0.0.1:8000/api/v1';
  constructor(private http: HttpClient) { }


  getAll() {
    return this.http.get(`${this.apiURL}/get-stations`);
  }
}
