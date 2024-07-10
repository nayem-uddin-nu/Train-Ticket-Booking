import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { TrainService } from '../../../service/train.service';
import { IStation } from '../../../model/train';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DistrictService } from '../../../service/district.service';
import { IDestination } from '../../../model/destination';
import { SearchComponent } from '../search/search.component';

// import 

declare var Choices: any;

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SearchComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})

export class HomeComponent {
}