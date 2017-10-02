import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ChatRoom } from './chat-room.model';
import { ChatRoomService } from './chat-room.service';

@Component({
    selector: 'jhi-chat-room-detail',
    templateUrl: './chat-room-detail.component.html'
})
export class ChatRoomDetailComponent implements OnInit, OnDestroy {

    chatRoom: ChatRoom;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chatRoomService: ChatRoomService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChatRooms();
    }

    load(id) {
        this.chatRoomService.find(id).subscribe((chatRoom) => {
            this.chatRoom = chatRoom;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChatRooms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatRoomListModification',
            (response) => this.load(this.chatRoom.id)
        );
    }
}
