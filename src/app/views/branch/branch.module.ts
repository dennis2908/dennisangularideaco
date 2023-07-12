// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AgGridModule } from 'ag-grid-angular';

import { ModalModule } from 'ngx-bootstrap/modal';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

// Carousel Component
import { CarouselModule } from 'ngx-bootstrap/carousel';

// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';

// Popover Component
import { PopoverModule } from 'ngx-bootstrap/popover';

// Progress Component
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

// Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';


// navbars

// Components Routing
import { BranchRoutingModule } from './branch-routing.module';

import { BranchListComponent } from './branch_list.component';

@NgModule({
  imports: [
    AutocompleteLibModule,
    CommonModule,
	ModalModule.forRoot(),
	ReactiveFormsModule,
    FormsModule,
    BranchRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
	NgxDatatableModule,
	AgGridModule.withComponents([]) 
  ],
  declarations: [
   BranchListComponent,
  ]
})
export class BranchModule { }