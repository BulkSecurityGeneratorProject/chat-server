import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ChatSession } from './chat-session.model';
import { ChatSessionService } from './chat-session.service';

@Component({
    selector: 'jhi-chat-session-detail',
    templateUrl: './chat-session-detail.component.html'
})
export class ChatSessionDetailComponent implements OnInit, OnDestroy {

    chatSession: ChatSession;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chatSessionService: ChatSessionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChatSessions();
    }

    load(id) {
        this.chatSessionService.find(id).subscribe((chatSession) => {
            this.chatSession = chatSession;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChatSessions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatSessionListModification',
            (response) => this.load(this.chatSession.id)
        );
    }
}
