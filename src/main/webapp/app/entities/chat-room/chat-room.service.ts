import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { ChatRoom } from './chat-room.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ChatRoomService {

    private resourceUrl = SERVER_API_URL + 'api/chat-rooms';

    constructor(private http: Http) { }

    create(chatRoom: ChatRoom): Observable<ChatRoom> {
        const copy = this.convert(chatRoom);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(chatRoom: ChatRoom): Observable<ChatRoom> {
        const copy = this.convert(chatRoom);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ChatRoom> {
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
     * Convert a returned JSON object to ChatRoom.
     */
    private convertItemFromServer(json: any): ChatRoom {
        const entity: ChatRoom = Object.assign(new ChatRoom(), json);
        return entity;
    }

    /**
     * Convert a ChatRoom to a JSON which can be sent to the server.
     */
    private convert(chatRoom: ChatRoom): ChatRoom {
        const copy: ChatRoom = Object.assign({}, chatRoom);
        return copy;
    }
}
