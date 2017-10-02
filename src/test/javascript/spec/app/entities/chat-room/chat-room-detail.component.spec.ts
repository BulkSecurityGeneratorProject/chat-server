/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ChatserverTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ChatRoomDetailComponent } from '../../../../../../main/webapp/app/entities/chat-room/chat-room-detail.component';
import { ChatRoomService } from '../../../../../../main/webapp/app/entities/chat-room/chat-room.service';
import { ChatRoom } from '../../../../../../main/webapp/app/entities/chat-room/chat-room.model';

describe('Component Tests', () => {

    describe('ChatRoom Management Detail Component', () => {
        let comp: ChatRoomDetailComponent;
        let fixture: ComponentFixture<ChatRoomDetailComponent>;
        let service: ChatRoomService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChatserverTestModule],
                declarations: [ChatRoomDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ChatRoomService,
                    JhiEventManager
                ]
            }).overrideTemplate(ChatRoomDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatRoomDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatRoomService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ChatRoom(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.chatRoom).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
