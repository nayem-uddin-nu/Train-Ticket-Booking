import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDestination } from '../../../model/destination';
import { DistrictService } from '../../../service/district.service';
import { TrainService } from '../../../service/train.service';
import { FormService } from '../../../service/form-service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  router = inject(Router);
  trainService = inject(TrainService);
  destinationService = inject(DistrictService);
  formService = inject(FormService);
  findTicketForm = this.formService.findTicketForm;

  // findTicketForm: FormGroup = new FormGroup({
  //   ticketClass: new FormControl(null, [Validators.required]),
  //   travellers: new FormControl(null, [Validators.required, Validators.max(5), Validators.min(1)]),
  //   departure: new FormControl(null, [Validators.required]),
  //   destination: new FormControl(null, [Validators.required]),
  //   departureDate: new FormControl("", [Validators.required]),
  //   returnDate: new FormControl(""),
  // });

  destinationList: IDestination[] = [];

  formValue: any;
  isInvalid: boolean = false;
  isSameToLocation: boolean = false;
  isFormInvalid: boolean = false;

  ngOnInit(): void {
    this.loadDestinations();
  }

  loadDestinations() {
    this.destinationService.getAll().subscribe((res: any) => {
      this.destinationList = res.data;
    })
  }


  findTicket() {
    this.formValue = this.findTicketForm.value;
    if (this.findTicketForm.valid) {
      this.router.navigateByUrl('/find-ticket');
    }
    else {
      this.isFormInvalid = true;
    }
  }

  roundTrip() {
    this.formService.isRoundedTrip = true;
  }

  oneway() {
    this.formService.isRoundedTrip = false;
    this.findTicketForm.reset();

  }

}
