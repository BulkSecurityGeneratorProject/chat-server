import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { ChatRoom } from './chat-room.model';
import { ChatRoomService } from './chat-room.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-chat-room',
    templateUrl: './chat-room.component.html'
})
export class ChatRoomComponent implements OnInit, OnDestroy {
chatRooms: ChatRoom[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private chatRoomService: ChatRoomService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.chatRoomService.query().subscribe(
            (res: ResponseWrapper) => {
                this.chatRooms = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInChatRooms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ChatRoom) {
        return item.id;
    }
    registerChangeInChatRooms() {
        this.eventSubscriber = this.eventManager.subscribe('chatRoomListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
