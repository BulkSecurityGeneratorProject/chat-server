import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChatserverSharedModule } from '../../shared';
import {
    ChatRoomService,
    ChatRoomPopupService,
    ChatRoomComponent,
    ChatRoomDetailComponent,
    ChatRoomDialogComponent,
    ChatRoomPopupComponent,
    ChatRoomDeletePopupComponent,
    ChatRoomDeleteDialogComponent,
    chatRoomRoute,
    chatRoomPopupRoute,
} from './';

const ENTITY_STATES = [
    ...chatRoomRoute,
    ...chatRoomPopupRoute,
];

@NgModule({
    imports: [
        ChatserverSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ChatRoomComponent,
        ChatRoomDetailComponent,
        ChatRoomDialogComponent,
        ChatRoomDeleteDialogComponent,
        ChatRoomPopupComponent,
        ChatRoomDeletePopupComponent,
    ],
    entryComponents: [
        ChatRoomComponent,
        ChatRoomDialogComponent,
        ChatRoomPopupComponent,
        ChatRoomDeleteDialogComponent,
        ChatRoomDeletePopupComponent,
    ],
    providers: [
        ChatRoomService,
        ChatRoomPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatserverChatRoomModule {}
