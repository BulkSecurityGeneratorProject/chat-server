import { BaseEntity } from './../../shared';

export class ChatMessage implements BaseEntity {
    constructor(
        public id?: number,
        public message?: string,
        public chatSession?: BaseEntity,
    ) {
    }
}
