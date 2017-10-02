import { BaseEntity } from './../../shared';

export class ChatRoom implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public organization?: BaseEntity,
        public sessions?: BaseEntity[],
    ) {
    }
}
