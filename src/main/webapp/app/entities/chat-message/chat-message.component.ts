import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { ChatMessage } from './chat-message.model';
import { ChatMessageService } from './chat-message.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-chat-message',
    templateUrl: './chat-message.component.html'
})
export class ChatMessageComponent implements OnInit, OnDestroy {
chatMessages: ChatMessage[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private chatMessageService: ChatMessageService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.chatMessageService.query().subscribe(
            (res: ResponseWrapper) => {
                this.chatMessages = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInChatMessages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ChatMessage) {
        return item.id;
    }
    registerChangeInChatMessages() {
        this.eventSubscriber = this.eventManager.subscribe('chatMessageListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
