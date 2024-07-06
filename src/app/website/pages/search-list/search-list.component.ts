import { Component, inject, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { FormService } from '../../../service/form-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.css'
})
export class SearchListComponent implements OnInit {
  formService = inject(FormService);
  formSubscription!: Subscription;
  formValue: any;

  ngOnInit(): void {
    // console.log(this.formService.findTicketForm.value);
    this.formSubscription = this.formService.formChanges$.subscribe(value => {
      this.formValue = value;
      console.log(value);

      // this.getTickets(this.formValue);
    });
  }
}
