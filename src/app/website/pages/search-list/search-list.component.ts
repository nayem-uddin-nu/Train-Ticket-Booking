import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormService } from '../../../service/form-service';
import { SearchComponent } from '../search/search.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../../service/search.service';
import { TrainService } from '../../../service/train.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, RouterLink } from '@angular/router';

@Component({
    selector: 'app-search-list',
    standalone: true,
    imports: [CommonModule, SearchComponent],
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
    schedules: any = [];

    pagination: any = {};

    ngOnInit(): void {
        if (this.findTicketForm.valid) {
            this.formValue = this.findTicketForm.value;
            this.getAvailableTickets(1);
        }
    }

    // ngOnDestroy(): void {
    //   this.formSubscription.unsubscribe();
    // }


    emitSharedData(data: any) {
        this.formValue = data;
        console.log('emmiting from search list...');
        console.log(this.formValue);
        this.getAvailableTickets(1);

    }


    getAvailableTickets(page: number) {
        this.trainService.getTickets({ ...this.formValue, page }).subscribe({
            next: (res) => {
                this.schedules = res.data;
                console.log(res.links);
                this.pagination = {
                    current_page: res.current_page,
                    last_page: res.last_page,
                    links: res.links,
                    next_page_url: res.next_page_url,
                    prev_page_url: res.prev_page_url
                }
            },
            error: (errors) => {
                console.log(errors);
                this.validationErrors = errors;
            }
        });
    }

    getFormattedTime(timeString: any) {
        let [hours, minutes] = timeString.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${String(hours).padStart(2, '0')}:${minutes} ${period}`;
    };

    goToPage(page: number) {
        if (page !== this.pagination.current_page && page > 0 && page <= this.pagination.last_page) {
            this.getAvailableTickets(page);
        }
    }

    handlePageClick(url: string) {
        if (url) {
            const page = new URL(url).searchParams.get('page');
            this.goToPage(Number(page));
        }
    }

    viewDetails(scheduleId: number) {
        console.log(scheduleId);

    }


}
