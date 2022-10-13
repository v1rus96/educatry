import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SchoolsRoutingModule } from './schools-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { AddRequestComponent } from './add-request.component';
import { AddAdminComponent } from './add-admin.component';
import { AddOfferComponent } from './add-offer.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SchoolsRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent,
        AddRequestComponent,
        AddAdminComponent,
        AddOfferComponent
    ]
})
export class SchoolsModule { }