import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatserverSharedModule } from '../../shared';
import {
    ChatSessionService,
    ChatSessionPopupService,
    ChatSessionComponent,
    ChatSessionDetailComponent,
    ChatSessionDialogComponent,
    ChatSessionPopupComponent,
    ChatSessionDeletePopupComponent,
    ChatSessionDeleteDialogComponent,
    chatSessionRoute,
    chatSessionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...chatSessionRoute,
    ...chatSessionPopupRoute,
];

@NgModule({
    imports: [
        ChatserverSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ChatSessionComponent,
        ChatSessionDetailComponent,
        ChatSessionDialogComponent,
        ChatSessionDeleteDialogComponent,
        ChatSessionPopupComponent,
        ChatSessionDeletePopupComponent,
    ],
    entryComponents: [
        ChatSessionComponent,
        ChatSessionDialogComponent,
        ChatSessionPopupComponent,
        ChatSessionDeleteDialogComponent,
        ChatSessionDeletePopupComponent,
    ],
    providers: [
        ChatSessionService,
        ChatSessionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatserverChatSessionModule {}
