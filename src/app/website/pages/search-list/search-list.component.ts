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
    activatedRoute = inject(ActivatedRoute);
    formSubscription!: Subscription;

    formService = inject(FormService);
    findTicketForm = this.formService.findTicketForm;


    searchService = inject(SearchService);
    ngOnInit(): void {
        this.formValue = this.findTicketForm.value;
        console.log('Find Ticket Constructor...');
        console.log(this.formValue);
        this.trainService.getTickets(this.formValue);
    }

    // ngOnDestroy(): void {
    //   this.formSubscription.unsubscribe();
    // }


    emitSharedData(data: any) {
        console.log('emmiting from search list...');
        console.log(data);
        this.trainService.getTickets(data);

    }


}
