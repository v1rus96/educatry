import { Component } from '@angular/core';

import { AccountService } from './_services';
import { Role, User } from './_models';
import { INavData } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { cilListNumbered, cilPaperPlane, cilHome, cilBank, cilUser, brandSet } from '@coreui/icons';


@Component({ selector: 'app', templateUrl: 'app.component.html', providers: [IconSetService] })
export class AppComponent {
    user: User;

    navItems: INavData[] = [
      
    ];

    constructor(private accountService: AccountService, public iconSet: IconSetService) {
        this.accountService.user.subscribe(x => this.user = x)
        iconSet.icons = { cilListNumbered, cilPaperPlane, cilHome, cilBank, cilUser, ...brandSet };

    }

    get isAdmin() {
        return this.user && this.user.role === Role.Admin;
    }

    get isSuperAdmin() {
        return this.user && this.user.role === Role.SuperAdmin;
    }

    ngOnInit() {
      
      this.navItems.push(
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
    
      {
        name: 'Profile',
        url: `/users/edit/${this.user?.id}`,
        iconComponent: { name: 'cil-user' },
      },
      {
        name: 'Manage Users',
        url: `/users`,
        iconComponent: { name: 'cil-user' },
      },
      
      )

      if (this.isSuperAdmin) {
        this.navItems.push(
          {
            name: 'Schools',
            url: '/schools',
            iconComponent: { name: 'cil-bank' },
          },
        )
      }

      if (this.isAdmin) {
        this.navItems.push(
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
        )
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