import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { School, Request, User, Offer } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class SchoolService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    addSchool(school: School) {
        console.log(school);
        return this.http.post(`${environment.apiUrl}/schools`, school);
    }

    getAllSchools() {
        return this.http.get<School[]>(`${environment.apiUrl}/schools`);
    }

    getSchoolById(id: string) {
        return this.http.get<School>(`${environment.apiUrl}/schools/${id}`);
    }

    addRequest(id: string, request: Request) {
        return this.http.post(`${environment.apiUrl}/requests/${id}/request`, request);
    }

    getRequestById(schoolID: string, requestID: string) {
        return this.http.get<Request>(`${environment.apiUrl}/schools/${schoolID}/request/${requestID}`);
    }

    addAdmin(id: string, admin: User) {
        console.log(admin);
        return this.http.post(`${environment.apiUrl}/users/${id}/admin`, admin);
    }

    addOffer(schoolID: string, id: string, offer: Offer) {
        return this.http.post(`${environment.apiUrl}/offers/${id}/offer`, offer);
    }

    updateRequestStatus(schoolID: string, requestID: string, offerID: string, status: string) {
        console.log(schoolID, requestID, offerID, status);
        this.updateOfferStatus(schoolID, requestID, offerID, status);
        return this.http.put(`${environment.apiUrl}/requests/${requestID}`, { status });
    }

    updateOfferStatus(schoolID: string, requestID: string, offerID: string, offerStatus: string) {
        console.log(schoolID, requestID, offerID);
        return this.http.put(`${environment.apiUrl}/offers/${offerID}`, { offerStatus });
    }
}