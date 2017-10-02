/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ChatserverTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ChatSessionDetailComponent } from '../../../../../../main/webapp/app/entities/chat-session/chat-session-detail.component';
import { ChatSessionService } from '../../../../../../main/webapp/app/entities/chat-session/chat-session.service';
import { ChatSession } from '../../../../../../main/webapp/app/entities/chat-session/chat-session.model';

describe('Component Tests', () => {

    describe('ChatSession Management Detail Component', () => {
        let comp: ChatSessionDetailComponent;
        let fixture: ComponentFixture<ChatSessionDetailComponent>;
        let service: ChatSessionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ChatserverTestModule],
                declarations: [ChatSessionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ChatSessionService,
                    JhiEventManager
                ]
            }).overrideTemplate(ChatSessionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChatSessionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChatSessionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ChatSession(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.chatSession).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
