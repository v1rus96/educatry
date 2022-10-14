import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, SchoolService } from '@app/_services';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { School } from '@app/_models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    schools = null;
    form: UntypedFormGroup;
    schoolID: string;
    requestID: string;
    isAddMode: boolean;
    school: School;
    requests: Request[];
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private schoolService: SchoolService,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}


    ngOnInit() {
        this.schoolService.getAllSchools()
            .pipe(first())
            .subscribe(schools => this.schools = schools);


        // this.schoolID = this.route.snapshot.params['schoolID'];
        // this.requestID = this.route.snapshot.params['requestID'];
        this.isAddMode = !this.schoolID;
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            remarks: [''],
            volunteer: this.accountService.userValue,
            request: [this.requestID]
        });

        if (!this.isAddMode) {
            this.schoolService.getSchoolById(this.schoolID)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        console.log(this.form)
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }



        this.loading = true;
    
            this.addOffer();
        // } else {
        //     this.updateUser();
        // }
        
    }


    setID(schoolID, requestID) {
        this.schoolID = schoolID;
        this.requestID = requestID;
    }

    private addOffer() {
        this.schoolService.addOffer(this.schoolID, this.requestID, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Request added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}