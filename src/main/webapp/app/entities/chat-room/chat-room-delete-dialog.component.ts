import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChatRoom } from './chat-room.model';
import { ChatRoomPopupService } from './chat-room-popup.service';
import { ChatRoomService } from './chat-room.service';

@Component({
    selector: 'jhi-chat-room-delete-dialog',
    templateUrl: './chat-room-delete-dialog.component.html'
})
export class ChatRoomDeleteDialogComponent {

    chatRoom: ChatRoom;

    constructor(
        private chatRoomService: ChatRoomService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chatRoomService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'chatRoomListModification',
                content: 'Deleted an chatRoom'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chat-room-delete-popup',
    template: ''
})
export class ChatRoomDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatRoomPopupService: ChatRoomPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.chatRoomPopupService
                .open(ChatRoomDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
