import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    isRoundedTrip: boolean = false;
    findTicketForm: FormGroup = new FormGroup({
        ticketClass: new FormControl(null),
        travellers: new FormControl(null, [Validators.nullValidator, Validators.max(5), Validators.min(1)]),
        departure_station_id: new FormControl(null, [Validators.required]),
        arrival_station_id: new FormControl(null, [Validators.required]),
        departureDate: new FormControl("", [Validators.required]),
        returnDate: new FormControl('', [this.isRoundedTrip ? Validators.required : Validators.nullValidator]),
    });

    private formChangesSubject = new Subject<any>();
    formChanges$ = this.formChangesSubject.asObservable();

    constructor() {
        this.findTicketForm.valueChanges.subscribe(value => {
            this.formChangesSubject.next(value);
        });
    }
}
