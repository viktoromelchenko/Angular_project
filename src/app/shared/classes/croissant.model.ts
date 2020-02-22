import { ICroissant } from '../interface/croissant.interface';

export class Croissant implements ICroissant{

    constructor(
        public id: number,
        public categoryName: string,
        public name: string,
        public ingredients: string,
        public price: number,
        public image?: string
    ){}
}