import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatserverSharedModule } from '../../shared';
import {
    OrganizationService,
    OrganizationPopupService,
    OrganizationComponent,
    OrganizationDetailComponent,
    OrganizationDialogComponent,
    OrganizationPopupComponent,
    OrganizationDeletePopupComponent,
    OrganizationDeleteDialogComponent,
    organizationRoute,
    organizationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...organizationRoute,
    ...organizationPopupRoute,
];

@NgModule({
    imports: [
        ChatserverSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OrganizationComponent,
        OrganizationDetailComponent,
        OrganizationDialogComponent,
        OrganizationDeleteDialogComponent,
        OrganizationPopupComponent,
        OrganizationDeletePopupComponent,
    ],
    entryComponents: [
        OrganizationComponent,
        OrganizationDialogComponent,
        OrganizationPopupComponent,
        OrganizationDeleteDialogComponent,
        OrganizationDeletePopupComponent,
    ],
    providers: [
        OrganizationService,
        OrganizationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatserverOrganizationModule {}
