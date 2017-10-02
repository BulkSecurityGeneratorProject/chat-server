import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiAlertService } from 'ng-jhipster';

import { ChatSession } from './chat-session.model';
import { ChatSessionService } from './chat-session.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-chat-session',
    templateUrl: './chat-session.component.html'
})
export class ChatSessionComponent implements OnInit, OnDestroy {
chatSessions: ChatSession[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private chatSessionService: ChatSessionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.chatSessionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.chatSessions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInChatSessions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ChatSession) {
        return item.id;
    }
    registerChangeInChatSessions() {
        this.eventSubscriber = this.eventManager.subscribe('chatSessionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
