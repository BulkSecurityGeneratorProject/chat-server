/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ChatserverTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ChatMessageDetailComponent } from '../../../../../../main/webapp/app/entities/chat-message/chat-message-detail.component';
import { ChatMessageService } from '../../../../../../main/webapp/app/entities/chat-message/chat-message.service';
import { ChatMessage } from '../../../../../../main/webapp/app/entities/chat-message/chat-message.model';

describe('Component Tests', () => {

    describe('ChatMessage Management Detail Component', () => {
        let comp: ChatMessageDetailComponent;
        let fixture: ComponentFixture<ChatMessageDetailComponent>;
        let service: ChatMessageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChatserverTestModule],
                declarations: [ChatMessageDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ChatMessageService,
                    JhiEventManager
                ]
            }).overrideTemplate(ChatMessageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatMessageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatMessageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ChatMessage(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.chatMessage).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
