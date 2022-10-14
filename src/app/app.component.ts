import { Component } from '@angular/core';

import { AccountService } from './_services';
import { Role, User } from './_models';
import { INavData } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { cilListNumbered, cilPaperPlane, cilHome, cilBank, brandSet } from '@coreui/icons';

const adminNavItems: INavData[] = [
  {
    name: 'Menu',
    title: true
  },
  {
    name: 'Home',
    url: '/',
    iconComponent: { name: 'cil-home' },
  },
  {
    name: 'Offers',
    url: '/requests',
    iconComponent: { name: 'cil-paper-plane' },
    badge: {
      color: 'success',
      text: 'NEW',
      size: 'lg',
    }
  },
];

const superAdminNavItems: INavData[] = [
  {
    name: 'Menu',
    title: true
  },
  {
    name: 'Home',
    url: '/',
    iconComponent: { name: 'cil-home' },
  },
  {
    name: 'Schools',
    url: '/schools',
    iconComponent: { name: 'cil-bank' },
  },
];

const volunteerNavItems: INavData[] = [
  {
    name: 'Menu',
    title: true
  },
  {
    name: 'Home',
    url: '/',
    iconComponent: { name: 'cil-home' },
  },
  {
    name: 'Requests',
    url: '/offers',
    iconComponent: { name: 'cil-list-numbered' },
  },
];

@Component({ selector: 'app', templateUrl: 'app.component.html', providers: [IconSetService] })
export class AppComponent {
    user: User;
    navItems;

    constructor(private accountService: AccountService, public iconSet: IconSetService) {
        this.accountService.user.subscribe(x => this.user = x);
        iconSet.icons = { cilListNumbered, cilPaperPlane, cilHome, cilBank, ...brandSet };

    }

    get isAdmin() {
        return this.user && this.user.role === Role.Admin;
    }

    get isSuperAdmin() {
        return this.user && this.user.role === Role.SuperAdmin;
    }

    ngOnInit() {

      if(this.isSuperAdmin) {
        this.navItems = superAdminNavItems;
      }
      if(this.isAdmin) {
        this.navItems = adminNavItems;
      }
      if(!this.isAdmin && !this.isSuperAdmin) {
        this.navItems = volunteerNavItems;
      }
    }

    ngOnDestroy() {
      this.navItems = [];
    }



    logout() {
        this.navItems = [];
        this.accountService.logout();
    }
}