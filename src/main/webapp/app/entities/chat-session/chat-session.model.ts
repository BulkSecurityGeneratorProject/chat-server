import { BaseEntity } from './../../shared';

export class ChatSession implements BaseEntity {
    constructor(
        public id?: number,
        public chatRoom?: BaseEntity,
        public messages?: BaseEntity[],
    ) {
    }
}
