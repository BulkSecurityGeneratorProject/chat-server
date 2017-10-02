import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatMessage } from './chat-message.model';
import { ChatMessagePopupService } from './chat-message-popup.service';
import { ChatMessageService } from './chat-message.service';

@Component({
    selector: 'jhi-chat-message-delete-dialog',
    templateUrl: './chat-message-delete-dialog.component.html'
})
export class ChatMessageDeleteDialogComponent {

    chatMessage: ChatMessage;

    constructor(
        private chatMessageService: ChatMessageService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chatMessageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chatMessageListModification',
                content: 'Deleted an chatMessage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chat-message-delete-popup',
    template: ''
})
export class ChatMessageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatMessagePopupService: ChatMessagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chatMessagePopupService
                .open(ChatMessageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
