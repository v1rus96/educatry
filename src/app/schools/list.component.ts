import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { SchoolService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    schools = null;

    constructor(private schoolService: SchoolService) {}

    ngOnInit() {
        this.schoolService.getAllSchools()
            .pipe(first())
            .subscribe(schools => this.schools = schools);
    }

}