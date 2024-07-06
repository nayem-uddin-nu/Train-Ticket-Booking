import { Routes } from '@angular/router';
import { HomeComponent } from './website/pages/home/home.component';
import { SearchComponent } from './website/pages/search/search.component';
import { SearchListComponent } from './website/pages/search-list/search-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    // {
    //     path: 'search/:from/:to/:date',
    //     component: SearchComponent
    // },
    {
        path: 'find-ticket',
        component: SearchListComponent
    }
];
