import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ChatSession } from './chat-session.model';
import { ChatSessionPopupService } from './chat-session-popup.service';
import { ChatSessionService } from './chat-session.service';
import { ChatRoom, ChatRoomService } from '../chat-room';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-chat-session-dialog',
    templateUrl: './chat-session-dialog.component.html'
})
export class ChatSessionDialogComponent implements OnInit {

    chatSession: ChatSession;
    isSaving: boolean;

    chatrooms: ChatRoom[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private chatSessionService: ChatSessionService,
        private chatRoomService: ChatRoomService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.chatRoomService.query()
            .subscribe((res: ResponseWrapper) => { this.chatrooms = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.chatSession.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chatSessionService.update(this.chatSession));
        } else {
            this.subscribeToSaveResponse(
                this.chatSessionService.create(this.chatSession));
        }
    }

    private subscribeToSaveResponse(result: Observable<ChatSession>) {
        result.subscribe((res: ChatSession) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ChatSession) {
        this.eventManager.broadcast({ name: 'chatSessionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackChatRoomById(index: number, item: ChatRoom) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-chat-session-popup',
    template: ''
})
export class ChatSessionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatSessionPopupService: ChatSessionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatSessionPopupService
                    .open(ChatSessionDialogComponent as Component, params['id']);
            } else {
                this.chatSessionPopupService
                    .open(ChatSessionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
