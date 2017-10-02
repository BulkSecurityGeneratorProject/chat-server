import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ChatRoom } from './chat-room.model';
import { ChatRoomPopupService } from './chat-room-popup.service';
import { ChatRoomService } from './chat-room.service';
import { Organization, OrganizationService } from '../organization';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-chat-room-dialog',
    templateUrl: './chat-room-dialog.component.html'
})
export class ChatRoomDialogComponent implements OnInit {

    chatRoom: ChatRoom;
    isSaving: boolean;

    organizations: Organization[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private chatRoomService: ChatRoomService,
        private organizationService: OrganizationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.organizationService.query()
            .subscribe((res: ResponseWrapper) => { this.organizations = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.chatRoom.id !== undefined) {
            this.subscribeToSaveResponse(
                this.chatRoomService.update(this.chatRoom));
        } else {
            this.subscribeToSaveResponse(
                this.chatRoomService.create(this.chatRoom));
        }
    }

    private subscribeToSaveResponse(result: Observable<ChatRoom>) {
        result.subscribe((res: ChatRoom) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ChatRoom) {
        this.eventManager.broadcast({ name: 'chatRoomListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOrganizationById(index: number, item: Organization) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-chat-room-popup',
    template: ''
})
export class ChatRoomPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private chatRoomPopupService: ChatRoomPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chatRoomPopupService
                    .open(ChatRoomDialogComponent as Component, params['id']);
            } else {
                this.chatRoomPopupService
                    .open(ChatRoomDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
