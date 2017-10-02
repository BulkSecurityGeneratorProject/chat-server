import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ChatMessageComponent } from './chat-message.component';
import { ChatMessageDetailComponent } from './chat-message-detail.component';
import { ChatMessagePopupComponent } from './chat-message-dialog.component';
import { ChatMessageDeletePopupComponent } from './chat-message-delete-dialog.component';

export const chatMessageRoute: Routes = [
    {
        path: 'chat-message',
        component: ChatMessageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ChatMessages'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'chat-message/:id',
        component: ChatMessageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ChatMessages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chatMessagePopupRoute: Routes = [
    {
        path: 'chat-message-new',
        component: ChatMessagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ChatMessages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-message/:id/edit',
        component: ChatMessagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ChatMessages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'chat-message/:id/delete',
        component: ChatMessageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ChatMessages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
