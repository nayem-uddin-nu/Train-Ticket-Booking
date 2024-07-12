import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { IDestination } from '../../../model/destination';
import { DistrictService } from '../../../service/district.service';
import { TrainService } from '../../../service/train.service';
import { FormService } from '../../../service/form-service';
import { SearchService } from '../../../service/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']


})
export class SearchComponent implements OnInit {

  @Output() sharedFormData = new EventEmitter<any>();
  @Input() errors: any = {}

  router = inject(Router);
  trainService = inject(TrainService);
  destinationService = inject(DistrictService);
  formService = inject(FormService);
  findTicketForm = this.formService.findTicketForm;

  destinationList: IDestination[] = [];

  formValue: any;
  currentUrl: any;
  isFormInvalid: boolean = false;

  searchService = inject(SearchService);

  ngOnInit(): void {
    this.loadDestinations();
  }

  loadDestinations() {
    this.destinationService.getAll().subscribe((res: any) => {
      this.destinationList = res.data;
    });
  }

  findTicket() {
    this.currentUrl = this.router.url;
    if (this.findTicketForm.valid) {
      this.errors = {};
      this.sharedFormData.emit(this.findTicketForm.value);
      this.router.navigate(['/find-ticket']);
    } else {
      this.isFormInvalid = true;
    }
  }

  roundTrip() {
    this.formService.isRoundedTrip = true;
    this.errors = {};
  }

  oneway() {
    this.formService.isRoundedTrip = false;
    this.findTicketForm.reset();
    this.errors = {};
  }
}
