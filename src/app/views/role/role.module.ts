// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { HttpClientModule } from '@angular/common/http';

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
import { RoleRoutingModule } from './role-routing.module';

import { RoleListComponent } from './role_list.component';

@NgModule({
  imports: [
    AutocompleteLibModule,
    CommonModule,
	HttpClientModule ,
	ModalModule.forRoot(),
	ReactiveFormsModule,
    FormsModule,
    RoleRoutingModule,
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
   RoleListComponent,
  ]
})
export class RoleModule { }