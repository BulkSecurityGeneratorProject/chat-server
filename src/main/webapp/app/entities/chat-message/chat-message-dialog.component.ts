import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ChatMessage } from './chat-message.model';
import { ChatMessagePopupService } from './chat-message-popup.service';
import { ChatMessageService } from './chat-message.service';
import { ChatSession, ChatSessionService } from '../chat-session';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-chat-message-dialog',
    templateUrl: './chat-message-dialog.component.html'
})
export class ChatMessageDialogComponent implements OnInit {

    chatMessage: ChatMessage;
    isSaving: boolean;

    chatsessions: ChatSession[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private chatMessageService: ChatMessageService,
        private chatSessionService: ChatSessionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.chatSessionService.query()
            .subscribe((res: ResponseWrapper) => { this.chatsessions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.chatMessage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chatMessageService.update(this.chatMessage));
        } else {
            this.subscribeToSaveResponse(
                this.chatMessageService.create(this.chatMessage));
        }
    }

    private subscribeToSaveResponse(result: Observable<ChatMessage>) {
        result.subscribe((res: ChatMessage) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ChatMessage) {
        this.eventManager.broadcast({ name: 'chatMessageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackChatSessionById(index: number, item: ChatSession) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-chat-message-popup',
    template: ''
})
export class ChatMessagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatMessagePopupService: ChatMessagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatMessagePopupService
                    .open(ChatMessageDialogComponent as Component, params['id']);
            } else {
                this.chatMessagePopupService
                    .open(ChatMessageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
