import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ChatMessage } from './chat-message.model';
import { ChatMessageService } from './chat-message.service';

@Component({
    selector: 'jhi-chat-message-detail',
    templateUrl: './chat-message-detail.component.html'
})
export class ChatMessageDetailComponent implements OnInit, OnDestroy {

    chatMessage: ChatMessage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private chatMessageService: ChatMessageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInChatMessages();
    }

    load(id) {
        this.chatMessageService.find(id).subscribe((chatMessage) => {
            this.chatMessage = chatMessage;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInChatMessages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chatMessageListModification',
            (response) => this.load(this.chatMessage.id)
        );
    }
}
