import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ChatSessionComponent } from './chat-session.component';
import { ChatSessionDetailComponent } from './chat-session-detail.component';
import { ChatSessionPopupComponent } from './chat-session-dialog.component';
import { ChatSessionDeletePopupComponent } from './chat-session-delete-dialog.component';

export const chatSessionRoute: Routes = [
    {
        path: 'chat-session',
        component: ChatSessionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ChatSessions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chat-session/:id',
        component: ChatSessionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ChatSessions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chatSessionPopupRoute: Routes = [
    {
        path: 'chat-session-new',
        component: ChatSessionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ChatSessions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-session/:id/edit',
        component: ChatSessionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ChatSessions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-session/:id/delete',
        component: ChatSessionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ChatSessions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
