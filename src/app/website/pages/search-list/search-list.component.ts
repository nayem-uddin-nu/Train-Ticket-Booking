import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormService } from '../../../service/form-service';
import { SearchComponent } from '../search/search.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../../service/search.service';
import { TrainService } from '../../../service/train.service';

@Component({
    selector: 'app-search-list',
    standalone: true,
    imports: [SearchComponent],
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
    formValue: any;
    router = inject(Router);
    trainService = inject(TrainService)

    formService = inject(FormService);
    findTicketForm = this.formService.findTicketForm;


    searchService = inject(SearchService);

    validationErrors: any = {};
    ngOnInit(): void {
        if (this.findTicketForm.valid) {
            this.formValue = this.findTicketForm.value;
            this.getAvailableTickets();

        }
    }

    // ngOnDestroy(): void {
    //   this.formSubscription.unsubscribe();
    // }


    emitSharedData(data: any) {
        this.formValue = data;
        console.log('emmiting from search list...');
        console.log(this.formValue);
        this.getAvailableTickets();

    }


    getAvailableTickets() {
        this.trainService.getTickets(this.formValue).subscribe({
            next: (res) => {
                console.log(res);
            },
            error: (errors) => {
                console.log(errors);
                this.validationErrors = errors;
            }
        });
    }


}
