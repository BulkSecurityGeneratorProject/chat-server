import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { ChatSession } from './chat-session.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ChatSessionService {

    private resourceUrl = SERVER_API_URL + 'api/chat-sessions';

    constructor(private http: Http) { }

    create(chatSession: ChatSession): Observable<ChatSession> {
        const copy = this.convert(chatSession);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(chatSession: ChatSession): Observable<ChatSession> {
        const copy = this.convert(chatSession);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ChatSession> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to ChatSession.
     */
    private convertItemFromServer(json: any): ChatSession {
        const entity: ChatSession = Object.assign(new ChatSession(), json);
        return entity;
    }

    /**
     * Convert a ChatSession to a JSON which can be sent to the server.
     */
    private convert(chatSession: ChatSession): ChatSession {
        const copy: ChatSession = Object.assign({}, chatSession);
        return copy;
    }
}
