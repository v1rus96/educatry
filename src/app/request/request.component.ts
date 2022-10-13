import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { SchoolService } from '@app/_services';

@Component({ templateUrl: 'request.component.html' })
export class RequestComponent implements OnInit {
    schools = null;

    constructor(private schoolService: SchoolService) {}

    ngOnInit() {
        this.schoolService.getAllSchools()
            .pipe(first())
            .subscribe(schools => this.schools = schools);
    }

}