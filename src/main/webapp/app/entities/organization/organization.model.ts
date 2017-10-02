import { BaseEntity } from './../../shared';

export class Organization implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public rooms?: BaseEntity[],
    ) {
    }
}
