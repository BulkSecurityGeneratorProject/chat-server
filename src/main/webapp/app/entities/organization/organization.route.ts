import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { OrganizationComponent } from './organization.component';
import { OrganizationDetailComponent } from './organization-detail.component';
import { OrganizationPopupComponent } from './organization-dialog.component';
import { OrganizationDeletePopupComponent } from './organization-delete-dialog.component';

export const organizationRoute: Routes = [
    {
        path: 'organization',
        component: OrganizationComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Organizations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'organization/:id',
        component: OrganizationDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Organizations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const organizationPopupRoute: Routes = [
    {
        path: 'organization-new',
        component: OrganizationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Organizations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organization/:id/edit',
        component: OrganizationPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Organizations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organization/:id/delete',
        component: OrganizationDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Organizations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
