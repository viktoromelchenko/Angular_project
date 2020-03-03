import { IIngridient } from '../interface/ingridient.interface';

export class Ingridient implements IIngridient{
    
    constructor(
        public id: number,
        public categoryName:string,
        public name: string,
        public price: number,
        public image: string
    ){}
}