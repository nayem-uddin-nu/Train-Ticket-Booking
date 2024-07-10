import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private formData: any;
  constructor() { }


  setFormData(data: any) {
    console.log('data seeting to service');
    this.formData = data;
    console.log(this.formData);
  }

  getFormData(): any {
    console.log('data getting to service');
    console.log(this.formData);
    return this.formData;

  }
}
