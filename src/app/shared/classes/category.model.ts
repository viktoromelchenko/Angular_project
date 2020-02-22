import { ICategory } from '../interface/category.interface';

export class category implements ICategory{
    constructor(
        public id: number,
        public name: string
    ){}
}