import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatSession } from './chat-session.model';
import { ChatSessionPopupService } from './chat-session-popup.service';
import { ChatSessionService } from './chat-session.service';

@Component({
    selector: 'jhi-chat-session-delete-dialog',
    templateUrl: './chat-session-delete-dialog.component.html'
})
export class ChatSessionDeleteDialogComponent {

    chatSession: ChatSession;

    constructor(
        private chatSessionService: ChatSessionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chatSessionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chatSessionListModification',
                content: 'Deleted an chatSession'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chat-session-delete-popup',
    template: ''
})
export class ChatSessionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatSessionPopupService: ChatSessionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chatSessionPopupService
                .open(ChatSessionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
