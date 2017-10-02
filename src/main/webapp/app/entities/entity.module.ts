import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ChatserverOrganizationModule } from './organization/organization.module';
import { ChatserverChatRoomModule } from './chat-room/chat-room.module';
import { ChatserverChatSessionModule } from './chat-session/chat-session.module';
import { ChatserverChatMessageModule } from './chat-message/chat-message.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ChatserverOrganizationModule,
        ChatserverChatRoomModule,
        ChatserverChatSessionModule,
        ChatserverChatMessageModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatserverEntityModule {}
